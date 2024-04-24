package com.itilria.altograce.repository.funeralrepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itilria.altograce.domain.funeral.Funeral;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface FuneralManagementRepository extends JpaRepository<Funeral, Integer> {
    List<Funeral> findByCompanyidAndDateOfBurialBetween(int id, LocalDate today, LocalDate twoWeeksFromNow);
}
