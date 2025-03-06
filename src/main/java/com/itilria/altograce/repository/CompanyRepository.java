package com.itilria.altograce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.itilria.altograce.domain.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long>{
    @Query("SELECT c FROM Company c WHERE c.username = :username")
    Company findByUsername(String username);
    List<Company> findByUsername_Username(String username);
    long countByUsername_Username(String username);
    boolean existsByRegNumber(String regNumber);
    Optional<Company> findById(long id);
}