import Airtable from 'airtable';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Machine, ApiSuccessResponse } from '../../types';

const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY })
  .base(process.env.NEXT_PUBLIC_AIRTABLE_BASE!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Machine[] | ApiSuccessResponse | { error: string }>
) {
  try {
    if (req.method === 'GET') {
      const records = await base('Machines').select().all();
      const machines = records.map(record => ({
        id: record.id,
        ...record.fields,
      })) as Machine[];
      return res.status(200).json(machines);
    }

    if (req.method === 'POST') {
      const { Name, Location, Status } = req.body;
      const record = await base('Machines').create([{
        fields: { Name, Location, Status: Status || 'Operational' }
      }]);
      return res.status(201).json({ 
        success: true,
        id: record[0].id
      });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}