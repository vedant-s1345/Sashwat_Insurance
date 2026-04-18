package com.sashwat.insurance.dto.request;

import com.sashwat.insurance.entity.Lead;
import jakarta.validation.constraints.*;

public class PremiumCalculatorRequest {
    @NotNull(message = "Product ID is required")
    private Long productId;
    @NotNull(message = "Age is required") @Min(18) @Max(65)
    private Integer age;
    @NotNull(message = "Gender is required")
    private Lead.Gender gender;
    @NotNull(message = "Policy term is required") @Min(5) @Max(40)
    private Integer policyTermYears;
    @NotNull(message = "Coverage amount is required") @Min(500000)
    private Long coverageAmount;
    @NotNull(message = "Health status is required")
    private Lead.HealthStatus healthStatus;
    @NotNull(message = "Smoking status is required")
    private Boolean isSmoker;
    private String email;
    private String sessionId;

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
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
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
}
