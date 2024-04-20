package com.itilria.altograce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import com.itilria.altograce.domain.Bank;
import com.itilria.altograce.service.BankService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/bank")
public class BankController
{
    @Autowired
    private BankService bankService;

    @PostMapping("/add/{id}")
    public ResponseEntity<String> addCompanyBankDetails(@PathVariable int id, @RequestBody Bank bankData)
    {
        bankService.addCompanyBankingDetails(id, bankData);
        return ResponseEntity.ok("");
    }
}