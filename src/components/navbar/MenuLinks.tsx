'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import styles from './Navbar.module.css';

interface MenuLinksProps {
  onLinkClick?: () => void;
  onLoginClick?: () => void;
  className?: string;
}

const links = [
  { name: 'Accueil', path: '/' },
  { name: 'Catalogue', path: '/plants' },
  { name: 'Mon jardin', path: '/my-garden' },
];

export default function MenuLinks({ onLinkClick, onLoginClick, className }: MenuLinksProps) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    if (onLinkClick) onLinkClick();
  };

  return (
    <ul className={`${styles.linksNav} ${className ?? ''}`}>
      {links.map(({ name, path }) => (
        <li key={name}>
          <Link
            href={path}
            className={`${styles.navLink} ${pathname === path ? styles.active : ''}`}
            onClick={onLinkClick}
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
  );
}