package com.itilria.altograce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.itilria.altograce.dto.ErrorResponse;

@ControllerAdvice
public class PasswordMatchExceptionResponseHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(PasswordMatchException.class)
    public ResponseEntity<ErrorResponse> handlePasswordMatchException(
            PasswordMatchException ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
