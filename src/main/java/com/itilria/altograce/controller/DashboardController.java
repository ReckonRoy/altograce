package com.itilria.altograce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.itilria.altograce.service.DashboardService;

import java.util.Map;

import lombok.RequiredArgsConstructor;

@Controller 
@RequiredArgsConstructor
@RequestMapping("/dashboard")
public class DashboardController {
	
	@Autowired
    private DashboardService dashboardService;

     
	@GetMapping("/stats")
	public ResponseEntity<?> getStats(@AuthenticationPrincipal UserDetails userDetails)
    {
        try {
        	Map<String, Object> result = dashboardService.getStats(userDetails.getUsername());
        	return ResponseEntity.ok(result);
        }catch(Exception ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

}
