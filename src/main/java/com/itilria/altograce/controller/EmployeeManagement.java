package com.itilria.altograce.controller;
/** 
 * @Author Le-Roy
 * @Date 11/29/2023
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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


import com.itilria.altograce.service.UserAuthenticationService;
import com.itilria.altograce.service.UserService;
import com.itilria.altograce.domain.User;
import com.itilria.altograce.domain.EmployeeLeave;
import com.itilria.altograce.domain.UserAuthentication;
import com.itilria.altograce.dto.UserForm;
import com.itilria.altograce.dto.AuthForm;

@Controller 
@RequiredArgsConstructor
@RequestMapping("/hr")
public class EmployeeManagement
{
    @Autowired
    private UserAuthenticationService userAuthService;

    @Autowired
    private UserService userService;

    @GetMapping("/employee-management")
    public String staffManagementPage()
    {
        return "staffmanagement";
    }
/*----------------------------------GET EMPLOYEES--------------------------------------*/
    @GetMapping("/employee-management/employees/{comId}")
    public ResponseEntity<?> getEmployees(@PathVariable int comId)
    {
        List<UserForm> result = userService.getEmployees(comId);
        if(result != null)
        {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("No employees found!", HttpStatus.NO_CONTENT);
        }
    }
/*_________________________________________________________________________________________________________________*/

/*--------------------------------------------------ADD EMPLOYEE--------------------------------------------------*/
    @PostMapping("/employee-management/register/{companyId}")
    public ResponseEntity<String> register(@PathVariable int companyId, @RequestBody UserForm request)
    {
        /*
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("Validation errors: " + bindingResult.getAllErrors());
        }
        */

        //check if the email is already registered
        if(userAuthService.findByUsername(request.getEmail()).isPresent()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("Email Address is already registered.");
        }

        //create AuthForm object for authentication 
        AuthForm userAuth = new AuthForm();
        userAuth.setUsername(request.getEmail());
        userAuth.setEmail(request.getEmail());
        userAuth.setRole(request.getRole());

        // Validate and process registrationRequest (create UserCredentials and UserInfo objects)
        if(userAuthService.employeeRegistration(companyId, userAuth) != null)
        {
            //create User object for user details
            User user = new User();
            user.setName(request.getName());
            user.setSurname(request.getSurname());
            user.setNationality(request.getNationality());
            user.setId_passport(request.getId_passport());
            user.setContact_details1(request.getContact_details1());
            user.setDesignation(request.getDesignation());
            user.setHonorofic(request.getHonorofic());
            user.setMaritalStatus(request.getMaritalStatus());
            user.setEthnicity(request.getEthnicity());
            user.setGender(request.getGender());
            user.setCountry(request.getCountry());
            user.setProvince(request.getProvince());
            user.setCity(request.getCity());
            user.setPost_code(request.getPostCode());
            user.setStreet(request.getStreet());
            user.setStand_unit(request.getStandUnit());
            user.setAuthid(userAuthService.findByUsername(request.getEmail()).get());
            userService.registerUser(user);
            return ResponseEntity.ok("Registration successful. Activation email sent.");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("Failed to save user information.");
        }
        
    }
/*_________________________________________________________________________________________________________*/

/*-----------------------------------Employee Vacation------------------------------------------*/
    //Employee Add Vacation Route
    @PostMapping("/employee-management/vacation/{comId}")
    @ResponseBody
    public ResponseEntity<?> addVacation(@AuthenticationPrincipal UserDetails userDetails, @PathVariable int comId, @RequestBody Map<String, String> request){

        try{
            //get user id and companyId
            //UserAuthentication result = userAuthService.findByUsername(userDetails.getUsername()).get();
            boolean vacationResult = userService.addVacation(comId, request);
            if(vacationResult!=true)
            {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong.Please try again later!");
            }else{
                return ResponseEntity.ok("Vacation added successfully.");
            }
        }catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error occurred.");
        }
    }
}