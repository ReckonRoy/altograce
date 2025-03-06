package com.itilria.altograce.domain.client;

/**
 * @Author Le-Roy
 * @Date 8 March 2024
 * @Description Entity class for main client member details.
 */
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.*;
import com.itilria.altograce.domain.Company;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ClientDependency{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    private String name;
    private String lastName;
    private String relationship;
    private String gender;
    private String id_passport;
    private String activationStatus;
    private LocalDate dob;
    private LocalDate dateOfCover;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "primaryClient", referencedColumnName = "id")
    private PrimaryClient primaryClient;
}