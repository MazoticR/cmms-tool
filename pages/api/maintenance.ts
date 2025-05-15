// pages/api/maintenance.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';
import { MaintenanceLog, ApiSuccessResponse } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MaintenanceLog[] | ApiSuccessResponse | { error: string }>
) {
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('maintenance_logs')
        .select(`
          *,
          machines:machine_id (name, location, status),
          parts:part_id (name, price)
        `)
        .order('date', { ascending: false });

      if (error) throw error;

      // Transform the data to include machine and part details
      const transformedData = (data as any[]).map(log => ({
        ...log,
        machine: log.machines,
        part: log.parts
      }));

      return res.status(200).json(transformedData || []);
    }

    if (req.method === 'POST') {
      const { machine_id, part_id, date, cost, technician, status } = req.body;
      
      const { data, error } = await supabase
        .from('maintenance_logs')
        .insert([{ 
          machine_id: Number(machine_id),
          part_id: Number(part_id),
          date,
          cost: Number(cost),
          technician,
          status: status || 'Pending'
        }])
        .select()
        .single();

      if (error) throw error;
      
      return res.status(201).json({ 
        success: true,
        id: data.id
      });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}