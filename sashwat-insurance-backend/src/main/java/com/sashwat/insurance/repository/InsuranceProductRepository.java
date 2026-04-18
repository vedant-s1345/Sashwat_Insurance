package com.sashwat.insurance.repository;

import com.sashwat.insurance.entity.InsuranceProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InsuranceProductRepository extends JpaRepository<InsuranceProduct, Long> {

    Optional<InsuranceProduct> findBySlug(String slug);

    List<InsuranceProduct> findByIsActiveTrue();

    List<InsuranceProduct> findByProductTypeAndIsActiveTrue(InsuranceProduct.ProductType productType);

    List<InsuranceProduct> findByIsFeaturedTrueAndIsActiveTrue();

    Boolean existsBySlug(String slug);
}
