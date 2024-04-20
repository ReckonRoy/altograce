package com.itilria.altograce.repository.clientrepository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.client.Deceased;
import java.util.Optional;
import java.util.List;

public interface DeceasedRepository extends JpaRepository<Deceased, Integer>{
    List<Deceased> findByPrimaryClient_Id(int id);
}