package com.itilria.altograce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.Ethics;
import org.springframework.stereotype.Repository;

@Repository
public interface EthicsRepository extends JpaRepository<Ethics, Long>{

}