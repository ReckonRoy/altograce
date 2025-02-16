package com.itilria.altograce.repository.clientrepository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.client.PrimaryPackageSubscription;
import java.util.Optional;
import java.util.List;

public interface PrimaryPackageSubscriptionRepository extends JpaRepository<PrimaryPackageSubscription, Long>{
    Optional<PrimaryPackageSubscription> findById(long id);
    Optional<PrimaryPackageSubscription> findByPrimaryClient_Id(long clientId);
}