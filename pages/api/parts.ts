// pages/api/parts.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';
import { Part, ApiSuccessResponse } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Part[] | ApiSuccessResponse | { error: string }>
) {
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
      const { name, quantity, price, supplier } = req.body;
      
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