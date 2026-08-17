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
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    let frame = 0;
    let bounds = hero.getBoundingClientRect();
    let heroTop = window.scrollY + bounds.top;
    let heroHeight = bounds.height;
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
      scrollFolderScale: 1,
      scrollLensOneExit: 0,
      scrollLensTwoExit: 0,
      scrollSideOpacity: 1,
      scrollTitleOpacity: 1,
      scrollTitleScale: 1,
      scrollY: 0,
      titleX: 0,
      titleY: 0
    };
    const current = { ...target };

    const smoothstep = (value: number) => value * value * (3 - 2 * value);
    const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

    const updateScrollTargets = () => {
      const progress = clamp((window.scrollY - heroTop) / Math.max(heroHeight * 0.78, 1));
      const edge = smoothstep(progress);
      target.scrollY = edge * -28;
      target.scrollFolderScale = 1 + edge * 0.018;
      target.scrollLensOneExit = edge * 28;
      target.scrollLensTwoExit = edge * -24;
      target.scrollTitleOpacity = 1 - edge * 0.34;
      target.scrollTitleScale = 1 - edge * 0.018;
      target.scrollSideOpacity = 1 - edge * 0.52;
    };

    const refreshBounds = () => {
      bounds = hero.getBoundingClientRect();
      heroTop = window.scrollY + bounds.top;
      heroHeight = bounds.height;
      updateScrollTargets();
    };

    const handleScroll = () => {
      updateScrollTargets();
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
      current.scrollFolderScale = settle(current.scrollFolderScale, target.scrollFolderScale, 0.075);
      current.scrollLensOneExit = settle(current.scrollLensOneExit, target.scrollLensOneExit, 0.075);
      current.scrollLensTwoExit = settle(current.scrollLensTwoExit, target.scrollLensTwoExit, 0.075);
      current.scrollSideOpacity = settle(current.scrollSideOpacity, target.scrollSideOpacity, 0.08);
      current.scrollTitleOpacity = settle(current.scrollTitleOpacity, target.scrollTitleOpacity, 0.08);
      current.scrollTitleScale = settle(current.scrollTitleScale, target.scrollTitleScale, 0.075);
      current.scrollY = settle(current.scrollY, target.scrollY, 0.075);
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
      hero.style.setProperty('--scroll-folder-scale', current.scrollFolderScale.toFixed(4));
      hero.style.setProperty('--scroll-lens-one-exit', `${current.scrollLensOneExit.toFixed(2)}px`);
      hero.style.setProperty('--scroll-lens-two-exit', `${current.scrollLensTwoExit.toFixed(2)}px`);
      hero.style.setProperty('--scroll-side-opacity', current.scrollSideOpacity.toFixed(3));
      hero.style.setProperty('--scroll-title-opacity', current.scrollTitleOpacity.toFixed(3));
      hero.style.setProperty('--scroll-title-scale', current.scrollTitleScale.toFixed(4));
      hero.style.setProperty('--scroll-y', `${current.scrollY.toFixed(2)}px`);
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
      if (coarsePointer) return;
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - (heroTop - window.scrollY)) / bounds.height - 0.5;

      hero.style.setProperty('--hero-x', x.toFixed(3));
      hero.style.setProperty('--hero-y', y.toFixed(3));
      target.folderX = x * 6;
      target.folderY = y * 4.5;
      target.folderR = -1.35 + x * 0.55;
      target.paperX = x * 9;
      target.paperY = y * 6.5;
      target.detailX = x * -12;
      target.detailY = y * -8;
      target.scriptX = x * 5;
      target.scriptY = y * 3;
      target.lensOneX = x * 15;
      target.lensOneY = y * 9;
      target.lensTwoX = x * -14;
      target.lensTwoY = y * -8;
      target.titleX = x * 1.7;
      target.titleY = y * 1;
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

    updateScrollTargets();
    frame = window.requestAnimationFrame(updateMotion);
    window.addEventListener('resize', refreshBounds, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    hero.addEventListener('pointermove', handlePointerMove, { passive: true });
    hero.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', refreshBounds);
      window.removeEventListener('scroll', handleScroll);
      hero.removeEventListener('pointermove', handlePointerMove);
      hero.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className={`${styles.hero} ${isOpen ? styles.heroOpen : ''}`}
      id="top"
      aria-labelledby="hero-title"
      data-home-hero
    >
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
          <div className={`${styles.fileMeta} ${styles.mono}`} aria-hidden={!isOpen}>
            <span>FILE 001</span>
            <span>SOFTWARE ENGINEER</span>
            <span>LONDON / 2026</span>
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
