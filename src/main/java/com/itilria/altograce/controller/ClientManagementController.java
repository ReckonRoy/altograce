package com.itilria.altograce.controller;
/** 
 * @Author Le-Roy
 * @Date 23/02/2024
*/

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

import com.itilria.altograce.dto.clientdto.ClientRegistrationDto;
import com.itilria.altograce.domain.UserAuthentication;
import com.itilria.altograce.domain.client.PrimaryClient;
import com.itilria.altograce.domain.client.Deceased;
import com.itilria.altograce.domain.client.ClientBilling;
import com.itilria.altograce.domain.client.ClientSettings;
import com.itilria.altograce.domain.client.ClientDependency;
import com.itilria.altograce.domain.client.PrimaryPackageSubscription;
import com.itilria.altograce.service.UserAuthenticationService;
import com.itilria.altograce.service.clientservice.ClientService;

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

    @GetMapping("/management/user")
    public ResponseEntity<Map<String, Integer>> getUserDetails(@AuthenticationPrincipal UserDetails userDetails)
    {
        //get user id and companyId
        UserAuthentication result = userAuthService.findByUsername(userDetails.getUsername()).get();
        Map<String, Integer> userData = new HashMap<>();
        userData.put("userId", result.getId());
        userData.put("companyId", result.getCompanyId());
        return ResponseEntity.ok(userData);
    }

    /**
     * get client data
     * map data into respective objects
     * pass data objects to service methods
     */
    @PostMapping("/management/register/{id}")
    public ResponseEntity<?> registerClient(@PathVariable int id, @RequestBody ClientRegistrationDto request)
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
            client.setMaritalStatus(request.getMaritalStatus());
            client.setEmail(request.getEmail());
            client.setCountryCode(request.getCountryCode());
            client.setCellNumber(request.getCellNumber());
            client.setHomeNumber(request.getHomeNumber());
            client.setTelephone(request.getTelephone());
            client.setCountry(request.getCountry());
            client.setProvince(request.getProvince());
            client.setCity(request.getCity());
            client.setPostCode(request.getPostCode());
            client.setStreet(request.getStreet());
            client.setStandUnit(request.getStreet());
            client.setDateOfCover(request.getDateOfCover());
            PrimaryClient clientResult = clientService.registerClient(id, client);

            if(clientResult != null)
            {
                PrimaryPackageSubscription primarySubscription = new PrimaryPackageSubscription();
                primarySubscription.setPackageId(request.getPackageId());
                primarySubscription.setDateOfCover(request.getDateOfCover());
                primarySubscription.setJoiningFee(request.getJoiningFee());
                primarySubscription.setGroupName(request.getGroupName());
                primarySubscription.setPrimaryClient(clientResult);
                clientService.addPrimarySubscription(primarySubscription);

                clientService.staffAudit("ADDED", id, clientResult.getClientid(), request.getStaffId());
            }
            
            return ResponseEntity.ok(clientResult);
        }catch(Exception ex){
            return new ResponseEntity<>(ex, HttpStatus.BAD_REQUEST);
        }
    }
/*--------------------------------Clients Section------------------------------------------*/
    //Get all clients route 
    @GetMapping("/management/clients/{comId}")
    public ResponseEntity<?> getClients(@PathVariable int comId,
                                        @RequestParam int page,
                                        @RequestParam int size) {
        Page<PrimaryClient> clientsPage = clientService.getClients(comId, page, size);
        clientsPage.forEach( cpage -> {
            cpage.setResidentialAddress();
        });
        
        return ResponseEntity.ok(clientsPage);
    }
/*--------------------------------Subscription Section------------------------------------------*/
    //get subscription route
    @GetMapping("/management/subscription/{clientid}")
    public ResponseEntity<?> getSubscriptionPlan(@PathVariable String clientid)
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
    public ResponseEntity<?> addDependency(@PathVariable String clientid, @RequestBody ClientDependency request)
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
    public ResponseEntity<?> getDependencies(@PathVariable String clientid)
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
        Map<String, Integer> userData = new HashMap<>();
        userData.put("userId", result.getId());
        userData.put("companyId", result.getCompanyId());

        boolean removeResult = clientService.removeDependent(id, request.get("clientid"));
        
        if(removeResult == true)
        {
            clientService.staffAudit("REMOVE", result.getCompanyId(), request.get("clientid"), result.getId());
            return ResponseEntity.ok("Dependency has been successfuly removed");
        }else{
            return new ResponseEntity<>("Failed to remove dependency. Primary Client does not exist", HttpStatus.NO_CONTENT);
        }
        
    }
/*---------------------------------Client Settings----------------------------------------*/
    //landing page
    @GetMapping("/settings")
    public String clientSettings()
    {
        return "client-template/client-settings";
    }

    //post waiting period route
    @PostMapping("/settings/setwaitingperiod/{comId}")
    public ResponseEntity<?> setWaitingPeriod(@PathVariable int comId, @RequestBody Map<String, Integer> request)
    {
        ClientSettings result = clientService.addSettings(comId, request.get("months"));
        if(result != null)
        {
            return ResponseEntity.ok("Waiting period has been successfully saved");
        }else{
            return ResponseEntity.ok("Sorry we could not save your input");
        }
    }
    /*
    @GetMapping("/settings/getwaitingperiod/{comId}")
    public ResponseEntity<?> getWaitingPeriod()
    {
        
    }*/

/*----------------------------------Client Billing Route-----------------------------------------*/
    //add billing route
    @PostMapping("/billing/{clientId}")
    public ResponseEntity<?> billClient(@AuthenticationPrincipal UserDetails userDetails, @PathVariable String clientId, @RequestBody ClientBilling request){
        //get user id and companyId
        UserAuthentication result = userAuthService.findByUsername(userDetails.getUsername()).get();
        ClientBilling billingResult = clientService.billClient(clientId, request);
        if(billingResult != null)
        {
            clientService.staffAudit("Billing", result.getCompanyId(), clientId, result.getId());
            return ResponseEntity.ok("Client Has been successfully billed!");
        }else{
            return new ResponseEntity<>("Payment Transaction Failed!", HttpStatus.BAD_REQUEST);
        }
    }

    //payment history route
    @GetMapping("/payment-history/{clientId}")
    public ResponseEntity<?> paymentHistory(@PathVariable String clientId){
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
    @ResponseBody
    public ResponseEntity<?> addDeceased(@PathVariable String fileId, @RequestBody Deceased request)
    {
        try{
            boolean deceasedResult = clientService.addDeceased(fileId, request);
            if(deceasedResult == true){
                return ResponseEntity.ok("record added successfuly");
            }else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add deceased record!");
            }
        }catch(IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error occurred.");
        }
        
    }

//route - get deceased records route
    @GetMapping("/deceased/getRecords/{fileId}")
    @ResponseBody
    public ResponseEntity<?> getDeceasedRecords(@PathVariable String fileId)
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

}