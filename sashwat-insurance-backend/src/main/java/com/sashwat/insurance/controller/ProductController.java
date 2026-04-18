package com.sashwat.insurance.controller;

import com.sashwat.insurance.dto.response.ApiResponse;
import com.sashwat.insurance.entity.InsuranceProduct;
import com.sashwat.insurance.service.impl.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@Tag(name = "Products", description = "Insurance product catalog")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    @Operation(summary = "Get all active insurance products")
    public ResponseEntity<ApiResponse<List<InsuranceProduct>>> getAllProducts() {
        return ResponseEntity.ok(ApiResponse.success(productService.getAllActiveProducts()));
    }

    @GetMapping("/featured")
    @Operation(summary = "Get featured products for homepage")
    public ResponseEntity<ApiResponse<List<InsuranceProduct>>> getFeaturedProducts() {
        return ResponseEntity.ok(ApiResponse.success(productService.getFeaturedProducts()));
    }

    @GetMapping("/type/{type}")
    @Operation(summary = "Get products by type")
    public ResponseEntity<ApiResponse<List<InsuranceProduct>>> getByType(@PathVariable InsuranceProduct.ProductType type) {
        return ResponseEntity.ok(ApiResponse.success(productService.getProductsByType(type)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID")
    public ResponseEntity<ApiResponse<InsuranceProduct>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(productService.getProductById(id)));
    }

    @GetMapping("/slug/{slug}")
    @Operation(summary = "Get product by URL slug")
    public ResponseEntity<ApiResponse<InsuranceProduct>> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.success(productService.getProductBySlug(slug)));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "[ADMIN] Create a new product")
    public ResponseEntity<ApiResponse<InsuranceProduct>> createProduct(@RequestBody InsuranceProduct product) {
        return ResponseEntity.status(201)
                .body(ApiResponse.success("Product created successfully", productService.createProduct(product)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "[ADMIN] Update an existing product")
    public ResponseEntity<ApiResponse<InsuranceProduct>> updateProduct(@PathVariable Long id, @RequestBody InsuranceProduct product) {
        return ResponseEntity.ok(ApiResponse.success("Product updated", productService.updateProduct(id, product)));
    }

    @PatchMapping("/{id}/toggle-status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "[ADMIN] Toggle product active/inactive status")
    public ResponseEntity<ApiResponse<Void>> toggleStatus(@PathVariable Long id) {
        productService.toggleProductStatus(id);
        return ResponseEntity.ok(ApiResponse.success("Product status updated", null));
    }
}
