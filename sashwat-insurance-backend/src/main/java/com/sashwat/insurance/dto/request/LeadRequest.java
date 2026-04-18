package com.sashwat.insurance.dto.request;

import com.sashwat.insurance.entity.Lead;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class LeadRequest {
    @NotBlank(message = "Full name is required") @Size(min = 2, max = 100)
    private String fullName;
    @NotBlank(message = "Email is required") @Email(message = "Please provide a valid email")
    private String email;
    @NotBlank(message = "Phone is required") @Pattern(regexp = "^[6-9]\\d{9}$", message = "Please provide a valid 10-digit Indian mobile number")
    private String phone;
    @NotNull(message = "Lead type is required")
    private Lead.LeadType leadType;
    private Long productId;
    @Min(18) @Max(70) private Integer age;
    private LocalDate dateOfBirth;
    private Lead.Gender gender;
    @Min(5) @Max(40) private Integer policyTermYears;
    @Min(100000) private Long coverageAmountRequested;
    private Lead.HealthStatus healthStatus;
    private String smokingStatus;
    @Size(max = 500) private String message;
    private String utmSource;
    private String utmMedium;
    private String utmCampaign;

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public Lead.LeadType getLeadType() { return leadType; }
    public void setLeadType(Lead.LeadType leadType) { this.leadType = leadType; }
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    public Lead.Gender getGender() { return gender; }
    public void setGender(Lead.Gender gender) { this.gender = gender; }
    public Integer getPolicyTermYears() { return policyTermYears; }
    public void setPolicyTermYears(Integer policyTermYears) { this.policyTermYears = policyTermYears; }
    public Long getCoverageAmountRequested() { return coverageAmountRequested; }
    public void setCoverageAmountRequested(Long coverageAmountRequested) { this.coverageAmountRequested = coverageAmountRequested; }
    public Lead.HealthStatus getHealthStatus() { return healthStatus; }
    public void setHealthStatus(Lead.HealthStatus healthStatus) { this.healthStatus = healthStatus; }
    public String getSmokingStatus() { return smokingStatus; }
    public void setSmokingStatus(String smokingStatus) { this.smokingStatus = smokingStatus; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getUtmSource() { return utmSource; }
    public void setUtmSource(String utmSource) { this.utmSource = utmSource; }
    public String getUtmMedium() { return utmMedium; }
    public void setUtmMedium(String utmMedium) { this.utmMedium = utmMedium; }
    public String getUtmCampaign() { return utmCampaign; }
    public void setUtmCampaign(String utmCampaign) { this.utmCampaign = utmCampaign; }
}
