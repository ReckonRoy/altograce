package com.itilria.altograce.domain;
/** 
 * @Author Le-Roy
 * @Date 11/29/2023
*/

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor 
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    @Column(nullable=false)
    private String name;
    @Column(nullable=false)
    private String surname;
    @Column(nullable=false)
    private String nationality;
    @Column(nullable=false)
    private String id_passport;
    @Column(name="CONTACT_1", nullable=false)
    private String contact_details1;
    @Column(name="CONTACT_2", nullable=true)
    private String contact_details2;
    private String designation;
    private String honorofic;
    private String ethnicity;
    @Column(name="DOB", nullable = true)
    private LocalDate dob;

    @Column(nullable=false)
    private String gender;

    @Column(name="MARITAL_STATUS", nullable=true)
    private String maritalStatus;
    @Column(name="COUNTRY")
    private String country;
    @Column(name="PROVINCE")
    private String province;
    private String city;
    private String post_code;
    private String street;
    private String stand_unit;
    
    @JsonIgnore
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EmployeeLeave> employeeLeave;

    @JsonBackReference
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "authid", referencedColumnName = "id")
    private UserAuthentication authid;
}



