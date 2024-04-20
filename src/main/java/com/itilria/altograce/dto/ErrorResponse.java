package com.itilria.altograce.dto;
import org.springframework.http.HttpStatus;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
    private String message;
    private HttpStatus status;
}
