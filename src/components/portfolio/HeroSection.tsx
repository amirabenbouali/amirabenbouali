'use client';

import { useState } from 'react';
import styles from './Portfolio.module.css';

export function HeroSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={`${styles.sidecopy} ${styles.mono}`} data-reveal>
        ✳
        <br />
        <br />
        I BUILD SOFTWARE THAT FEELS
        <br />
        CONSIDERED, USEFUL AND HUMAN.
        <br />
        <br />
        SCROLL TO EXPLORE.
      </div>

      <div className={styles.stage} aria-label="Interactive portfolio file" data-dossier-stage>
        <div className={`${styles.folder} ${isOpen ? styles.folderOpen : ''}`} data-dossier>
          <div className={styles.note} aria-hidden="true" />
          <div className={styles.tape} aria-hidden="true" />
          <div className={styles.star} aria-hidden="true">
            ★
          </div>
          <div className={styles.nameScript}>
            Amira Lina
            <br />
            Benbouali
          </div>
          <button
            className={`${styles.revealFile} ${styles.mono}`}
            type="button"
            aria-pressed={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? 'CLOSE FILE ↙' : 'OPEN FILE ↗'}
          </button>
        </div>

        <h1 className={styles.heroTitle} id="hero-title" data-reveal>
          PORTFOLIO
        </h1>
        <div className={`${styles.lens} ${styles.lensOne}`} data-lens-one aria-hidden="true" />
        <div className={`${styles.lens} ${styles.lensTwo}`} data-lens-two aria-hidden="true" />
        <div className={`${styles.hint} ${styles.mono}`}>MOVE YOUR CURSOR · OPEN THE FILE</div>
      </div>

      <div className={`${styles.status} ${styles.mono}`} data-reveal>
        <b>SOFTWARE ENGINEER</b>
        CREATIVE DEVELOPER
        <br />
        <br />
        <br />
        BASED IN LONDON, UK
        <br />
        <span className={styles.openStatus}>
          OPEN TO WORK <i aria-hidden="true" />
        </span>
      </div>
    </section>
  );
}
