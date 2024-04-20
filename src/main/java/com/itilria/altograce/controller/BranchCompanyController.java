package com.itilria.altograce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.config.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import java.util.List;

import com.itilria.altograce.domain.BranchCompany;
import com.itilria.altograce.service.BranchCompanyService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
public class BranchCompanyController
{
    @Autowired
    BranchCompanyService branchCompanyService;

    @GetMapping("/branch/settings")
    public String getBranchPage(Model model){
        return "branches";
    }

    @GetMapping("/branch/branches/{id}")
    public ResponseEntity<List<BranchCompany>> getBranches(@PathVariable int id)
    {
        List<BranchCompany> branch = branchCompanyService.getCompanyBranches(id);
        return new ResponseEntity<>(branch, HttpStatus.OK);
    }

    @PostMapping("/branch/add/{id}")
    public ResponseEntity<?> addBranchCompany(@AuthenticationPrincipal UserDetails userDetails, @PathVariable int id, @RequestBody BranchCompany formData)
    {
        //send form data to BranchCompanyService
        BranchCompany branchCompanyResult = branchCompanyService.addBranchCompany(id, formData);
        if(branchCompanyResult !=null)
        {
            return ResponseEntity.ok(branchCompanyResult);
        }else{
            return ResponseEntity.notFound().build();
        }
        
    }

    //Update existing company data 
    @PutMapping("/branch/update/{id}")
    public ResponseEntity<BranchCompany> updateCompany(@PathVariable int id, @RequestBody BranchCompany formData)
    {
        BranchCompany result = branchCompanyService.updateBranch(id, formData);
        if(result != null)
        {
            return ResponseEntity.ok(result);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
}