import type { Invoice } from "@/types/types";

export default function Invoice({ invoice }: { invoice: Invoice | null }) {
  if (!invoice) {
    return (
      <div className="flex flex-col gap-8 bg-neutral-900 md:w-3xl lg:w-4xl h-128 p-15 rounded-lg text-foreground">
        <h1 className="flex justify-center item-center">No invoice selected</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 bg-neutral-900 md:w-3xl lg:w-4xl h-auto p-15 rounded-lg text-foreground">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-5xl font-semibold text-neutral-300">Invoice</h1>
        <div className="flex flex-col">
          <span>Invoice Number:</span>
          <h1 className="text-xl font-semibold text-neutral-300">
            {invoice.invoiceNumber}
          </h1>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col bg-neutral-800 p-4 rounded-lg w-40 md:w-2xs lg:w-2xs">
          <h2 className="text-lg font-semibold text-neutral-300">Billed to:</h2>
          <p className="">{invoice.buyer.name}</p>
          <p className="">NIP: {invoice.buyer.nip}</p>
        </div>
        <div className="flex flex-col bg-neutral-800 p-4 rounded-lg w-40 md:w-2xs lg:w-2xs">
          <h2 className="text-lg font-semibold text-neutral-300">From:</h2>
          <p className="">Software Mind</p>
          <p className="">NIP: 987654321</p>
        </div>
      </div>
      <div>
        <table className="border-2 border-collapse border-neutral-900 w-full table-fixed">
          <thead className="bg-neutral-800">
            <tr>
              <th className="text-sm lg:text-base text-left py-2 pl-2 w-2/5">
                Description
              </th>
              <th className="text-xs lg:text-base text-left py-2 w-1/5">
                Quantity
              </th>
              <th className="text-xs lg:text-base text-left py-2 w-1/5">
                Net Price
              </th>
              <th className="text-xs lg:text-base text-left py-2 w-1/5">
                Gross Price
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index}>
                <td className="text-xs lg:text-base py-2 pl-2">
                  {item.description}
                </td>
                <td className="text-xs lg:text-base py-2">{item.quantity}</td>
                <td className="text-xs lg:text-base py-2">
                  {item.netPrice.toFixed(2)} PLN
                </td>
                <td className="text-xs lg:text-base py-2">
                  {(item.netPrice + item.netPrice * 0.23).toFixed(2)} PLN
                </td>
              </tr>
            ))}
            <tr className="text-xs lg:text-base font-semibold bg-neutral-800">
              <td className="py-2 pl-2">Total</td>
              <td className="py-2">
                {invoice.items.reduce((sum, item) => sum + item.quantity, 0)}
              </td>
              <td className="text-xs lg:text-base py-2">
                {invoice.items
                  .reduce((sum, item) => sum + item.netPrice, 0)
                  .toFixed(2)}{" "}
                PLN
              </td>
              <td className="text-xs lg:text-base py-2">
                {invoice.items
                  .reduce((sum, item) => sum + item.netPrice * 1.23, 0)
                  .toFixed(2)}{" "}
                PLN
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-row w-full border-t-2 border-neutral-700 pb-4 justify-center">
        <p className="pt-2">Thank you for choosing us!</p>
      </div>
    </div>
  );
}
