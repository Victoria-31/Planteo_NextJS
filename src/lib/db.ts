
import '@/lib/models';
import argon2 from 'argon2';
import Plant from './models/Plant'; 
import Earth from './models/Earth';
import { Types } from 'mongoose';
import { dbConnect } from './mongodb';
import { IPlant } from '@/types/plant';
import { HydratedDocument } from 'mongoose';
import { IUser } from './models/User';
import User from './models/User';

interface UserInput {
  email: string;
  password: string;
  name: string;
  garden: Types.ObjectId[];
}

export async function createUser({ email, password, name, garden }: UserInput) {
  await dbConnect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Cet utilisateur existe déjà');
  }

  const hashedPassword = await argon2.hash(password);

  const newUser = new User({
    email,
    password: hashedPassword,
    name,
    garden,
  });

  await newUser.save();

  return {
    id: newUser._id,
    email: newUser.email,
    name: newUser.name,
    garden: newUser.garden,
  };
}

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

export async function getFilteredPlants(
  name?: string,
  earthType?: string
): Promise<HydratedDocument<IPlant>[]> {
  try {
    await dbConnect();

    const plants = await Plant.find()
      .populate("earth")
      .populate("seedlingMonths")
      .populate("harvestMonths")
      .exec();


    return plants.filter((plant) => {
      const matchesName = name
        ? plant.name.toLowerCase().includes(name.toLowerCase())
        : true;

      const matchesEarth = earthType
        ? plant.earth?.type === earthType
        : true;

      return matchesName && matchesEarth;
    });
  } catch (error) {
    console.error("Erreur lors du filtrage des plantes :", error);
    throw new Error("Impossible de filtrer les plantes");
  }
}

export async function getEarthTypes(): Promise<string[]> {
  try {
    await dbConnect();
    
    const earths = await Earth.find().select('type -_id').exec();
    
    const uniqueTypes = [...new Set(earths.map((e) => e.type))];

    return uniqueTypes;
  } catch (error) {
    console.error("Erreur lors de la récupération des types de terre :", error);
    throw new Error("Impossible de récupérer les types de terre");
  }
}

export async function addPlantToUserGarden(userId: string, plantId: string) {
  try {
    await dbConnect();

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }
    if (!user.garden) {
      user.garden = [];
    }

    const alreadyAdded = user.garden.some(
  (id: Types.ObjectId) => id.toString() === plantId
    );
    if (alreadyAdded) {
      throw new Error("Plante déjà ajoutée au jardin");
    }

    user.garden.push(plantId);
    await user.save();

    return { success: true, garden: user.garden };
  } catch (error: unknown) {

  if (error instanceof Error) {
    console.error("Erreur lors de l'ajout de la plante au jardin :", error);
  }
    else {
      console.error("plante déjà ajoutée au jardin");
    }
    

    throw new Error("Impossible d'ajouter la plante au jardin de l'utilisateur");
  }
}

export async function getUserPlants(userId: string): Promise<HydratedDocument<IPlant>[]> {
  try {
    await dbConnect();
    
    const user = await User.findById(userId);
    if (!user || !user.garden) {
      throw new Error("Utilisateur introuvable ou jardin vide");
    }

    const plants = await Plant.find({ _id: { $in: user.garden } })
      .populate("earth")
      .populate("seedlingMonths")
      .populate("harvestMonths")
      .exec();

    return plants;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erreur lors de la récupération des plantes du jardin :", error.message);
    }
    throw new Error("Impossible de récupérer les plantes du jardin");
  }
}
