package com.itilria.altograce.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.itilria.altograce.domain.Company;
import com.itilria.altograce.domain.UserAuthentication;
import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer>{
    //Company findByUsername_Username(String username);
    List<Company> findByUsername_Username(String username);
    long countByUsername_Username(String username);
    boolean existsByRegNumber(String regNumber);
    Optional<Company> findById(int id);
}