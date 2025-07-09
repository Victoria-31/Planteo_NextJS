'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import styles from './Burgermenu.module.css';

interface BurgermenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const links = [
  { name: 'Accueil', path: '/' },
  { name: 'Catalogue', path: '/plants' },
  { name: 'Mon jardin', path: '/my-garden' },
];

export default function Burgermenu({ isOpen, onClose, onLoginClick }: BurgermenuProps) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    onClose();
  };

  return (
    <>
      {/* Overlay pour fermer le menu en cliquant à côté */}
      {isOpen && (
        <div 
          className={styles.overlay}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      <div 
        className={`${styles.burgerMenu} ${isOpen ? styles.open : ''}`} 
        aria-hidden={!isOpen}
        role="navigation"
        aria-label="Menu principal"
      >
        <ul className={styles.menuLinks}>
          {links.map(({ name, path }) => (
            <li key={name}>
              <Link
                href={path}
                className={`${styles.menuLink} ${pathname === path ? styles.active : ''}`}
                onClick={onClose}
              >
                {name}
              </Link>
            </li>
          ))}

          <li>
            {status === 'authenticated' ? (
              <button
                type="button"
                className={styles.authButton}
                onClick={handleSignOut}
              >
                Se déconnecter
              </button>
            ) : (
              <button
                type="button"
                className={styles.authButton}
                onClick={onLoginClick}
              >
                Se connecter
              </button>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}