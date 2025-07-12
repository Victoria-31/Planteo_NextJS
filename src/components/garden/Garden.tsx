"use client";

import { useSession } from "next-auth/react";
import styles from './Garden.module.css';

export default function GardenClientWrapper() {
  const { data: session } = useSession();
  console.log(session);

  return (
     <header className={styles.header}>
        <h1>Bienvenu dans le jardin de {session?.user.name}</h1>
      </header>
  );
}
