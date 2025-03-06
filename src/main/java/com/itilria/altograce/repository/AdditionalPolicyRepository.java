package com.itilria.altograce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.AdditionalPolicy;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AdditionalPolicyRepository extends JpaRepository<AdditionalPolicy, Long>{
    List<AdditionalPolicy> findByCompanyid_Id(long id);
    long countByCompanyid_Id(long id);
    Optional<AdditionalPolicy> findById(long id);
}