package osk.sko.InvoiceServiceBackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Item {

    private String description;
    private int quantity;
    private double netPrice;
}
