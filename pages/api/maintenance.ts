import Airtable from 'airtable';
import type { NextApiRequest, NextApiResponse } from 'next';
import { MaintenanceLog, ApiSuccessResponse } from '../../types';

const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY })
  .base(process.env.NEXT_PUBLIC_AIRTABLE_BASE!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MaintenanceLog[] | ApiSuccessResponse | { error: string }>
) {
  try {
    if (req.method === 'GET') {
      const records = await base('MaintenanceLogs').select({
        sort: [{ field: 'Date', direction: 'desc' }]
      }).all();
      const logs = records.map(record => ({
        id: record.id,
        ...record.fields,
      })) as MaintenanceLog[];
      return res.status(200).json(logs);
    }

    if (req.method === 'POST') {
      const { Machine, PartUsed, Date, Cost, Technician } = req.body;
      const record = await base('MaintenanceLogs').create([{
        fields: {
          Machine: [Machine],
          PartUsed: [PartUsed],
          Date,
          Cost: Number(Cost),
          Technician
        }
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