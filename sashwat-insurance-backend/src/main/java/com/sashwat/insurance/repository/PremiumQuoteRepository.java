package com.sashwat.insurance.repository;

import com.sashwat.insurance.entity.PremiumQuote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PremiumQuoteRepository extends JpaRepository<PremiumQuote, Long> {

    Optional<PremiumQuote> findByQuoteReference(String quoteReference);

    List<PremiumQuote> findByUserEmail(String email);

    List<PremiumQuote> findByUserId(Long userId);

    List<PremiumQuote> findBySessionId(String sessionId);
}
