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
public class ClientBilling{
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    private LocalDate paymentDate;
    private LocalDate recordEntryDate;

    @Column(nullable=false)
    private BigDecimal amountPayed;

    private String paymentMethod;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "primaryClient", referencedColumnName = "id")
    private PrimaryClient primaryClient;
}