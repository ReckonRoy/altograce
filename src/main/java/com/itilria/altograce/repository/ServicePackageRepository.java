package com.itilria.altograce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.ServicePackage;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ServicePackageRepository extends JpaRepository<ServicePackage, Integer>{
    List<ServicePackage> findByCompanyid_Id(int id);
    long countByCompanyid_Id(int id);
    Optional<ServicePackage> findById(int id);
}