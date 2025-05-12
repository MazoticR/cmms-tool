export type Part = {
  id: string;
  Name: string;
  Quantity: number;
  Price: number;
  Supplier?: string;
};

export type Machine = {
  id: string;
  Name: string;
  Location: string;
  Status: string;
};