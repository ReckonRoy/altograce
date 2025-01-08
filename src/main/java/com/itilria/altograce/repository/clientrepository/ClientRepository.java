package com.itilria.altograce.repository.clientrepository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.itilria.altograce.domain.client.PrimaryClient;

public interface ClientRepository extends JpaRepository<PrimaryClient, Long>{
    Optional<PrimaryClient> findById(long id);
    Optional<PrimaryClient> findByClientid(String clientId);
    Page<PrimaryClient> findByCompanyId_Id(long comId, Pageable pageable);
    Optional<PrimaryClient> findByCellNumber(long contact);
    @Query("SELECT u FROM PrimaryClient u WHERE u.id_passport = ?1")
    Optional<PrimaryClient> findByIdPassport(String idPassport);
    boolean existsByClientid(String fileId);
    void deleteByClientid(String fileId);
}