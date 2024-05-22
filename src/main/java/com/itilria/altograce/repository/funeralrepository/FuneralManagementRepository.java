package com.itilria.altograce.repository.funeralrepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itilria.altograce.domain.funeral.Funeral;

@Repository
public interface FuneralManagementRepository extends JpaRepository<Funeral, Integer> {
    Optional<Funeral> findByIdentityNumber(String identityNumber);
    List<Funeral> findByCompanyidAndDateOfBurialBetween(int id, LocalDate today, LocalDate twoWeeksFromNow);
}
