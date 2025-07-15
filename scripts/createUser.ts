import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

import { dbConnect } from '../src/lib/mongodb';
import User from '../src/lib/models/User';
import argon2 from 'argon2';

async function createUser() {
  try {
    await dbConnect();

    const email = 'test2@example.com';
    const name = 'Utilisateur Test';
    const password = 'motdepasse123';

    const hashedPassword = await argon2.hash(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      garden: [], 
    });

    await user.save();

    console.log('Utilisateur créé:', user);
  } catch (error) {
    console.error('Erreur lors de la création utilisateur:', error);
  } finally {
    process.exit();
  }
}

createUser();
