import GardenClientWrapper from '@/components/garden/Garden';
import styles from './page.module.css';

export default async function GardenPage() {


  return (
    <main className={styles.garden}>
     

 <GardenClientWrapper />
      <section>
        <p>Cette page est en construction !</p>
        <p>Tu peux y retrouver tes plantes favorites et les gérer.</p>
        <p>Reste à l&apos;écoute pour les prochaines mises à jour !</p>
      </section>
    </main>
  );
}