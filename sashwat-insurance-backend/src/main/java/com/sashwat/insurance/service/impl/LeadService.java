package com.sashwat.insurance.service.impl;

import com.sashwat.insurance.dto.request.LeadRequest;
import com.sashwat.insurance.entity.InsuranceProduct;
import com.sashwat.insurance.entity.Lead;
import com.sashwat.insurance.exception.ResourceNotFoundException;
import com.sashwat.insurance.repository.InsuranceProductRepository;
import com.sashwat.insurance.repository.LeadRepository;
import com.sashwat.insurance.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class LeadService {

    private static final Logger log = LoggerFactory.getLogger(LeadService.class);

    private final LeadRepository leadRepository;
    private final InsuranceProductRepository productRepository;
    private final EmailService emailService;

    public LeadService(LeadRepository leadRepository,
                       InsuranceProductRepository productRepository,
                       EmailService emailService) {
        this.leadRepository = leadRepository;
        this.productRepository = productRepository;
        this.emailService = emailService;
    }

    @Transactional
    public Lead createLead(LeadRequest request, String ipAddress) {
        InsuranceProduct product = null;
        if (request.getProductId() != null) {
            product = productRepository.findById(request.getProductId()).orElse(null);
        }

        Lead lead = new Lead();
        lead.setFullName(request.getFullName());
        lead.setEmail(request.getEmail().toLowerCase().trim());
        lead.setPhone(request.getPhone().trim());
        lead.setLeadType(request.getLeadType());
        lead.setProductInterested(product);
        lead.setAge(request.getAge());
        lead.setDateOfBirth(request.getDateOfBirth());
        lead.setGender(request.getGender());
        lead.setPolicyTermYears(request.getPolicyTermYears());
        lead.setCoverageAmountRequested(request.getCoverageAmountRequested());
        lead.setHealthStatus(request.getHealthStatus());
        lead.setSmokingStatus(request.getSmokingStatus());
        lead.setMessage(request.getMessage());
        lead.setStatus(Lead.LeadStatus.NEW);
        lead.setSource("WEBSITE");
        lead.setUtmSource(request.getUtmSource());
        lead.setUtmMedium(request.getUtmMedium());
        lead.setUtmCampaign(request.getUtmCampaign());

        lead = leadRepository.save(lead);

        emailService.sendLeadNotificationToCompany(lead);
        emailService.sendLeadConfirmationToCustomer(lead);

        log.info("Lead created: ID={} | Type={} | Email={}", lead.getId(), lead.getLeadType(), lead.getEmail());
        return lead;
    }

    public Page<Lead> getAllLeads(Pageable pageable) {
        return leadRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    public Page<Lead> getLeadsByStatus(Lead.LeadStatus status, Pageable pageable) {
        return leadRepository.findByStatus(status, pageable);
    }

    public Lead getLeadById(Long id) {
        return leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found with id: " + id));
    }

    @Transactional
    public Lead updateLeadStatus(Long id, Lead.LeadStatus status, String notes) {
        Lead lead = getLeadById(id);
        lead.setStatus(status);
        if (notes != null) lead.setNotes(notes);
        return leadRepository.save(lead);
    }

    public Map<String, Object> getLeadStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", leadRepository.count());
        stats.put("newLeads", leadRepository.countByStatus(Lead.LeadStatus.NEW));
        stats.put("contacted", leadRepository.countByStatus(Lead.LeadStatus.CONTACTED));
        stats.put("converted", leadRepository.countByStatus(Lead.LeadStatus.CONVERTED));
        stats.put("last24h", leadRepository.countLeadsSince(LocalDateTime.now().minusHours(24)));
        stats.put("last7days", leadRepository.countLeadsSince(LocalDateTime.now().minusDays(7)));
        return stats;
    }
}
