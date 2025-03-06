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
    @PostMapping("/add-package/{id}")
    public ResponseEntity<?> addPremiumPolicy(@PathVariable int id, @RequestBody PremiumPolicy request)
    {
        PremiumPolicy result = premiumPolicyService.addPremiumPolicy(id, request);
        if(result != null)
        {
            return ResponseEntity.ok(result);
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("Sorry policy could not be saved");
        }
    }

    @GetMapping("/packages/{id}")
    public ResponseEntity<List<PremiumPolicy>> getPremiumPolicies(@PathVariable int id)
    {
        List<PremiumPolicy> result = premiumPolicyService.getPackages(id);
        if(result != null)
        {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    //Get package
    @PostMapping("/get-plan/{id}")
    public ResponseEntity<?> getSubscriptionPlan(@PathVariable int id, @RequestBody PremiumPolicy request)
    {
        /*
         * @Param subscrionPlan 
         * @Param subscrionPlanType 
         */
        try
        {
            PremiumPolicy result = premiumPolicyService.getSubscriptionPlan(id, request);
            return  ResponseEntity.ok(result);
        }catch(IllegalStateException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }    
    }

    //Update package
    @PostMapping("/update-plan/{id}")
    public ResponseEntity<?> updateSubscriptionPlan(@PathVariable int id, @RequestBody PremiumPolicy request)
    {
        /*
         * @Param subscrionPlan 
         * @Param subscrionPlanType 
         */
        try
        {
            PremiumPolicy result = premiumPolicyService.updateSubscriptionPlan(id, request);
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
    @PostMapping("/add-optional-package/{id}")
    public ResponseEntity<?> addOptionalPackage(@PathVariable int id, @RequestBody AdditionalPolicy request)
    {
        AdditionalPolicy result = premiumPolicyService.addOptionalPackage(id, request);
        if(result != null)
        {
            return ResponseEntity.ok(result);
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("Sorry package could not be saved");
        }
    }

    @GetMapping("/optional-packages/{id}")
    public ResponseEntity<List<AdditionalPolicy>> getOptionalPackages(@PathVariable int id)
    {
        List<AdditionalPolicy> result = premiumPolicyService.getOptionalPackages(id);
        if(result != null)
        {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    //Get package
    @PostMapping("/get-optional-plan/{id}")
    public ResponseEntity<?> getOptionalSubscriptionPlan(@PathVariable int id, @RequestBody AdditionalPolicy request)
    {
        /*
         * @Param subscrionPlan 
         * @Param subscrionPlanType 
         */
        try
        {
            AdditionalPolicy result = premiumPolicyService.getOptionalSubscriptionPlan(id, request);
            return  ResponseEntity.ok(result);
        }catch(IllegalStateException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }    
    }

    //Update optional plan
    @PostMapping("/update-optionalplan/{id}")
    public ResponseEntity<?> updateOptionalSubscriptionPlan(@PathVariable int id, @RequestBody AdditionalPolicy request)
    {
        /*
         * @Param subscrionPlan 
         * @Param subscrionPlanType 
         */
        try
        {
            AdditionalPolicy result = premiumPolicyService.updateOptionalSubscriptionPlan(id, request);
            return  ResponseEntity.ok(result);
        }catch(IllegalStateException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }    
    }

    @DeleteMapping("/delete-optional-package/{id}")
    public ResponseEntity<?> deleteOptionalPackage(@PathVariable int id) {
        // Code to delete the resource with the given ID

        premiumPolicyService.deleteOptionalPackage(id);
        return ResponseEntity.ok("Optional plan has been deleted successfully!");
    }
}