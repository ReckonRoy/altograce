package com.itilria.altograce.domain.funeral;

/**
 * @Author Le-Roy
 * @Date 28 February 2024
 * @Description Entity class for main client member details.
 */
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.itilria.altograce.domain.Company;
import com.itilria.altograce.domain.client.PrimaryClient;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "funeral_management")
public class Funeral{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "client_name")
    private String clientName;

    @Column(name = "date_of_collection")
    private LocalDate dateOfCollection;

    @Column(name = "place_of_death")
    private String placeOfDeath;

    @Column(name = "name_of_deceased")
    private String nameOfDeceased;

    @Column(name = "identity_number")
    private String identityNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "informant")
    private String informant;

    @Column(name = "tel_number")
    private String telNumber;

    @Column(name = "cemetery")
    private String cemetery;

    private String graveNumber;
    private String biNumber;

    @Column(name = "re_open_new_grave")
    private String reOpenNewGrave;

    @Column(name = "total_service_amount")
    private BigDecimal totalServiceAmount;

    @Column(name = "deposit")
    private BigDecimal deposit;

    @Column(name = "balance_due")
    private BigDecimal balanceDue;

    @Column(name = "date_of_burial")
    private LocalDate dateOfBurial;

    @Column(name = "time_of_burial")
    private LocalTime timeOfBurial;

    private LocalDate recordEntryDate;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "primaryClient", referencedColumnName = "id")
    private PrimaryClient primaryClient;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company", referencedColumnName = "id")
    private Company company;
    private int companyid;

    @JsonIgnore
    @OneToOne(mappedBy = "funeral", cascade = CascadeType.ALL, orphanRemoval = true)
    private Invoice invoice;
}