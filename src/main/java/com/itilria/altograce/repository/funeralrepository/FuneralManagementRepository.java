package com.itilria.altograce.repository.funeralrepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itilria.altograce.domain.funeral.Funeral;

@Repository
public interface FuneralManagementRepository extends JpaRepository<Funeral, Integer> {
    // You can add custom query methods here if needed
}
