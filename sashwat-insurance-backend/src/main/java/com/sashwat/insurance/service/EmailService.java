package com.sashwat.insurance.service;

import com.sashwat.insurance.entity.Lead;
import com.sashwat.insurance.dto.response.PremiumQuoteResponse;

public interface EmailService {
    void sendEmailVerification(String to, String name, String token);
    void sendPasswordResetEmail(String to, String name, String token);
    void sendLeadNotificationToCompany(Lead lead);
    void sendLeadConfirmationToCustomer(Lead lead);
    void sendQuoteEmail(String to, String name, PremiumQuoteResponse quote);
    void sendWelcomeEmail(String to, String name);
}
