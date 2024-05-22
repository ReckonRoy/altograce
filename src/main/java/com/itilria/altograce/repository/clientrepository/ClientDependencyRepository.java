package com.itilria.altograce.repository.clientrepository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.client.ClientDependency;
import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

public interface ClientDependencyRepository extends JpaRepository<ClientDependency, Integer>{
    List<ClientDependency> findByPrimaryClient_Id(int id);
    @Query("SELECT u FROM ClientDependency u WHERE u.id_passport = ?1")
    Optional<ClientDependency> findByPassport(String id_passport);
}