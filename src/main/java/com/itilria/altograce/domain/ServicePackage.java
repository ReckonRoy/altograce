package com.itilria.altograce.domain;

/**
 * @Author Le-Roy
 * @Date 22 December 2023
 * @Description Entity class that stores ethics.
 */

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ServicePackage{
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    @Column(nullable = true)
    private String packageId;

    private String packageName;

    @Transient
    private String packageType;

    private int membersCount;

    @Column(name="PRICE")
    private float price;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "companyid", referencedColumnName = "id")
    private Company companyid;

    @JsonIgnore
    @OneToMany(mappedBy = "servicePackage", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductItem> productItem;

    @JsonIgnore
    @OneToMany(mappedBy = "servicePackage", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductService> productService;
}