import type { NextApiRequest, NextApiResponse } from "next";
import { addPlantToUserGarden, getUserPlants } from "@/lib/db";
import { HydratedDocument } from "mongoose";
import { IPlant } from "@/types/plant";

type Data = 
  | { success: boolean }
  | { message: string }
  | HydratedDocument<IPlant>[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
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

  if (req.method === "GET") {
    const { userId } = req.query;

    if (typeof userId !== "string") {
      return res.status(400).json({ message: "Paramètre userId manquant ou invalide" });
    }

    try {
      const plants = await getUserPlants(userId);
      return res.status(200).json(plants);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      }
      return res.status(500).json({ message: "Erreur inconnue" });
    }
  }

  return res.status(405).json({ message: "Méthode non autorisée" });
}
