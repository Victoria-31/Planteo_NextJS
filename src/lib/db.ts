
import '@/lib/models';
import Plant from './models/Plant'; 
import { dbConnect } from './mongodb';
import { IPlant } from '@/types/plant';
import { HydratedDocument } from 'mongoose';
import { IUser } from './models/User';
import User from './models/User';

export async function getUserByEmail(email: string): Promise<IUser | null> {
  try {
    await dbConnect();
    const user = await User.findOne({ email }).exec();
    return user;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    throw new Error('Impossible de récupérer l\'utilisateur');
  }
}

export async function getAllPlants(): Promise<HydratedDocument<IPlant>[]> {
  try {
    await dbConnect();
    const plants = await Plant.find()
      .populate("earth")
      .populate("seedlingMonths")
      .populate("harvestMonths")
      .exec();

    return plants;
  } catch (error) {
    console.error('Erreur lors de la récupération des plantes:', error);
    throw new Error('Impossible de récupérer les plantes de la base de données');
  }
}

export async function getPlantById(id: string): Promise<HydratedDocument<IPlant> | null> {
  try {
    await dbConnect();
    return await Plant.findById(id)
      .populate("earth")
      .populate("seedlingMonths")
      .populate("harvestMonths")
      .exec();
  } catch (error) {
    console.error("Erreur récupération plante par id", error);
    return null;
  }
}