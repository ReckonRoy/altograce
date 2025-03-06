package com.itilria.altograce.domain.funeral;

/**
 * @Author Le-Roy
 * @Date 28 February 2024
 * @Description Entity class for main client member details.
 */
import java.math.BigDecimal;
import java.time.LocalDate;

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
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "funeral_invoice")
public class Invoice{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String invoiceNumber;
    private LocalDate invoiceDate;
    private String clientName;
    private BigDecimal invoiceAmount;
    private BigDecimal invoiceDeposit;
    private BigDecimal invoiceBalance;
    private String paymentDate;
    private String paymentMethod;
    private String invoiceStatus;
    private String invoiceStatusDate;
    private String invoiceStatusReason;
    private long companyId;

    @OneToOne
    @JoinColumn(name = "Funeral", referencedColumnName = "id")
    private Funeral funeral;

}