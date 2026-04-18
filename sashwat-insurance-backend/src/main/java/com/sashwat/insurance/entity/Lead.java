package com.sashwat.insurance.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "leads")
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LeadType leadType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private InsuranceProduct productInterested;

    private Integer age;
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private Integer policyTermYears;
    private Long coverageAmountRequested;

    @Enumerated(EnumType.STRING)
    private HealthStatus healthStatus;

    private String smokingStatus;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LeadStatus status = LeadStatus.NEW;

    private String assignedTo;
    private String notes;

    @Column(nullable = false)
    private String source = "WEBSITE";

    private String utmSource;
    private String utmMedium;
    private String utmCampaign;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Lead() {}

    public enum LeadType {
        QUOTE_REQUEST, CONTACT_FORM, CALLBACK_REQUEST, PRODUCT_INQUIRY
    }

    public enum LeadStatus {
        NEW, CONTACTED, IN_PROGRESS, CONVERTED, CLOSED_LOST
    }

    public enum Gender {
        MALE, FEMALE, OTHER
    }

    public enum HealthStatus {
        EXCELLENT, GOOD, AVERAGE, POOR
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public LeadType getLeadType() { return leadType; }
    public void setLeadType(LeadType leadType) { this.leadType = leadType; }

    public InsuranceProduct getProductInterested() { return productInterested; }
    public void setProductInterested(InsuranceProduct productInterested) { this.productInterested = productInterested; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }

    public Integer getPolicyTermYears() { return policyTermYears; }
    public void setPolicyTermYears(Integer policyTermYears) { this.policyTermYears = policyTermYears; }

    public Long getCoverageAmountRequested() { return coverageAmountRequested; }
    public void setCoverageAmountRequested(Long coverageAmountRequested) { this.coverageAmountRequested = coverageAmountRequested; }

    public HealthStatus getHealthStatus() { return healthStatus; }
    public void setHealthStatus(HealthStatus healthStatus) { this.healthStatus = healthStatus; }

    public String getSmokingStatus() { return smokingStatus; }
    public void setSmokingStatus(String smokingStatus) { this.smokingStatus = smokingStatus; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public LeadStatus getStatus() { return status; }
    public void setStatus(LeadStatus status) { this.status = status; }

    public String getAssignedTo() { return assignedTo; }
    public void setAssignedTo(String assignedTo) { this.assignedTo = assignedTo; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getUtmSource() { return utmSource; }
    public void setUtmSource(String utmSource) { this.utmSource = utmSource; }

    public String getUtmMedium() { return utmMedium; }
    public void setUtmMedium(String utmMedium) { this.utmMedium = utmMedium; }

    public String getUtmCampaign() { return utmCampaign; }
    public void setUtmCampaign(String utmCampaign) { this.utmCampaign = utmCampaign; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
