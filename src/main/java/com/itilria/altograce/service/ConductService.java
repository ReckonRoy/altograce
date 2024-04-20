package com.itilria.altograce.service;

import org.springframework.beans.factory.annotation.Autowired;
import com.itilria.altograce.domain.CodeOfConduct;
import com.itilria.altograce.domain.Company;
import com.itilria.altograce.repository.ConductRepository;
import com.itilria.altograce.repository.CompanyRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ConductService{
    @Autowired
    private ConductRepository repository;
    @Autowired
    private CompanyRepository companyRepository;

    public CodeOfConduct findById(int id)
    {
        return repository.findById(id).orElse(null);
    }

    public void addCodeOfConduct(int id, CodeOfConduct cocData)
    {
        Company company = companyRepository.findById(id).orElse(null);
        if(company != null)
        {
            CodeOfConduct coc = new CodeOfConduct();
            coc.setCocDocument(cocData.getCocDocument());
            coc.setCompany(company);
            repository.save(coc); 
        }
    }

}