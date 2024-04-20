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
public class OptionalPackage{
    @GeneratedValue(strategy = GenerationType.AUTO)
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