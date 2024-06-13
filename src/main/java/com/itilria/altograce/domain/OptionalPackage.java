package com.itilria.altograce.domain;

/**
 * @Author Le-Roy
 * @Date 22 December 2023
 * @Description Entity class that stores ethics.
 */

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OptionalPackage{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;

    @Column(nullable = true)
    private String packageid;

    private String packageName;

    private int membersCount;

    @Column(name="PRICE")
    private float price;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "companyid", referencedColumnName = "id")
    private Company companyid;

    @JsonIgnore
    @OneToMany(mappedBy = "optionalPackage", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductItem> productItem;

    @JsonIgnore
    @OneToMany(mappedBy = "optionalPackage", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductService> productService;

    public void setPackageid(String packageName, int id)
    {
        this.packageid = "#" + packageName.substring(0, 2) + id;
    }
}