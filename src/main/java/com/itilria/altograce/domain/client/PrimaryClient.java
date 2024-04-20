package com.itilria.altograce.domain.client;

/**
 * @Author Le-Roy
 * @Date 28 February 2024
 * @Description Entity class for main client member details.
 */
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.*;
import com.itilria.altograce.domain.Company;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

import com.itilria.altograce.domain.funeral.Funeral;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class PrimaryClient{
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    private String clientid;

    @Transient
    private String residentialAddress;

    @Column(name="TITLE", nullable=false)
    private String title;

    @Column(name="NAME", nullable=false)
    private String name;

    @Column(name="SURNAME", nullable=false)
    private String lastName;
    
    @Column(nullable=true)
    private String initials;

    @Column(nullable=false)
    private String id_passport;

    @Column(nullable=false)
    private String gender;

    private LocalDate dob;

    private String maritalStatus;
    private String activationStatus;

    private String email;
    private String countryCode;
    private int cellNumber;
    private int homeNumber;
    private int telephone;

    private String country;
    private String province;
    private String city;
    private String postCode;
    private String street;
    private String standUnit;

    private LocalDate recordEntryDate;

    @JsonIgnore
    @OneToMany(mappedBy = "primaryClient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClientDependency> clientDependency;
    
    @JsonIgnore
    @OneToMany(mappedBy = "primaryClient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Funeral> funeralManagement;

    @JsonIgnore
    @OneToOne(mappedBy = "primaryClient", cascade = CascadeType.ALL, orphanRemoval = true)
    private PrimaryPackageSubscription primaryPackSub;

    @JsonIgnore
    @OneToMany(mappedBy = "primaryClient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClientBilling> clientBilling;

    @JsonIgnore
    @OneToMany(mappedBy = "primaryClient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Deceased> deceased;

    @JsonIgnore
    @OneToMany(mappedBy = "primaryClient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SecondaryPackageSubscription> secondaryPackSub;

    private String clientActivation;
    private LocalDate dateOfCover;
    
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "companyId", referencedColumnName = "id")
    private Company company;

    public void setResidentialAddress()
    {
        String street = this.getStreet();
        String standUnit = this.getStandUnit();
        this.residentialAddress = String.format("Street: %s, Stand unit/House number: %s", street, standUnit);
    }

    //clientId comprises of CompanyId, clientId_Passport, 
    public void setClientId(int companyId, String idPassport)
    {
        String id_passport = idPassport.substring(0, 4);
        this.clientid = companyId + "" + id_passport;
    }
}