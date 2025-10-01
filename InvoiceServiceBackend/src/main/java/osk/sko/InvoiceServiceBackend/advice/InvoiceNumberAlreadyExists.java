package osk.sko.InvoiceServiceBackend.advice;

public class InvoiceNumberAlreadyExists extends RuntimeException {
    public InvoiceNumberAlreadyExists(String message) {
        super(message);
    }
}
