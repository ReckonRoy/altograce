package com.itilria.altograce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.ProductService;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductServiceRepository extends JpaRepository<ProductService, Integer>{
    long countByServicePackage_Id(int id);
    long countByOptionalPackage_Id(int id);
    List<ProductService> findByServicePackage_Id(int id);
    List<ProductService> findByOptionalPackage_Id(int id);
    Optional<ProductService> findById(int id);
}