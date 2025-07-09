import Link from "next/link";
import styles from "./plantCard.module.css";


type PlantCardProps = {
  plant: {
    id: string;
    name: string;
    background: string;
    words: string;
  };
};

export default function PlantCard({ plant }: PlantCardProps) {
  return (
    <article className={styles.plantCard}>
      <img src={plant.background} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p>{plant.words}</p>
      <Link href={`/plantdetails/${plant.id}`}>
        Je veux tout savoir 🧐
      </Link>
    </article>
  );
}
