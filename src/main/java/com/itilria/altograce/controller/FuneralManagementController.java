package com.itilria.altograce.controller;
/** 
 * @Author Le-Roy
 * @Date 25/03/2024
*/

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

import com.itilria.altograce.domain.UserAuthentication;
import com.itilria.altograce.domain.funeral.Funeral;
import com.itilria.altograce.service.UserAuthenticationService;
import com.itilria.altograce.service.clientservice.ClientService;
import com.itilria.altograce.service.funeralservice.FuneralService;

@Controller 
@RequiredArgsConstructor
@RequestMapping("/funeral")
public class FuneralManagementController
{
    @Autowired
    private FuneralService funeralService;

    @Autowired
    private ClientService clientService;

    @Autowired
    private UserAuthenticationService userAuthService;


/*---------------------------------------Funerals Entry Page-----------------------------------------*/
    //route to funeral entry page
    @GetMapping("/management")
    public String homePage()
    {
        return "/client-template/funeral-management";
    }

/*--------------------------------------------------------------Logic related routes-----------------------------------------*/
    @PostMapping("/add/{fileId}")
    public ResponseEntity<?> addDeceased(@AuthenticationPrincipal UserDetails userDetails, @PathVariable String fileId, @RequestBody Funeral request)
    {
        //get user id and companyId
        UserAuthentication result = userAuthService.findByUsername(userDetails.getUsername()).get();
        Funeral funeralResult = funeralService.addFuneral(fileId, request);
        if(funeralResult != null){
            clientService.staffAudit("ADDED FUNERAL SERVICE", result.getCompanyId(), fileId, result.getId());
            return ResponseEntity.ok(funeralResult);
        }else{
            return new ResponseEntity<>("Failed to add data", HttpStatus.BAD_REQUEST);
        }
    }
    
/*---------------------------------------------------Dashbord Upcoming Fuenrals Route------------------------------------------*/ 
    @GetMapping("/upcoming/funerals")
    public ResponseEntity<?> getUpComingFunerals(@AuthenticationPrincipal UserDetails userDetails)
    {
        
        List<Funeral> funeralResult  = funeralService.getUpcomingFuneralsWithinTwoWeeks(userDetails.getUsername());
        if(funeralResult != null)
        {
            return ResponseEntity.ok(funeralResult);
        }else{
            Map<String, String> message = new HashMap<>();
            message.put("message", "no upcoming funerals to display");
            return ResponseEntity.ok(message);
        }
    }
}