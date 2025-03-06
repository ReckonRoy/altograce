package com.itilria.altograce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.itilria.altograce.domain.PremiumPolicy;

@Repository
public interface PremiumPolicyRepository extends JpaRepository<PremiumPolicy, Long>{
    List<PremiumPolicy> findByCompanyid_Id(long id);
    long countByCompanyid_Id(long id);
    Optional<PremiumPolicy> findById(long id);
    @Query("SELECT c FROM Company c WHERE c.id = :packageId")
    Optional<PremiumPolicy> findByPackageId(long packageId);
}