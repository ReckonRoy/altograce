package com.itilria.altograce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.ServiceLevelAgreement;
import org.springframework.stereotype.Repository;

@Repository
public interface SlaRepository extends JpaRepository<ServiceLevelAgreement, Integer>{

}