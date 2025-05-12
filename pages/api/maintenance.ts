import Airtable from 'airtable';
import type { NextApiRequest, NextApiResponse } from 'next';

const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY })
  .base(process.env.NEXT_PUBLIC_AIRTABLE_BASE!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { machineId, partId, date, cost, technician } = req.body;
    const record = await base('MaintenanceLogs').create([
      {
        fields: {
          Machine: [machineId],
          PartUsed: [partId],
          Date: date,
          Cost: cost,
          Technician: technician
        }
      }
    ]);
    res.status(200).json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create maintenance log' });
  }
}