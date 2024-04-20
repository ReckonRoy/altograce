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
public class CodeOfConduct
{
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    @Column(name="CODE_OF_CONDUCT")
    private String cocDocument;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    private Company company;
}