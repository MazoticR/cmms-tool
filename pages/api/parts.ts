// pages/api/parts.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';
import { Part, ApiSuccessResponse } from '../../types';

type ErrorResponse = {
  error: string;
  details?: string;
  allowed?: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Part[] | ApiSuccessResponse | ErrorResponse>
) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(204).setHeader('Allow', 'GET, POST, OPTIONS').end();
  }

  try {
    // GET - Fetch all parts
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('parts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.status(200).setHeader('Allow', 'GET, POST, OPTIONS').json(data || []);
    }

    // POST - Create new part
    if (req.method === 'POST') {
      const { name, quantity = 0, price = 0, supplier } = req.body;

      // Validate required fields
      if (!name || typeof quantity !== 'number' || typeof price !== 'number') {
        return res.status(400).json({ 
          error: 'Missing or invalid required fields',
          details: process.env.NODE_ENV === 'development' 
            ? 'Name, quantity and price are required' 
            : undefined
        });
      }

      const { data, error } = await supabase
        .from('parts')
        .insert([{ 
          name, 
          quantity: Number(quantity), 
          price: Number(price), 
          supplier: supplier || null 
        }])
        .select()
        .single();

      if (error) throw error;

      const response: ApiSuccessResponse = {
        success: true,
        id: data.id
      };

      return res.status(201).json(response);
    }

    // Handle unsupported methods
    return res.status(405).json({ 
      error: `Method ${req.method} not allowed`,
      allowed: ['GET', 'POST', 'OPTIONS']
    });

  } catch (error: any) {
    const errorResponse: ErrorResponse = {
      error: 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && {
        details: error.message
      })
    };

    return res.status(500).json(errorResponse);
  }
}