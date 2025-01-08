package com.itilria.altograce.domain.client;

/**
 * @Author Le-Roy
 * @Date 28 February 2024
 * @Description Entity class for main client member details.
 */
import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PrimaryPackageSubscription{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    private int packageId;
    private LocalDate dateOfCover;
    private LocalDate recordEntryDate;
    private String groupName;

    @Column(nullable=false)
    private BigDecimal joiningFee;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "primaryClient", referencedColumnName = "clientid")
    private PrimaryClient primaryClient;
}