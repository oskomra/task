export type Buyer = {
  name: string;
  nip: string;
};

export type Item = {
  description: string;
  quantity: number;
  netPrice: number;
};

export type Invoice = {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  buyer: Buyer;
  items: Item[];
};
