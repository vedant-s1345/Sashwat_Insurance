package com.sashwat.insurance.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "insurance_products")
public class InsuranceProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductType productType;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String keyBenefits;

    private BigDecimal minCoverageAmount;
    private BigDecimal maxCoverageAmount;

    private Integer minTerm;
    private Integer maxTerm;

    private Integer minEntryAge;
    private Integer maxEntryAge;

    private BigDecimal basePremiumRatePerLakh;

    private String brochureUrl;
    private String iconUrl;

    @Column(nullable = false)
    private Boolean isActive = true;

    private Boolean isFeatured = false;

    @ElementCollection
    @CollectionTable(name = "product_faqs", joinColumns = @JoinColumn(name = "product_id"))
    private List<ProductFAQ> faqs;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public InsuranceProduct() {}

    public enum ProductType {
        TERM_LIFE, WHOLE_LIFE, ENDOWMENT, ULIP, CHILD_PLAN, PENSION_ANNUITY, MONEY_BACK
    }

    @Embeddable
    public static class ProductFAQ {
        private String question;

        @Column(columnDefinition = "TEXT")
        private String answer;

        public ProductFAQ() {}
        public ProductFAQ(String question, String answer) {
            this.question = question;
            this.answer = answer;
        }

        public String getQuestion() { return question; }
        public void setQuestion(String question) { this.question = question; }
        public String getAnswer() { return answer; }
        public void setAnswer(String answer) { this.answer = answer; }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public ProductType getProductType() { return productType; }
    public void setProductType(ProductType productType) { this.productType = productType; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getKeyBenefits() { return keyBenefits; }
    public void setKeyBenefits(String keyBenefits) { this.keyBenefits = keyBenefits; }

    public BigDecimal getMinCoverageAmount() { return minCoverageAmount; }
    public void setMinCoverageAmount(BigDecimal minCoverageAmount) { this.minCoverageAmount = minCoverageAmount; }

    public BigDecimal getMaxCoverageAmount() { return maxCoverageAmount; }
    public void setMaxCoverageAmount(BigDecimal maxCoverageAmount) { this.maxCoverageAmount = maxCoverageAmount; }

    public Integer getMinTerm() { return minTerm; }
    public void setMinTerm(Integer minTerm) { this.minTerm = minTerm; }

    public Integer getMaxTerm() { return maxTerm; }
    public void setMaxTerm(Integer maxTerm) { this.maxTerm = maxTerm; }

    public Integer getMinEntryAge() { return minEntryAge; }
    public void setMinEntryAge(Integer minEntryAge) { this.minEntryAge = minEntryAge; }

    public Integer getMaxEntryAge() { return maxEntryAge; }
    public void setMaxEntryAge(Integer maxEntryAge) { this.maxEntryAge = maxEntryAge; }

    public BigDecimal getBasePremiumRatePerLakh() { return basePremiumRatePerLakh; }
    public void setBasePremiumRatePerLakh(BigDecimal basePremiumRatePerLakh) { this.basePremiumRatePerLakh = basePremiumRatePerLakh; }

    public String getBrochureUrl() { return brochureUrl; }
    public void setBrochureUrl(String brochureUrl) { this.brochureUrl = brochureUrl; }

    public String getIconUrl() { return iconUrl; }
    public void setIconUrl(String iconUrl) { this.iconUrl = iconUrl; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public Boolean getIsFeatured() { return isFeatured; }
    public void setIsFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; }

    public List<ProductFAQ> getFaqs() { return faqs; }
    public void setFaqs(List<ProductFAQ> faqs) { this.faqs = faqs; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
