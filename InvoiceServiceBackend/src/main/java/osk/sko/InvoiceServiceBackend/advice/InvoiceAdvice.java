package osk.sko.InvoiceServiceBackend.advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class InvoiceAdvice {

    @ExceptionHandler(InvoiceNotFoundException.class)
    public ResponseEntity<CustomErrorMessage> handleInvoiceNotFound(InvoiceNotFoundException e) {
        return new ResponseEntity<>(new CustomErrorMessage(e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<CustomErrorMessage> handleInputArgumentNotValid(MethodArgumentNotValidException e) {
        StringBuilder errorMessage = new StringBuilder();
        e.getBindingResult().getFieldErrors().forEach(error ->
                errorMessage.append(error.getDefaultMessage()).append("\n")
        );
        return new ResponseEntity<>(new CustomErrorMessage(errorMessage.toString()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvoiceNumberAlreadyExists.class)
    public ResponseEntity<CustomErrorMessage> handleInvoiceNumberAlreadyExists(InvoiceNumberAlreadyExists e) {
        return new ResponseEntity<>(new CustomErrorMessage(e.getMessage()), HttpStatus.CONFLICT);
    }
}
