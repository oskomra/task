package osk.sko.InvoiceServiceBackend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import osk.sko.InvoiceServiceBackend.advice.InvoiceNumberAlreadyExists;
import osk.sko.InvoiceServiceBackend.dto.InvoiceDTO;
import osk.sko.InvoiceServiceBackend.model.Invoice;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class InvoiceServiceTest {

    private InvoiceService invoiceService;
    private InvoiceDTO invoiceDTO;

    @BeforeEach
    void setUp() {
        invoiceService = new InvoiceService();

        invoiceDTO = new InvoiceDTO(
                "FV/2025/01/01",
                LocalDate.of(2025, 1, 10),
                LocalDate.of(2025, 1, 25),
                "ABC Sp. z o.o",
                "123456789",
                "Licencja oprogramowania",
                2,
                500
        );
    }

    @Test
    void shouldReturnEmptyListIfNoInvoices() {
        List<Invoice> result = invoiceService.getInvoices();

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void shouldReturnAddedInvoice() {
        Invoice result = invoiceService.addInvoice(invoiceDTO);

        assertNotNull(result);
        assertEquals(invoiceDTO.getInvoiceNumber(), result.getInvoiceNumber());
        assertEquals(invoiceDTO.getIssueDate(), result.getIssueDate());
        assertEquals(invoiceDTO.getDueDate(), result.getDueDate());
        assertEquals(invoiceDTO.getBuyerName(), result.getBuyer().getName());
        assertEquals(invoiceDTO.getBuyerNIP(), result.getBuyer().getNIP());
        assertEquals(1, result.getItems().size());
        assertEquals("Licencja oprogramowania", result.getItems().getFirst().getDescription());
        assertEquals(2, result.getItems().getFirst().getQuantity());
        assertEquals(500, result.getItems().getFirst().getNetPrice());

        assertEquals(1, invoiceService.getInvoices().size());
        assertEquals(invoiceDTO.getInvoiceNumber(), invoiceService.getInvoices().getFirst().getInvoiceNumber());
    }

    @Test
    void shouldReturnInvoicesListWithOneElement() {
        invoiceService.addInvoice(invoiceDTO);

        List<Invoice> result = invoiceService.getInvoices();
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals(invoiceDTO.getInvoiceNumber(), result.get(0).getInvoiceNumber());
    }

    @Test
    void shouldThrowExceptionIfInvoiceAlreadyExists() {
        invoiceService.addInvoice(invoiceDTO);

        InvoiceNumberAlreadyExists ex = assertThrows(
                InvoiceNumberAlreadyExists.class,
                () -> invoiceService.addInvoice(invoiceDTO)
        );
        assertEquals("Invoice number already exists", ex.getMessage());
    }
}
