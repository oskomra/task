package osk.sko.InvoiceServiceBackend.service;

import lombok.Getter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import osk.sko.InvoiceServiceBackend.advice.InvoiceNumberAlreadyExists;
import osk.sko.InvoiceServiceBackend.dto.InvoiceDTO;
import osk.sko.InvoiceServiceBackend.model.Buyer;
import osk.sko.InvoiceServiceBackend.model.Invoice;
import osk.sko.InvoiceServiceBackend.model.Item;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Getter
public class InvoiceService implements CommandLineRunner {

    private List<Invoice> invoices = new ArrayList<>();

    @Override
    public void run(String... args) {
        Buyer buyer = new Buyer("ABC Sp. z o.o.", "123456789");
        Buyer buyer2 = new Buyer("ZBZ Sp. z o.o.", "111222333");

        List<Item> items = new ArrayList<>();
        items.add(new Item("Licencja oprogramowania", 2, 500));
        items.add(new Item("Usługa wdrożeniowa", 1, 1500));

        List<Item> items2 = new ArrayList<>();
        items2.add(new Item("Komputer", 1, 5500));
        items2.add(new Item("Klawiatura", 2, 250));
        items2.add(new Item("Myszka", 5, 129));

        invoices.add(new Invoice("FV/2025/01/01",
                LocalDate.of(2025, 1, 10),
                LocalDate.of(2025, 1, 25),
                buyer,
                items));

        invoices.add(new Invoice("FV/2025/05/05",
                LocalDate.of(2025, 5, 17),
                LocalDate.of(2025, 6, 10),
                buyer2,
                items2));
    }

    public Invoice addInvoice(InvoiceDTO invoiceDTO) {

        for (Invoice invoice : invoices) {
            if (invoice.getInvoiceNumber().equals(invoiceDTO.getInvoiceNumber())) {
                throw new InvoiceNumberAlreadyExists("Invoice number already exists");
            }
        }

        List<Item> items = new ArrayList<>();
        items.add(new Item(invoiceDTO.getItemDescription(), invoiceDTO.getItemQuantity(), invoiceDTO.getItemNetPrice()));

        Invoice invoice = new Invoice(invoiceDTO.getInvoiceNumber(),
                invoiceDTO.getIssueDate(),
                invoiceDTO.getDueDate(),
                new Buyer(invoiceDTO.getBuyerName(), invoiceDTO.getBuyerNIP()),
                items);

        invoices.add(invoice);
        return invoice;
    }

}
