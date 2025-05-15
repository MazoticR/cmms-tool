// pages/api/parts.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Debug headers
  console.log('Incoming headers:', req.headers);
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    console.log('Request body:', req.body); // Debug incoming data
    
    try {
      const { name, quantity, price, supplier } = req.body;
      
      // Test Supabase connection
      const testQuery = await supabase
        .from('parts')
        .select('*')
        .limit(1);
        
      console.log('Supabase test:', testQuery); // Debug Supabase

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

      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ 
          error: 'Database error',
          details: error.message 
        });
      }

      console.log('Insert successful:', data); // Debug success
      return res.status(201).json({ success: true, id: data.id });

    } catch (error) {
      console.error('Server error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}