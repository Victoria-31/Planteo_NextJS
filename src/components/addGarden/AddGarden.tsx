'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import styles from './AddGarden.module.css'; // Assurez-vous d'avoir ce fichier CSS pour les styles


export default function AddGarden({ plantId }: { plantId: string }) {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);

  const handleAddPlant = async () => {
    setError(null);

    if (!session?.user?.id) {
      toast.error("Vous devez être connecté pour ajouter une plante au jardin.");
      return;
    }
     
    try {
      await axios.post('/api/user/garden', {
        userId: session.user.id,
        plantId,
      });

      toast.success("Plante ajoutée au jardin !");
    } catch (err: unknown) {
        
      const error = err as AxiosError<{ message: string }>;
      const errorMessage =
        error.response?.data?.message || "Erreur lors de l'ajout au jardin";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  if (status === 'loading') {
    return <p>Chargement...</p>;
  }


  return (
    <>
      {error && <p className='errorMessage'>{error}</p>}
      <button className={styles.buttonAddGarden} type="button" onClick={handleAddPlant}>
        Ajouter dans mon jardin
      </button>
       <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" 
      />
    </>
  );
}
