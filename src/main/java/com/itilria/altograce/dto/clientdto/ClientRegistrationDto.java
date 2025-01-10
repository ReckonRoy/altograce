package com.itilria.altograce.dto.clientdto;

import lombok.AllArgsConstructor;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.util.Set;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ClientRegistrationDto {
    
    private String title;
    private String name;
    private String lastName;
    private String initials;
    private String id_passport;
    private String gender;
    private LocalDate dob;
    private String maritalStatus;
    private String email;
    private String countryCode;
    private long phoneContact1;
    private long phoneContact2;
    private String province;
    private String address;
    private int staffId;
    private int packageId;
    private String groupName;
    private LocalDate dateOfCover;
    private BigDecimal joiningFee;
    private int waitPeriod;
}
