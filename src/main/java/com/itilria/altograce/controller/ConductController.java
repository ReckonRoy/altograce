package com.itilria.altograce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import com.itilria.altograce.domain.CodeOfConduct;
import com.itilria.altograce.service.ConductService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/codeofconduct")
public class ConductController
{
    @Autowired
    private ConductService conductService;

    @PostMapping("/add/{id}")
    public ResponseEntity<String> addCodeOfConduct(@PathVariable int id, @RequestBody CodeOfConduct cocData)
    {
        conductService.addCodeOfConduct(id, cocData);
        return ResponseEntity.ok("Code of Conduct been successfuly saved");
    }
}