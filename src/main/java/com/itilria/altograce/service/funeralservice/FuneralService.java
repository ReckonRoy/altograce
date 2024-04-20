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
    private ClientRepository clientRepository;

/*-----------------------------------Manage Funeral Data Entry-------------------------------------------*/
    public Funeral addFuneral(String fileId, Funeral funeralData)
    {
        PrimaryClient primaryClient = clientRepository.findByClientid(fileId).orElse(null);
        if(primaryClient != null)
        {
            funeralData.setPrimaryClient(primaryClient);
            funeralData.setRecordEntryDate(LocalDate.now());
            return funeralRepository.save(funeralData);
        }else{
            return null;
        }
    }

}