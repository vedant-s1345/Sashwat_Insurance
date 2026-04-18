package com.sashwat.insurance.service.impl;

import com.sashwat.insurance.entity.InsuranceProduct;
import com.sashwat.insurance.exception.BadRequestException;
import com.sashwat.insurance.exception.ResourceNotFoundException;
import com.sashwat.insurance.repository.InsuranceProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {

    private static final Logger log = LoggerFactory.getLogger(ProductService.class);

    private final InsuranceProductRepository productRepository;

    public ProductService(InsuranceProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<InsuranceProduct> getAllActiveProducts() {
        return productRepository.findByIsActiveTrue();
    }

    public List<InsuranceProduct> getFeaturedProducts() {
        return productRepository.findByIsFeaturedTrueAndIsActiveTrue();
    }

    public List<InsuranceProduct> getProductsByType(InsuranceProduct.ProductType type) {
        return productRepository.findByProductTypeAndIsActiveTrue(type);
    }

    public InsuranceProduct getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public InsuranceProduct getProductBySlug(String slug) {
        return productRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + slug));
    }

    @Transactional
    public InsuranceProduct createProduct(InsuranceProduct product) {
        if (productRepository.existsBySlug(product.getSlug())) {
            throw new BadRequestException("A product with this slug already exists: " + product.getSlug());
        }
        InsuranceProduct saved = productRepository.save(product);
        log.info("Product created: {} ({})", saved.getName(), saved.getSlug());
        return saved;
    }

    @Transactional
    public InsuranceProduct updateProduct(Long id, InsuranceProduct updated) {
        InsuranceProduct existing = getProductById(id);
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setKeyBenefits(updated.getKeyBenefits());
        existing.setMinCoverageAmount(updated.getMinCoverageAmount());
        existing.setMaxCoverageAmount(updated.getMaxCoverageAmount());
        existing.setMinTerm(updated.getMinTerm());
        existing.setMaxTerm(updated.getMaxTerm());
        existing.setMinEntryAge(updated.getMinEntryAge());
        existing.setMaxEntryAge(updated.getMaxEntryAge());
        existing.setBasePremiumRatePerLakh(updated.getBasePremiumRatePerLakh());
        existing.setIsFeatured(updated.getIsFeatured());
        existing.setIsActive(updated.getIsActive());
        existing.setBrochureUrl(updated.getBrochureUrl());
        existing.setIconUrl(updated.getIconUrl());
        return productRepository.save(existing);
    }

    @Transactional
    public void toggleProductStatus(Long id) {
        InsuranceProduct product = getProductById(id);
        product.setIsActive(!product.getIsActive());
        productRepository.save(product);
        log.info("Product {} status toggled to: {}", product.getName(), product.getIsActive());
    }
}
