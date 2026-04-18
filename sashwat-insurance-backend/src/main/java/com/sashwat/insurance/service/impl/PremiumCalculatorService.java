package com.sashwat.insurance.service.impl;

import com.sashwat.insurance.dto.request.PremiumCalculatorRequest;
import com.sashwat.insurance.dto.response.PremiumQuoteResponse;
import com.sashwat.insurance.entity.InsuranceProduct;
import com.sashwat.insurance.entity.Lead;
import com.sashwat.insurance.entity.PremiumQuote;
import com.sashwat.insurance.exception.BadRequestException;
import com.sashwat.insurance.exception.ResourceNotFoundException;
import com.sashwat.insurance.repository.InsuranceProductRepository;
import com.sashwat.insurance.repository.PremiumQuoteRepository;
import com.sashwat.insurance.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class PremiumCalculatorService {

    private static final Logger log = LoggerFactory.getLogger(PremiumCalculatorService.class);

    private final InsuranceProductRepository productRepository;
    private final PremiumQuoteRepository quoteRepository;
    private final EmailService emailService;

    private static final BigDecimal GST_RATE = new BigDecimal("0.18");
    private static final AtomicLong quoteCounter = new AtomicLong(1000);

    public PremiumCalculatorService(InsuranceProductRepository productRepository,
                                     PremiumQuoteRepository quoteRepository,
                                     EmailService emailService) {
        this.productRepository = productRepository;
        this.quoteRepository = quoteRepository;
        this.emailService = emailService;
    }

    private BigDecimal getAgeFactor(int age) {
        if (age <= 25) return new BigDecimal("0.85");
        if (age <= 30) return BigDecimal.ONE;
        if (age <= 35) return new BigDecimal("1.15");
        if (age <= 40) return new BigDecimal("1.40");
        if (age <= 45) return new BigDecimal("1.75");
        if (age <= 50) return new BigDecimal("2.20");
        if (age <= 55) return new BigDecimal("2.80");
        return new BigDecimal("3.50");
    }

    private BigDecimal getGenderFactor(Lead.Gender gender) {
        return gender == Lead.Gender.FEMALE ? new BigDecimal("0.90") : BigDecimal.ONE;
    }

    private BigDecimal getHealthFactor(Lead.HealthStatus health) {
        switch (health) {
            case EXCELLENT: return new BigDecimal("0.90");
            case GOOD:      return BigDecimal.ONE;
            case AVERAGE:   return new BigDecimal("1.20");
            case POOR:      return new BigDecimal("1.50");
            default:        return BigDecimal.ONE;
        }
    }

    private BigDecimal getSmokingFactor(boolean isSmoker) {
        return isSmoker ? new BigDecimal("1.25") : BigDecimal.ONE;
    }

    private BigDecimal getTermFactor(int termYears) {
        if (termYears <= 10) return new BigDecimal("1.05");
        if (termYears <= 20) return BigDecimal.ONE;
        if (termYears <= 30) return new BigDecimal("0.97");
        return new BigDecimal("0.95");
    }

    @Transactional
    public PremiumQuoteResponse calculate(PremiumCalculatorRequest request) {
        InsuranceProduct product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + request.getProductId()));

        if (!product.getIsActive()) {
            throw new BadRequestException("This product is currently not available");
        }

        validateInputAgainstProduct(request, product);

        BigDecimal coverageInLakhs = BigDecimal.valueOf(request.getCoverageAmount())
                .divide(BigDecimal.valueOf(100_000), 4, RoundingMode.HALF_UP);

        BigDecimal baseRate = product.getBasePremiumRatePerLakh() != null
                ? product.getBasePremiumRatePerLakh()
                : new BigDecimal("500");

        BigDecimal annualPremium = baseRate
                .multiply(coverageInLakhs)
                .multiply(getAgeFactor(request.getAge()))
                .multiply(getGenderFactor(request.getGender()))
                .multiply(getHealthFactor(request.getHealthStatus()))
                .multiply(getSmokingFactor(request.getIsSmoker()))
                .multiply(getTermFactor(request.getPolicyTermYears()))
                .setScale(2, RoundingMode.HALF_UP);

        BigDecimal monthlyPremium    = annualPremium.divide(BigDecimal.valueOf(12), 2, RoundingMode.HALF_UP);
        BigDecimal quarterlyPremium  = annualPremium.divide(BigDecimal.valueOf(4), 2, RoundingMode.HALF_UP);
        BigDecimal halfYearlyPremium = annualPremium.divide(BigDecimal.valueOf(2), 2, RoundingMode.HALF_UP);
        BigDecimal totalPayable      = annualPremium.multiply(BigDecimal.valueOf(request.getPolicyTermYears()));

        BigDecimal gst           = annualPremium.multiply(GST_RATE).setScale(2, RoundingMode.HALF_UP);
        BigDecimal annualWithGst = annualPremium.add(gst);
        BigDecimal monthlyGst    = monthlyPremium.multiply(GST_RATE).setScale(2, RoundingMode.HALF_UP);
        BigDecimal monthlyWithGst = monthlyPremium.add(monthlyGst);

        String quoteRef = generateQuoteReference();

        PremiumQuote savedQuote = new PremiumQuote();
        savedQuote.setQuoteReference(quoteRef);
        savedQuote.setAge(request.getAge());
        savedQuote.setGender(request.getGender());
        savedQuote.setPolicyTermYears(request.getPolicyTermYears());
        savedQuote.setCoverageAmount(request.getCoverageAmount());
        savedQuote.setHealthStatus(request.getHealthStatus());
        savedQuote.setIsSmoker(request.getIsSmoker());
        savedQuote.setProduct(product);
        savedQuote.setAnnualPremium(annualPremium);
        savedQuote.setMonthlyPremium(monthlyPremium);
        savedQuote.setQuarterlyPremium(quarterlyPremium);
        savedQuote.setTotalPremiumPayable(totalPayable);
        savedQuote.setGstAmount(gst);
        savedQuote.setTotalWithGst(annualWithGst);
        savedQuote.setSessionId(request.getSessionId());
        savedQuote.setUserEmail(request.getEmail());
        savedQuote.setIsEmailSent(false);
        savedQuote.setExpiresAt(LocalDateTime.now().plusDays(30));

        quoteRepository.save(savedQuote);

        PremiumQuoteResponse response = buildResponse(savedQuote, product, halfYearlyPremium, annualWithGst, monthlyWithGst);

        if (request.getEmail() != null && !request.getEmail().isBlank()) {
            emailService.sendQuoteEmail(request.getEmail(), "Valued Customer", response);
            savedQuote.setIsEmailSent(true);
            quoteRepository.save(savedQuote);
        }

        log.info("Quote generated: {} | Product: {} | Premium: Rs{}/yr", quoteRef, product.getName(), annualPremium);
        return response;
    }

    public PremiumQuoteResponse getQuoteByReference(String reference) {
        PremiumQuote quote = quoteRepository.findByQuoteReference(reference)
                .orElseThrow(() -> new ResourceNotFoundException("Quote not found: " + reference));
        BigDecimal halfYearly = quote.getAnnualPremium().divide(BigDecimal.valueOf(2), 2, RoundingMode.HALF_UP);
        BigDecimal monthlyWithGst = quote.getMonthlyPremium()
                .multiply(new BigDecimal("1.18")).setScale(2, RoundingMode.HALF_UP);
        return buildResponse(quote, quote.getProduct(), halfYearly, quote.getTotalWithGst(), monthlyWithGst);
    }

    private void validateInputAgainstProduct(PremiumCalculatorRequest req, InsuranceProduct product) {
        if (product.getMinEntryAge() != null && req.getAge() < product.getMinEntryAge()) {
            throw new BadRequestException("Minimum entry age for this plan is " + product.getMinEntryAge());
        }
        if (product.getMaxEntryAge() != null && req.getAge() > product.getMaxEntryAge()) {
            throw new BadRequestException("Maximum entry age for this plan is " + product.getMaxEntryAge());
        }
        if (product.getMinCoverageAmount() != null &&
                req.getCoverageAmount() < product.getMinCoverageAmount().longValue()) {
            throw new BadRequestException("Minimum coverage for this plan is Rs " +
                    String.format("%,d", product.getMinCoverageAmount().longValue()));
        }
        if (product.getMaxCoverageAmount() != null &&
                req.getCoverageAmount() > product.getMaxCoverageAmount().longValue()) {
            throw new BadRequestException("Maximum coverage for this plan is Rs " +
                    String.format("%,d", product.getMaxCoverageAmount().longValue()));
        }
    }

    private PremiumQuoteResponse buildResponse(PremiumQuote quote, InsuranceProduct product,
                                                BigDecimal halfYearly, BigDecimal annualWithGst,
                                                BigDecimal monthlyWithGst) {
        PremiumQuoteResponse r = new PremiumQuoteResponse();
        r.setQuoteReference(quote.getQuoteReference());
        r.setProductId(product.getId());
        r.setProductName(product.getName());
        r.setProductType(product.getProductType().name());
        r.setAge(quote.getAge());
        r.setGender(quote.getGender().name());
        r.setPolicyTermYears(quote.getPolicyTermYears());
        r.setCoverageAmount(quote.getCoverageAmount());
        r.setHealthStatus(quote.getHealthStatus().name());
        r.setIsSmoker(quote.getIsSmoker());
        r.setAnnualPremium(quote.getAnnualPremium());
        r.setMonthlyPremium(quote.getMonthlyPremium());
        r.setQuarterlyPremium(quote.getQuarterlyPremium());
        r.setHalfYearlyPremium(halfYearly);
        r.setTotalPremiumPayable(quote.getTotalPremiumPayable());
        r.setGstAmount(quote.getGstAmount());
        r.setAnnualPremiumWithGst(annualWithGst);
        r.setMonthlyPremiumWithGst(monthlyWithGst);
        r.setCoverageAmountFormatted(formatCurrency(quote.getCoverageAmount()));
        r.setAnnualPremiumFormatted("Rs " + String.format("%,.2f", quote.getAnnualPremium()));
        r.setIsEmailSent(quote.getIsEmailSent());
        r.setValidUntil(quote.getExpiresAt());
        r.setGeneratedAt(quote.getCreatedAt());
        r.setDisclaimer("This is an indicative quote. Actual premium may vary based on medical underwriting. Subject to IRDAI guidelines.");
        return r;
    }

    private String formatCurrency(long amount) {
        if (amount >= 10_000_000) return "Rs " + (amount / 10_000_000) + " Crore";
        if (amount >= 100_000)    return "Rs " + (amount / 100_000) + " Lakh";
        return "Rs " + String.format("%,d", amount);
    }

    private String generateQuoteReference() {
        String year = String.valueOf(LocalDateTime.now().getYear());
        return "QT-" + year + "-" + String.format("%06d", quoteCounter.getAndIncrement());
    }
}
