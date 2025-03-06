package com.itilria.altograce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.AdditionalPolicy;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AdditionalPolicyRepository extends JpaRepository<AdditionalPolicy, Integer>{
    List<AdditionalPolicy> findByCompanyid_Id(int id);
    long countByCompanyid_Id(int id);
    Optional<AdditionalPolicy> findById(int id);
}