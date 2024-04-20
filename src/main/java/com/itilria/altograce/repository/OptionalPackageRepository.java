package com.itilria.altograce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.OptionalPackage;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface OptionalPackageRepository extends JpaRepository<OptionalPackage, Integer>{
    List<OptionalPackage> findByCompanyid_Id(int id);
    long countByCompanyid_Id(int id);
    Optional<OptionalPackage> findById(int id);
}