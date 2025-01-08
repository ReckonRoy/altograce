package com.itilria.altograce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itilria.altograce.domain.EmployeeLeave;
import java.util.List;

public interface VacationRepository extends JpaRepository<EmployeeLeave, Long> {
    List<EmployeeLeave> findByEmployee_Id(long id);
}