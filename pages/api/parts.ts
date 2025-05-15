import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';
import { Part, ApiSuccessResponse } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Part[] | ApiSuccessResponse | { error: string }>
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('parts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (req.method === 'POST') {
      const { name, quantity = 0, price = 0, supplier } = req.body;
      
      const { data, error } = await supabase
        .from('parts')
        .insert([{ 
          name, 
          quantity: Number(quantity), 
          price: Number(price), 
          supplier 
        }])
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