package com.itilria.altograce.repository.clientrepository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.client.ClientBilling;
import java.util.Optional;
import java.util.List;

public interface ClientBillingRepository extends JpaRepository<ClientBilling, Integer>{
    List<ClientBilling> findByPrimaryClient_Id(int id);
}