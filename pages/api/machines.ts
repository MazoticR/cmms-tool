// pages/api/machines.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';
import { Machine, ApiSuccessResponse } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Machine[] | ApiSuccessResponse | { error: string }>
) {
  try {
    if (req.method === 'GET') {
      // Handle GET all machines or single machine
      if (req.query.id) {
        const { data, error } = await supabase
          .from('Machines')
          .select('*')
          .eq('id', req.query.id)
          .single();

        if (error) throw error;
        return res.status(200).json(data);
      } else {
        const { data, error } = await supabase
          .from('Machines')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return res.status(200).json(data || []);
      }
    }

    if (req.method === 'POST') {
      const { Name, Location, Status } = req.body;
      
      const { data, error } = await supabase
        .from('Machines')
        .insert([{ 
          Name, 
          Location, 
          Status: Status || 'Operational' 
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