// types.ts

// types.ts
export type ApiSuccessResponse = {
  success: true;
  id?: string; // Optional for newly created records
};

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

export type MaintenanceLog = {
  id: string;
  Machine: string[];
  PartUsed: string[];
  Date: string;
  Cost: number;
  Technician: string;
};