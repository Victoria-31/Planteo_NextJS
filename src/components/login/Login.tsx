"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import styles from './Login.module.css';
import Register from "../register/Register";

export default function Login({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/", 
      redirect: false, 
    });

    if (res?.ok) {
      onClose(); 
    } else {
      alert("Identifiants invalides");
    }
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
  };

  // Si on affiche le formulaire d'inscription, on le retourne
  if (showRegister) {
    return <Register onClose={handleCloseRegister} />;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <h2>Connexion</h2>
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
      <button type="button" onClick={onClose} className={styles.buttonCancel}>
        Annuler
      </button>
      <button type="submit" className={styles.buttonConnect}>
        Connexion
      </button>

      <p className={styles.registerPrompt}>
        Pas encore de compte ?{" "}
       
      </p>
      <button type="button" className={styles.buttonRegister} onClick={handleRegisterClick}>
          Inscrivez-vous
        </button>
       
    </form>
  );
}