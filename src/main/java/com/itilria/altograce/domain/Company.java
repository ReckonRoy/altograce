package com.itilria.altograce.domain;

/**
 * @Author Le-Roy
 * @Date 5 December 2023
 * @Description Entity class that stores company details, owner etc
 */

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.itilria.altograce.domain.client.ClientSettings;
import com.itilria.altograce.domain.client.PrimaryClient;
import com.itilria.altograce.domain.funeral.Funeral;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Company
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="CO_NAME")
    private String name;

    @Column(name="reg_number")
    private String regNumber;

    @Column(name="CO_TAX_NUMBER")
    private String taxNumber;

    @Column(name="CO_FSP_NUMBER")
    private String fspNumber;

    @Column(name="CO_EMAIL")
    private String email;

    @Column(name = "CO_INITIALS")
    private String initials;

    @Column(name="CO_COUNTRY_CODE")
    private String countryCode;

    @Column(name="CO_CONTACT_1")
    private String contact1;

    @Column(name="CO_CONTACT_2")
    private String contact2;

    @Column(name="CO_CONTACT_3")
    private String contact3;

    @Column(name="CO_COUNTRY")
    private String country;

    @Column(name="CO_PROVINCE")
    private String province;

    @Column(name="CO_CITY")
    private String city;

    @Column(name="CO_POST_CODE")
    private int postCode;

    @Column(name="CO_STREET")
    private String street;

    @Column(name="CO_STAND_UNIT")
    private String standUnit;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "username", referencedColumnName = "username")
    private UserAuthentication username;

    @JsonIgnore
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PrimaryClient> primaryClient;
    
    @JsonIgnore
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Funeral> funeral;

    @JsonIgnore
    @OneToOne(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private ClientSettings clientSettings;


    @JsonIgnore
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BranchCompany> branchCompany;

    @JsonIgnore
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EmployeeLeave> employeeLeave;

    @JsonIgnore
    @OneToMany(mappedBy = "companyid", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PremiumPolicy> servicePackage;

    @JsonIgnore
    @OneToMany(mappedBy = "companyid", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AdditionalPolicy> optionalPackage;

    @JsonIgnore
    @OneToOne(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private Bank bank;

    @JsonIgnore
    @OneToOne(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private ServiceLevelAgreement sla;

    @JsonIgnore
    @OneToOne(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private CodeOfConduct codeOfConduct;

    @JsonIgnore
    @OneToOne(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private Ethics ethics;
}