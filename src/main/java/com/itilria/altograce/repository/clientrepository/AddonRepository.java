package com.itilria.altograce.repository.clientrepository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.itilria.altograce.domain.client.Addon;

public interface AddonRepository extends JpaRepository<Addon, Long>{
   
    int countByPolicyHolder_Id(long clientId);
    List<Addon> findByPolicyHolder_IdAndIsPrimaryClient(long clientId, boolean isPrimaryClient);

}