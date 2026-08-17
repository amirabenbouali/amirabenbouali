'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './Portfolio.module.css';

export function HeroSection() {
  const [isOpen, setIsOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let bounds = hero.getBoundingClientRect();
    const refreshBounds = () => {
      bounds = hero.getBoundingClientRect();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      hero.style.setProperty('--hero-x', x.toFixed(3));
      hero.style.setProperty('--hero-y', y.toFixed(3));
      hero.style.setProperty('--folder-x', `${x * 16}px`);
      hero.style.setProperty('--folder-y', `${y * 11}px`);
      hero.style.setProperty('--folder-r', `${-1.35 + x * 1.1}deg`);
      hero.style.setProperty('--paper-x', `${x * 26}px`);
      hero.style.setProperty('--paper-y', `${y * 18}px`);
      hero.style.setProperty('--detail-x', `${x * -18}px`);
      hero.style.setProperty('--detail-y', `${y * -12}px`);
      hero.style.setProperty('--script-x', `${x * 12}px`);
      hero.style.setProperty('--script-y', `${y * 8}px`);
      hero.style.setProperty('--lens-one-x', `${x * 36}px`);
      hero.style.setProperty('--lens-one-y', `${y * 22}px`);
      hero.style.setProperty('--lens-two-x', `${x * -30}px`);
      hero.style.setProperty('--lens-two-y', `${y * -18}px`);
      hero.style.setProperty('--light-x', `${event.clientX - bounds.left}px`);
      hero.style.setProperty('--light-y', `${event.clientY - bounds.top}px`);
    };

    const handlePointerLeave = () => {
      hero.style.setProperty('--hero-x', '0');
      hero.style.setProperty('--hero-y', '0');
      hero.style.setProperty('--folder-x', '0px');
      hero.style.setProperty('--folder-y', '0px');
      hero.style.setProperty('--folder-r', '-1.35deg');
      hero.style.setProperty('--paper-x', '0px');
      hero.style.setProperty('--paper-y', '0px');
      hero.style.setProperty('--detail-x', '0px');
      hero.style.setProperty('--detail-y', '0px');
      hero.style.setProperty('--script-x', '0px');
      hero.style.setProperty('--script-y', '0px');
      hero.style.setProperty('--lens-one-x', '0px');
      hero.style.setProperty('--lens-one-y', '0px');
      hero.style.setProperty('--lens-two-x', '0px');
      hero.style.setProperty('--lens-two-y', '0px');
      hero.style.setProperty('--light-x', '50%');
      hero.style.setProperty('--light-y', '48%');
    };

    window.addEventListener('resize', refreshBounds, { passive: true });
    window.addEventListener('scroll', refreshBounds, { passive: true });
    hero.addEventListener('pointermove', handlePointerMove, { passive: true });
    hero.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('resize', refreshBounds);
      window.removeEventListener('scroll', refreshBounds);
      hero.removeEventListener('pointermove', handlePointerMove);
      hero.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} id="top" aria-labelledby="hero-title" data-home-hero>
      <div className={styles.cinematicIntro} aria-hidden="true">
        <div className={`${styles.introCard} ${styles.mono}`}>
          <span>AMIRA LINA BENBOUALI</span>
          <span>PORTFOLIO / 2026</span>
        </div>
      </div>

      <div className={styles.heroAtmosphere} aria-hidden="true" />

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
          <div className={styles.note} data-depth="paper" aria-hidden="true" />
          <div className={styles.tape} data-depth="detail" aria-hidden="true" />
          <div className={styles.star} data-depth="detail" aria-hidden="true">
            ★
          </div>
          <div className={styles.nameScript} data-depth="script">
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

        <div className={`${styles.lens} ${styles.lensOne}`} data-lens-one aria-hidden="true" />
        <div className={`${styles.lens} ${styles.lensTwo}`} data-lens-two aria-hidden="true" />
        <h1 className={styles.heroTitle} id="hero-title">
          PORTFOLIO
        </h1>
        <div className={`${styles.hint} ${styles.mono}`}>MOVE YOUR CURSOR · OPEN THE FILE</div>
        <Link className={`${styles.workHint} ${styles.mono}`} href="/projects">
          SELECTED WORK WAITS BELOW <span aria-hidden="true">↓</span>
        </Link>
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
