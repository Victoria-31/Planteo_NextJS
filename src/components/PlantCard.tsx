import Image from "next/image";
import Link from "next/link";
import styles from "./PlantCard.module.css";


type PlantCardProps = {
  plant: {
    id: string;
    name: string;
    background: string;
    description: string;
  };
};

export default function PlantCard({ plant }: PlantCardProps) {
  return (
    <article className={styles.plantCard}>
      <Image
        src={plant.background}
        alt={plant.name}
        width={300}
        height={200}
        className={styles.plantImage}
      />
      <h3>{plant.name}</h3>
      <p>{plant.description}</p>
      <Link href={`/plantdetails/${plant.id}`}>
        Je veux tout savoir 🧐
      </Link>
    </article>
  );
}
