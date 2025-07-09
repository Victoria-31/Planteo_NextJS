import axios from "axios";
import PlantCard from "@/components/PlantCard";
import styles from "./page.module.css";
import Image from "next/image";

type Month = { _id: string; name: string };
type Earth = { _id: string; type: string };
type Plant = {
  _id: string;
  name: string;
  description: string;
  background: string;
  earth: Earth;
  seedlingMonths: Month[];
  harvestMonths: Month[];
};

export default async function Page() {
  try {
    const res = await axios.get<Plant[]>("http://localhost:3000/api/plants", {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    const plants = res.data;

    return (
      <main className={styles.homepage}>
        <header>
          <h1>Plantéo</h1>
          <p>L'atlas du Potager</p>
        </header>

        <section>
          <article className={styles.explore}>
            <h2>Explore 🌱</h2>
            <p>Découvre les plantes déjà référencées</p>
            <Image
              className={styles.arrow}
              src="/arrow.svg"
              alt="Flèche pour explorer les plantes"
              width={40}
              height={40}
            />
          </article>

          <ul className="scrollCardContainer">
            {plants.map((plant) => (
              <li key={plant._id}>
                <PlantCard
                  plant={{
                    id: plant._id,
                    name: plant.name,
                    background: plant.background,
                    words: plant.description,
                  }}
                />
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>
            🌱 Découvrez, cultivez et enrichissez Plantéo en proposant de
            nouvelles plantes pour un potager toujours plus vivant !
          </h2>
          <ul>
            <li className={styles.share}>
              <h3>🌱 Partage</h3> Propose tes plantes favorites et enrichis
              Plantéo
            </li>
            <div>
              <li>
                <h3>📅 Planifie</h3> Crée des calendriers de semis et de récoltes
                pour chaque plante
              </li>
              <li>
                <h3>🌿 Apprends</h3> Découvre des astuces et conseils pour
                cultiver tes plantes avec succès
              </li>
            </div>
          </ul>
        </section>
      </main>
    );

  } catch (error) {
    throw new Error("Échec du chargement des plantes");
  }
}
