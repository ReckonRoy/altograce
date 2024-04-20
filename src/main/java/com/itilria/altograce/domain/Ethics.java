package com.itilria.altograce.domain;

/**
 * @Author Le-Roy
 * @Date 22 December 2023
 * @Description Entity class that stores ethics.
 */

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Ethics
{
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    @Column(name="ETHICS")
    private String ethics;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    private Company company;
}