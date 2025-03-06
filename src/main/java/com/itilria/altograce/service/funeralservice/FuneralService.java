package com.itilria.altograce.service.funeralservice;

import org.springframework.beans.factory.annotation.Autowired;
import com.itilria.altograce.domain.funeral.Funeral;
import com.itilria.altograce.domain.client.PrimaryClient;
import com.itilria.altograce.domain.Company;
import com.itilria.altograce.domain.UserAuthentication;
import com.itilria.altograce.repository.funeralrepository.FuneralManagementRepository;
import com.itilria.altograce.repository.UserAuthenticationRepository;
import com.itilria.altograce.repository.CompanyRepository;
import com.itilria.altograce.repository.clientrepository.ClientRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class FuneralService{

    @Autowired
    private FuneralManagementRepository funeralRepository;
    @Autowired 
    private CompanyRepository companyRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private UserAuthenticationRepository userAuthRepo;
    

/*-----------------------------------Manage Funeral Data Entry-------------------------------------------*/
    public Funeral addFuneral(long fileId, Funeral funeralData)
    {
        Optional<PrimaryClient> primaryClient = clientRepository.findById(fileId);
        if(!primaryClient.isPresent())
        {
            throw new IllegalArgumentException("No File found for client");
        }
        
        PrimaryClient client = clientRepository.findById(fileId).get();
        Company company = client.getCompany();
        
        
        funeralData.setPrimaryClient(client);
        funeralData.setCompany(company);
        funeralData.setCompanyid(company.getId());
        funeralData.setRecordEntryDate(LocalDate.now());
        return funeralRepository.save(funeralData);
    }
/*__________________________________________________________________________________________________________________________*/    
 
/*------------------------------------------------------Get Upcoming Funerals-----------------------------------------------*/    
    
    public List<Funeral> getUpcomingFuneralsWithinTwoWeeks(String username) {
        
        UserAuthentication userAuth = userAuthRepo.findByUsername(username).get();
        // Retrieve the company entity by ID
        Company company = companyRepository.findById(userAuth.getCompanyId()).orElse(null);
        
        if (company == null) {
            // Handle the case where the company with the given ID does not exist
            return null; 
        }
        // Calculate the date two weeks from today
        LocalDate today = LocalDate.now();
        LocalDate twoWeeksFromNow = today.plusWeeks(2);

        // Retrieve upcoming funerals associated with the company within the specified range
        List<Funeral> upcomingFunerals = funeralRepository.findByCompanyidAndDateOfBurialBetween(company.getId(), today, twoWeeksFromNow);
        
        // Check if there are any upcoming funerals
        if (upcomingFunerals.isEmpty()) {
            return null; // Or you can throw an exception or handle it differently based on your requirements
        }

        return upcomingFunerals;
    }

}