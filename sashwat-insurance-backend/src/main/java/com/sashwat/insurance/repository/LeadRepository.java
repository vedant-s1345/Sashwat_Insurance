package com.sashwat.insurance.repository;

import com.sashwat.insurance.entity.Lead;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {

    Page<Lead> findAllByOrderByCreatedAtDesc(Pageable pageable);

    Page<Lead> findByStatus(Lead.LeadStatus status, Pageable pageable);

    Page<Lead> findByLeadType(Lead.LeadType leadType, Pageable pageable);

    List<Lead> findByEmail(String email);

    List<Lead> findByPhone(String phone);

    List<Lead> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT COUNT(l) FROM Lead l WHERE l.status = :status")
    Long countByStatus(Lead.LeadStatus status);

    @Query("SELECT COUNT(l) FROM Lead l WHERE l.createdAt >= :since")
    Long countLeadsSince(LocalDateTime since);
}
