package com.itilria.altograce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.ProductItem;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductItemRepository extends JpaRepository<ProductItem, Integer>{
    long countByServicePackage_Id(int id);
    long countByOptionalPackage_Id(int id);
    List<ProductItem> findByServicePackage_Id(int id);
    List<ProductItem> findByOptionalPackage_Id(int id);
    Optional<ProductItem> findById(int id);
}