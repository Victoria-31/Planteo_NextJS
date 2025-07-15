import type { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

 const { email, password, name } = req.body;
const garden: string[] = []; 

if (!email || !password) {
  return res.status(400).json({ message: 'Email et mot de passe requis' });
}

try {
  const user = await createUser({ email, password, name, garden }); // passe garden ici
  return res.status(201).json({ message: 'Utilisateur créé', user });
} catch (err: unknown) {
  if (err instanceof Error) {
    return res.status(400).json({ message: err.message });
  }
  return res.status(500).json({ message: "Erreur inconnue" });
}

}
