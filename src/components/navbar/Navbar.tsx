'use client';

import { useState, useEffect } from 'react';
import Burgermenu from './Burgermenu';
import Image from "next/image";
import MenuLinks from './MenuLinks';
import Login from '../login/Login';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isModalOpen) closeModal();
        if (isMenuOpen) setIsMenuOpen(false);
      }
    };

    if (isModalOpen || isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, isMenuOpen]);

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
    

  <Link className={styles.logoContainer} href="/">
    <Image
      src="/logo.png"
      alt="Logo Plantéo"
      width={100}
      height={100}
      className={styles.logo}
    />
  </Link>

    
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          className={styles.burgerButton}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <MenuLinks 
          className={styles.desktopNav}
          onLoginClick={openModal}
        />

    
      </nav>

      <Burgermenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onLoginClick={() => {
          setIsMenuOpen(false);
          openModal();
        }}
      />

      {isModalOpen && (
        <div 
          className={styles.modalBackground}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-modal"
        >
          <div 
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Login onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
}
