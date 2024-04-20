package com.itilria.altograce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.StaffAuditing;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffAuditingRepository extends JpaRepository<StaffAuditing, Integer>{
}