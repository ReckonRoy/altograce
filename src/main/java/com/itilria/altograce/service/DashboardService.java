package com.itilria.altograce.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.itilria.altograce.domain.UserAuthentication;
import com.itilria.altograce.domain.client.ClientBilling;
import com.itilria.altograce.domain.client.PrimaryClient;
import com.itilria.altograce.repository.CompanyRepository;
import com.itilria.altograce.repository.UserAuthenticationRepository;
import com.itilria.altograce.repository.clientrepository.ClientBillingRepository;
import com.itilria.altograce.repository.clientrepository.ClientRepository;

public class DashboardService {
	private final ClientRepository clientRepository;
	private final ClientBillingRepository billingRepository;
	@Autowired
    private CompanyRepository companyRepository;
    @Autowired 
    private UserAuthenticationRepository userAuthRepository;

	public DashboardService(ClientRepository clientRepository, ClientBillingRepository billingRepository) {
        this.clientRepository = clientRepository;
        this.billingRepository = billingRepository;
    }
	
	public Map<String, Object> getStats(String username) {
		//check if staff is registered in database 
    	UserAuthentication userAuth = userAuthRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Access denied! Please login."));
    	
    	//check if staff belongs to this company
        companyRepository.findById(userAuth.getCompanyId())
                .orElseThrow(() -> new IllegalArgumentException("Access denied! Please login."));

		
        List<PrimaryClient> clients = clientRepository.findAll();
        //List<PrimaryClient> overdue = clientRepository.findByBalanceGreaterThan(BigDecimal.ZERO);
        int totalClients = clients.size();
        //int overdueCount = overdue.size();
        
        // 🔹 Sum of all payments
        List<ClientBilling> income = billingRepository.findAll();
	    BigDecimal monthlyRevenue = income.stream()
	            .map(b -> Optional.ofNullable(b.getAmountPaid()).orElse(BigDecimal.ZERO))
	            .reduce(BigDecimal.ZERO, BigDecimal::add);
	    
        return Map.of(
            "totalClients", totalClients,
            //"overdueCount", overdueCount,
            "monthlyIncome", monthlyRevenue
        );
    }
}
