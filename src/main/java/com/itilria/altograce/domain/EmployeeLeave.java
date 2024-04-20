package com.itilria.altograce.domain;

/**
 * @Author Le-Roy
 * @Date 5 December 2023
 * @Description Entity class that stores company details, owner etc
 */

import jakarta.persistence.*;
import lombok.*;
import com.itilria.altograce.domain.client.PrimaryClient;
import com.itilria.altograce.domain.client.ClientSettings;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.time.LocalDate;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class EmployeeLeave
{
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    private LocalDate startDate;
    private LocalDate endDate;
    private String vacationType;

    private LocalDate recordEntryDate;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "employee", referencedColumnName = "id")
    private User employee;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "company", referencedColumnName = "id")
    private Company company;
}