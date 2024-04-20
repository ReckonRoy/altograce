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
public class ProductItem{
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    @Column(name="ITEM")
    private String itemName;

    @Column(name="QUANTITY")
    private int itemQuantity;

    @Transient
    private String packageType;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "servicePackage", referencedColumnName = "id")
    private ServicePackage servicePackage;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "optionalPackage", referencedColumnName = "id")
    private OptionalPackage optionalPackage;
}