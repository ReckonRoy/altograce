package com.itilria.altograce.repository.clientrepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itilria.altograce.domain.client.ClientBilling;

public interface ClientBillingRepository extends JpaRepository<ClientBilling, Integer>{
    List<ClientBilling> findByPrimaryClient_Id(int id);
}