package com.itilria.altograce.service;

import org.springframework.beans.factory.annotation.Autowired;
import com.itilria.altograce.domain.ServiceLevelAgreement;
import com.itilria.altograce.domain.Company;
import com.itilria.altograce.repository.SlaRepository;
import com.itilria.altograce.repository.CompanyRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class SlaService{
    @Autowired
    private SlaRepository repository;
    @Autowired
    private CompanyRepository companyRepository;

    public ServiceLevelAgreement findById(long id)
    {
        return repository.findById(id).orElse(null);
    }

    public void addCompanySla(long id, ServiceLevelAgreement slaData)
    {
        Company company = companyRepository.findById(id).orElse(null);
        if(company != null)
        {
            ServiceLevelAgreement sla = new ServiceLevelAgreement();
            sla.setSla(slaData.getSla());
            sla.setCompany(company);
            repository.save(sla); 
        }
    }

}