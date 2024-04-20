package com.itilria.altograce.repository.clientrepository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.client.ClientDependency;
import java.util.Optional;
import java.util.List;

public interface ClientDependencyRepository extends JpaRepository<ClientDependency, Integer>{
    List<ClientDependency> findByPrimaryClient_Id(int id);
}