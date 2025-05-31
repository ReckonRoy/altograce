package com.itilria.altograce.controller;
/** 
 * @Author Le-Roy
 * @Date 23/02/2024
*/

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.itilria.altograce.domain.UserAuthentication;
import com.itilria.altograce.domain.client.ClientBilling;
import com.itilria.altograce.domain.client.ClientDependency;
import com.itilria.altograce.domain.client.Deceased;
import com.itilria.altograce.domain.client.PrimaryClient;
import com.itilria.altograce.domain.client.PrimaryPackageSubscription;
import com.itilria.altograce.domain.funeral.Invoice;
import com.itilria.altograce.dto.clientdto.ClientRegistrationDto;
import com.itilria.altograce.service.UserAuthenticationService;
import com.itilria.altograce.service.clientservice.ClientService;

import lombok.RequiredArgsConstructor;

@Controller 
@RequiredArgsConstructor
@RequestMapping("/client")
public class ClientManagementController{

    @Autowired
    private ClientService clientService;

     @Autowired
    private UserAuthenticationService userAuthService;

    /**
     * method gets user details
     * company name
     * user's name
     * that can be used in the processing of other information such as adding
     * -> company infor that this client is bieng registered to
     * -> subscribing service to client
     * -> auditing user actions
    */
    @GetMapping("/management")
    public String clientPage()
    {
        return "client-template/client-management";
    }

    @GetMapping("/management/admin")
    public String clientPageAdmin()
    {
        return "client-management";
    }

    @GetMapping("/management/user")
    public ResponseEntity<Map<String, Long>> getUserDetails(@AuthenticationPrincipal UserDetails userDetails)
    {
        //get user id and companyId
        UserAuthentication result = userAuthService.findByUsername(userDetails.getUsername()).get();
        Map<String, Long> userData = new HashMap<>();
        userData.put("userId", result.getId());
        return ResponseEntity.ok(userData);
    }

