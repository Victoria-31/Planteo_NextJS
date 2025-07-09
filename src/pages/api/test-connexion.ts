import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();
    res.status(200).json({ message: "Connexion à la base MongoDB réussie" });
  } catch (error) {
    console.error("Erreur de connexion MongoDB :", error);
    res.status(500).json({
      message: "Erreur de connexion",
      error: error instanceof Error ? error.message : error,
    });
  }
}
