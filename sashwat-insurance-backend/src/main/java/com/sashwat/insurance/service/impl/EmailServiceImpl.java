package com.sashwat.insurance.service.impl;

import com.sashwat.insurance.dto.response.PremiumQuoteResponse;
import com.sashwat.insurance.entity.Lead;
import com.sashwat.insurance.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailServiceImpl.class);

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.email.company-email}")
    private String companyEmail;

    @Value("${app.email.from-name}")
    private String fromName;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    @Override
    public void sendEmailVerification(String to, String name, String token) {
        String verifyUrl = "http://localhost:3000/verify-email?token=" + token;
        String subject = "Verify Your Email - Sashwat Insurance";
        String body = buildEmailTemplate("Verify Your Email Address", "Hi " + name + ",",
                "Thank you for registering with Sashwat Insurance. Please click the button below to verify your email address.",
                verifyUrl, "Verify Email", "This link expires in 24 hours.");
        sendHtmlEmail(to, subject, body);
    }

    @Async
    @Override
    public void sendPasswordResetEmail(String to, String name, String token) {
        String resetUrl = "http://localhost:3000/reset-password?token=" + token;
        String subject = "Reset Your Password - Sashwat Insurance";
        String body = buildEmailTemplate("Password Reset Request", "Hi " + name + ",",
                "We received a request to reset your password. Click below to set a new password.",
                resetUrl, "Reset Password", "This link expires in 1 hour.");
        sendHtmlEmail(to, subject, body);
    }

    @Async
    @Override
    public void sendLeadNotificationToCompany(Lead lead) {
        String subject = "New Lead: " + lead.getLeadType().name().replace("_", " ") + " - " + lead.getFullName();
        String body = "<div style='font-family:Arial,sans-serif;max-width:600px'>"
                + "<h2 style='color:#1a3a6b'>New Lead Received</h2>"
                + "<p><b>Name:</b> " + lead.getFullName() + "</p>"
                + "<p><b>Email:</b> " + lead.getEmail() + "</p>"
                + "<p><b>Phone:</b> " + lead.getPhone() + "</p>"
                + "<p><b>Type:</b> " + lead.getLeadType().name().replace("_", " ") + "</p>"
                + "<p><b>Product:</b> " + (lead.getProductInterested() != null ? lead.getProductInterested().getName() : "Not specified") + "</p>"
                + "<p><b>Message:</b> " + (lead.getMessage() != null ? lead.getMessage() : "-") + "</p>"
                + "</div>";
        sendHtmlEmail(companyEmail, subject, body);
    }

    @Async
    @Override
    public void sendLeadConfirmationToCustomer(Lead lead) {
        String subject = "We received your inquiry - Sashwat Insurance";
        String body = buildEmailTemplate("Thank You for Reaching Out!", "Hi " + lead.getFullName() + ",",
                "We have received your inquiry and our insurance expert will contact you within 24 hours.",
                "tel:+918000000000", "Call Us Now",
                "Reference: LEAD-" + lead.getId() + " | support@sashwatinsurance.com");
        sendHtmlEmail(lead.getEmail(), subject, body);
    }

    @Async
    @Override
    public void sendQuoteEmail(String to, String name, PremiumQuoteResponse quote) {
        String subject = "Your Insurance Quote - " + quote.getQuoteReference();
        String body = "<div style='font-family:Arial,sans-serif;max-width:600px'>"
                + "<h2 style='color:#1a3a6b'>Your Premium Quote - " + quote.getQuoteReference() + "</h2>"
                + "<p>Hi " + name + ",</p>"
                + "<p>Here is your personalised insurance premium estimate for <b>" + quote.getProductName() + "</b>:</p>"
                + "<table style='width:100%;border-collapse:collapse;background:#f0f4ff;border-radius:8px;padding:16px'>"
                + "<tr><td style='padding:8px'>Sum Assured</td><td style='padding:8px;font-weight:bold'>" + quote.getCoverageAmountFormatted() + "</td></tr>"
                + "<tr><td style='padding:8px'>Policy Term</td><td style='padding:8px;font-weight:bold'>" + quote.getPolicyTermYears() + " years</td></tr>"
                + "<tr><td style='padding:8px'>Annual Premium</td><td style='padding:8px;font-weight:bold'>" + quote.getAnnualPremiumFormatted() + "</td></tr>"
                + "<tr><td style='padding:8px'>Monthly Premium (incl. GST)</td><td style='padding:8px;font-weight:bold'>&#8377;" + String.format("%,.2f", quote.getMonthlyPremiumWithGst()) + "</td></tr>"
                + "</table>"
                + "<p style='font-size:12px;color:#999'>" + quote.getDisclaimer() + "</p>"
                + "</div>";
        sendHtmlEmail(to, subject, body);
    }

    @Async
    @Override
    public void sendWelcomeEmail(String to, String name) {
        String subject = "Welcome to Sashwat Insurance!";
        String body = buildEmailTemplate("Welcome to Sashwat Insurance!", "Hi " + name + "!",
                "Thank you for choosing Sashwat Insurance. We are committed to protecting you and your family.",
                "http://localhost:3000/products", "Explore Plans",
                "IRDAI Registered | Trusted by thousands of families across India");
        sendHtmlEmail(to, subject, body);
    }

    private void sendHtmlEmail(String to, String subject, String htmlBody) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(fromEmail, fromName);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(message);
            log.info("Email sent to: {} | Subject: {}", to, subject);
        } catch (Exception e) {
            log.error("Failed to send email to {}: {}", to, e.getMessage());
        }
    }

    private String buildEmailTemplate(String heading, String greeting, String body,
                                       String buttonUrl, String buttonText, String footer) {
        return "<div style='font-family:Arial,sans-serif;max-width:600px;margin:0 auto'>"
                + "<div style='background:#1a3a6b;padding:24px;text-align:center'>"
                + "<h1 style='color:white;margin:0'>Sashwat Insurance</h1></div>"
                + "<div style='padding:32px;border:1px solid #e5e7eb'>"
                + "<h2 style='color:#1a3a6b'>" + heading + "</h2>"
                + "<p>" + greeting + "</p>"
                + "<p style='line-height:1.6'>" + body + "</p>"
                + "<div style='text-align:center;margin:32px 0'>"
                + "<a href='" + buttonUrl + "' style='background:#f97316;color:white;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:bold'>"
                + buttonText + "</a></div>"
                + "<hr style='border:none;border-top:1px solid #e5e7eb'>"
                + "<p style='font-size:12px;color:#9ca3af;text-align:center'>" + footer + "</p>"
                + "<p style='font-size:12px;color:#9ca3af;text-align:center'>&#169; 2025 Sashwat Insurance. All rights reserved.</p>"
                + "</div></div>";
    }
}