    /**
     * get client data
     * map data into respective objects
     * pass data objects to service methods
     */
    @PostMapping("/management/register")
    public ResponseEntity<?> registerClient(@AuthenticationPrincipal UserDetails userDetails, @RequestBody ClientRegistrationDto request)
    {
        try{
            PrimaryClient client = new PrimaryClient();
            client.setTitle(request.getTitle());
            client.setName(request.getName());
            client.setLastName(request.getLastName());
            client.setInitials(request.getInitials());
            client.setId_passport(request.getId_passport());
            client.setGender(request.getGender());
            client.setDob(request.getDob());
            client.setEmail(request.getEmail());
            client.setPhoneContact1(request.getPhoneContact1());
            client.setPhoneContact2(request.getPhoneContact2());
            client.setWaitPeriod(request.getWaitPeriod());
            client.setProvince(request.getProvince());
            client.setAddress(request.getAddress());
            client.setDateOfCover(request.getDateOfCover());
            PrimaryClient clientResult = clientService.registerClient(userDetails.getUsername(), client, request.getWaitPeriod());

            if(clientResult != null)
            {
                PrimaryPackageSubscription primarySubscription = new PrimaryPackageSubscription();
                primarySubscription.setPackageId(request.getPackageId());
                primarySubscription.setDateOfCover(request.getDateOfCover());
                primarySubscription.setJoiningFee(request.getJoiningFee());
                primarySubscription.setGroupName(request.getGroupName());
                primarySubscription.setLapsePeriod(request.getLapsePeriod());
                primarySubscription.setWaitPeriod(request.getWaitPeriod());
                primarySubscription.setPremiumAmount(request.getPremiumAmount());
                primarySubscription.setPrimaryClient(clientResult);
                clientService.addPrimarySubscription(primarySubscription);

                clientService.staffAudit("ADDED", userDetails.getUsername(), clientResult.getId(), request.getStaffId());
            }
            
            return ResponseEntity.ok(clientResult);
        }catch(Exception ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }
/*--------------------------------Clients Section------------------------------------------*/
    //Get all clients route 
    @GetMapping("/management/clients")
    public ResponseEntity<?> getClients(@AuthenticationPrincipal UserDetails userDetails,
                                        @RequestParam int page,
                                        @RequestParam int size) {
        try{
            Page<PrimaryClient> clientsPage = clientService.getClients(userDetails.getUsername(), page, size);
            return ResponseEntity.ok(clientsPage);
        }catch(Exception ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }
    
    //get client
    @GetMapping("/management/policy/{fileId}")
    public ResponseEntity<?> getClient(@AuthenticationPrincipal UserDetails userDetails, @PathVariable long fileId)
    {
        try{
            PrimaryClient result = clientService.getClient(userDetails.getUsername(), fileId);
            return ResponseEntity.ok(result);
        }catch(Exception ex)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }
/*--------------------------------Subscription Section------------------------------------------*/
    //get subscription route
    @GetMapping("/management/subscription/{clientid}")
    public ResponseEntity<?> getSubscriptionPlan(@PathVariable int clientid)
    {
        Map<String, String> result = clientService.getSubscriptionPlan(clientid);
        if(result != null)
        {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("No subscription plan available", HttpStatus.NO_CONTENT);
        }
    }
/*____________________________________________________________________________________________*/
/*-------------------------------------Dependency Section------------------------------------*/
    //Add dependency route
    @PostMapping("/management/add/dependency/{clientid}")
    public ResponseEntity<?> addDependency(@PathVariable long clientid, @RequestBody ClientDependency request)
    {
        try{
            ClientDependency result = clientService.addDependency(clientid, request);
            if(result != null)
            {
                return ResponseEntity.ok(result);
            }else{
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }
        catch(IllegalArgumentException ex){
            return new ResponseEntity<>("Dependent already exists!", HttpStatus.BAD_REQUEST);
        }
    }

    //get dependencies route
    @GetMapping("/management/dependencies/{clientid}")
    public ResponseEntity<?> getDependencies(@PathVariable long clientid)
    {
        List<ClientDependency> result = clientService.getDependencies(clientid);
        if(result != null)
        {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("No depencies available", HttpStatus.NO_CONTENT);
        }
    }

    //remove dependency route
    @PostMapping("/management/dependencies/remove/{id}")
    public ResponseEntity<?> removeDependent(@AuthenticationPrincipal UserDetails userDetails, @PathVariable int id, @RequestBody Map<String, String> request)
    {
        //get user id and companyId
        UserAuthentication result = userAuthService.findByUsername(userDetails.getUsername()).get();
        Map<String, Long> userData = new HashMap<>();
        userData.put("userId", result.getId());
        userData.put("companyId", result.getCompanyId());

        boolean removeResult = clientService.removeDependent(id, Long.parseLong(request.get("clientid")));
        
        if(removeResult == true)
        {
            clientService.staffAudit("REMOVE", userDetails.getUsername(), Long.parseLong(request.get("clientid")), result.getId());
            return ResponseEntity.ok("Dependency has been successfuly removed");
        }else{
            return new ResponseEntity<>("Failed to remove dependency. Primary Client does not exist", HttpStatus.NO_CONTENT);
        }
        
    }

    //delete file route
    @DeleteMapping("/delete-file/{fileId}")
    public ResponseEntity<?> deleteFile(@AuthenticationPrincipal UserDetails userDetails, @PathVariable long fileId)
    {
        try{
            //get user id and companyId
            UserAuthentication result = userAuthService.findByUsername(userDetails.getUsername()).get();
            Map<String, Long> userData = new HashMap<>();
            userData.put("userId", result.getId());
            userData.put("companyId", result.getCompanyId());

            clientService.deleteFile(fileId);
            
            clientService.staffAudit("DELETED A FILE", userDetails.getUsername(), fileId, result.getId());
            return ResponseEntity.ok("File has been deleted successfully");
            
        }catch(IllegalArgumentException ex)
        {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ex.getMessage());
        }
        
    }
/*------------------------------------Client Settings----------------------------------------*/
    //landing page
    @GetMapping("/settings")
    public String clientSettings()
    {
        return "client-template/client-settings";
    }

    /*
    @GetMapping("/settings/getwaitingperiod/{comId}")
    public ResponseEntity<?> getWaitingPeriod()
    {
        
    }*/

/*----------------------------------Client Billing Route-----------------------------------------*/
    //add billing route
    @PostMapping("/billing/{clientId}")
    public ResponseEntity<?> billClient(@AuthenticationPrincipal UserDetails userDetails, @PathVariable long clientId, @RequestBody ClientBilling request){
        //get user id and companyId
        UserAuthentication result = userAuthService.findByUsername(userDetails.getUsername()).get();
        ClientBilling billingResult = clientService.billClient(clientId, request);
        if(billingResult != null)
        {
            clientService.staffAudit("Billing", userDetails.getUsername(), clientId, result.getId());
            return ResponseEntity.ok("Client Has been successfully billed!");
        }else{
            return new ResponseEntity<>("Payment Transaction Failed!", HttpStatus.BAD_REQUEST);
        }
    }

    //payment history route
    @GetMapping("/payment-history/{clientId}")
    public ResponseEntity<?> paymentHistory(@PathVariable long clientId){
        List<ClientBilling> billingResult = clientService.getPaymentHistory(clientId);
        if(billingResult != null)
        {
            return new ResponseEntity<>(billingResult, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("No Payment history availaable", HttpStatus.NO_CONTENT);
        }
    }

/*________________________________________________________________________________________________*/

/*--------------------------------------Decead Records Route--------------------------------------*/
//route - add deceased record
    @PostMapping("/add/deceased/{fileId}")
    public ResponseEntity<?> addDeceased(@PathVariable long fileId, @RequestBody Deceased request)
    {
        try{
            boolean deceasedResult = clientService.addDeceased(fileId, request);
            if(deceasedResult){
                return ResponseEntity.ok("record added successfuly");
            }else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add deseased. A deseased with these details already exists: BiNumber: " + request.getBiNumber() + "Grave Number: " + request.getGraveNumber());
            }
        }catch(IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    //route - get deceased records route
    @GetMapping("/deceased/getRecords/{fileId}")
    public ResponseEntity<?> getDeceasedRecords(@PathVariable long fileId)
    {
        try{
            List<Deceased> deceasedResult = clientService.getDeceasedRecords(fileId);
            return new ResponseEntity<>(deceasedResult, HttpStatus.OK);
        }catch(IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error occurred.");
        }
    }

/*-------------------------------------------Invoices Section------------------------------------------------*/
    //route -  client invoice page
    @GetMapping("/invoice")
    public String invoicePage()
    {
        return "/client-template/invoice";
    }

    //route - get invoices
    @GetMapping("/invoices")
    @ResponseBody
    public ResponseEntity<?> getInvoices(@AuthenticationPrincipal UserDetails userDetails)
    {
        try{
            List<Invoice> result = clientService.getInvoicesWithinTwoWeeks(userDetails.getUsername());
            if(result == null)
            {
                Map<String, String> message = new HashMap();
                message.put("message", "No invoices to display");
                return ResponseEntity.ok(message);
            }

            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(IllegalArgumentException illegalArgumentException){
            return new ResponseEntity<>(illegalArgumentException.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}