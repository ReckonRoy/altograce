package com.itilria.altograce.controller;
/** 
 * @Author Le-Roy
 * @Date 02 February 2024
*/

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;


import com.itilria.altograce.service.UserAuthenticationService;
import com.itilria.altograce.service.PackageService;
import com.itilria.altograce.domain.ProductService;
import com.itilria.altograce.domain.ProductItem;
import com.itilria.altograce.domain.ServicePackage;
import com.itilria.altograce.domain.OptionalPackage;

@Controller 
@RequiredArgsConstructor
@RequestMapping("/package")
public class PackageController{

    @Autowired
    private PackageService packageService;

    @GetMapping("/management")
    public String packagePage()
    {
        return "package-management";
    }
/**************************Handle Packages*****************************************************/
    @PostMapping("/add-package/{id}")
    public ResponseEntity<?> addPackage(@PathVariable int id, @RequestBody ServicePackage request)
    {
        ServicePackage result = packageService.addPackage(id, request);
        if(result != null)
        {
            return ResponseEntity.ok(result);
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("Sorry package could not be saved");
        }
    }

    @GetMapping("/packages/{id}")
    public ResponseEntity<List<ServicePackage>> getPackages(@PathVariable int id)
    {
        List<ServicePackage> result = packageService.getPackages(id);
        if(result != null)
        {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @DeleteMapping("/delete-package/{id}")
    public ResponseEntity<?> deletePackage(@PathVariable int id) {
        // Code to delete the resource with the given ID

        packageService.deletePackage(id);
        return ResponseEntity.ok("delete successful");
    }
/*********************************Handle Items*********************************************/

/**************************Otional Packages*****************************************************/
    @PostMapping("/add-optional-package/{id}")
    public ResponseEntity<?> addOptionalPackage(@PathVariable int id, @RequestBody OptionalPackage request)
    {
        OptionalPackage result = packageService.addOptionalPackage(id, request);
        if(result != null)
        {
            return ResponseEntity.ok(result);
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("Sorry package could not be saved");
        }
    }

    @GetMapping("/optional-packages/{id}")
    public ResponseEntity<List<OptionalPackage>> getOptionalPackages(@PathVariable int id)
    {
        List<OptionalPackage> result = packageService.getOptionalPackages(id);
        if(result != null)
        {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @DeleteMapping("/delete-optional-package/{id}")
    public ResponseEntity<?> deleteOptionalPackage(@PathVariable int id) {
        // Code to delete the resource with the given ID

        packageService.deleteOptionalPackage(id);
        return ResponseEntity.ok("delete successful");
    }
/*********************************Handle Items*********************************************/
    @PostMapping("/items/{id}")
    public ResponseEntity<List<ProductItem>> getItems(@PathVariable int id, @RequestBody ProductItem request)
    {
        List<ProductItem> result = packageService.getItems(id, request);
        if(result != null)
        {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("/add-item/{id}")
    public ResponseEntity<?> addItem(@PathVariable int id, @RequestBody ProductItem request)
    {
        ProductItem result = packageService.addItem(id, request);
        if(result != null)
        {
            return ResponseEntity.ok(result);
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("Sorry item could not be saved");
        }
    }

    @DeleteMapping("/delete-item/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable int id) {
        // Code to delete the resource with the given ID

        packageService.deleteItem(id);
        return ResponseEntity.ok("delete successful");
    }

    
/************************************************Handle Services************************************************/
    @PostMapping("/services/{id}")
    public ResponseEntity<List<ProductService>> getServices(@PathVariable int id, @RequestBody ProductService request)
    {
        List<ProductService> result = packageService.getServices(id, request);
        if(result != null)
        {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("/add-service/{id}")
    public ResponseEntity<?> addService(@PathVariable int id, @RequestBody ProductService request)
    {
        ProductService result = packageService.addService(id, request);
        if(result != null)
        {
            return ResponseEntity.ok(result);
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("Sorry service could not be saved");
        }
    }

    @DeleteMapping("/delete-service/{id}")
    public ResponseEntity<?> deleteService(@PathVariable int id) {
        // Code to delete the resource with the given ID

        packageService.deleteService(id);
        return ResponseEntity.ok("delete successful");
    }
}