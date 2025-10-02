package com.itilria.altograce.service.clientservice;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.time.Period;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;
import java.math.BigDecimal;
import java.util.function.Function;
import java.math.RoundingMode;

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
import com.itilria.altograce.domain.client.Addon;
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
import com.itilria.altograce.repository.clientrepository.AddonRepository;
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
    private ClientDependencyRepository dependantsRepository;
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
    @Autowired
    private AddonRepository addonRepository;

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
    /**
     * Audit User Actions
     * this method takes 4 parameters
     * action being commited by the staff member
     * username of the staff member
     * id of the client whom this action affects
     * the id of the staff member who has performed this action
     */ 
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
    
    //get information about client's policy, the plan they subscribed to and payment details
    public Map<String, Object> getSubscriptionPlan(String username, long id) {
        // 1. Validate and fetch required data
        UserAuthentication userAuth = userAuthRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Access denied! Please login."));

        companyRepository.findById(userAuth.getCompanyId())
                .orElseThrow(() -> new IllegalArgumentException("Access denied! Please login."));

        PrimaryClient primaryClient = clientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Sorry, client does not exist!"));

        PrimaryPackageSubscription subscription = primaryPackSubRep.findByPrimaryClient_Id(id)
                .orElseThrow(() -> new IllegalArgumentException("This client has not been subscribed to any services"));

        PremiumPolicy premiumPolicy = servicePackageRepository.findById(subscription.getPackageId())
                .orElseThrow(() -> new IllegalArgumentException("No premium policy found for this client"));

        Map<String, Object> subscriptionMap = new HashMap<>();

        // 2. Basic policy info
        subscriptionMap.put("name", premiumPolicy.getPolicyName());
        subscriptionMap.put("dateOfCover", subscription.getDateOfCover());
        subscriptionMap.put("groupName", 
            subscription.getGroupName() != null && !subscription.getGroupName().isEmpty() 
                ? subscription.getGroupName() 
                : null
        );
        subscriptionMap.put("joiningFee", subscription.getJoiningFee());

        // 3. Wait period calculation
        long waitPeriodLeft = getWaitPeriodLeft(subscription.getDateOfCover(), subscription.getWaitPeriod());
        if (waitPeriodLeft < subscription.getWaitPeriod()) {
            waitPeriodLeft = subscription.getWaitPeriod() - waitPeriodLeft;
            subscriptionMap.put("waitPeriod", subscription.getWaitPeriod());
            subscriptionMap.put("waitPeriodLeft", String.valueOf(waitPeriodLeft));
        }

        subscriptionMap.put("subscriptionId", String.valueOf(subscription.getId()));

        // 4. Members count
        int dependantsCount = dependantsRepository.countByPrimaryClient_Id(primaryClient.getId());
        subscriptionMap.put("membersCount", (1 + dependantsCount) + " of " + premiumPolicy.getMembersCount() + " members");

        // 5. Payment status
        calculatePaymentStatus(primaryClient, premiumPolicy, subscription, subscriptionMap);

        return subscriptionMap;
    }

    /*-------------------------------Payment Status Section------------------------------------------*/
    private void calculatePaymentStatus(PrimaryClient client, PremiumPolicy policy,
                                    PrimaryPackageSubscription subscription, Map<String, Object> map) {

    LocalDate today = LocalDate.now();
    BigDecimal monthlyFee = policy.getPremiumAmount();
    LocalDate dateOfCover = subscription.getDateOfCover();

    // 🔹 Total months due since start-of-coverage
    int monthsDue = monthsBetween(dateOfCover, today) + 1;
    BigDecimal totalOwed = monthlyFee.multiply(BigDecimal.valueOf(monthsDue));

    // 🔹 Sum of all payments
    List<ClientBilling> allPayments = clientBillingRepository.findByPrimaryClient_Id(client.getId());
    BigDecimal totalPaid = allPayments.stream()
            .map(b -> Optional.ofNullable(b.getAmountPaid()).orElse(BigDecimal.ZERO))
            .reduce(BigDecimal.ZERO, BigDecimal::add);

    // 🔹 Full months covered by payment
    int monthsCovered = totalPaid.divide(monthlyFee, 0, RoundingMode.DOWN).intValue();

    // 🔹 Partial month remainder
    BigDecimal partialRemainder = totalPaid.remainder(monthlyFee);

    // 🔹 Balance owed
    BigDecimal balance = totalOwed.subtract(totalPaid);

    // 🔹 Months behind / ahead
    int adjustedMonthsBehind = monthsDue - monthsCovered;
    int monthsBehind = Math.max(adjustedMonthsBehind, 0);
    int monthsAhead = Math.max(monthsCovered - monthsDue, 0);


    // Next due date
    LocalDate nextDueDate = dateOfCover.plusMonths(monthsCovered);

    // 5. Determine status
    String status;

    if (monthsBehind > 0) {
        status = "Payment is overdue";
        nextDueDate = dateOfCover.plusMonths(monthsCovered);
    } else if (monthsAhead > 0) {
        status = "Paid in advance (" + monthsAhead + " month" + (monthsAhead > 1 ? "s" : "") + ")";
        nextDueDate = dateOfCover.plusMonths(monthsDue + monthsAhead);
    } else {
        status = "Payment is up to date";
        nextDueDate = dateOfCover.plusMonths(monthsCovered);
    }


    // 6. Lapse status (based on subscription lapse period)
    String lapseStatus = null;
    int lapsePeriod = subscription.getLapsePeriod();

    if ("Payment is overdue".equals(status)) {
        if (monthsBehind == (lapsePeriod - 1)) {
            lapseStatus = "Policy is about to lapse!";
        } else if (monthsBehind >= lapsePeriod) {
            lapseStatus = "Policy has lapsed!";
        }
    }

    // 🔹 Populate map
    map.put("totalOwed", totalOwed);
    map.put("totalPaid", totalPaid);
    map.put("monthsDue", monthsDue);
    map.put("monthsCovered", monthsCovered);
    map.put("partialRemainder", partialRemainder);
    map.put("monthsBehind", Math.max(adjustedMonthsBehind, 0));
    map.put("monthsAhead", monthsAhead);
    map.put("status", status);
    map.put("lapseStatus", lapseStatus);
    map.put("lapsePeriod", lapsePeriod);
    map.put("nextDueDate", nextDueDate);
    map.put("balance", balance);
    map.put("isOverdue", adjustedMonthsBehind > 0);
}


    private int monthsBetween(LocalDate start, LocalDate end) {
        if (end.isBefore(start)) {
            return 0;
        }

        int months = (end.getYear() - start.getYear()) * 12 + (end.getMonthValue() - start.getMonthValue());

        // If end day is before start day, current month is not yet complete
        if (end.getDayOfMonth() < start.getDayOfMonth()) {
            months -= 1;
        }

        return months;
    }



    //get number of months left for account to be activated
    public long getWaitPeriodLeft(LocalDate joiningDate, int waitingPeriodMonths)
    {
        //get current date
        LocalDate currentDate = LocalDate.now();
        //get the difference between joining date and current date
        long monthsLeft = ChronoUnit.MONTHS.between(joiningDate, currentDate);

        return monthsLeft;
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
        
        if(dependantsRepository.findByPassport(depForm.getId_passport()).isPresent()){
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

            return dependantsRepository.save(regDep);
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
            List<ClientDependency> dependencyResult = dependantsRepository.findByPrimaryClient_Id(primaryClient.getId());
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
                dependantsRepository.deleteById(id);
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
    public List<ClientBilling> billClient(long clientId, ClientBilling billingData) {
        PrimaryClient client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Client does not exist"));
    
        PrimaryPackageSubscription subscription = primaryPackSubRep.findByPrimaryClient_Id(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Client has no subscription"));
    
        PremiumPolicy policy = servicePackageRepository.findById(subscription.getPackageId())
                .orElseThrow(() -> new IllegalArgumentException("No premium policy found"));
    
        BigDecimal monthlyFee = policy.getPremiumAmount();
        LocalDate paymentDate = billingData.getPaymentDate() != null ? billingData.getPaymentDate() : LocalDate.now();
        BigDecimal amountPaid = billingData.getAmountPaid();
        String paymentMethod = billingData.getPaymentMethod();
    
        List<ClientBilling> createdBillings = new ArrayList<>();
    
        // 🔹 Get last billing entry
        ClientBilling lastBilling = clientBillingRepository
                .findTopByPrimaryClientIdOrderByPaymentDateDesc(clientId)
                .orElse(null);
    
        // 🔹 Determine start date for new billing
        LocalDate startDate = (lastBilling != null) ? lastBilling.getPaymentDate().plusMonths(1) : subscription.getDateOfCover();
    
        // 🔹 Total months that the payment can cover (full months)
        int fullMonths = amountPaid.divide(monthlyFee, RoundingMode.DOWN).intValue();
        BigDecimal remainder = amountPaid.remainder(monthlyFee);
    
        // 🔹 Generate billing entries for full months
        for (int i = 0; i < fullMonths; i++) {
            LocalDate billingMonth = startDate.plusMonths(i);
            mergeOrCreateBilling(client, policy, billingMonth, monthlyFee, createdBillings, paymentMethod);
        }
    
        // 🔹 Handle partial first/last month
        if (remainder.compareTo(BigDecimal.ZERO) > 0) {
            LocalDate partialMonth = startDate.plusMonths(fullMonths);
            mergeOrCreateBilling(client, policy, partialMonth, remainder, createdBillings, paymentMethod);
        }
    
        return clientBillingRepository.saveAll(createdBillings);
    }

    /**
     * Merges the amount into an existing month if present, otherwise creates a new record.
     */
    private void mergeOrCreateBilling(PrimaryClient client,PremiumPolicy premiumPolicy, LocalDate month, BigDecimal amount, List<ClientBilling> billings, String paymentMethod) {
        // Check DB for an existing payment in the same month
        ClientBilling existing = clientBillingRepository
                .findByPrimaryClientIdAndPaymentDate(client.getId(), month)
                .orElse(null);

        if (existing != null) {
            // Merge amount into existing payment
            existing.setAmountPaid(existing.getAmountPaid().add(amount));
            if (existing.getAmountPaid().compareTo(premiumPolicy.getPremiumAmount()) >= 0) {
                existing.setPartialPayment(false); // mark as full payment now
            }
            billings.add(existing);
        } else {
            // Create a new billing entry
            ClientBilling billing = new ClientBilling();
            billing.setPrimaryClient(client);
            billing.setPaymentDate(month);
            billing.setRecordEntryDate(LocalDate.now());
            billing.setAmountPaid(amount);
            billing.setPartialPayment(amount.compareTo(premiumPolicy.getPremiumAmount()) < 0);
            billing.setPaymentMethod(paymentMethod);
            billings.add(billing);
        }
    }


    /**get payment status
     * we need to know the last time client made payment 
     * details needed:
     * 1. get last payment date, get amount paid
     * - is date current
     * - compare if amount paid is equals to premium amount.
     * - is amount paid == premium amount
     * 2. if payment is current and no balance is owed - status: payment is up to date
     * 3. if payment status is not current - get balance.
     * - balance =  number of months behind * premium amount
     * 4. amount paid
     * 5. determine lapse period
    */
    public Map<String, Object> getBalanceDue(String username, long clientId)
    {
        UserAuthentication userAuth = userAuthRepository.findByUsername(username).orElse(null);
        Optional<Company> company = companyRepository.findById(userAuth.getCompanyId());
        
        if(!company.isPresent()){
            throw new IllegalArgumentException("Access denied! Please login.");
        }
        //map to hold payment details
        Map<String, Object> paymentDetails = new HashMap<>();
        // 1. Retrieve client
        PrimaryClient primaryClient = clientRepository.findById(clientId).orElse(null);
        if (primaryClient == null) {
            throw new IllegalArgumentException("This policy holder does not exists");
        }

        // 2. Retrieve loatest billing info
        ClientBilling clientBilling = clientBillingRepository.getlatestPaymentDetails(clientId);
        if (clientBilling == null) {
            throw new IllegalArgumentException("Billing record does not exists");
        }

        BigDecimal amountPaid = clientBilling.getAmountPaid(); // e.g., 500
        LocalDate paymentDate = clientBilling.getPaymentDate(); // e.g., 2024-12-01
        LocalDate currentDate = LocalDate.now();

        // 3. Get months behind
        int monthsBehind = Period.between(paymentDate.withDayOfMonth(1), currentDate.withDayOfMonth(1)).getMonths()
        + (12 * (Period.between(paymentDate.withDayOfMonth(1), currentDate.withDayOfMonth(1)).getYears()));
        paymentDetails.put("amountPaid", amountPaid);
        paymentDetails.put("dateOfPayment", paymentDate);
        paymentDetails.put("monthsBehind", monthsBehind);

        // 4. Get subscription amount (premium)
        PrimaryPackageSubscription subscription = primaryPackSubRep.findByPrimaryClient_Id(clientId).orElse(null);
        if (subscription == null) {
            throw new IllegalArgumentException("Policy does not exists");
        }

        PremiumPolicy premiumPolicy = servicePackageRepository.findById(subscription.getPackageId()).orElse(null);
        if (premiumPolicy == null) {
            throw new IllegalArgumentException("No premium policy found for this client");
        }

        BigDecimal subscriptionAmount = premiumPolicy.getPremiumAmount(); // e.g., 500
        paymentDetails.put("subscriptionAmount", subscriptionAmount);

        // 5. Determine if up to date
        if (monthsBehind <= 1 && amountPaid.compareTo(subscriptionAmount) >= 0) {
            paymentDetails.put("status", "Payment is up to date");
            paymentDetails.put("balanceDue", BigDecimal.ZERO);
        } else {
            BigDecimal balanceDue = subscriptionAmount.multiply(BigDecimal.valueOf(monthsBehind)).subtract(amountPaid);
            paymentDetails.put("status", "Payment is overdue");
            paymentDetails.put("balanceDue", balanceDue.max(BigDecimal.ZERO)); // never negative
        }

        return paymentDetails;
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

    //-------------------- Remove payment ----------------------
    public boolean removePayment(long clientId, long paymentId)
    {
        //check if primary client exists
        PrimaryClient primaryClient = clientRepository.findById(clientId).orElse(null);
        if(primaryClient != null)
        {
            try {
                clientBillingRepository.deleteById(paymentId);
                return true; // Deletion succeeded
            } catch (Exception e) {
                // Handle any exception that might occur during deletion
                return false; // Deletion failed
            }
        }else{
            return false;
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

/*-------------------------- Individual Policy Addons ----------------------*/
    public boolean createAddon(String username, Long clientId, Addon addonRequest) {
        // 1. Validate and fetch required data
        UserAuthentication userAuth = userAuthRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Access denied! Please login."));

        companyRepository.findById(userAuth.getCompanyId())
                .orElseThrow(() -> new IllegalArgumentException("Access denied! Please login."));

        PrimaryClient primaryClient = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Sorry, client does not exist!"));

        PrimaryPackageSubscription subscription = primaryPackSubRep.findByPrimaryClient_Id(clientId)
                .orElseThrow(() -> new IllegalArgumentException("This client has not been subscribed to any services"));
           
        //check if property createdAt is not null
        //if it is now createdAt value = LocalDate.now() 
        if(addonRequest.getCreatedAt() != null)
        {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
            String formattedCreatedAt = addonRequest.getCreatedAt().format(formatter);
            addonRequest.setCreatedAt(LocalDate.parse(formattedCreatedAt, formatter));
        }else{
            addonRequest.setCreatedAt(LocalDate.now());
        }

        addonRepository.save(addonRequest);
        return true;

    }

}