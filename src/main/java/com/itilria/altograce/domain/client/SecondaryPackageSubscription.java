package com.itilria.altograce.domain.client;

/**
 * @Author Le-Roy
 * @Date 28 February 2024
 * @Description Entity class for main client member details.
 */
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.math.BigDecimal;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SecondaryPackageSubscription{
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    @Column(nullable=false)
    private int addtionaPackageId;
    @Column(nullable=false)
    private LocalDate joiningDate;

    @Column(nullable=true)
    private LocalDate trialStartDate;
    @Column(nullable=true)
    private LocalDate trialEndDate;

    @Column(nullable=true)
    private String activationStatus;

    @Column(nullable=false)
    private BigDecimal joiningFee;

    @Column(nullable=false)
    private BigDecimal MonthlyFee;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "primaryClient", referencedColumnName = "id")
    private PrimaryClient primaryClient;

}