package com.itilria.altograce.service.funeralservice;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itilria.altograce.domain.Company;
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

    public Invoice createFuneralInvoice(String identityNumber, String username, Invoice invoiceData){
        Optional<Funeral> funeral = funeralRepository.findByIdentityNumber(identityNumber);
        //check if there is an arranged funeral
        if(!funeral.isPresent())
        {
            throw new IllegalStateException("Invalid FileID");
        }

        //save invoice inorder to get invoice id
        invoiceData = invoiceRepository.save(invoiceData);

        //Get company intials, if not available use company full name
        Company company = companyRepository.findByUsername(username);
        if(company.getInitials() == null){
            invoiceData.setInvoiceNumber(company.getName() + invoiceData.getId());
        }else{
            invoiceData.setInvoiceNumber(company.getInitials() + invoiceData.getId());
        }
        
        Funeral arrangedFuneral =  funeralRepository.findByIdentityNumber(identityNumber).get();
        //set invoice parameters
        invoiceData.setInvoiceDate(LocalDate.now());
        invoiceData.setClientName(arrangedFuneral.getClientName());
        invoiceData.setInvoiceAmount(arrangedFuneral.getTotalServiceAmount());
        return invoiceRepository.save(invoiceData);
    }
}