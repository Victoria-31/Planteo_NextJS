"use client";

import { useState } from "react";
import styles from './Register.module.css';

import axios, { AxiosError } from "axios";

export default function Register({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("Registering user:", { email, password, name });
      await axios.post("/api/auth/signup", { email, password, name });

      alert("Inscription réussie !");
      onClose(); 
    } catch (err: unknown) {
  const error = err as AxiosError<{ message: string }>;
  alert(error.response?.data?.message || "Erreur lors de l'inscription");
}}

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
      <button type="button" className={styles.buttonBackSignin} onClick={onClose}>
        Retour à la connexion
      </button>
    </form>
  );
}