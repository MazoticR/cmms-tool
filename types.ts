// types.ts
export type Part = {
  id: string;
  Name: string;
  Quantity: number;
  Price: number;
  Supplier?: string;
  created_at?: string;
};

export type Machine = {
  id: string;
  Name: string;
  Location: string;
  Status: string;
  created_at?: string;
};

export type MaintenanceLog = {
  id: string;
  Machine: string[] | string; // For Supabase, we'll use string (foreign key) instead of array
  PartUsed: string[] | string; // Same here
  Date: string;
  Cost: number;
  Technician: string;
  created_at?: string;
};

export type ApiSuccessResponse = {
  success: boolean;
  id?: string;
  error?: string;
};