package com.itilria.altograce.controller;
/**
 * @Author Le-Roy Jongwe
 * @Date 6 December 2023
 * @Description handle http request and response
*/

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

import java.security.Principal;
import com.itilria.altograce.domain.Company;
import com.itilria.altograce.domain.UserAuthentication;
import com.itilria.altograce.service.CompanyService;
import com.itilria.altograce.exception.CompanyNotFoundException;
import com.itilria.altograce.service.UserAuthenticationService;
import com.itilria.altograce.domain.Ethics;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/company")
public class CompanyController
{
    @Autowired
    private CompanyService companyService;

    @Autowired
    private UserAuthenticationService userAuthService;

    @GetMapping
    public String companyPage(@AuthenticationPrincipal UserDetails userDetails, Model model)
    {
        try
        {
            model.addAttribute("companies", companyService.getCompanies(userDetails.getUsername())); 
            return "company_management";
        }catch(CompanyNotFoundException exception){
            model.addAttribute("error", exception.getMessage());
            return "company_management";
        }
    }

    //return  company data as json
    @GetMapping("/profile/data")
    public ResponseEntity<List<Company>> getCompanies(@AuthenticationPrincipal UserDetails userDetails){
        List<Company> company = companyService.findCompaniesByUsername(userDetails.getUsername());
        if (company.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(company, HttpStatus.OK);
        }
    }

    //Update existing company data 
    @PutMapping("/update/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable int id, @RequestBody Company companyForm)
    {
        Company updateCompanyResult = companyService.updateCompany(id, companyForm);
        if(updateCompanyResult != null)
        {
            return ResponseEntity.ok(updateCompanyResult);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/admin/company-management/add")
    public ResponseEntity<String> registerCompany(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Company request)
    {

        //check if company exists
        if(companyService.alreadyExists(request.getRegNumber())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("company with registration number already exists");
        }

        Company company = new Company();
        company.setName(request.getName());
        company.setRegNumber(request.getRegNumber());
        company.setTaxNumber(request.getTaxNumber());
        company.setFspNumber(request.getFspNumber());
        company.setEmail(request.getEmail());
        compnay.setInitials(request.getInitials());
        company.setCountryCode(request.getCountryCode());
        company.setContact1(request.getContact1());
        company.setContact2(request.getContact2());
        company.setContact3(request.getContact3());
        company.setCountry(request.getCountry());
        company.setProvince(request.getProvince());
        company.setCity(request.getCity());
        company.setPostCode(request.getPostCode());
        company.setStreet(request.getStreet());
        company.setStandUnit(request.getStandUnit());
        company.setUsername(userAuthService.findByUsername(userDetails.getUsername()).get());
        companyService.saveCompany(company);
        return ResponseEntity.ok("Registration Successful!");
    }

    @PostMapping("/ethics/add/{id}")
    public ResponseEntity<String> saveEthics(@PathVariable int id, @RequestBody Ethics ethicsData)
    {
        companyService.saveEthics(id, ethicsData);
        return ResponseEntity.ok("");
    }
}