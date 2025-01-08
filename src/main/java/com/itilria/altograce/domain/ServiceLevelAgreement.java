package com.itilria.altograce.domain;

/**
 * @Author Le-Roy
 * @Date 19 December 2023
 * @Description Entity class that stores company SLA.
 * Service level agreement a contract that details the services that will be rendered 
 * for a client. once a client has accepeted the contract. The contract will be there 
 * to safe guard the afore mentioned terms for both parties. If there is a bridge in the 
 * contract lawful actions will be taken to settle the matters
 */

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Table(name="SLA")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ServiceLevelAgreement
{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    @Column(name="SLA")
    private String sla;

    /*
    @Column(name="DATE_OF_SERVICEACCEPTANCE")
    private Date dosa;

    @Column(name="DATE_OF_SERVICETERMINATION")
    private Date dost;

    @OneToOne
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Client client;
    */

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    private Company company;
}