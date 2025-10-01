import type { Invoice } from "@/types/types";
import transformDate from "@/lib/transformDate";
import { Spinner } from "./ui/shadcn-io/spinner";

export default function InvoiceTable({
  invoices,
  setCurrentInvoice,
}: {
  invoices: Invoice[];
  setCurrentInvoice: (invoice: Invoice) => void;
}) {
  return (
    <div className="w-full max-w-4xl">
      <table className="border-2 border-collapse border-neutral-900 w-full">
        <thead>
          <tr>
            <th
              colSpan={5}
              className="bg-neutral-800 text-white text-xl font-semibold py-3 pl-2 border-b border-neutral-900"
            >
              Invoices
            </th>
          </tr>
          <tr className="bg-neutral-900">
            <th className="text-left py-2 pl-2 text-white">Invoice Number</th>
            <th className="text-left py-2 text-white">Issue Date</th>
            <th className="text-left py-2 text-white">Due Date</th>
            <th className="text-left py-2 text-white">Buyer</th>
            <th className="text-left py-2 text-white">Details</th>
          </tr>
        </thead>
        {invoices.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={5} className="text-center py-2">
                <div className="flex justify-center items-center">
                  <Spinner />
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.invoiceNumber}>
                <td className="py-2 pl-2">{invoice.invoiceNumber}</td>
                <td className="py-2">{transformDate(invoice.issueDate)}</td>
                <td className="py-2">{transformDate(invoice.dueDate)}</td>
                <td className="py-2">{invoice.buyer.name}</td>
                <td className="py-2">
                  <button
                    className="text-blue-500 hover:underline cursor-pointer"
                    onClick={() => setCurrentInvoice(invoice)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
