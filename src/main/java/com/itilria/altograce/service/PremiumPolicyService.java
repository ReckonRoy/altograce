package com.itilria.altograce.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itilria.altograce.domain.Company;
import com.itilria.altograce.domain.AdditionalPolicy;
import com.itilria.altograce.domain.PremiumPolicy;
import com.itilria.altograce.domain.UserAuthentication;
import com.itilria.altograce.repository.CompanyRepository;
import com.itilria.altograce.repository.AdditionalPolicyRepository;
import com.itilria.altograce.repository.PremiumPolicyRepository;
import com.itilria.altograce.repository.UserAuthenticationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PremiumPolicyService{

    @Autowired
    private PremiumPolicyRepository premiumPolicyRepository;

    @Autowired
    private AdditionalPolicyRepository additionalPolicyRepository;

    @Autowired
    private CompanyRepository companyRepository;
    
    @Autowired
    private UserAuthenticationRepository userAuthenticationRepository;

/*-------------------------------------------------------------------------------------------------------*/
    //habndle add premium policy
    public PremiumPolicy addPremiumPolicy(String username, PremiumPolicy policyData)
    {
        UserAuthentication userAuth = userAuthenticationRepository.findByUsername(username).orElse(null);
        Optional<Company> company = companyRepository.findById(userAuth.getCompanyId());
        if(userAuth != null)
        {
            PremiumPolicy premiumPolicy = new PremiumPolicy();
            premiumPolicy.setPolicyName(policyData.getPolicyName());
            premiumPolicy.setMembersCount(policyData.getMembersCount());
            premiumPolicy.setPremiumAmount(policyData.getPremiumAmount());
            premiumPolicy.setMinAge(policyData.getMinAge());
            premiumPolicy.setMaxAge(policyData.getMaxAge());
            premiumPolicy.setLapsePeriod(policyData.getLapsePeriod());
            premiumPolicy.setWaitPeriod(policyData.getWaitPeriod());
            premiumPolicy.setPolicyBenefits(policyData.getPolicyBenefits());
            premiumPolicy.setCompanyid(company.get());
            return premiumPolicyRepository.save(premiumPolicy);
        }else{
            return null;
        }
    }
    
    //handle get policies
    public List<PremiumPolicy> getPackages(String username)
    {
        UserAuthentication userAuth = userAuthenticationRepository.findByUsername(username).orElse(null);
        long count = premiumPolicyRepository.countByCompanyid_Id(userAuth.getCompanyId());
        if(count >= 1)
        {
            List<PremiumPolicy> premiumPolicy = premiumPolicyRepository.findByCompanyid_Id(userAuth.getCompanyId());
            return premiumPolicy;
        }else{
            return null;
        }
    }

    public PremiumPolicy updateSubscriptionPlan(String username, PremiumPolicy formData)
    {
        
        UserAuthentication userAuth = userAuthenticationRepository.findByUsername(username).orElse(null);
        Optional<Company> company = companyRepository.findById(userAuth.getCompanyId());
        if(!company.isPresent()){
            throw new IllegalStateException("Company does not exist");
        }

        Optional<PremiumPolicy> subscriptionPlan = premiumPolicyRepository.findById(formData.getId());
        if(!subscriptionPlan.isPresent())
        {
            throw new IllegalStateException("This subscription plan does not exist");
        }

        subscriptionPlan.get().setPolicyName(formData.getPolicyName());
        subscriptionPlan.get().setMembersCount(formData.getMembersCount());
        subscriptionPlan.get().setPremiumAmount(formData.getPremiumAmount());
        subscriptionPlan.get().setMinAge(formData.getMinAge());
        subscriptionPlan.get().setMaxAge(formData.getMaxAge());
        subscriptionPlan.get().setLapsePeriod(formData.getLapsePeriod());
        subscriptionPlan.get().setWaitPeriod(formData.getWaitPeriod());
        subscriptionPlan.get().setPolicyBenefits(formData.getPolicyBenefits());
        return premiumPolicyRepository.save(subscriptionPlan.get());
    }

    //get Subscription Plan
    public PremiumPolicy getPremiumPolicy(String username, PremiumPolicy packData)
    {
        UserAuthentication userAuth = userAuthenticationRepository.findByUsername(username).orElse(null);
        Optional<Company> company = companyRepository.findById(userAuth.getCompanyId());
        if(!company.isPresent()){
            throw new IllegalStateException("Company does not exist");
        }

        Optional<PremiumPolicy> subscriptionPlan = premiumPolicyRepository.findById(packData.getId());
        if(!subscriptionPlan.isPresent())
        {
            throw new IllegalStateException("This subscription plan does not exist");
        }

        return subscriptionPlan.get();
    }

    public void deletePackage(long id)
    {
        premiumPolicyRepository.deleteById(id);
    }
/*_____________________________________________________________________________________________*/

    public AdditionalPolicy addAdditionalPolicy(String username, AdditionalPolicy policyData)
    {
        UserAuthentication userAuth = userAuthenticationRepository.findByUsername(username).orElse(null);
        Optional<Company> company = companyRepository.findById(userAuth.getCompanyId());
        if(company != null)
        {
            // Assuming optionalPackage is detached from the persistence context
            AdditionalPolicy additionalPolicy = new AdditionalPolicy();
            additionalPolicy.setPolicyName(policyData.getPolicyName());
            additionalPolicy.setMembersCount(policyData.getMembersCount());
            additionalPolicy.setPolicyAmount(policyData.getPolicyAmount());
            additionalPolicy.setMinAge(policyData.getMinAge());
            additionalPolicy.setMaxAge(policyData.getMaxAge());
            additionalPolicy.setLapsePeriod(policyData.getLapsePeriod());
            additionalPolicy.setWaitPeriod(policyData.getWaitPeriod());
            additionalPolicy.setPolicyBenefits(policyData.getPolicyBenefits());
            additionalPolicy.setCompanyid(company.get());
            return additionalPolicyRepository.save(additionalPolicy);
        }else{
            return null;
        }
    }

    public List<AdditionalPolicy> getAllAdditionalPolicies(String username)
    {
        UserAuthentication userAuth = userAuthenticationRepository.findByUsername(username).orElse(null);
        Optional<Company> company = companyRepository.findById(userAuth.getCompanyId());
        if(!company.isPresent())
        {
            return null;
        }else{
             List<AdditionalPolicy> optionalPackage = additionalPolicyRepository.findByCompanyid_Id(userAuth.getCompanyId());
            return optionalPackage;
        }
    }

    //get Subscription Plan
    public AdditionalPolicy getAdditionalPolicy(String username, AdditionalPolicy packData)
    {
        UserAuthentication userAuth = userAuthenticationRepository.findByUsername(username).orElse(null);
        Optional<Company> company = companyRepository.findById(userAuth.getCompanyId());
        if(!company.isPresent()){
            throw new IllegalStateException("Company does not exist");
        }

        Optional<AdditionalPolicy> optionalPlan = additionalPolicyRepository.findById(packData.getId());
        if(!optionalPlan.isPresent())
        {
            throw new IllegalStateException("This subscription plan does not exist");
        }

        return optionalPlan.get();
    }

    public AdditionalPolicy updateAdditionalPolicy(String username, AdditionalPolicy policyData)
    {
        UserAuthentication userAuth = userAuthenticationRepository.findByUsername(username).orElse(null);
        Optional<Company> company = companyRepository.findById(userAuth.getCompanyId());
        if(!company.isPresent()){
            throw new IllegalStateException("Company does not exist");
        }

        Optional<AdditionalPolicy> subscriptionPlan = additionalPolicyRepository.findById(policyData.getId());
        if(!subscriptionPlan.isPresent())
        {
            throw new IllegalStateException("This Policy Plan does not exist");
        }

        subscriptionPlan.get().setPolicyName(policyData.getPolicyName());
        subscriptionPlan.get().setMembersCount(policyData.getMembersCount());
        subscriptionPlan.get().setPolicyAmount(policyData.getPolicyAmount());
        subscriptionPlan.get().setMinAge(policyData.getMinAge());
        subscriptionPlan.get().setMaxAge(policyData.getMaxAge());
        subscriptionPlan.get().setLapsePeriod(policyData.getLapsePeriod());
        subscriptionPlan.get().setWaitPeriod(policyData.getWaitPeriod());
        subscriptionPlan.get().setPolicyBenefits(policyData.getPolicyBenefits());
        return additionalPolicyRepository.save(subscriptionPlan.get());
    }

    public void deleteOptionalPackage(long id)
    {
        additionalPolicyRepository.deleteById(id);
    }
}
/*_____________________________________________________________________________________________*/
