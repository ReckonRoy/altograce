package com.itilria.altograce.repository.clientrepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itilria.altograce.domain.client.ClientBilling;

public interface ClientBillingRepository extends JpaRepository<ClientBilling, Long>{
    List<ClientBilling> findByPrimaryClient_Id(long id);
}