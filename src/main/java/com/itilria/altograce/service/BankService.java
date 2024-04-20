package com.itilria.altograce.service;

import org.springframework.beans.factory.annotation.Autowired;
import com.itilria.altograce.domain.Bank;
import com.itilria.altograce.domain.Company;
import com.itilria.altograce.repository.BankRepository;
import com.itilria.altograce.repository.CompanyRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class BankService{
    @Autowired
    private BankRepository repository;
    @Autowired
    private CompanyRepository companyRepository;

    public Bank findById(int id)
    {
        return repository.findById(id).orElse(null);
    }

    public void addCompanyBankingDetails(int id, Bank bankData)
    {
        Company company = companyRepository.findById(id).orElse(null);
        if(company != null)
        {
            Bank bank = new Bank();
            bank.setBankName(bankData.getBankName());
            bank.setAccountName(bankData.getAccountName());
            bank.setAccount(bankData.getAccount());
            bank.setCompany(company);
            repository.save(bank); 
        }
    }

}