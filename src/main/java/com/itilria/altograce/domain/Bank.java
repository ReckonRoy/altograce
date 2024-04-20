package com.itilria.altograce.domain;

/**
 * @Author Le-Roy
 * @Date 14 December 2023
 * @Description Entity class that stores company banking details.
 */

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Bank
{
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    @Column(name="BANK_NAME")
    private String bankName;

    @Column(name="ACCOUNT_NAME")
    private String accountName;

    @Column(name="ACCOUNT")
    private String account;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    private Company company;
}