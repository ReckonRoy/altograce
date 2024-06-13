package com.itilria.altograce.domain.client;

/**
 * @Author Le-Roy
 * @Date 07 April 2024
 * @Description Entity class for deceased records.
 */
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Deaceased_Record")
public class Deceased{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    private String biNumber;
    private String graveNumber;

    @Column(nullable = false, name = "date_of_burial")
    private LocalDate dateOfBurial;

    private LocalDate recordEntryDate;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "primaryClient", referencedColumnName = "id")
    private PrimaryClient primaryClient;
}