package com.itilria.altograce.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itilria.altograce.domain.Company;
import com.itilria.altograce.domain.OptionalPackage;
import com.itilria.altograce.domain.ProductItem;
import com.itilria.altograce.domain.ProductService;
import com.itilria.altograce.domain.ServicePackage;
import com.itilria.altograce.repository.CompanyRepository;
import com.itilria.altograce.repository.OptionalPackageRepository;
import com.itilria.altograce.repository.ProductItemRepository;
import com.itilria.altograce.repository.ProductServiceRepository;
import com.itilria.altograce.repository.ServicePackageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PackageService{

    @Autowired
    private ServicePackageRepository packageRepository;

    @Autowired
    private OptionalPackageRepository optionalPackageRepository;

    @Autowired
    private ProductItemRepository itemRepository;

    @Autowired
    private ProductServiceRepository serviceRepository;

    @Autowired
    private CompanyRepository companyRepository;

/*-------------------------------------------------------------------------------------------------------*/
    public ServicePackage addPackage(int id, ServicePackage packData)
    {
        Company company = companyRepository.findById(id).orElse(null);
        if(company != null)
        {
            ServicePackage servPackage = new ServicePackage();
            servPackage.setPackageName(packData.getPackageName());
            servPackage.setMembersCount(packData.getMembersCount());
            servPackage.setPrice(packData.getPrice());
            servPackage.setCompanyid(company);
            return packageRepository.save(servPackage);
        }else{
            return null;
        }
    }

    public List<ServicePackage> getPackages(int id)
    {
        long count = packageRepository.countByCompanyid_Id(id);
        if(count >= 1)
        {
            List<ServicePackage> servicePackage = packageRepository.findByCompanyid_Id(id);
            return servicePackage;
        }else{
            return null;
        }
    }

    //get Subscription Plan
    public ServicePackage getSubscriptionPlan(int id, ServicePackage packData)
    {
        Optional<Company> company = companyRepository.findById(id);
        if(!company.isPresent()){
            throw new IllegalStateException("Company does not exist");
        }

        Optional<ServicePackage> subscriptionPlan = packageRepository.findById(packData.getId());
        if(!subscriptionPlan.isPresent())
        {
            throw new IllegalStateException("This subscription plan does not exist");
        }

        return subscriptionPlan.get();
    }

    public void deletePackage(int id)
    {
        packageRepository.deleteById(id);
    }
/*_____________________________________________________________________________________________*/

public OptionalPackage addOptionalPackage(int id, OptionalPackage optionalData)
    {
        Company company = companyRepository.findById(id).orElse(null);
        if(company != null)
        {
            // Assuming optionalPackage is detached from the persistence context
            OptionalPackage optionalPackage = new OptionalPackage();
            optionalPackageRepository.save(optionalPackage);

            // Now, you can access the auto-generated ID
            int optionalPackageId = optionalPackage.getId();
            optionalPackage.setPackageName(optionalData.getPackageName());
            optionalPackage.setMembersCount(optionalData.getMembersCount());
            optionalPackage.setPrice(optionalData.getPrice());
            optionalPackage.setPackageid(optionalData.getPackageName(), optionalPackageId);
            optionalPackage.setCompanyid(company);
            return optionalPackageRepository.save(optionalPackage);
        }else{
            return null;
        }
    }

    public List<OptionalPackage> getOptionalPackages(int id)
    {
        long count = optionalPackageRepository.countByCompanyid_Id(id);
        if(count >= 1)
        {
            List<OptionalPackage> optionalPackage = optionalPackageRepository.findByCompanyid_Id(id);
            return optionalPackage;
        }else{
            return null;
        }
    }

    //get Subscription Plan
    public OptionalPackage getOptionalSubscriptionPlan(int id, ServicePackage packData)
    {
        Optional<Company> company = companyRepository.findById(id);
        if(!company.isPresent()){
            throw new IllegalStateException("Company does not exist");
        }

        Optional<OptionalPackage> optionalPlan = optionalPackageRepository.findById(packData.getId());
        if(!optionalPlan.isPresent())
        {
            throw new IllegalStateException("This subscription plan does not exist");
        }

        return optionalPlan.get();
    }

    public void deleteOptionalPackage(int id)
    {
        optionalPackageRepository.deleteById(id);
    }
/*_____________________________________________________________________________________________*/
/**************************************Handle Item**********************************************/

    public List<ProductItem> getItems(int id, ProductItem itemData)
    {
        if(itemData.getPackageType().equals("standard"))
        {
            long count = itemRepository.countByServicePackage_Id(id);
            if(count >= 1)
            {
                List<ProductItem> item = itemRepository.findByServicePackage_Id(id);
                return item;
            }
        }else if(itemData.getPackageType().equals("optional")){
            long count = itemRepository.countByOptionalPackage_Id(id);
            if(count >= 1)
            {
                List<ProductItem> item = itemRepository.findByOptionalPackage_Id(id);
                return item;
            }
        }
        return null;
    }

    public ProductItem addItem(int id, ProductItem itemData)
    {
        ProductItem item = new ProductItem();
        if(itemData.getPackageType().equals("standard"))
        {
            ServicePackage standardPackage = packageRepository.findById(id).orElse(null);
            item.setServicePackage(standardPackage);
        }else if(itemData.getPackageType().equals("optional")){
            OptionalPackage optionalPackage = optionalPackageRepository.findById(id).orElse(null);
            item.setOptionalPackage(optionalPackage);
        }

        item.setItemName(itemData.getItemName());
        item.setItemQuantity(itemData.getItemQuantity());

        if(itemData.getPrice() != null){
            item.setPrice(itemData.getPrice());
        }else{
            item.setPrice(BigDecimal.valueOf(0.00));
        }
        return itemRepository.save(item);
    }

    public void deleteItem(int id)
    {
        itemRepository.deleteById(id);
    }

/**************************************Handle Service********************************************/  
    public List<ProductService> getServices(int id, ProductService serviceData)
    {
        if(serviceData.getPackageType().equals("standard"))
        {
            long count = serviceRepository.countByServicePackage_Id(id);
            if(count >= 1)
            {
                List<ProductService> service = serviceRepository.findByServicePackage_Id(id);
                return service;
            }
        }else if(serviceData.getPackageType().equals("optional")){
            long count = serviceRepository.countByOptionalPackage_Id(id);
            if(count >= 1)
            {
                List<ProductService> service = serviceRepository.findByOptionalPackage_Id(id);
                return service;
            }
        }
        return null;
    }

    public ProductService addService(int id, ProductService serviceData)
    {
        
        ProductService service = new ProductService();
        //determine repository to use
        if(serviceData.getPackageType().equals("standard"))
        {
            ServicePackage standardPackage = packageRepository.findById(id).orElse(null);
            service.setServicePackage(standardPackage);
        }else if(serviceData.getPackageType().equals("optional")){
            OptionalPackage optionalPackage = optionalPackageRepository.findById(id).orElse(null);
            service.setOptionalPackage(optionalPackage);
        }

        service.setServiceName(serviceData.getServiceName());
        service.setDescription(serviceData.getDescription());
        return serviceRepository.save(service);
    }  

    public void deleteService(int id)
    {
        serviceRepository.deleteById(id);
    }
}