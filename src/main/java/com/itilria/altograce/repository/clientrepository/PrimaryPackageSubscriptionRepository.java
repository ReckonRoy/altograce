package com.itilria.altograce.repository.clientrepository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.client.PrimaryPackageSubscription;
import java.util.Optional;
import java.util.List;

public interface PrimaryPackageSubscriptionRepository extends JpaRepository<PrimaryPackageSubscription, Integer>{
    Optional<PrimaryPackageSubscription> findById(int id);
    Optional<PrimaryPackageSubscription> findByPrimaryClient_Clientid(String clientId);
}