"use client";
import type { Invoice } from "@/types/types";
import { useState, useEffect } from "react";
import InvoiceTable from "@/components/invoice-table";
import InvoiceDetails from "@/components/invoice-details";
import AddInvoice from "@/components/add-invoice";

export default function Home() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(
    invoices[0] || null
  );

  useEffect(() => {
    const fetchInvoices = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/invoices`
      );
      const data = await response.json();
      setInvoices(data);
      setCurrentInvoice(data[0] || null);
    };

    fetchInvoices();
  }, []);

  return (
    <div className="flex flex-col items-center p-4 gap-4 min-h-screen bg-background py-10">
      <InvoiceTable invoices={invoices} setCurrentInvoice={setCurrentInvoice} />
      <AddInvoice
        setCurrentInvoice={setCurrentInvoice}
        setInvoices={setInvoices}
      />
      <InvoiceDetails invoice={currentInvoice} />
    </div>
  );
}
