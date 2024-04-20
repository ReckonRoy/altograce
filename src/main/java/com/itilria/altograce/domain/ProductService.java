package com.itilria.altograce.domain;

/**
 * @Author Le-Roy
 * @Date 07 February 2024
 * @Description ORM Product Service entity class.
 */

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductService{
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    private String serviceName;

    private String description;

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