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
        .from('MaintenanceLogs')
        .select(`
          *,
          Machines (Name),
          Parts (Name)
        `)
        .order('Date', { ascending: false });

      if (error) throw error;

      // Transform data to match existing format
      const transformedData = data.map(log => ({
        ...log,
        Machine: log.Machine ? [log.Machine.Name] : [],
        PartUsed: log.Parts ? [log.Parts.Name] : []
      }));

      return res.status(200).json(transformedData || []);
    }

    if (req.method === 'POST') {
      const { Machine, PartUsed, Date, Cost, Technician } = req.body;
      
      const { data, error } = await supabase
        .from('MaintenanceLogs')
        .insert([{ 
          machine_id: Machine[0], 
          part_id: PartUsed[0], 
          Date, 
          Cost: Number(Cost), 
          Technician 
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