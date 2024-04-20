package com.itilria.altograce.repository.clientrepository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.client.SecondaryPackageSubscription;
import java.util.Optional;
import java.util.List;

public interface SecondaryPackageRepository extends JpaRepository<SecondaryPackageSubscription, Integer>{
    //Optional<PrimaryPackageSubscription> findById(int id);
    //List<PrimaryPackageSubscription> findByPrimaryClient_Clientid(String clientId);
}