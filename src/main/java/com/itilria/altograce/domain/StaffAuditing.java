package com.itilria.altograce.domain;

/**
 * @Author Le-Roy
 * @Date 03 March 2024
 * @Description Entity class that stores auditing for staff actions.
 */

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StaffAuditing{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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