package com.itilria.altograce.service;
/** 
 * @Author Le-Roy
 * @Date 09/01/2024
 * @Description service class handling data transaction
*/
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import com.itilria.altograce.domain.UserAuthentication;
import com.itilria.altograce.repository.UserAuthenticationRepository;

import java.util.List;
import com.itilria.altograce.repository.CompanyRepository;
import com.itilria.altograce.repository.BranchCompanyRepository;
import com.itilria.altograce.exception.CompanyNotFoundException;
import com.itilria.altograce.domain.Company;
import com.itilria.altograce.domain.BranchCompany;

@Service
@Transactional
@RequiredArgsConstructor
public class BranchCompanyService{

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    BranchCompanyRepository branchCompanyRepository;

    //get company branches
    public List<BranchCompany> getCompanyBranches(int id)
    {
        return branchCompanyRepository.findByCompany_Id(id);
    }

    //find company by id
    public BranchCompany addBranchCompany(int id, BranchCompany formData)
    {
        Company company = companyRepository.findById(id).orElse(null);
        if(company != null)
        {
            BranchCompany branchCompany = new BranchCompany();
            branchCompany.setName(formData.getName());
            branchCompany.setContact1(formData.getContact1());
            branchCompany.setContact2(formData.getContact2());
            branchCompany.setContact3(formData.getContact3());
            branchCompany.setCountryCode(formData.getCountryCode());
            branchCompany.setCountry(formData.getCountry());
            branchCompany.setProvince(formData.getProvince());
            branchCompany.setCity(formData.getCity());
            branchCompany.setPostCode(formData.getPostCode());
            branchCompany.setStreet(formData.getStreet());
            branchCompany.setStandUnit(formData.getStandUnit());
            branchCompany.setCompany(company);

            return branchCompanyRepository.save(branchCompany);
        }else{
            return null;
        }
    }

    public BranchCompany updateBranch(int id, BranchCompany formData)
    {
        BranchCompany branch = branchCompanyRepository.findById(id).orElse(null);
        if(branch != null)
        {
            branch.setName(formData.getName());
            branch.setContact1(formData.getContact1());
            branch.setContact2(formData.getContact2());
            branch.setCountry(formData.getCountry());
            branch.setProvince(formData.getProvince());
            branch.setCity(formData.getCity());
            branch.setPostCode(formData.getPostCode());
            branch.setStreet(formData.getStreet());
            branch.setStandUnit(formData.getStandUnit());

            return branchCompanyRepository.save(branch);
        }else{
            return null;
        }

    }


}