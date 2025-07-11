import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '@/lib/mongodb';
import { getFilteredPlants } from '@/lib/db';
import { HydratedDocument } from 'mongoose';
import { IPlant } from '@/types/plant';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HydratedDocument<IPlant>[] | { message: string }>
) {
  await dbConnect();

  if (req.method === 'GET') {
    const { name, earthType } = req.query;

    try {
      const plants = await getFilteredPlants(
        typeof name === 'string' ? name : undefined,
        typeof earthType === 'string' ? earthType : undefined
      );

      return res.status(200).json(plants);
    } catch (error) {
      console.error('Erreur lors de la récupération des plantes:', error);
      return res.status(500).json({ message: "Erreur lors de la récupération des plantes" });
    }
  }

  res.status(405).json({ message: 'Méthode non autorisée' });
}
