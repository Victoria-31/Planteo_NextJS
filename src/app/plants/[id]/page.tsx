import { getPlantById } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";



export default async function Page({ params }: { params: { id: string } }) {
  const plant = await getPlantById(params.id);

  if (!plant) {
    notFound();
  }

  return (
    <main className={styles.plantDetails}>
      <header>
        <h2>L&apos;atlas du potager</h2>
      </header>

      <h1>{plant.name}</h1>

      <nav className={styles.navigation}>
        <Link href="/plants">🌿 Toutes les plantes 🌿</Link>
      </nav>

      <section className={styles.plantInfo}>
        <Image
          src={plant.background}
          alt={`Illustration de ${plant.name}`}
          width={400}
          height={300}
          className={styles.plantImage}
        />

        <article>
          <p className={styles.plantDescription}>{plant.description}</p>

          <p>
            <strong>🌱 Type de terre :</strong> {plant.earth.type}
          </p>

          <p>
            <strong>🫘 Période de semis :</strong>{" "}
            {plant.seedlingMonths.map((month) => month.name).join(", ")}
          </p>

          <p>
            <strong>📦 Période de récolte :</strong>{" "}
            {plant.harvestMonths.map((month) => month.name).join(", ")}
          </p>
        </article>
      </section>
    </main>
  );
}
