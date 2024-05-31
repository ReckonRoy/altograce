package com.itilria.altograce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.itilria.altograce.domain.ServicePackage;

@Repository
public interface ServicePackageRepository extends JpaRepository<ServicePackage, Integer>{
    List<ServicePackage> findByCompanyid_Id(int id);
    long countByCompanyid_Id(int id);
    Optional<ServicePackage> findById(int id);
    @Query("SELECT c FROM Company c WHERE c.id = :packageId")
    Optional<ServicePackage> findByPackageId(int packageId);
}