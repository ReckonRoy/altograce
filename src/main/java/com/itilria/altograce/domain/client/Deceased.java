package com.itilria.altograce.domain.client;

/**
 * @Author Le-Roy
 * @Date 07 April 2024
 * @Description Entity class for deceased records.
 */
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.math.BigDecimal;

import com.itilria.altograce.domain.client.PrimaryClient;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Deaceased_Record")
public class Deceased{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(nullable = false)
    private String fileId;

    @Column(nullable = false, name = "deceased_name")
    private String deceasedName;

    @Column(name = "place_of_death")
    private String placeOfDeath;

    @Column(name = "identity_number")
    private String identityNumber;

    @Column(nullable = false, name = "cemetery")
    private String cemetery;

    @Column(nullable = false, name = "date_of_burial")
    private LocalDate dateOfBurial;

    private LocalDate recordEntryDate;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "primaryClient", referencedColumnName = "id")
    private PrimaryClient primaryClient;
}