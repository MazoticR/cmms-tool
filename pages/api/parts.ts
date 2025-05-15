// pages/api/parts.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      console.log('Connecting to Supabase...');
      const { data, error } = await supabase
        .from('parts')
        .insert([req.body])
        .select();

      if (error) {
        console.error('Supabase Error Details:', {
          message: error.message,
          code: error.code,
          details: error.details
        });
        return res.status(500).json({ 
          error: 'Database operation failed',
          code: error.code,
          hint: error.hint 
        });
      }

      return res.status(201).json({ success: true, data });
    } catch (err) {
      console.error('Full Error Stack:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}