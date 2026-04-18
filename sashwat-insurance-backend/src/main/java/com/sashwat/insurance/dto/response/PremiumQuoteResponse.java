package com.sashwat.insurance.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PremiumQuoteResponse {
    private String quoteReference;
    private Long productId;
    private String productName;
    private String productType;
    private Integer age;
    private String gender;
    private Integer policyTermYears;
    private Long coverageAmount;
    private String healthStatus;
    private Boolean isSmoker;
    private BigDecimal annualPremium;
    private BigDecimal monthlyPremium;
    private BigDecimal quarterlyPremium;
    private BigDecimal halfYearlyPremium;
    private BigDecimal totalPremiumPayable;
    private BigDecimal gstAmount;
    private BigDecimal annualPremiumWithGst;
    private BigDecimal monthlyPremiumWithGst;
    private String coverageAmountFormatted;
    private String annualPremiumFormatted;
    private Boolean isEmailSent;
    private LocalDateTime validUntil;
    private LocalDateTime generatedAt;
    private String disclaimer = "This is an indicative quote. Actual premium may vary based on medical underwriting. Subject to IRDAI guidelines.";

    public PremiumQuoteResponse() {}

    // All getters and setters
    public String getQuoteReference() { return quoteReference; }
    public void setQuoteReference(String quoteReference) { this.quoteReference = quoteReference; }
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    public String getProductType() { return productType; }
    public void setProductType(String productType) { this.productType = productType; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public Integer getPolicyTermYears() { return policyTermYears; }
    public void setPolicyTermYears(Integer policyTermYears) { this.policyTermYears = policyTermYears; }
    public Long getCoverageAmount() { return coverageAmount; }
    public void setCoverageAmount(Long coverageAmount) { this.coverageAmount = coverageAmount; }
    public String getHealthStatus() { return healthStatus; }
    public void setHealthStatus(String healthStatus) { this.healthStatus = healthStatus; }
    public Boolean getIsSmoker() { return isSmoker; }
    public void setIsSmoker(Boolean isSmoker) { this.isSmoker = isSmoker; }
    public BigDecimal getAnnualPremium() { return annualPremium; }
    public void setAnnualPremium(BigDecimal annualPremium) { this.annualPremium = annualPremium; }
    public BigDecimal getMonthlyPremium() { return monthlyPremium; }
    public void setMonthlyPremium(BigDecimal monthlyPremium) { this.monthlyPremium = monthlyPremium; }
    public BigDecimal getQuarterlyPremium() { return quarterlyPremium; }
    public void setQuarterlyPremium(BigDecimal quarterlyPremium) { this.quarterlyPremium = quarterlyPremium; }
    public BigDecimal getHalfYearlyPremium() { return halfYearlyPremium; }
    public void setHalfYearlyPremium(BigDecimal halfYearlyPremium) { this.halfYearlyPremium = halfYearlyPremium; }
    public BigDecimal getTotalPremiumPayable() { return totalPremiumPayable; }
    public void setTotalPremiumPayable(BigDecimal totalPremiumPayable) { this.totalPremiumPayable = totalPremiumPayable; }
    public BigDecimal getGstAmount() { return gstAmount; }
    public void setGstAmount(BigDecimal gstAmount) { this.gstAmount = gstAmount; }
    public BigDecimal getAnnualPremiumWithGst() { return annualPremiumWithGst; }
    public void setAnnualPremiumWithGst(BigDecimal annualPremiumWithGst) { this.annualPremiumWithGst = annualPremiumWithGst; }
    public BigDecimal getMonthlyPremiumWithGst() { return monthlyPremiumWithGst; }
    public void setMonthlyPremiumWithGst(BigDecimal monthlyPremiumWithGst) { this.monthlyPremiumWithGst = monthlyPremiumWithGst; }
    public String getCoverageAmountFormatted() { return coverageAmountFormatted; }
    public void setCoverageAmountFormatted(String coverageAmountFormatted) { this.coverageAmountFormatted = coverageAmountFormatted; }
    public String getAnnualPremiumFormatted() { return annualPremiumFormatted; }
    public void setAnnualPremiumFormatted(String annualPremiumFormatted) { this.annualPremiumFormatted = annualPremiumFormatted; }
    public Boolean getIsEmailSent() { return isEmailSent; }
    public void setIsEmailSent(Boolean isEmailSent) { this.isEmailSent = isEmailSent; }
    public LocalDateTime getValidUntil() { return validUntil; }
    public void setValidUntil(LocalDateTime validUntil) { this.validUntil = validUntil; }
    public LocalDateTime getGeneratedAt() { return generatedAt; }
    public void setGeneratedAt(LocalDateTime generatedAt) { this.generatedAt = generatedAt; }
    public String getDisclaimer() { return disclaimer; }
    public void setDisclaimer(String disclaimer) { this.disclaimer = disclaimer; }
}
