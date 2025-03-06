package com.itilria.altograce.repository.clientrepository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itilria.altograce.domain.client.Deceased;

public interface DeceasedRepository extends JpaRepository<Deceased, Integer>{
    List<Deceased> findByPrimaryClient_Id(int id);
    Optional<Deceased> findByBiNumberAndGraveNumber(String biNumber, String graveNumber);
}