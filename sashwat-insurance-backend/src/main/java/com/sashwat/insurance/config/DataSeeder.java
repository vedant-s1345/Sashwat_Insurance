package com.sashwat.insurance.config;

import com.sashwat.insurance.entity.InsuranceProduct;
import com.sashwat.insurance.entity.User;
import com.sashwat.insurance.repository.InsuranceProductRepository;
import com.sashwat.insurance.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final InsuranceProductRepository productRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(InsuranceProductRepository productRepository,
                      UserRepository userRepository,
                      PasswordEncoder passwordEncoder) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedAdminUser();
        seedProducts();
    }

    private void seedAdminUser() {
        if (userRepository.existsByEmail("admin@sashwatinsurance.com")) return;

        User admin = new User();
        admin.setFullName("Sashwat Admin");
        admin.setEmail("admin@sashwatinsurance.com");
        admin.setPhone("9000000000");
        admin.setPassword(passwordEncoder.encode("Admin@123"));
        admin.setRole(User.UserRole.ADMIN);
        admin.setIsActive(true);
        admin.setIsEmailVerified(true);

        userRepository.save(admin);
        log.info("Admin user created: admin@sashwatinsurance.com / Admin@123");
    }

    private void seedProducts() {
        if (productRepository.count() > 0) return;

        InsuranceProduct p1 = new InsuranceProduct();
        p1.setName("Sashwat Term Shield");
        p1.setSlug("term-shield");
        p1.setProductType(InsuranceProduct.ProductType.TERM_LIFE);
        p1.setDescription("Pure protection plan offering high coverage at low premiums.");
        p1.setKeyBenefits("[\"High coverage at affordable premiums\",\"Flexible policy terms 10-40 years\",\"Tax benefits under Section 80C\"]");
        p1.setMinCoverageAmount(new BigDecimal("2500000"));
        p1.setMaxCoverageAmount(new BigDecimal("100000000"));
        p1.setMinTerm(10); p1.setMaxTerm(40);
        p1.setMinEntryAge(18); p1.setMaxEntryAge(60);
        p1.setBasePremiumRatePerLakh(new BigDecimal("420"));
        p1.setIsActive(true); p1.setIsFeatured(true);

        InsuranceProduct p2 = new InsuranceProduct();
        p2.setName("Sashwat Whole Life Plan");
        p2.setSlug("whole-life-plan");
        p2.setProductType(InsuranceProduct.ProductType.WHOLE_LIFE);
        p2.setDescription("Lifelong protection with savings component up to age 99.");
        p2.setKeyBenefits("[\"Lifelong coverage till age 99\",\"Guaranteed maturity benefit\",\"Loan facility against policy\"]");
        p2.setMinCoverageAmount(new BigDecimal("500000"));
        p2.setMaxCoverageAmount(new BigDecimal("50000000"));
        p2.setMinTerm(15); p2.setMaxTerm(40);
        p2.setMinEntryAge(18); p2.setMaxEntryAge(55);
        p2.setBasePremiumRatePerLakh(new BigDecimal("900"));
        p2.setIsActive(true); p2.setIsFeatured(true);

        InsuranceProduct p3 = new InsuranceProduct();
        p3.setName("Sashwat Endowment Plus");
        p3.setSlug("endowment-plus");
        p3.setProductType(InsuranceProduct.ProductType.ENDOWMENT);
        p3.setDescription("Combined protection and savings plan with guaranteed maturity benefit.");
        p3.setKeyBenefits("[\"Protection + savings in one plan\",\"Guaranteed maturity benefit\",\"Ideal for long-term goals\"]");
        p3.setMinCoverageAmount(new BigDecimal("500000"));
        p3.setMaxCoverageAmount(new BigDecimal("20000000"));
        p3.setMinTerm(10); p3.setMaxTerm(30);
        p3.setMinEntryAge(18); p3.setMaxEntryAge(55);
        p3.setBasePremiumRatePerLakh(new BigDecimal("750"));
        p3.setIsActive(true); p3.setIsFeatured(false);

        InsuranceProduct p4 = new InsuranceProduct();
        p4.setName("Sashwat ULIP Growth Fund");
        p4.setSlug("ulip-growth-fund");
        p4.setProductType(InsuranceProduct.ProductType.ULIP);
        p4.setDescription("Market-linked investments with life insurance protection.");
        p4.setKeyBenefits("[\"Market-linked returns\",\"4 fund options\",\"Partial withdrawal after 5 years\"]");
        p4.setMinCoverageAmount(new BigDecimal("500000"));
        p4.setMaxCoverageAmount(new BigDecimal("50000000"));
        p4.setMinTerm(5); p4.setMaxTerm(20);
        p4.setMinEntryAge(18); p4.setMaxEntryAge(55);
        p4.setBasePremiumRatePerLakh(new BigDecimal("650"));
        p4.setIsActive(true); p4.setIsFeatured(true);

        InsuranceProduct p5 = new InsuranceProduct();
        p5.setName("Sashwat Child Future Plan");
        p5.setSlug("child-future-plan");
        p5.setProductType(InsuranceProduct.ProductType.CHILD_PLAN);
        p5.setDescription("Secure your child's future education and life goals.");
        p5.setKeyBenefits("[\"Premium waiver on parent's death\",\"Payouts at key milestones\",\"Flexible payout options\"]");
        p5.setMinCoverageAmount(new BigDecimal("500000"));
        p5.setMaxCoverageAmount(new BigDecimal("10000000"));
        p5.setMinTerm(10); p5.setMaxTerm(25);
        p5.setMinEntryAge(18); p5.setMaxEntryAge(50);
        p5.setBasePremiumRatePerLakh(new BigDecimal("600"));
        p5.setIsActive(true); p5.setIsFeatured(false);

        InsuranceProduct p6 = new InsuranceProduct();
        p6.setName("Sashwat Pension Secure");
        p6.setSlug("pension-secure");
        p6.setProductType(InsuranceProduct.ProductType.PENSION_ANNUITY);
        p6.setDescription("Plan for a comfortable retirement with guaranteed monthly income.");
        p6.setKeyBenefits("[\"Guaranteed lifelong pension\",\"Return of purchase price on death\",\"Joint life annuity option\"]");
        p6.setMinCoverageAmount(new BigDecimal("500000"));
        p6.setMaxCoverageAmount(new BigDecimal("50000000"));
        p6.setMinTerm(5); p6.setMaxTerm(30);
        p6.setMinEntryAge(30); p6.setMaxEntryAge(65);
        p6.setBasePremiumRatePerLakh(new BigDecimal("550"));
        p6.setIsActive(true); p6.setIsFeatured(false);

        productRepository.saveAll(Arrays.asList(p1, p2, p3, p4, p5, p6));
        log.info("6 insurance products seeded successfully");
    }
}
