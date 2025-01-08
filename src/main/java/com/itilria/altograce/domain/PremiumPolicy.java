package com.itilria.altograce.domain;

/**
 * @Author Le-Roy
 * @Date 22 December 2023
 * @Description Entity class that stores ethics.
 */

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PremiumPolicy{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    @Column(nullable = true)
    private String policyId;
    @Column(name="PREMIUM_POLICY_NAME", nullable=false)
    private String policyName;

    private int membersCount;

    @Column(name="PREMIUM_POLICY_AMOUNT")
    private float premiumAmount;
    
    @Column(name="MINIMUM_AGE")
    private int minAge;
    
    @Column(name="MAXIMUM_AGE")
    private int maxAge;
    
    @Column(name="LAPSE_PERIOD")
    private int lapsePeriod;
    
    @Column(name="WAIT_PERIOD")
    private int waitPeriod;
    
    @Column(name="POLICY_BENEFITS")
    private String policyBenefits;
    
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "companyid", referencedColumnName = "id")
    private Company companyid;
}