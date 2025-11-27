package com.itilria.altograce.repository.clientrepository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.itilria.altograce.domain.client.PrimaryClient;

import jakarta.transaction.Transactional;

public interface ClientRepository extends JpaRepository<PrimaryClient, Long>{
    Optional<PrimaryClient> findById(long id);
    Page<PrimaryClient> findByCompanyId_Id(long comId, Pageable pageable);
    Optional<PrimaryClient> findByPhoneContact1(String contact);
    @Query("SELECT u FROM PrimaryClient u WHERE u.id_passport = ?1")
    Optional<PrimaryClient> findByIdPassport(String idPassport);
    boolean existsById(long fileId);
    void deleteById(long fileId);
    
    @Modifying
    @Transactional
    @Query("""
        UPDATE PrimaryClient p 
        SET p.dob = :dob, 
            p.address = :address, 
            p.phoneContact1 = :phoneContact1, 
            p.id_passport = :id_passport
        WHERE p.id = :fileId
    """)
    int updatePrimaryClientById(
        @Param("dob") LocalDate dob,
        @Param("id_passport") String id_passport,
        @Param("phoneContact1") String phoneContact1,
        @Param("address") String address,
        @Param("fileId") Long fileId
    );
}