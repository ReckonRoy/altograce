package com.itilria.altograce.service.funeralservice;

import org.springframework.beans.factory.annotation.Autowired;
import com.itilria.altograce.domain.funeral.Funeral;
import com.itilria.altograce.domain.client.PrimaryClient;
import com.itilria.altograce.domain.Company;
import com.itilria.altograce.repository.funeralrepository.FuneralManagementRepository;
import com.itilria.altograce.repository.CompanyRepository;
import com.itilria.altograce.repository.clientrepository.ClientRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.time.LocalDate;

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

/*-----------------------------------Manage Funeral Data Entry-------------------------------------------*/
    public Funeral addFuneral(String fileId, Funeral funeralData)
    {
        PrimaryClient primaryClient = clientRepository.findByClientid(fileId).orElse(null);
        Company company = primaryClient.getCompany();
        
        if(primaryClient != null)
        {
            funeralData.setPrimaryClient(primaryClient);
            funeralData.setCompany(company);
            funeralData.setRecordEntryDate(LocalDate.now());
            return funeralRepository.save(funeralData);
        }else{
            return null;
        }
    }
/*__________________________________________________________________________________________________________________________*/    
 
/*------------------------------------------------------Get Upcoming Funerals-----------------------------------------------*/    
    
    public List<Funeral> getUpcomingFuneralsWithinTwoWeeks() {
        // Calculate the date two weeks from today
        LocalDate today = LocalDate.now();
        LocalDate twoWeeksFromNow = today.plusWeeks(2);

        // Retrieve upcoming funerals within the specified range
        List<Funeral> upcomingFunerals = funeralRepository.findByDateOfBurialBetween(today, twoWeeksFromNow);
        
        // Check if there are any upcoming funerals
        if (upcomingFunerals.isEmpty()) {
            return null; // Or you can throw an exception or handle it differently based on your requirements
        }

        return upcomingFunerals;
    }

}