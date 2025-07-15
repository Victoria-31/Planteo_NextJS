"use client";

import { useState } from "react";
import styles from './Register.module.css';
import { toast } from "react-toastify";

import { ToastContainer } from 'react-toastify';
import axios, { AxiosError } from "axios";

export default function Register({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
     try {
    console.log("Registering user:", { email, password, name });
    await axios.post("/api/auth/signup", { email, password, name });

    toast.success("Inscription réussie !");
    onClose();
  } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage = error.response?.data?.message || "Erreur lors de l'inscription";
      setError(errorMessage);
      toast.error(errorMessage);
    }
}

  return (
    <form onSubmit={handleRegister} className={styles.registerForm}>
      <h2>Inscription</h2>
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className={styles.buttonSignup}>Créer mon compte</button>
        <p className="errorMessage">{error}</p>
      <button type="button" className={styles.buttonBackSignin} onClick={onClose}>
        Retour à la connexion
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
    </form>
  );
}