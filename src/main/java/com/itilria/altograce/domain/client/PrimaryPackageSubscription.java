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
public class PrimaryPackageSubscription{
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

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