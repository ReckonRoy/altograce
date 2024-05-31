/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.itilria.altograce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.itilria.altograce.service.UserService;
/**
 *
 * @author le-roy
 */
@Controller
@RequestMapping("/reception")
public class ReceptionController {
    
    
    @Autowired
    private UserService userService;

    //route to user profile
    @GetMapping("/profile")
    public String userProfile(@AuthenticationPrincipal UserDetails userDetails, Model model)
    {
        model.addAttribute("user", userService.getUserDetails(userDetails.getUsername()));
        return "profile";
    }
    
}
