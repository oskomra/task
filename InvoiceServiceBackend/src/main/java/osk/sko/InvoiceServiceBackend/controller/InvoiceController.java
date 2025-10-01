package osk.sko.InvoiceServiceBackend.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import osk.sko.InvoiceServiceBackend.dto.InvoiceDTO;
import osk.sko.InvoiceServiceBackend.model.Invoice;
import osk.sko.InvoiceServiceBackend.service.InvoiceService;

import java.util.List;

@RestController
@RequestMapping("/invoices")
@AllArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping
    public ResponseEntity<Invoice> addInvoice(@Valid @RequestBody InvoiceDTO invoiceDTO) {
        return ResponseEntity.ok(invoiceService.addInvoice(invoiceDTO));
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        return ResponseEntity.ok(invoiceService.getInvoices());
    }
}
