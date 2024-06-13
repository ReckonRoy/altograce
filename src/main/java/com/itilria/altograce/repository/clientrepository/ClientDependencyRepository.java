package com.itilria.altograce.repository.clientrepository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.itilria.altograce.domain.client.ClientDependency;

public interface ClientDependencyRepository extends JpaRepository<ClientDependency, Integer>{
    List<ClientDependency> findByPrimaryClient_Id(int id);
    @Query("SELECT u FROM ClientDependency u WHERE u.id_passport = ?1")
    Optional<ClientDependency> findByPassport(String id_passport);
}