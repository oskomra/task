package osk.sko.InvoiceServiceBackend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import osk.sko.InvoiceServiceBackend.dto.InvoiceDTO;
import osk.sko.InvoiceServiceBackend.model.Buyer;
import osk.sko.InvoiceServiceBackend.model.Invoice;
import osk.sko.InvoiceServiceBackend.model.Item;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InvoiceServiceTest {

    @Mock
    private InvoiceService invoiceService;
    private InvoiceDTO invoiceDTO;

    @BeforeEach
    void setUp() {
        this.invoiceDTO = new InvoiceDTO(
                "FV/2025/01/01",
                LocalDate.of(2025, 1, 10),
                LocalDate.of(2025, 1, 25),
                "ABC Sp. z o.o",
                "123456789",
                "Licencja oprogramowania",
                2,
                500);
    }

    @Test
    void shouldReturnAddedInvoice() {
        List<Item> items = new ArrayList<>();
        items.add(new Item(invoiceDTO.getItemDescription(), invoiceDTO.getItemQuantity(), invoiceDTO.getItemNetPrice()));
        Invoice invoice = new Invoice(invoiceDTO.getInvoiceNumber(),
                invoiceDTO.getIssueDate(),
                invoiceDTO.getDueDate(),
                new Buyer(invoiceDTO.getBuyerName(), invoiceDTO.getBuyerNIP()),
                items);
        when(invoiceService.addInvoice(invoiceDTO)).thenReturn(invoice);

        final var result = invoiceService.addInvoice(invoiceDTO);

        assertEquals(invoice, result);
        assertEquals(invoiceDTO.getInvoiceNumber(), result.getInvoiceNumber());
        verify(invoiceService, times(1)).addInvoice(invoiceDTO);

    }

    @Test
    void shouldReturnEmptyListIfInvoiceNotFound() {
        List<Invoice> invoices = new ArrayList<>();
        when(invoiceService.getInvoices()).thenReturn(invoices);

        final var result = invoiceService.getInvoices();

        assertTrue(result.isEmpty());
        verify(invoiceService, times(1)).getInvoices();
    }

    @Test
    void shouldReturnInvoice() {
        List<Invoice> invoices = new ArrayList<>();
        List<Item> items = new ArrayList<>();
        items.add(new Item(invoiceDTO.getItemDescription(), invoiceDTO.getItemQuantity(), invoiceDTO.getItemNetPrice()));
        invoices.add(new Invoice(invoiceDTO.getInvoiceNumber(),
                invoiceDTO.getIssueDate(),
                invoiceDTO.getDueDate(),
                new Buyer(invoiceDTO.getBuyerName(), invoiceDTO.getBuyerNIP()),
                items));
        when(invoiceService.getInvoices()).thenReturn(invoices);

        final var result = invoiceService.getInvoices();

        assertEquals(invoiceDTO.getInvoiceNumber(), result.getFirst().getInvoiceNumber());
        verify(invoiceService, times(1)).getInvoices();
        assertFalse(result.isEmpty());

    }

}