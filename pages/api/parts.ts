import Airtable from 'airtable';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Part, ApiSuccessResponse } from '../../types';

const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY })
  .base(process.env.NEXT_PUBLIC_AIRTABLE_BASE!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Part[] | ApiSuccessResponse | { error: string }>
) {
  try {
    if (req.method === 'GET') {
      const records = await base('Parts').select().all();
      const parts = records.map(record => ({
        id: record.id,
        ...record.fields,
      })) as Part[];
      return res.status(200).json(parts);
    }

    if (req.method === 'POST') {
      const { Name, Quantity, Price, Supplier } = req.body;
      const record = await base('Parts').create([{ 
        fields: { Name, Quantity: Number(Quantity), Price: Number(Price), Supplier }
      }]);
      return res.status(201).json({ 
        success: true,
        id: record[0].id // Return the new record ID
      });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}