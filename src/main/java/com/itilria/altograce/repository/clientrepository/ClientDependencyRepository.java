package com.itilria.altograce.repository.clientrepository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.itilria.altograce.domain.client.ClientDependency;

public interface ClientDependencyRepository extends JpaRepository<ClientDependency, Long>{
    List<ClientDependency> findByPrimaryClient_Id(long id);
    @Query("SELECT u FROM ClientDependency u WHERE u.id_passport = ?1")
    Optional<ClientDependency> findByPassport(String id_passport);
    int countByPrimaryClient_Id(long id);

}