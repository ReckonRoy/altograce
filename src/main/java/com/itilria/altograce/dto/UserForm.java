package com.itilria.altograce.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserForm {
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Surname is required")
    private String surname;
    private String nationality;
    @NotBlank(message = "ID/Passport is required")
    private String id_passport;
    private String contact_details1;
    private String contact_details2;
    private LocalDate dob;
    private String role;
    private String designation;
    private String honorofic;
    private String ethnicity;

    private String gender;

    private String maritalStatus;
    private String country;
    private String province;
    private String city;
    private String postCode;
    private String street;
    private String standUnit;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    private String email;
    private String password;

    public UserForm(String email, String name, String surname, String id_passport, String nationality,
    String designation, LocalDate dob, String contact_details1,String country, String province, String city,
    String postCode, String street, String standUnit, String gender, String maritalStatus, String honorofic
    ){
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.id_passport = id_passport;
        this.nationality = nationality;
        this.designation = designation;
        this.dob = dob;
        this.contact_details1 = contact_details1;
        this.country = country;
        this.province = province;
        this.city = city;
        this.postCode = postCode;
        this.street = street;
        this.standUnit = standUnit;
        this.gender = gender;
        this.maritalStatus = maritalStatus;
        this.honorofic = honorofic;
    }
}
