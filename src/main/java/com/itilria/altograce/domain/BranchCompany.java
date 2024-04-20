package com.itilria.altograce.domain;

/**
 * @Author Le-Roy
 * @Date 08 January 2024
 * @Description Entity class that stores company details, owner etc
 */

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class BranchCompany
{
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    @Column(name="BRANCH_NAME")
    private String name;

    @Column(name="CO_CONTACT_1")
    private String contact1;

    @Column(name="CO_CONTACT_2", nullable=true)
    private String contact2;
    @Column(name="CO_CONTACT_3", nullable=true)
    private String contact3;

    @Column(name="CO_COUNTRY_CODE")
    private String countryCode;
    @Column(name="CO_COUNTRY")
    private String country;

    @Column(name="CO_PROVINCE")
    private String province;

    @Column(name="CO_CITY")
    private String city;

    @Column(name="CO_POST_CODE")
    private int postCode;

    @Column(name="CO_STREET")
    private String street;

    @Column(name="CO_STAND_UNIT")
    private String standUnit;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company", referencedColumnName = "id")
    private Company company;
}