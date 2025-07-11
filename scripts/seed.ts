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

  console.log('Vérification et insertion des types de terre manquants...');
const earthTypes = ['Humifère', 'Sableux', 'Argileux', 'Calcaire', 'Limoneux', 'Siliceux'];

for (const type of earthTypes) {
  const exists = await Earth.findOne({ type });
  if (!exists) {
    await Earth.create({ type });
    console.log(`Type de terre ajouté : ${type}`);
  }
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

    const getEarth = async (type: string) => {
      const earth = await Earth.findOne({ type });
      if (!earth) throw new Error(`Terre non trouvée : ${type}`);
      return earth;
    };

    const getMonth = async (name: string) => {
      const month = await Month.findOne({ name });
      if (!month) throw new Error(`Mois non trouvé : ${name}`);
      return month;
    };

    const humifere = await getEarth('Humifère');
    const sableux = await getEarth('Sableux');
    const argileux = await getEarth('Argileux');
    const calcaire = await getEarth('Calcaire');
    const limoneux = await getEarth('Limoneux');

    const mars = await getMonth('mars');
    const avril = await getMonth('avril');
    const mai = await getMonth('mai');
    const juin = await getMonth('juin');
    const juillet = await getMonth('juillet');
    const aout = await getMonth('août');
    const septembre = await getMonth('septembre');
    const octobre = await getMonth('octobre');

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
    name: 'Brocoli',
    description: 'Légume vert riche en fibres et vitamines',
    background: '/brocoli.jpg',
    earth: argileux._id,
    seedlingMonths: [avril._id, mai._id],
    harvestMonths: [septembre._id, octobre._id],
  },
  {
    name: 'Chou-fleur',
    description: 'Légume blanc au goût doux, riche en vitamines',
    background: '/choufleur.jpg',
    earth: argileux._id,
    seedlingMonths: [mai._id, juin._id],
    harvestMonths: [septembre._id, octobre._id],
  },
  {
    name: 'Ciboulette',
    description: 'Plante aromatique utilisée en assaisonnement',
    background: '/ciboulette.jpg',
    earth: calcaire._id,
    seedlingMonths: [mars._id, avril._id],
    harvestMonths: [juin._id, juillet._id],
  },
  {
    name: 'Courgette',
    description: 'Légume d’été tendre et facile à cuisiner',
    background: '/courgettes.jpg',
    earth: humifere._id,
    seedlingMonths: [avril._id, mai._id],
    harvestMonths: [juillet._id, aout._id],
  },
  {
    name: 'Épinard',
    description: 'Feuille verte riche en fer',
    background: '/epinard.jpg',
    earth: limoneux._id,
    seedlingMonths: [mars._id, septembre._id],
    harvestMonths: [mai._id, octobre._id],
  },
  {
    name: 'Fraise',
    description: 'Fruit rouge sucré et juteux',
    background: '/fraise.jpg',
    earth: humifere._id,
    seedlingMonths: [mars._id, avril._id],
    harvestMonths: [juin._id, juillet._id],
  },
  {
    name: 'Haricot',
    description: 'Légumineuse facile à cultiver',
    background: '/haricot.jpg',
    earth: sableux._id,
    seedlingMonths: [mai._id, juin._id],
    harvestMonths: [juillet._id, aout._id],
  },
  {
    name: 'Laitue',
    description: 'Feuille verte de base pour les salades',
    background: '/laitue.jpg',
    earth: limoneux._id,
    seedlingMonths: [mars._id, avril._id],
    harvestMonths: [mai._id, juin._id],
  },
  {
    name: 'Menthe',
    description: 'Plante aromatique au goût rafraîchissant',
    background: '/menthe.jpg',
    earth: calcaire._id,
    seedlingMonths: [mars._id, avril._id],
    harvestMonths: [juin._id, juillet._id],
  },
  {
    name: 'Oignon',
    description: 'Bulbe indispensable en cuisine',
    background: '/oignon.jpg',
    earth: argileux._id,
    seedlingMonths: [mars._id, avril._id],
    harvestMonths: [juillet._id, aout._id],
  },
  {
    name: 'Pois',
    description: 'Légume printanier à grains sucrés',
    background: '/pois.jpg',
    earth: limoneux._id,
    seedlingMonths: [mars._id, avril._id],
    harvestMonths: [juin._id, juillet._id],
  },
  {
    name: 'Poivron',
    description: 'Légume coloré, doux ou légèrement amer',
    background: '/poivron.jpg',
    earth: humifere._id,
    seedlingMonths: [avril._id, mai._id],
    harvestMonths: [aout._id, septembre._id],
  },
  {
    name: 'Radis',
    description: 'Racine croquante au goût piquant',
    background: '/radis.jpg',
    earth: sableux._id,
    seedlingMonths: [mars._id, avril._id],
    harvestMonths: [mai._id, juin._id],
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
