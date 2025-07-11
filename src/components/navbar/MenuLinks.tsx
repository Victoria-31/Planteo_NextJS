'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import styles from './Navbar.module.css';

interface MenuLinksProps {
  onLinkClick?: () => void;
  onLoginClick?: () => void;
  className?: string;
  linkClassName?: string;
  authButtonClassName?: string;
  activeClassName?: string;
}

const links = [
  { name: 'Accueil', path: '/' },
  { name: 'Catalogue', path: '/plants' },
];

export default function MenuLinks({ 
  onLinkClick, 
  onLoginClick, 
  className,
  linkClassName,
  authButtonClassName,
  activeClassName
}: MenuLinksProps) {
  const pathname = usePathname();
  const { status } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    if (onLinkClick) onLinkClick();
  };

  const linkClass = linkClassName || styles.navLink;
  const authButtonClass = authButtonClassName || styles.authButton;
  const activeClass = activeClassName || styles.active;

  return (
    <ul className={`${styles.linksNav} ${className ?? ''}`}>
      {links.map(({ name, path }) => (
        <li key={name}>
          <Link
            href={path}
            className={`${linkClass} ${pathname === path ? activeClass : ''}`}
            onClick={onLinkClick}
          >
            {name}
          </Link>
        </li>
      ))}

      {status === 'authenticated' && (
        <li>
          <Link
            href="/my-garden"
            className={`${linkClass} ${pathname === '/my-garden' ? activeClass : ''}`}
            onClick={onLinkClick}
          >
            Mon jardin
          </Link>
        </li>
      )}

      <li>
        {status === 'authenticated' ? (
          <button
            type="button"
            className={authButtonClass}
            onClick={handleSignOut}
          >
            Se déconnecter
          </button>
        ) : (
          <button
            type="button"
            className={authButtonClass}
            onClick={onLoginClick}
          >
            Se connecter
          </button>
        )}
      </li>
    </ul>
  );
}