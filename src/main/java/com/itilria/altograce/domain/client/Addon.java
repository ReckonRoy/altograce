package com.itilria.altograce.domain.client;

/**
 * @Author Le-Roy
 * @Date 21 September 2025
 * @Description Entity class for adding addons to an individual in a policy files.
 */

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "addons")
public class Addon{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    private boolean isPrimaryClient = false;
    private String name;
    private BigDecimal monthlyAmount;
    private String description;

    //defaults to false until waiting period is over
    private Boolean isActive = false;

    private Integer waitingPeriodMonths;
    private LocalDate createdAt;
    private LocalDate updatedAt;


    //createdAt + waitingPeriodMonths
    private LocalDate activationDate;

    //--------------- Relationships ----------------
    @JsonBackReference
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "policy_holder_id", referencedColumnName = "id")
    private PrimaryClient policyHolder;

    /* 
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dependent_id", referencedColumnName = "id")
    private ClientDependency dependent;
    */
    
    public LocalDate getCreatedAt() {
    	return this.createdAt;
    }
    
    //------------------ Constructors ------------------
    @PrePersist
    public void onCreate(){
        createdAt = this.getCreatedAt();
        updatedAt = LocalDate.now();
        if(waitingPeriodMonths != null && waitingPeriodMonths > 0){
            activationDate = createdAt.plusMonths(waitingPeriodMonths);
            isActive = false;
        } else {
            activationDate = createdAt;
            isActive = true;
        }
    }

    @PreUpdate
    public void onUpdate(){
        updatedAt = LocalDate.now();
    }

    //------------------- Helper Methods ------------------
    public boolean checkEligibility(){
        if(!isActive && activationDate != null && LocalDate.now().isAfter(activationDate)){
            isActive = true;
        }

        return isActive;
    }

}