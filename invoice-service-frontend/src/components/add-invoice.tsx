"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Invoice } from "@/types/types";

type FormData = z.infer<typeof schema>;

const schema = z.object({
  invoiceNumber: z.string().min(1).max(100),
  issueDate: z.string().min(1).max(100),
  dueDate: z.string().min(1).max(100),
  buyerName: z.string().min(1).max(100),
  buyerNIP: z.string().min(1).max(100),
  itemDescription: z.string().min(1).max(100),
  itemQuantity: z.number().min(1),
  itemNetPrice: z.number().min(0),
});

export default function AddInvoice({
  setCurrentInvoice,
  setInvoices,
}: {
  setCurrentInvoice: React.Dispatch<React.SetStateAction<Invoice | null>>;
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
}) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/invoices`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const newInvoice: Invoice = await response.json();
        setCurrentInvoice(newInvoice);
        setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);
        reset();
        const closeButton = document.querySelector(
          '[data-dialog-close="true"]'
        ) as HTMLButtonElement;
        if (closeButton) closeButton.click();
      } else {
        setError("root.serverError", {
          type: "manual",
          message: "Failed to create invoice",
        });
      }
    } catch (error) {
      setError("root.serverError", {
        type: "manual",
        message: "An unexpected error occurred",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add invoice</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Invoice</DialogTitle>
            <DialogDescription>
              Add a new invoice to your account. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input id="invoiceNumber" {...register("invoiceNumber")} />
              {errors.invoiceNumber && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.invoiceNumber.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input id="issueDate" type="date" {...register("issueDate")} />
              {errors.issueDate && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.issueDate.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" type="date" {...register("dueDate")} />
              {errors.dueDate && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.dueDate.message}
                </p>
              )}
            </div>
            <span className="text-center">Buyer Details</span>
            <div className="grid gap-3">
              <Label htmlFor="buyerName">Name</Label>
              <Input
                id="buyerName"
                placeholder="John Doe"
                {...register("buyerName")}
              />
              {errors.buyerName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.buyerName.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="buyerNIP">NIP</Label>
              <Input
                id="buyerNIP"
                placeholder="123-45-67-890"
                {...register("buyerNIP")}
              />
              {errors.buyerNIP && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.buyerNIP.message}
                </p>
              )}
            </div>
            <div className="grid gap-3 bg-neutral-900 p-4 rounded-lg">
              <span className="text-center">Item Details</span>
              <div className="grid gap-3">
                <Label htmlFor="itemDescription">Description</Label>
                <Input
                  id="itemDescription"
                  placeholder="Item description"
                  {...register("itemDescription")}
                />
                {errors.itemDescription && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.itemDescription.message}
                  </p>
                )}
              </div>
              <div className="grid grid-flow-col grid-rows-1 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="itemQuantity">Quantity</Label>
                  <Input
                    id="itemQuantity"
                    type="number"
                    min="1"
                    {...register("itemQuantity", { valueAsNumber: true })}
                    placeholder="1"
                  />
                  {errors.itemQuantity && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.itemQuantity.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="itemNetPrice">Price</Label>
                  <Input
                    id="itemNetPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    {...register("itemNetPrice", { valueAsNumber: true })}
                    placeholder="0.00"
                  />
                  {errors.itemNetPrice && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.itemNetPrice.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" data-dialog-close="true">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
          {errors.root?.serverError && (
            <p className="text-sm text-red-500 text-center mt-2">
              {errors.root.serverError.message}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
