package com.itilria.altograce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import com.itilria.altograce.domain.ServiceLevelAgreement;
import com.itilria.altograce.service.SlaService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/sla")
public class SlaController
{
    @Autowired
    private SlaService slaService;

    @PostMapping("/add/{id}")
    public ResponseEntity<String> addCompanySla(@PathVariable int id, @RequestBody ServiceLevelAgreement slaData)
    {
        slaService.addCompanySla(id, slaData);
        return ResponseEntity.ok("Service Level Agreement details have been successfuly saved");
    }
}