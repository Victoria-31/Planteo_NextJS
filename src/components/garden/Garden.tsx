"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from './Garden.module.css';
import { IPlant } from "@/types/plant";
import PlantCard from "../PlantCard";

export default function GardenClientWrapper() {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const [userPlants, setUserPlants] = useState<IPlant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetch(`/api/user/garden?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUserPlants(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des plantes utilisateur:", error);
          setLoading(false);
        });
    }
  }, [userId]);

  if (!session) {
    return <p>Veuillez vous connecter pour voir votre jardin.</p>;
  }

  if (loading) {
    return <p>Chargement de votre jardin...</p>;
  }

  return (
    <section className={styles.garden}>
      <header>
      <h1>Bienvenu au jardin de {session.user.name}</h1>

      </header>

      <section className={styles.plants}>

        <p>Cette page est en construction ! Tu peux y retrouver tes plantes favorites et les gérer.</p>
       
       {userPlants ? "" : "Ton jardin est vide "}
        
      <ul>
               {userPlants.map((plant, idx) => (
                 <li className = {styles.plantCard}key={plant._id ? plant._id.toString() : `plant-${idx}`}>
                   <PlantCard
                     plant={{
                       id: plant._id ? plant._id.toString() : `plant-${idx}`,
                       name: plant.name,
                       background: plant.background,
                       description: plant.description,
                     }}
                   />
                 </li>
               ))}
             </ul>
             </section>
    </section>
  );
}
