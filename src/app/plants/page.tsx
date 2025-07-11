import { getFilteredPlants, getEarthTypes } from "@/lib/db";
import PlantCard from "@/components/PlantCard";
import styles from "./page.module.css";

export default async function PlantsPage({searchParams}: { searchParams: { name?: string; earth_type?: string } }) {

    const nameFilter = ( await searchParams).name ;
    const earthTypeFilter = ( await searchParams).earth_type;

  const plants = await getFilteredPlants(nameFilter, earthTypeFilter);
  const earthTypes = await getEarthTypes();

  return (
    <main className={styles.plants}>
      <header>
        <h1>Recherche ta plante</h1>
      </header>

      <section>
        <form method="GET" className="filter">
          <input
            type="text"
            name="name"
            placeholder="Rechercher par nom"
            defaultValue={nameFilter}
          />
          <select name="earth_type" defaultValue={earthTypeFilter}>
            <option value="">Type de terre</option>
            {earthTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button type="submit">Rechercher</button>
        </form>

        <ul>
          {plants.map((plant) => (
            <li key={plant._id.toString()}>
              <PlantCard
                plant={{
                  id: plant._id.toString(),
                  name: plant.name,
                  background: plant.background,
                  description: plant.description,
                }}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
