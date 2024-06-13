package com.itilria.altograce.service.clientservice;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itilria.altograce.domain.Company;
import com.itilria.altograce.domain.ServicePackage;
import com.itilria.altograce.domain.StaffAuditing;
import com.itilria.altograce.domain.client.ClientBilling;
import com.itilria.altograce.domain.client.ClientDependency;
import com.itilria.altograce.domain.client.ClientSettings;
import com.itilria.altograce.domain.client.Deceased;
import com.itilria.altograce.domain.client.PrimaryClient;
import com.itilria.altograce.domain.client.PrimaryPackageSubscription;
import com.itilria.altograce.repository.CompanyRepository;
import com.itilria.altograce.repository.ServicePackageRepository;
import com.itilria.altograce.repository.StaffAuditingRepository;
import com.itilria.altograce.repository.clientrepository.ClientBillingRepository;
import com.itilria.altograce.repository.clientrepository.ClientDependencyRepository;
import com.itilria.altograce.repository.clientrepository.ClientRepository;
import com.itilria.altograce.repository.clientrepository.ClientSettingsRepository;
import com.itilria.altograce.repository.clientrepository.DeceasedRepository;
import com.itilria.altograce.repository.clientrepository.PrimaryPackageSubscriptionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ClientService{

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private PrimaryPackageSubscriptionRepository primaryPackSubRep;
    @Autowired
    private ClientDependencyRepository dependencyRepository;
    @Autowired
    private StaffAuditingRepository staffAuditRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private ClientBillingRepository clientBillingRepository;
    @Autowired
    private ClientSettingsRepository clientSettingsRepository;
    @Autowired
    private DeceasedRepository deceasedRepository;
    @Autowired
    private ServicePackageRepository servicePackageRepository;

/*--------------------------------Primary Client Section----------------------------------------------*/
    //Register Client
    public PrimaryClient registerClient(int companyId, PrimaryClient clientData) throws Exception{
        Company company = companyRepository.findById(companyId).orElse(null);
        
        Optional<ClientSettings> optionalClientSettings = clientSettingsRepository.findByCompany_Id(companyId);
        if (!optionalClientSettings.isPresent()) {
            throw new IllegalArgumentException("No client settings found for provided companyId");
        }

        ClientSettings clientSettings = optionalClientSettings.get();

        if(company != null)
        {
            //save empty client object, inorder to get id
            PrimaryClient client = new PrimaryClient();
            client = clientRepository.save(client);
            

            client.setCompany(company);
            client.setClientId(company.getInitials(), client.getId());
            client.setRecordEntryDate(LocalDate.now());
            client.setTitle(clientData.getTitle());
            client.setName(clientData.getName());
            client.setLastName(clientData.getLastName());
            client.setInitials(clientData.getInitials());
            client.setId_passport(clientData.getId_passport());
            client.setGender(clientData.getGender());
            client.setMaritalStatus(clientData.getMaritalStatus());
            client.setEmail(clientData.getEmail());
            client.setCountryCode(clientData.getCountryCode());
            client.setCellNumber(clientData.getCellNumber());
            client.setHomeNumber(clientData.getHomeNumber());
            client.setTelephone(clientData.getTelephone());
        
            client.setCountry(clientData.getCountry());
            client.setProvince(clientData.getProvince());
            client.setCity(clientData.getCity());
            client.setPostCode(clientData.getPostCode());
            client.setStreet(clientData.getStreet());
            client.setStandUnit(clientData.getStandUnit());


            if(clientData.getDob() != null){
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
                String formattedDate = clientData.getDob().format(formatter);
                client.setDob(LocalDate.parse(formattedDate, formatter));
            }

            if(clientData.getDateOfCover() != null)
            {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
                String formattedDateOfCover = clientData.getDateOfCover().format(formatter);
                client.setDateOfCover(LocalDate.parse(formattedDateOfCover, formatter));
                
            }else{
                client.setDateOfCover(LocalDate.now());
            }
            client.setActivationStatus(this.handleAccountActivation(clientData.getDateOfCover(), clientSettings.getWaitingPeriod()));
            
            //save and return saved object
            return clientRepository.save(client);
        }else{
            return null;
        }
    }

    //Get All Clients
    public Page<PrimaryClient> getClients(int comId, int page, int size) {
        Company company = companyRepository.findById(comId).orElse(null);

        if(company != null)
        {
            return clientRepository.findByCompanyId_Id(comId, PageRequest.of(page, size));
        }else{
            return null;
        }
    }

/*----------------------------------Staff Auditing Section-----------------------------------------------*/
    //Audit User Actions
    public void staffAudit(String staffAction, int companyId, String clientId, int staffId)
    {
        StaffAuditing staffAudit = new StaffAuditing();
        staffAudit.setStaffAction(staffAction);
        staffAudit.setCompanyId(companyId);
        staffAudit.setStaffId(staffId);
        staffAudit.setClientId(clientId);
        staffAudit.setRecordEntryDate(LocalDate.now());
        staffAuditRepository.save(staffAudit);
    }
/*------------------------------------PrimarySubscription Section----------------------------------------*/
    //Add primary subscription
    public PrimaryPackageSubscription addPrimarySubscription(PrimaryPackageSubscription primarySubscription)
    {
        primarySubscription.setRecordEntryDate(LocalDate.now());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String formattedDate = primarySubscription.getDateOfCover().format(formatter);
        primarySubscription.setDateOfCover(LocalDate.parse(formattedDate, formatter));
        
        return primaryPackSubRep.save(primarySubscription);
    }

    //Get Primary subscription
    public Map<String, String> getSubscriptionPlan(String clientId)
    {
        PrimaryClient primaryClient = clientRepository.findByClientid(clientId).orElse(null);
        if(primaryClient != null)
        {
            PrimaryPackageSubscription subscriptionResult = primaryPackSubRep.findByPrimaryClient_Clientid(clientId).orElse(null);
            ServicePackage servicePackageResult = servicePackageRepository.findById(subscriptionResult.getPackageId()).orElse(null);
            Map<String, String> subscriptionMap = new HashMap<>();
            subscriptionMap.put("name", servicePackageResult.getPackageName());
            subscriptionMap.put("dateOfCover", subscriptionResult.getDateOfCover().toString());
            subscriptionMap.put("groupName", subscriptionResult.getGroupName());
            subscriptionMap.put("joiningFee", subscriptionResult.getJoiningFee().toString());
            String packageId = Integer.toString(subscriptionResult.getId()) ;
            subscriptionMap.put("packageId", packageId);
            return subscriptionMap;
        }else{
            return null;
        }
    }
/*-------------------------------------------------------------------------------------------------------*/    
/*
    public List<PrimaryPackageSubscription> getPackageSubscription(String clientId)
    {
        List<PrimaryPackageSubscription> subscription = primaryPackSubRep.findByPrimaryClient_Clientid(clientId);
        return subscription;
    }
*/
/*-------------------------------Dependency Section------------------------------------------*/
    //Add Dependency
    public ClientDependency addDependency(String clientId, ClientDependency depForm)
    {
        //check if PrimaryClient exists
        PrimaryClient primaryClient = clientRepository.findByClientid(clientId).orElse(null);
        Company company = primaryClient.getCompany();
        Optional<ClientSettings> optionalClientSettings = clientSettingsRepository.findByCompany_Id(company.getId());
        if (!optionalClientSettings.isPresent()) {
            throw new IllegalArgumentException("No client settings found for provided companyId");
        }
        
        if(dependencyRepository.findByPassport(depForm.getId_passport()).isPresent()){
            throw new IllegalArgumentException("This dependent already exists");
        }

        ClientSettings clientSettings = optionalClientSettings.get();

        if(primaryClient != null)
        {
            ClientDependency regDep = new ClientDependency();
            regDep.setName(depForm.getName());
            regDep.setLastName(depForm.getLastName());
            regDep.setRelationship(depForm.getRelationship());
            regDep.setGender(depForm.getGender());
            regDep.setId_passport(depForm.getId_passport());
            if(depForm.getDob() != null){
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
                String formattedDate = depForm.getDob().format(formatter);
                regDep.setDob(LocalDate.parse(formattedDate, formatter));
            }
            if(depForm.getDateOfCover() != null)
            {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
                String formattedDateOfCover = depForm.getDateOfCover().format(formatter);
                regDep.setDateOfCover(LocalDate.parse(formattedDateOfCover, formatter));
            }else{
                regDep.setDateOfCover(LocalDate.now());
            }
            regDep.setPrimaryClient(primaryClient);

            regDep.setActivationStatus(this.handleAccountActivation(regDep.getDateOfCover(), clientSettings.getWaitingPeriod()));

            return dependencyRepository.save(regDep);
        }else{
            return null;
        }
    }

    //Get Dependencies
    public List<ClientDependency> getDependencies(String clientId)
    {
        PrimaryClient primaryClient = clientRepository.findByClientid(clientId).orElse(null);

        if(primaryClient != null)
        {
            List<ClientDependency> dependencyResult = dependencyRepository.findByPrimaryClient_Id(primaryClient.getId());
            return dependencyResult;
        }else{
            return null;
        }
    }

    //Remove dependent
    public boolean removeDependent(int id, String clientid)
    {
        //check if primary client exists
        PrimaryClient primaryClient = clientRepository.findByClientid(clientid).orElse(null);
        if(primaryClient != null)
        {
            try {
                dependencyRepository.deleteById(id);
                return true; // Deletion succeeded
            } catch (Exception e) {
                // Handle any exception that might occur during deletion
                e.printStackTrace(); // Or log the exception
                return false; // Deletion failed
            }
        }else{
            return false;
        }

    }

/*----------------------------------Client Settings-------------------------------------------*/
    public ClientSettings addSettings(int comId, int waitingPeriod)
    {
        //check if company is not null
        Company company = companyRepository.findById(comId).orElse(null);

        if(company != null)
        {
            ClientSettings clientSettings = new ClientSettings();
            clientSettings.setWaitingPeriod(waitingPeriod);
            clientSettings.setCompany(company);
            return clientSettingsRepository.save(clientSettings);
        }else{
            return null;
        }
    }     

/*-------------------------------Billing Section------------------------------------------*/
    //Client makes payment
    public ClientBilling billClient(String clientId, ClientBilling billingData)
    {
        //check if PrimaryClient exists
        PrimaryClient primaryClient = clientRepository.findByClientid(clientId).orElse(null);
        if(primaryClient != null)
        {
            if(billingData.getPaymentDate() != null){
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
                String formattedDate = billingData.getPaymentDate().format(formatter);
                billingData.setPaymentDate(LocalDate.parse(formattedDate, formatter));
            }
            billingData.setRecordEntryDate(LocalDate.now());
            billingData.setPrimaryClient(primaryClient);

            return clientBillingRepository.save(billingData);
        }else{
            return null;
        }
    }

    public List<ClientBilling> getPaymentHistory(String clientId) {
        PrimaryClient client = clientRepository.findByClientid(clientId).orElse(null);
        if(client != null)
        {
            return clientBillingRepository.findByPrimaryClient_Id(client.getId());            
        }else{
            return null;
        }
    }

/*__________________________________________________________________________________________*/

/*---------------------------------------Deceased Section------------------------------------*/
    //Add deceased to deceased records
    public boolean addDeceased(String fileId, Deceased deceasedData)
    {
        //check if PrimaryClient exists
        PrimaryClient primaryClient = clientRepository.findByClientid(fileId)
        .orElseThrow(() -> new IllegalArgumentException("No file is associated with provided FileId"));
        
        try{
            if(deceasedData.getDateOfBurial() != null){
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
                String formattedDate = deceasedData.getDateOfBurial().format(formatter);
                deceasedData.setDateOfBurial(LocalDate.parse(formattedDate, formatter));
            }
            deceasedData.setRecordEntryDate(LocalDate.now());
            deceasedData.setPrimaryClient(primaryClient);

            deceasedRepository.save(deceasedData);
            return true;
        }catch(RuntimeException ex){
            System.out.println(ex);
            return false;
        }
    }

    //get deceased records
    public List<Deceased> getDeceasedRecords(String fileId) {
        PrimaryClient client = clientRepository.findByClientid(fileId)
        .orElseThrow(() -> new IllegalArgumentException("No file is associated with provided FileId"));
        
        try{
            List<Deceased> deceasedResult = deceasedRepository.findByPrimaryClient_Id(client.getId());  
            return deceasedResult;          
        }catch(RuntimeException ex){
            System.out.println(ex);
            return null;
        }
    }
/*_______________________________________________________________________________________________*/

/*-------------------------------------Client Account Activation---------------------------------*/
    //handle client activation status
    public String handleAccountActivation(LocalDate joiningDate, int waitingPeriodMonths)
    {
        //get current date
        LocalDate currentDate = LocalDate.now();
        //get the difference between joining date and current date
        long monthsLeft = ChronoUnit.MONTHS.between(joiningDate, currentDate);

        if (monthsLeft >= waitingPeriodMonths) {
            System.out.println(monthsLeft);
            return "ACTIVATED";
        } else {
            System.out.println(monthsLeft);
            return "INACTIVE";
        }
    }

}