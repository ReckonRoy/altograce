package com.itilria.altograce.service;

import java.math.BigDecimal;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itilria.altograce.domain.UserAuthentication;
import com.itilria.altograce.domain.client.ClientBilling;
import com.itilria.altograce.domain.client.PrimaryClient;
import com.itilria.altograce.repository.CompanyRepository;
import com.itilria.altograce.repository.UserAuthenticationRepository;
import com.itilria.altograce.repository.clientrepository.ClientBillingRepository;
import com.itilria.altograce.repository.clientrepository.ClientRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class DashboardService {
	@Autowired
	private ClientRepository clientRepository;
	@Autowired
	private ClientBillingRepository billingRepository;
	@Autowired
    private CompanyRepository companyRepository;
    @Autowired 
    private UserAuthenticationRepository userAuthRepository;
	
	public Map<String, Object> getStats(String username) {
		//check if staff is registered in database 
    	UserAuthentication userAuth = userAuthRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Access denied! Please login."));
    	
    	//check if staff belongs to this company
        companyRepository.findById(userAuth.getCompanyId())
                .orElseThrow(() -> new IllegalArgumentException("Access denied! Please login."));

		long companyId = userAuth.getCompanyId();
        List<PrimaryClient> clients = clientRepository.findByCompanyId_Id(companyId);
        //List<PrimaryClient> overdue = clientRepository.findByBalanceGreaterThan(BigDecimal.ZERO);
        int totalClients = clients.size();
        int activeClients = (int) clients.stream()
        		.filter(c -> "ACTIVATED".equalsIgnoreCase(c.getActivationStatus()))
        		.count();
        int inactiveClients = (int) clients.stream()
        		.filter(c -> "INACTIVE".equalsIgnoreCase(c.getActivationStatus()))
        		.count();
        
        int clientsInErrears = ( int ) clients.stream()
        		.filter(client -> {
        		    List<ClientBilling> billings = client.getClientBilling();
        		    if (billings == null || billings.isEmpty()) return 
        		        "ACTIVE".equalsIgnoreCase(client.getActivationStatus());

        		    LocalDate lastPaymentDate = billings.stream()
        		            .map(ClientBilling::getPaymentDate)
        		            .max(LocalDate::compareTo)
        		            .orElse(null);

        		    if (lastPaymentDate == null) return 
        		        "ACTIVE".equalsIgnoreCase(client.getActivationStatus());

        		    // Only count active clients whose last payment is > 3 months ago
        		    return "ACTIVE".equalsIgnoreCase(client.getActivationStatus())
        		            && lastPaymentDate.isBefore(LocalDate.now().minusMonths(3));
        		})
        		.count();
        
        // 🔹 Sum of all payments
        List<ClientBilling> income = billingRepository.findAll();
	    BigDecimal monthlyRevenue = income.stream()
	            .map(b -> Optional.ofNullable(b.getAmountPaid()).orElse(BigDecimal.ZERO))
	            .reduce(BigDecimal.ZERO, BigDecimal::add);
	    
        return Map.of(
            "totalClients", totalClients,
            "activeClients", activeClients,
            "inactiveClients", inactiveClients,
            "clientsInErrears", clientsInErrears,
            "monthlyIncome", monthlyRevenue
        );
    }
}
