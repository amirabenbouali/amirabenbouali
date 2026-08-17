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

    let frame = 0;
    let bounds = hero.getBoundingClientRect();
    const target = {
      detailX: 0,
      detailY: 0,
      folderR: -1.35,
      folderX: 0,
      folderY: 0,
      lensOneX: 0,
      lensOneY: 0,
      lensTwoX: 0,
      lensTwoY: 0,
      lightX: bounds.width / 2,
      lightY: bounds.height * 0.48,
      paperX: 0,
      paperY: 0,
      scriptX: 0,
      scriptY: 0,
      titleX: 0,
      titleY: 0
    };
    const current = { ...target };

    const refreshBounds = () => {
      bounds = hero.getBoundingClientRect();
    };

    const settle = (value: number, destination: number, ease = 0.08) => value + (destination - value) * ease;

    const updateMotion = () => {
      current.detailX = settle(current.detailX, target.detailX);
      current.detailY = settle(current.detailY, target.detailY);
      current.folderR = settle(current.folderR, target.folderR, 0.075);
      current.folderX = settle(current.folderX, target.folderX);
      current.folderY = settle(current.folderY, target.folderY);
      current.lensOneX = settle(current.lensOneX, target.lensOneX, 0.065);
      current.lensOneY = settle(current.lensOneY, target.lensOneY, 0.065);
      current.lensTwoX = settle(current.lensTwoX, target.lensTwoX, 0.06);
      current.lensTwoY = settle(current.lensTwoY, target.lensTwoY, 0.06);
      current.lightX = settle(current.lightX, target.lightX, 0.1);
      current.lightY = settle(current.lightY, target.lightY, 0.1);
      current.paperX = settle(current.paperX, target.paperX, 0.07);
      current.paperY = settle(current.paperY, target.paperY, 0.07);
      current.scriptX = settle(current.scriptX, target.scriptX, 0.075);
      current.scriptY = settle(current.scriptY, target.scriptY, 0.075);
      current.titleX = settle(current.titleX, target.titleX, 0.055);
      current.titleY = settle(current.titleY, target.titleY, 0.055);

      hero.style.setProperty('--folder-x', `${current.folderX.toFixed(2)}px`);
      hero.style.setProperty('--folder-y', `${current.folderY.toFixed(2)}px`);
      hero.style.setProperty('--folder-r', `${current.folderR.toFixed(3)}deg`);
      hero.style.setProperty('--paper-x', `${current.paperX.toFixed(2)}px`);
      hero.style.setProperty('--paper-y', `${current.paperY.toFixed(2)}px`);
      hero.style.setProperty('--detail-x', `${current.detailX.toFixed(2)}px`);
      hero.style.setProperty('--detail-y', `${current.detailY.toFixed(2)}px`);
      hero.style.setProperty('--script-x', `${current.scriptX.toFixed(2)}px`);
      hero.style.setProperty('--script-y', `${current.scriptY.toFixed(2)}px`);
      hero.style.setProperty('--lens-one-x', `${current.lensOneX.toFixed(2)}px`);
      hero.style.setProperty('--lens-one-y', `${current.lensOneY.toFixed(2)}px`);
      hero.style.setProperty('--lens-two-x', `${current.lensTwoX.toFixed(2)}px`);
      hero.style.setProperty('--lens-two-y', `${current.lensTwoY.toFixed(2)}px`);
      hero.style.setProperty('--title-x', `${current.titleX.toFixed(2)}px`);
      hero.style.setProperty('--title-y', `${current.titleY.toFixed(2)}px`);
      hero.style.setProperty('--light-x', `${current.lightX.toFixed(2)}px`);
      hero.style.setProperty('--light-y', `${current.lightY.toFixed(2)}px`);

      frame = window.requestAnimationFrame(updateMotion);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      hero.style.setProperty('--hero-x', x.toFixed(3));
      hero.style.setProperty('--hero-y', y.toFixed(3));
      target.folderX = x * 16;
      target.folderY = y * 11;
      target.folderR = -1.35 + x * 1.1;
      target.paperX = x * 26;
      target.paperY = y * 18;
      target.detailX = x * -18;
      target.detailY = y * -12;
      target.scriptX = x * 12;
      target.scriptY = y * 8;
      target.lensOneX = x * 38;
      target.lensOneY = y * 24;
      target.lensTwoX = x * -32;
      target.lensTwoY = y * -20;
      target.titleX = x * 7;
      target.titleY = y * 4;
      target.lightX = event.clientX - bounds.left;
      target.lightY = event.clientY - bounds.top;
    };

    const handlePointerLeave = () => {
      hero.style.setProperty('--hero-x', '0');
      hero.style.setProperty('--hero-y', '0');
      target.folderX = 0;
      target.folderY = 0;
      target.folderR = -1.35;
      target.paperX = 0;
      target.paperY = 0;
      target.detailX = 0;
      target.detailY = 0;
      target.scriptX = 0;
      target.scriptY = 0;
      target.lensOneX = 0;
      target.lensOneY = 0;
      target.lensTwoX = 0;
      target.lensTwoY = 0;
      target.titleX = 0;
      target.titleY = 0;
      target.lightX = bounds.width / 2;
      target.lightY = bounds.height * 0.48;
    };

    frame = window.requestAnimationFrame(updateMotion);
    window.addEventListener('resize', refreshBounds, { passive: true });
    window.addEventListener('scroll', refreshBounds, { passive: true });
    hero.addEventListener('pointermove', handlePointerMove, { passive: true });
    hero.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(frame);
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
