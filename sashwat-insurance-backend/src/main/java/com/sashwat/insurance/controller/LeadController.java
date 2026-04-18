package com.sashwat.insurance.controller;

import com.sashwat.insurance.dto.request.LeadRequest;
import com.sashwat.insurance.dto.response.ApiResponse;
import com.sashwat.insurance.entity.Lead;
import com.sashwat.insurance.service.impl.LeadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/leads")
@Tag(name = "Leads", description = "Lead capture and management")
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    @PostMapping
    @Operation(summary = "Submit a lead (contact form, quote request, callback)")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createLead(
            @Valid @RequestBody LeadRequest request,
            HttpServletRequest httpRequest) {
        String ip = httpRequest.getHeader("X-Forwarded-For");
        if (ip == null) ip = httpRequest.getRemoteAddr();

        Lead lead = leadService.createLead(request, ip);
        Map<String, Object> result = Map.of(
                "leadId", lead.getId(),
                "message", "Thank you! Our team will contact you within 24 hours.",
                "referenceId", "LEAD-" + lead.getId()
        );
        return ResponseEntity.status(201).body(ApiResponse.success("Your inquiry has been received", result));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "[ADMIN] Get all leads with pagination")
    public ResponseEntity<ApiResponse<Page<Lead>>> getAllLeads(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse.success(leadService.getAllLeads(pageable)));
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "[ADMIN] Get lead statistics for dashboard")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getStats() {
        return ResponseEntity.ok(ApiResponse.success(leadService.getLeadStats()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "[ADMIN] Get a specific lead by ID")
    public ResponseEntity<ApiResponse<Lead>> getLeadById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(leadService.getLeadById(id)));
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "[ADMIN] Filter leads by status")
    public ResponseEntity<ApiResponse<Page<Lead>>> getByStatus(
            @PathVariable Lead.LeadStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse.success(leadService.getLeadsByStatus(status, pageable)));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "[ADMIN] Update lead status")
    public ResponseEntity<ApiResponse<Lead>> updateStatus(
            @PathVariable Long id,
            @RequestParam Lead.LeadStatus status,
            @RequestParam(required = false) String notes) {
        Lead updated = leadService.updateLeadStatus(id, status, notes);
        return ResponseEntity.ok(ApiResponse.success("Lead status updated", updated));
    }
}
