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
import com.itilria.altograce.repository.CompanyRepository;
import com.itilria.altograce.repository.AdditionalPolicyRepository;
import com.itilria.altograce.repository.PremiumPolicyRepository;

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

/*-------------------------------------------------------------------------------------------------------*/
    public PremiumPolicy addPremiumPolicy(int id, PremiumPolicy policyData)
    {
        Company company = companyRepository.findById(id).orElse(null);
        if(company != null)
        {
            PremiumPolicy premiumPolicy = new PremiumPolicy();
            premiumPolicy.setPolicyName(policyData.getPolicyName());
            premiumPolicy.setMembersCount(policyData.getMembersCount());
            premiumPolicy.setPremiumAmount(policyData.getPremiumAmount());
            premiumPolicy.setCompanyid(company);
            return premiumPolicyRepository.save(premiumPolicy);
        }else{
            return null;
        }
    }

    public PremiumPolicy updateSubscriptionPlan(int id, PremiumPolicy formData)
    {
        Optional<Company> company = companyRepository.findById(id);
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
        return premiumPolicyRepository.save(subscriptionPlan.get());
    }

    public List<PremiumPolicy> getPackages(int id)
    {
        long count = premiumPolicyRepository.countByCompanyid_Id(id);
        if(count >= 1)
        {
            List<PremiumPolicy> premiumPolicy = premiumPolicyRepository.findByCompanyid_Id(id);
            return premiumPolicy;
        }else{
            return null;
        }
    }

    //get Subscription Plan
    public PremiumPolicy getSubscriptionPlan(int id, PremiumPolicy packData)
    {
        Optional<Company> company = companyRepository.findById(id);
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

    public void deletePackage(int id)
    {
        premiumPolicyRepository.deleteById(id);
    }
/*_____________________________________________________________________________________________*/

    public AdditionalPolicy addOptionalPackage(int id, AdditionalPolicy optionalData)
    {
        Company company = companyRepository.findById(id).orElse(null);
        if(company != null)
        {
            // Assuming optionalPackage is detached from the persistence context
            AdditionalPolicy optionalPackage = new AdditionalPolicy();
            additionalPolicyRepository.save(optionalPackage);

            // Now, you can access the auto-generated ID
            int optionalPackageId = optionalPackage.getId();
            optionalPackage.setPackageName(optionalData.getPackageName());
            optionalPackage.setMembersCount(optionalData.getMembersCount());
            optionalPackage.setPolicyAmount(optionalData.getPolicyAmount());
            optionalPackage.setPackageid(optionalData.getPackageName(), optionalPackageId);
            optionalPackage.setCompanyid(company);
            return additionalPolicyRepository.save(optionalPackage);
        }else{
            return null;
        }
    }

    public List<AdditionalPolicy> getOptionalPackages(int id)
    {
        long count = additionalPolicyRepository.countByCompanyid_Id(id);
        if(count >= 1)
        {
            List<AdditionalPolicy> optionalPackage = additionalPolicyRepository.findByCompanyid_Id(id);
            return optionalPackage;
        }else{
            return null;
        }
    }

    //get Subscription Plan
    public AdditionalPolicy getOptionalSubscriptionPlan(int id, AdditionalPolicy packData)
    {
        Optional<Company> company = companyRepository.findById(id);
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

    public AdditionalPolicy updateOptionalSubscriptionPlan(int id, AdditionalPolicy formData)
    {
        Optional<Company> company = companyRepository.findById(id);
        if(!company.isPresent()){
            throw new IllegalStateException("Company does not exist");
        }

        Optional<AdditionalPolicy> subscriptionPlan = additionalPolicyRepository.findById(formData.getId());
        if(!subscriptionPlan.isPresent())
        {
            throw new IllegalStateException("This subscription plan does not exist");
        }

        subscriptionPlan.get().setPackageName(formData.getPackageName());
        subscriptionPlan.get().setMembersCount(formData.getMembersCount());
        subscriptionPlan.get().setPolicyAmount(formData.getPolicyAmount());
        return additionalPolicyRepository.save(subscriptionPlan.get());
    }

    public void deleteOptionalPackage(int id)
    {
        additionalPolicyRepository.deleteById(id);
    }
}
/*_____________________________________________________________________________________________*/
