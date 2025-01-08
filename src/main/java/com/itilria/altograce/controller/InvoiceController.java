package com.itilria.altograce.controller;
/** 
 * @Author Le-Roy
 * @Date 25/03/2024
*/

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.itilria.altograce.domain.funeral.Invoice;
import com.itilria.altograce.service.funeralservice.InvoiceService;

import lombok.RequiredArgsConstructor;

@Controller 
@RequiredArgsConstructor
@RequestMapping("/invoice")
public class InvoiceController
{
  
  @Autowired
  private InvoiceService invoiceService;

  @GetMapping("/add/funeral-invoice/{identityNumber}")
  public ResponseEntity<?> addFuneralInvoice(@AuthenticationPrincipal UserDetails userDetails, @PathVariable String identityNumber){
    try{
      Invoice invoiceResult = invoiceService.createFuneralInvoice(identityNumber, userDetails.getUsername());
      return ResponseEntity.ok(invoiceResult);
    }catch(IllegalStateException exception){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }
  }
}