package com.itilria.altograce.controller;
/** 
 * @Author Le-Roy
 * @Date 11/29/2023
*/

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.validation.Errors;
import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.ui.Model;
import java.util.HashMap;
import java.util.Map;

import com.itilria.altograce.service.UserAuthenticationService;
import com.itilria.altograce.service.UserService;
import com.itilria.altograce.domain.User;
import com.itilria.altograce.domain.UserAuthentication;
import com.itilria.altograce.dto.UserForm;
import com.itilria.altograce.dto.AuthForm;

@Controller 
@RequiredArgsConstructor
@RequestMapping("/register")
public class UserRegistrationController
{
    @Autowired
    private UserAuthenticationService userAuthService;

     @Autowired
    private UserService userService;
    
    @GetMapping
    public String registerPage()
    {
        return "register";
    }


    @PostMapping
    public ResponseEntity<String> registerUser(@Valid @RequestBody UserForm request, BindingResult bindingResult)
    {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("Validation errors: " + bindingResult.getAllErrors());
        }

        //check if the email is already registered
        if(userAuthService.findByUsername(request.getEmail()).isPresent()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("Email Address is already registered.");
        }

        //create AuthForm object for authentication 
        AuthForm userAuth = new AuthForm();
        userAuth.setUsername(request.getEmail());
        userAuth.setEmail(request.getEmail());
        userAuth.setPassword(request.getPassword());
        userAuth.setRole(request.getRole());

        //Save UserAuthentication to database
        userAuthService.registerUserAuthentication(userAuth);

        //create User object for user details
        User user = new User();
        user.setName(request.getName());
        user.setSurname(request.getSurname());
        user.setNationality(request.getNationality());
        user.setId_passport(request.getId_passport());
        user.setContact_details1(request.getContact_details1());
        user.setDesignation(request.getDesignation());
        user.setDob(request.getDob());
        user.setHonorofic(request.getHonorofic());
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
        
        return ResponseEntity.ok("");
    }

    @GetMapping("/activate")
    public String activateAccountPage(@RequestParam(name = "email") String email, Model model)
    {
        return "user-activation";
    }

    
    @PostMapping("/activate/account")
    public ResponseEntity<?> activateAccount(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        
        UserAuthentication result = userAuthService.activateAccount(email, password);
        if(result != null)
        {
            // Create a response map
            Map<String, String> response = new HashMap<>();
            response.put("message", "Welcome aboard! Your account has been successfuly activated.");

            // Return the JSON response
            return ResponseEntity.ok(response);
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("The provided email address does not exist");
        }
    }
}