import Airtable from 'airtable';
import type { NextApiRequest, NextApiResponse } from 'next';
import { MaintenanceLog } from '../../types';

const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY })
  .base(process.env.NEXT_PUBLIC_AIRTABLE_BASE!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MaintenanceLog[] | { error: string }>
) {
  if (req.method === 'GET') {
    try {
      const records = await base('MaintenanceLogs').select().all();
      const logs = records.map(record => ({
        id: record.id,
        ...record.fields,
      })) as MaintenanceLog[];
      res.status(200).json(logs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch logs' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}