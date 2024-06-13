package com.itilria.altograce.domain;

/**
 * @Author Le-Roy
 * @Date 07 February 2024
 * @Description ORM Product Service entity class.
 */

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductService{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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