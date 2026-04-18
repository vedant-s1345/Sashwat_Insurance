package com.sashwat.insurance.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "premium_quotes")
public class PremiumQuote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String quoteReference;

    @Column(nullable = false)
    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Lead.Gender gender;

    @Column(nullable = false)
    private Integer policyTermYears;

    @Column(nullable = false)
    private Long coverageAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Lead.HealthStatus healthStatus;

    @Column(nullable = false)
    private Boolean isSmoker = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private InsuranceProduct product;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal annualPremium;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal monthlyPremium;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal quarterlyPremium;

    @Column(precision = 15, scale = 2)
    private BigDecimal totalPremiumPayable;

    @Column(precision = 15, scale = 2)
    private BigDecimal gstAmount;

    @Column(precision = 15, scale = 2)
    private BigDecimal totalWithGst;

    private String sessionId;
    private String userEmail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private Boolean isEmailSent = false;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime expiresAt;

    public PremiumQuote() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getQuoteReference() { return quoteReference; }
    public void setQuoteReference(String quoteReference) { this.quoteReference = quoteReference; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public Lead.Gender getGender() { return gender; }
    public void setGender(Lead.Gender gender) { this.gender = gender; }

    public Integer getPolicyTermYears() { return policyTermYears; }
    public void setPolicyTermYears(Integer policyTermYears) { this.policyTermYears = policyTermYears; }

    public Long getCoverageAmount() { return coverageAmount; }
    public void setCoverageAmount(Long coverageAmount) { this.coverageAmount = coverageAmount; }

    public Lead.HealthStatus getHealthStatus() { return healthStatus; }
    public void setHealthStatus(Lead.HealthStatus healthStatus) { this.healthStatus = healthStatus; }

    public Boolean getIsSmoker() { return isSmoker; }
    public void setIsSmoker(Boolean isSmoker) { this.isSmoker = isSmoker; }

    public InsuranceProduct getProduct() { return product; }
    public void setProduct(InsuranceProduct product) { this.product = product; }

    public BigDecimal getAnnualPremium() { return annualPremium; }
    public void setAnnualPremium(BigDecimal annualPremium) { this.annualPremium = annualPremium; }

    public BigDecimal getMonthlyPremium() { return monthlyPremium; }
    public void setMonthlyPremium(BigDecimal monthlyPremium) { this.monthlyPremium = monthlyPremium; }

    public BigDecimal getQuarterlyPremium() { return quarterlyPremium; }
    public void setQuarterlyPremium(BigDecimal quarterlyPremium) { this.quarterlyPremium = quarterlyPremium; }

    public BigDecimal getTotalPremiumPayable() { return totalPremiumPayable; }
    public void setTotalPremiumPayable(BigDecimal totalPremiumPayable) { this.totalPremiumPayable = totalPremiumPayable; }

    public BigDecimal getGstAmount() { return gstAmount; }
    public void setGstAmount(BigDecimal gstAmount) { this.gstAmount = gstAmount; }

    public BigDecimal getTotalWithGst() { return totalWithGst; }
    public void setTotalWithGst(BigDecimal totalWithGst) { this.totalWithGst = totalWithGst; }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Boolean getIsEmailSent() { return isEmailSent; }
    public void setIsEmailSent(Boolean isEmailSent) { this.isEmailSent = isEmailSent; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getExpiresAt() { return expiresAt; }
    public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }
}
