package com.itilria.altograce.repository.clientrepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.client.PrimaryClient;
import java.util.Optional;
import java.util.List;

public interface ClientRepository extends JpaRepository<PrimaryClient, Integer>{
    Optional<PrimaryClient> findById(int id);
    Optional<PrimaryClient> findByClientid(String clientId);
    Page<PrimaryClient> findByCompanyId_Id(int comId, Pageable pageable);
    Optional<PrimaryClient> findByCellNumber(int contact);
}