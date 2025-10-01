package osk.sko.InvoiceServiceBackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class InvoiceDTO {

    @NotBlank
    private String invoiceNumber;

    @NotNull
    private LocalDate issueDate;

    @NotNull
    private LocalDate dueDate;

    @NotBlank
    private String buyerName;

    @NotBlank
    private String buyerNIP;

    @NotBlank
    private String itemDescription;

    @Positive
    private int itemQuantity;

    @Positive
    private double itemNetPrice;
}
