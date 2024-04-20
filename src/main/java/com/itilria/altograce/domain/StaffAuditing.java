package com.itilria.altograce.domain;

/**
 * @Author Le-Roy
 * @Date 03 March 2024
 * @Description Entity class that stores auditing for staff actions.
 */

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;


@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StaffAuditing{
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    /**
     * staff actions:
     * added, removed, billed, read, updated, invoiced
     */
    @Column(name = "ACTION")
    private String staffAction;
    private int companyId;
    private int staffId;
    private String clientId;

    private LocalDate recordEntryDate;
}