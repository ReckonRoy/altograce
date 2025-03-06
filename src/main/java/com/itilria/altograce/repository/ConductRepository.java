package com.itilria.altograce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.CodeOfConduct;
import org.springframework.stereotype.Repository;

@Repository
public interface ConductRepository extends JpaRepository<CodeOfConduct, Long>{

}