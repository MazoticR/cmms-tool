import Airtable from 'airtable';
import type { NextApiRequest, NextApiResponse } from 'next';

const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY })
  .base(process.env.NEXT_PUBLIC_AIRTABLE_BASE!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const records = await base('Parts').select().all();
    const parts = records.map(record => ({
      id: record.id,
      ...record.fields
    }));
    res.status(200).json(parts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch parts' });
  }
}