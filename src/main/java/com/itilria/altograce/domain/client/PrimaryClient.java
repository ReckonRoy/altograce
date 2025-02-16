package com.itilria.altograce.domain.client;

/**
 * @Author Le-Roy
 * @Date 28 February 2024
 * @Description Entity class for main client member details.
 */
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.itilria.altograce.domain.Company;
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
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class PrimaryClient{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    @Column(name="TITLE")
    private String title;

    @Column(name="NAME")
    private String name;

    @Column(name="SURNAME")
    private String lastName;
    
    private String initials;

    private String id_passport;
    @Column(nullable = true)
    private String gender;

    private LocalDate dob;

    private String activationStatus;

    private String email;
    private String phoneContact1;
    private String phoneContact2;

    private int waitPeriod;
    private String province;
    private String address;

    private LocalDate recordEntryDate;

    @JsonIgnore
    @OneToMany(mappedBy = "primaryClient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClientDependency> clientDependency;
    
    @JsonIgnore
    @OneToMany(mappedBy = "primaryClient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Funeral> funeralManagement;

    @JsonIgnore
    @OneToMany(mappedBy = "primaryClient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PrimaryPackageSubscription> primaryPackSub;

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
}