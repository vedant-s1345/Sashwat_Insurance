package com.sashwat.insurance.controller;

import com.sashwat.insurance.dto.request.PremiumCalculatorRequest;
import com.sashwat.insurance.dto.response.ApiResponse;
import com.sashwat.insurance.dto.response.PremiumQuoteResponse;
import com.sashwat.insurance.service.impl.PremiumCalculatorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/calculator")
@Tag(name = "Premium Calculator", description = "Calculate insurance premiums instantly")
public class PremiumCalculatorController {

    private final PremiumCalculatorService calculatorService;

    public PremiumCalculatorController(PremiumCalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    @PostMapping("/calculate")
    @Operation(summary = "Calculate premium based on age, coverage, term, health status")
    public ResponseEntity<ApiResponse<PremiumQuoteResponse>> calculate(@Valid @RequestBody PremiumCalculatorRequest request) {
        PremiumQuoteResponse quote = calculatorService.calculate(request);
        return ResponseEntity.ok(ApiResponse.success("Premium calculated successfully", quote));
    }

    @GetMapping("/quote/{reference}")
    @Operation(summary = "Retrieve a previously generated quote by reference number")
    public ResponseEntity<ApiResponse<PremiumQuoteResponse>> getQuote(@PathVariable String reference) {
        PremiumQuoteResponse quote = calculatorService.getQuoteByReference(reference);
        return ResponseEntity.ok(ApiResponse.success(quote));
    }
}
