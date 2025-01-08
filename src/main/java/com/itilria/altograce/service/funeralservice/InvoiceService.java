package com.itilria.altograce.service.funeralservice;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itilria.altograce.domain.Company;
import com.itilria.altograce.domain.UserAuthentication;
import com.itilria.altograce.domain.funeral.Funeral;
import com.itilria.altograce.domain.funeral.Invoice;
import com.itilria.altograce.repository.CompanyRepository;
import com.itilria.altograce.repository.UserAuthenticationRepository;
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
    @Autowired
    private UserAuthenticationRepository userAuthRepository;

    public Invoice createFuneralInvoice(String identityNumber, String username){

        Optional<Funeral> funeral = funeralRepository.findByIdentityNumber(identityNumber);

        Optional<UserAuthentication> userAuth = userAuthRepository.findByUsername(username);
        if(!userAuth.isPresent())
        {
            throw new IllegalArgumentException("Invalid User");
        }

        // Retrieve the company entity by ID
        Optional<Company> company = companyRepository.findById(userAuth.get().getCompanyId());
        if(!company.isPresent()){
            throw new IllegalArgumentException("User is not registered to this company");
        }
        
        //check if there is an arranged funeral
        if(!funeral.isPresent())
        {
            throw new IllegalStateException("Invoice cannot be matched to any current arranged funeral.");
        }

        //save invoice inorder to get invoice id
        Invoice invoice = new Invoice();
        invoice = invoiceRepository.save(invoice);

        
        if(company.get().getInitials() == null){
            invoice.setInvoiceNumber( "INV-" + company.get().getName() + invoice.getId());
        }else{
            invoice.setInvoiceNumber( "INV- " + company.get().getInitials() + invoice.getId());
        }
        
        Funeral arrangedFuneral =  funeralRepository.findByIdentityNumber(identityNumber).get();
        //set invoice parameters
        invoice.setClientName(arrangedFuneral.getClientName());
        invoice.setInvoiceAmount(arrangedFuneral.getTotalServiceAmount());
        invoice.setInvoiceDeposit(arrangedFuneral.getDeposit());
        invoice.setInvoiceBalance(invoice.getInvoiceAmount().subtract(invoice.getInvoiceDeposit()));
        invoice.setInvoiceDate(arrangedFuneral.getDateOfBurial());
        invoice.setCompanyId(company.get().getId());
        
        if(invoice.getInvoiceBalance().intValue() > 0)
        {
            invoice.setInvoiceStatus("PENDING");
        }else{
            invoice.setInvoiceStatus("COMPLETED");
        }
        return invoiceRepository.save(invoice);
    }
}