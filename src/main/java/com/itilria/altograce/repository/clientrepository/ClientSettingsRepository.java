package com.itilria.altograce.repository.clientrepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.client.ClientSettings;
import java.util.Optional;
import java.util.List;

public interface ClientSettingsRepository extends JpaRepository<ClientSettings, Long>{
    Optional<ClientSettings> findByCompany_Id(long comId);
}