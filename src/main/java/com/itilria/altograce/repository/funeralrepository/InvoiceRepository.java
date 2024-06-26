package com.itilria.altograce.repository.funeralrepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itilria.altograce.domain.funeral.Invoice;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
    Optional<Invoice> findByInvoiceNumber(String invoiceNumber);
    List<Invoice> findByCompanyIdAndInvoiceDateBetween(int companyId, LocalDate today, LocalDate twoWeeksFromNow);
}
