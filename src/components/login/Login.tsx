"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <form onSubmit={handleSubmit}>
      <h2 >Connexion</h2>
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
      <div >
        <button type="button" onClick={onClose} >
          Annuler
        </button>
        <button type="submit" >
          Connexion
        </button>
      </div>
    </form>
  );
}
