'use client';

import MenuLinks from './MenuLinks';
import styles from './Burgermenu.module.css';

interface BurgermenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export default function Burgermenu({ isOpen, onClose, onLoginClick }: BurgermenuProps) {
  return (
    <>
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
        <MenuLinks 
          className={styles.menuLinks}
          linkClassName={styles.menuLink}
          authButtonClassName={styles.authButton}
          activeClassName={styles.active}
          onLinkClick={onClose}
          onLoginClick={onLoginClick}
        />
      </div>
    </>
  );
}