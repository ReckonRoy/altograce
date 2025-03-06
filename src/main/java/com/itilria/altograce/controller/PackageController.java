package com.itilria.altograce.controller;
/** 
 * @Author Le-Roy
 * @Date 02 February 2024
*/

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.itilria.altograce.domain.AdditionalPolicy;
import com.itilria.altograce.domain.PremiumPolicy;
import com.itilria.altograce.service.PremiumPolicyService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

@Controller 
@RequiredArgsConstructor
@RequestMapping("/package")
public class PackageController{

    @Autowired
    private PremiumPolicyService premiumPolicyService;

    @GetMapping("/management")
    public String packagePage()
    {
        return "package-management";
    }
/**************************Handle Packages*****************************************************/
    @PostMapping("/add-package")
    public ResponseEntity<?> addPremiumPolicy(@AuthenticationPrincipal UserDetails userDetails, @RequestBody PremiumPolicy request)
    {
        PremiumPolicy result = premiumPolicyService.addPremiumPolicy(userDetails.getUsername(), request);
        if(result != null)
        {
            return ResponseEntity.ok(result);
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("Sorry policy could not be saved");
        }
    }

    @GetMapping("/packages")
    public ResponseEntity<List<PremiumPolicy>> getPremiumPolicies(@AuthenticationPrincipal UserDetails userDetails)
    {
        List<PremiumPolicy> result = premiumPolicyService.getPackages(userDetails.getUsername());
        if(result != null)
        {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    //Get package
    @PostMapping("/getpremiumpolicy")
    public ResponseEntity<?> getPremiumPolicy(@AuthenticationPrincipal UserDetails userDetails, @RequestBody PremiumPolicy request)
    {
        /*
         * @Param subscrionPlan 
         * @Param subscrionPlanType 
         */
        try
        {
            PremiumPolicy result = premiumPolicyService.getPremiumPolicy(userDetails.getUsername(), request);
            return  ResponseEntity.ok(result);
        }catch(IllegalStateException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }    
    }

    //Update package
    @PostMapping("/update-plan")
    public ResponseEntity<?> updateSubscriptionPlan(@AuthenticationPrincipal UserDetails userDetails, @RequestBody PremiumPolicy request)
    {
        /*
         * @Param subscrionPlan 
         * @Param subscrionPlanType 
         */
        try
        {
            PremiumPolicy result = premiumPolicyService.updateSubscriptionPlan(userDetails.getUsername(), request);
            return  ResponseEntity.ok(result);
        }catch(IllegalStateException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }    
    }

    @DeleteMapping("/delete-package/{id}")
    public ResponseEntity<?> deletePackage(@PathVariable int id) {
        // Code to delete the resource with the given ID

        premiumPolicyService.deletePackage(id);
        return ResponseEntity.ok("Subscription plan has been deleted successfully");
    }
/*_________________________________________________________________________________________________________*/

/**************************AdditionalPolicy*****************************************************/
    @PostMapping("/add-additional-policy")
    public ResponseEntity<?> addAdditionalPolicy(@AuthenticationPrincipal UserDetails userDetails, @RequestBody AdditionalPolicy request)
    {
        AdditionalPolicy result = premiumPolicyService.addAdditionalPolicy(userDetails.getUsername(), request);
        if(result != null)
        {
            return ResponseEntity.ok(result);
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("Sorry package could not be saved");
        }
    }

    @GetMapping("/additional-policies")
    public ResponseEntity<List<AdditionalPolicy>> getAllAdditionalPolicies(@AuthenticationPrincipal UserDetails userDetails)
    {
        List<AdditionalPolicy> result = premiumPolicyService.getAllAdditionalPolicies(userDetails.getUsername());
        if(result != null)
        {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    //Get package
    @PostMapping("/get-optional-plan")
    public ResponseEntity<?> getAdditionalPolicy(@AuthenticationPrincipal UserDetails userDetails, @RequestBody AdditionalPolicy request)
    {
        /*
         * @Param subscrionPlan 
         * @Param subscrionPlanType 
         */
        try
        {
            AdditionalPolicy result = premiumPolicyService.getAdditionalPolicy(userDetails.getUsername(), request);
            return  ResponseEntity.ok(result);
        }catch(IllegalStateException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }    
    }

    //Update optional plan
    @PostMapping("/update-additional-policy")
    public ResponseEntity<?> updateAdditionalPolicy(@AuthenticationPrincipal UserDetails userDetails, @RequestBody AdditionalPolicy request)
    {
        /*
         * @Param subscrionPlan 
         * @Param subscrionPlanType 
         */
        try
        {
            AdditionalPolicy result = premiumPolicyService.updateAdditionalPolicy(userDetails.getUsername(), request);
            return  ResponseEntity.ok(result);
        }catch(IllegalStateException ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ex.getMessage());
        }    
    }

    @DeleteMapping("/delete-optional-package/{id}")
    public ResponseEntity<?> deleteOptionalPackage(@PathVariable int id) {
        // Code to delete the resource with the given ID

        premiumPolicyService.deleteOptionalPackage(id);
        return ResponseEntity.ok("Optional plan has been deleted successfully!");
    }
}