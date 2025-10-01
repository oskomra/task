package osk.sko.InvoiceServiceBackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
public class Invoice {

    private String invoiceNumber;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private Buyer buyer;
    private List<Item> items;
}
