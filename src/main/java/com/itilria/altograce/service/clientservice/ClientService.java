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
import com.itilria.altograce.domain.PremiumPolicy;
import com.itilria.altograce.domain.StaffAuditing;
import com.itilria.altograce.domain.UserAuthentication;
import com.itilria.altograce.domain.client.ClientBilling;
import com.itilria.altograce.domain.client.ClientDependency;
import com.itilria.altograce.domain.client.Deceased;
import com.itilria.altograce.domain.client.PrimaryClient;
import com.itilria.altograce.domain.client.PrimaryPackageSubscription;
import com.itilria.altograce.domain.funeral.Invoice;
import com.itilria.altograce.repository.CompanyRepository;
import com.itilria.altograce.repository.PremiumPolicyRepository;
import com.itilria.altograce.repository.StaffAuditingRepository;
import com.itilria.altograce.repository.UserAuthenticationRepository;
import com.itilria.altograce.repository.clientrepository.ClientBillingRepository;
import com.itilria.altograce.repository.clientrepository.ClientDependencyRepository;
import com.itilria.altograce.repository.clientrepository.ClientRepository;
import com.itilria.altograce.repository.clientrepository.ClientSettingsRepository;
import com.itilria.altograce.repository.clientrepository.DeceasedRepository;
import com.itilria.altograce.repository.clientrepository.PrimaryPackageSubscriptionRepository;
import com.itilria.altograce.repository.funeralrepository.InvoiceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ClientService{

    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired 
    private UserAuthenticationRepository userAuthRepository;
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
    private DeceasedRepository deceasedRepository;
    @Autowired
    private PremiumPolicyRepository servicePackageRepository;

/*--------------------------------Primary Client Section----------------------------------------------*/
    //Register Client
    public PrimaryClient registerClient(String username, PrimaryClient clientData, int waitPeriod) throws Exception{
        UserAuthentication userAuth = userAuthRepository.findByUsername(username).orElse(null);
        Optional<Company> company = companyRepository.findById(userAuth.getCompanyId());
        
        if(!company.isPresent()){
            throw new IllegalArgumentException("Failed to save your details, Company was not found in our database!");
        }

        //check if client exists
        if(clientRepository.findByIdPassport(clientData.getId_passport()).isPresent())
        {
            throw new IllegalArgumentException("Client already exists.");
        }

        //save empty client object, inorder to get id
        PrimaryClient client = new PrimaryClient();
        client = clientRepository.save(client);


        client.setCompany(company.get());
        client.setRecordEntryDate(LocalDate.now());
        client.setTitle(clientData.getTitle());
        client.setName(clientData.getName());
        client.setLastName(clientData.getLastName());
        client.setInitials(clientData.getInitials());
        client.setId_passport(clientData.getId_passport());
        client.setGender(clientData.getGender());
        client.setEmail(clientData.getEmail());
        client.setPhoneContact1(clientData.getPhoneContact1());
        client.setPhoneContact2(clientData.getPhoneContact2());
        client.setWaitPeriod(clientData.getWaitPeriod());

        client.setProvince(clientData.getProvince());
        client.setAddress(clientData.getAddress());

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
        client.setActivationStatus(this.handleAccountActivation(clientData.getDateOfCover(), waitPeriod));

        //save and return saved object
        return clientRepository.save(client);
        
    }

    //Get All Clients
    public Page<PrimaryClient> getClients(String username , int page, int size) {
        UserAuthentication userAuth = userAuthRepository.findByUsername(username).orElse(null);
        Optional<Company> company = companyRepository.findById(userAuth.getCompanyId());

        if(!company.isPresent()){
            throw new IllegalArgumentException("Failed to save your details, Company was not found in our database!");
        }

        return clientRepository.findByCompanyId_Id(company.get().getId(), PageRequest.of(page, size));
    }
    
    //Get Client
    public PrimaryClient getClient(String username , long id) {
        UserAuthentication userAuth = userAuthRepository.findByUsername(username).orElse(null);
        Optional<Company> company = companyRepository.findById(userAuth.getCompanyId());
        if(!company.isPresent()){
            throw new IllegalArgumentException("Error - denial of service due to system authorization!");
        }
        
        Optional<PrimaryClient> policyHolder = clientRepository.findById(id);
        if(!policyHolder.isPresent()){
            throw new IllegalArgumentException("Error - client does not exist");
        }
        
        return policyHolder.get();
    }


    //Delete file - Delete file
    public boolean deleteFile(long fileId){
        //check if file exists
        if(!clientRepository.existsById(fileId))
        {
            throw new IllegalArgumentException("This file no longer exists, it might have been deleted already");
        }

        clientRepository.deleteById(fileId);
        return true;
    }

/*----------------------------------Staff Auditing Section-----------------------------------------------*/
    //Audit User Actions
    public void staffAudit(String staffAction, String username, long id, long staffId)
    {
        UserAuthentication userAuth = userAuthRepository.findByUsername(username).orElse(null);
        
        StaffAuditing staffAudit = new StaffAuditing();
        staffAudit.setStaffAction(staffAction);
        staffAudit.setCompanyId(userAuth.getCompanyId());
        staffAudit.setStaffId(staffId);
        staffAudit.setClientId(id);
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

    //Get Client's Premium Policy Plan
    public Map<String, String> getSubscriptionPlan(long id)
    {
        PrimaryClient primaryClient = clientRepository.findById(id).orElse(null);
        if(primaryClient != null)
        {
            PrimaryPackageSubscription subscriptionResult = primaryPackSubRep.findByPrimaryClient_Id(id).orElse(null);
            PremiumPolicy servicePackageResult = servicePackageRepository.findById(subscriptionResult.getPackageId()).orElse(null);
            Map<String, String> subscriptionMap = new HashMap<>();
            subscriptionMap.put("name", servicePackageResult.getPolicyName());
            subscriptionMap.put("dateOfCover", subscriptionResult.getDateOfCover().toString());
            subscriptionMap.put("groupName", subscriptionResult.getGroupName());
            subscriptionMap.put("joiningFee", subscriptionResult.getJoiningFee().toString());
            String packageId = Long.toString(subscriptionResult.getId()) ;
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
    public ClientDependency addDependency(Long clientId, ClientDependency depForm)
    {
        //check if PrimaryClient exists
        PrimaryClient primaryClient = clientRepository.findById(clientId).orElse(null);
        
        Company company = primaryClient.getCompany();
        
        if(dependencyRepository.findByPassport(depForm.getId_passport()).isPresent()){
            throw new IllegalArgumentException("This dependent already exists");
        }


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

            regDep.setActivationStatus(this.handleAccountActivation(regDep.getDateOfCover(), primaryClient.getWaitPeriod()));

            return dependencyRepository.save(regDep);
        }else{
            return null;
        }
    }

    //Get Dependencies
    public List<ClientDependency> getDependencies(long clientId)
    {
        PrimaryClient primaryClient = clientRepository.findById(clientId).orElse(null);

        if(primaryClient != null)
        {
            List<ClientDependency> dependencyResult = dependencyRepository.findByPrimaryClient_Id(primaryClient.getId());
            return dependencyResult;
        }else{
            return null;
        }
    }

    //Remove dependent
    public boolean removeDependent(long id, long clientid)
    {
        //check if primary client exists
        PrimaryClient primaryClient = clientRepository.findById(clientid).orElse(null);
        if(primaryClient != null)
        {
            try {
                dependencyRepository.deleteById(id);
                return true; // Deletion succeeded
            } catch (Exception e) {
                // Handle any exception that might occur during deletion
                return false; // Deletion failed
            }
        }else{
            return false;
        }

    }
/*-------------------------------Billing Section------------------------------------------*/
    //Client makes payment
    public ClientBilling billClient(long clientId, ClientBilling billingData)
    {
        //check if PrimaryClient exists
        PrimaryClient primaryClient = clientRepository.findById(clientId).orElse(null);
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

    public List<ClientBilling> getPaymentHistory(long clientId) {
        PrimaryClient client = clientRepository.findById(clientId).orElse(null);
        if(client != null)
        {
            return clientBillingRepository.findByPrimaryClient_Id(client.getId());            
        }else{
            return null;
        }
    }

/*__________________________________________________________________________________________*/

/*---------------------------------------Client Invoice Section----------------------------*/ 
    //Get invoices that are in range of within two weeks
    public List<Invoice> getInvoicesWithinTwoWeeks(String username){
        Optional<UserAuthentication> userAuth = userAuthRepository.findByUsername(username);
        if(!userAuth.isPresent())
        {
            throw new IllegalArgumentException("Error - denial of service due to account authorization");
        }
        // Retrieve the company entity by ID
        Optional<Company> company = companyRepository.findById(userAuth.get().getCompanyId());
        if(!company.isPresent()){
            throw new IllegalArgumentException("Error - denial of service due to account authorization");
        }

        // Calculate the date two weeks from today
        LocalDate today = LocalDate.now();
        LocalDate twoWeeksFromNow = today.plusWeeks(2);
        // Retrieve upcoming funerals associated with the company within the specified range
        List<Invoice> invoicesWithinTwoWeeks = invoiceRepository.findByCompanyIdAndInvoiceDateBetween(company.get().getId(), today, twoWeeksFromNow);
        if(invoicesWithinTwoWeeks.isEmpty())
        {
            return null;
        }
            
        return invoicesWithinTwoWeeks;
    }

/*---------------------------------------Deceased Section------------------------------------*/
    //Add deceased to deceased records
    public boolean addDeceased(long fileId, Deceased deceasedData)
    {
        //check if PrimaryClient exists
        PrimaryClient primaryClient = clientRepository.findById(fileId)
        .orElseThrow(() -> new IllegalArgumentException("No file is associated with provided FileId"));
        
        if(deceasedRepository.findByBiNumberAndGraveNumber(deceasedData.getBiNumber(), deceasedData.getGraveNumber()).isPresent())
        {
            return false;
        }
        
        if(deceasedData.getDateOfBurial() != null){
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
            String formattedDate = deceasedData.getDateOfBurial().format(formatter);
            deceasedData.setDateOfBurial(LocalDate.parse(formattedDate, formatter));
        }
        deceasedData.setRecordEntryDate(LocalDate.now());
        deceasedData.setPrimaryClient(primaryClient);

        deceasedRepository.save(deceasedData);
        return true;
    }

    //get deceased records
    public List<Deceased> getDeceasedRecords(long fileId) {
        PrimaryClient client = clientRepository.findById(fileId)
        .orElseThrow(() -> new IllegalArgumentException("No file is associated with provided FileId"));
        
        try{
            return deceasedRepository.findByPrimaryClient_Id(client.getId());          
        }catch(RuntimeException ex){
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
            return "ACTIVATED";
        } else {
            return "INACTIVE";
        }
    }

}