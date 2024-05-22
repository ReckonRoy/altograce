package com.itilria.altograce.service.funeralservice;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itilria.altograce.domain.funeral.Funeral;
import com.itilria.altograce.domain.funeral.Invoice;
import com.itilria.altograce.repository.CompanyRepository;
import com.itilria.altograce.repository.funeralrepository.FuneralManagementRepository;
import com.itilria.altograce.repository.funeralrepository.InvoiceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class InvoiceService{
    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private FuneralManagementRepository funeralRepository;

    @Autowired
    private CompanyRepository companyRepository;

    public Invoice createMemberInvoice(String identityNumber, Invoice invoiceData){
        Optional<Funeral> funeral = funeralRepository.findByIdentityNumber(identityNumber);
        //check if there is an arranged funeral
        if(!funeral.isPresent())
        {
            throw new IllegalStateException("Invalid FileID");
        }

        Funeral arrangedFuneral =  funeralRepository.findByIdentityNumber(identityNumber).get();
        return invoiceRepository.save(invoiceData);
    }
}