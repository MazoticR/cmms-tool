import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';
import { Machine, ApiSuccessResponse } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Machine[] | Machine | ApiSuccessResponse | { error: string }>
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      if (req.query.id) {
        // Single machine
        const { data, error } = await supabase
          .from('machines')
          .select('*')
          .eq('id', req.query.id)
          .single();

        if (error) throw error;
        return res.status(200).json(data);
      } else {
        // All machines
        const { data, error } = await supabase
          .from('machines')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return res.status(200).json(data || []);
      }
    }

    if (req.method === 'POST') {
      const { name, location, status = 'Operational' } = req.body;
      
      const { data, error } = await supabase
        .from('machines')
        .insert([{ name, location, status }])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json({ success: true, id: data.id });
    }

    res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}