import type { NextApiRequest, NextApiResponse } from "next";
import { addPlantToUserGarden } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  try {
    const { userId, plantId } = req.body;

    if (!userId || !plantId) {
      return res.status(400).json({ message: "userId ou plantId manquant" });
    }

    await addPlantToUserGarden(userId, plantId);

    return res.status(200).json({ success: true });
  } catch (err: unknown) {
  if (err instanceof Error) {
    return res.status(400).json({ message: err.message });
  }
  return res.status(500).json({ message: "Erreur inconnue" });
}
}


