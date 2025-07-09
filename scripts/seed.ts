import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

import mongoose from 'mongoose';
import Earth from '../src/lib/models/Earth';
import Month from '../src/lib/models/Month';
import Plant from '../src/lib/models/Plant';
import { dbConnect } from '../src/lib/mongodb';

async function seed() {
  try {
    await dbConnect();

    const earthCount = await Earth.countDocuments();
    if (earthCount === 0) {
      console.log('Peuplement de la collection Earth...');
      await Earth.insertMany([
        { type: 'Humifère' },
        { type: 'Sableux' },
      ]);
      console.log('Terres ajoutées.');
    } else {
      console.log('Collection Earth déjà peuplée.');
    }

    const monthCount = await Month.countDocuments();
    if (monthCount === 0) {
      console.log('Peuplement de la collection Month...');
      await Month.insertMany([
        { name: 'janvier' },
        { name: 'février' },
        { name: 'mars' },
        { name: 'avril' },
        { name: 'mai' },
        { name: 'juin' },
        { name: 'juillet' },
        { name: 'août' },
        { name: 'septembre' },
        { name: 'octobre' },
        { name: 'novembre' },
        { name: 'décembre' },
      ]);
      console.log('Mois ajoutés.');
    } else {
      console.log('Collection Month déjà peuplée.');
    }

    const plantCount = await Plant.countDocuments();
    if (plantCount > 0) {
      console.log('Suppression des plantes existantes avant reseed...');
      await Plant.deleteMany({});
    }

    const humifere = await Earth.findOne({ type: 'Humifère' });
    const sableux = await Earth.findOne({ type: 'Sableux' });

    if (!humifere || !sableux) {
      throw new Error('Erreur : types de terre attendus non trouvés.');
    }

    const getMonth = async (name: string) => {
      const month = await Month.findOne({ name });
      if (!month) {
        throw new Error(`Erreur : mois non trouvé : ${name}`);
      }
      return month;
    };

    const mars = await getMonth('mars');
    const avril = await getMonth('avril');
    const mai = await getMonth('mai');
    const juillet = await getMonth('juillet');
    const aout = await getMonth('août');
    const septembre = await getMonth('septembre');

    await Plant.insertMany([
      {
        name: 'Tomate',
        description: 'Plante potagère appréciée en été',
        background: '/tomates.jpg',
        earth: humifere._id,
        seedlingMonths: [mars._id, avril._id],
        harvestMonths: [juillet._id, aout._id],
      },
      {
        name: 'Carotte',
        description: 'Racine comestible riche en bêta-carotène',
        background: '/carottes.jpg',
        earth: sableux._id,
        seedlingMonths: [mars._id, avril._id, mai._id],
        harvestMonths: [aout._id, septembre._id],
      },
      {
        name: 'Carotte',
        description: 'Racine comestible riche en bêta-carotène',
        background: '/carottes.jpg',
        earth: sableux._id,
        seedlingMonths: [mars._id, avril._id, mai._id],
        harvestMonths: [aout._id, septembre._id],
      },
    ]);

    console.log('Plantes ajoutées avec succès.');
  } catch (error) {
    console.error('Erreur lors du seed :', error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

seed();
