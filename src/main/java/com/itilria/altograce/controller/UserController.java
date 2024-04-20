package com.itilria.altograce.controller;
/**
 * @Author Le-Roy Jongwe
 * @Date 31 December 2023
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
import com.itilria.altograce.dto.ErrorResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.security.Principal;
import com.itilria.altograce.domain.User;
import com.itilria.altograce.domain.UserAuthentication;
import com.itilria.altograce.exception.PasswordMatchException;
import com.itilria.altograce.exception.PasswordMatchExceptionResponseHandler;
import org.springframework.http.ResponseEntity;
import com.itilria.altograce.service.UserService;
import com.itilria.altograce.service.UserAuthenticationService;
import java.util.List;
import com.itilria.altograce.dto.AuthForm;
import com.itilria.altograce.dto.PasswordForm;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
public class UserController
{
    @Autowired
    private UserService userService;

    @Autowired
    private UserAuthenticationService userAuthService;

    @GetMapping("/profile")
    public String userProfile(@AuthenticationPrincipal UserDetails userDetails, Model model)
    {
        model.addAttribute("user", userService.getUserDetails(userDetails.getUsername()));
        return "profile";
    }

    //Update existing user data
    @PutMapping("/profile/update")
    public ResponseEntity<User> updateUserDetails(Model model, @AuthenticationPrincipal UserDetails userDetails, @RequestBody User userForm)
    {
        User updateUser = userService.updateUserDetails(userDetails.getUsername(), userForm);
        if(updateUser != null)
        {
            return ResponseEntity.ok(updateUser);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/email/update")
    public ResponseEntity<?> updateUserEmail(@AuthenticationPrincipal UserDetails userDetails, @RequestBody AuthForm authForm)
    {
        try{
            UserAuthentication updateResult = userAuthService.updateEmail(userDetails.getUsername(), authForm);
            if(updateResult != null)
            {
                return ResponseEntity.ok(updateResult);
            }else{
                return ResponseEntity.notFound().build();
            }
        }catch(PasswordMatchException exception){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("exception.getMessage()");
        }
    }

    @PutMapping("/password/update")
    public ResponseEntity<?> updateUserPassword(@AuthenticationPrincipal UserDetails userDetails, @RequestBody PasswordForm passwordForm)
    {
        try{
            UserAuthentication updateResult = userAuthService.updatePassword(userDetails.getUsername(), passwordForm);
            if(updateResult != null)
            {
                return ResponseEntity.ok(updateResult);
            }else{
                return ResponseEntity.notFound().build();
            }
        }catch(PasswordMatchException exception){
            ErrorResponse errorResponse = new ErrorResponse(exception.getMessage(), HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }
}