import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../lib/mongodb';
import Plant from '../../../lib/models/Plant';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    const plants = await Plant.find({});
    res.status(200).json(plants);
  } else {
    res.status(405).end();
  }
}
