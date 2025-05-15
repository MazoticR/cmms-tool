// types.ts
export type Part = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  supplier?: string;
  created_at?: string;
};

export type Machine = {
  id: number;
  name: string;
  location: string;
  status: string;
  created_at?: string;
};

export type MaintenanceLog = {
  id: number;
  machine_id: number;
  part_id: number;
  date: string;
  cost: number;
  technician: string;
  status: string;
  created_at?: string;
  machine?: Machine;
  part?: Part;
};

export type ApiSuccessResponse = {
  success: boolean;
  id?: number;
  error?: string;
  name?: string;
};