package com.itilria.altograce.service;
/** 
 * @Author Le-Roy
 * @Date 12/6/2023
 * @Description service class handling data transaction
*/
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import com.itilria.altograce.repository.CompanyRepository;
import com.itilria.altograce.exception.CompanyNotFoundException;
import com.itilria.altograce.domain.Company;
import com.itilria.altograce.repository.EthicsRepository;
import com.itilria.altograce.domain.Ethics;

@Service
@Transactional
@RequiredArgsConstructor
public class CompanyService
{
    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private EthicsRepository ethicsRepository;

    //find company by id
    public Company findById(int id)
    {
        if(companyRepository.findById(id).isPresent())
        {
            return companyRepository.findById(id).get();
        }else{
            throw new CompanyNotFoundException("Company does not exist");
        }
    }

    //update company details
    public Company updateCompany(int id, Company companyForm)
    {
        Company company = companyRepository.findById(id).orElse(null);
        if(company != null)
        {
            company.setCountry(companyForm.getCountry());
            company.setProvince(companyForm.getProvince());
            company.setCity(companyForm.getCity());
            company.setPostCode(companyForm.getPostCode());
            company.setStreet(companyForm.getStreet());
            company.setStandUnit(companyForm.getStandUnit());
            
            return companyRepository.save(company);
        }else{
            return null;
        }
    }

    public void saveCompany(Company companyForm)
    {
        Company company = companyForm;
        companyRepository.save(company);
    }

    public void saveEthics(int id, Ethics ethicsData)
    {
        Company company = companyRepository.findById(id).orElse(null);
        if(company != null)
        {
            Ethics ethics = new Ethics();
            ethics.setEthics(ethicsData.getEthics());
            ethics.setCompany(company);
            ethicsRepository.save(ethics); 
        }
    }

    public List<Company> findCompaniesByUsername(String username)
    {
        //if user is not associated with any comapny, inform them to register their company
        if(isCompanyAssociatedWithUser(username))
        {
            throw new CompanyNotFoundException("No companies registered yet!."); 
        }

        return companyRepository.findByUsername_Username(username);
    }

    public List<Company> getCompanies(String username)
    {
        //if user is not associated with any comapny, inform them to register their company
        if(isCompanyAssociatedWithUser(username))
        {
            throw new CompanyNotFoundException("Your company details will appear here! Once you have registered. Please kindly proceed to registering your company."); 
        }

        return companyRepository.findByUsername_Username(username);
    } 

    //check if this user is associated with any company
    public boolean isCompanyAssociatedWithUser(String username)
    {
        long count = companyRepository.countByUsername_Username(username);
        return count < 1; 
    }

    //check if company already exists by regNumber
    public boolean alreadyExists(String regNumber)
    {
        return companyRepository.existsByRegNumber(regNumber);
    }
}