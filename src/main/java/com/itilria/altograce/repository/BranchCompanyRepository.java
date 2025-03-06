package com.itilria.altograce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.BranchCompany;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BranchCompanyRepository extends JpaRepository<BranchCompany, Long>{
    List<BranchCompany> findByCompany_Id(long id);
    Optional<BranchCompany> findById(long id);
}