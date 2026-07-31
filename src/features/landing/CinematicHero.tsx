import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Fog, Moon, MountainSilhouettes, SoftVignette, Stars } from '../../components/ui/Atmosphere';
import { profile } from '../../data/profile';
import { usePointerParallax } from '../../hooks/usePointerParallax';
import styles from './CinematicHero.module.css';

export function CinematicHero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerParallax = usePointerParallax(heroRef);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const starsOpacity = useTransform(scrollYProgress, [0, 0.62, 1], [0.62, 0.28, 0]);
  const moonOpacity = useTransform(scrollYProgress, [0, 0.52, 1], [0.9, 0.36, 0]);
  const fogOpacity = useTransform(scrollYProgress, [0, 0.56, 1], [0.42, 0.72, 0.86]);

  return (
    <section ref={heroRef} className={styles.hero} id="top" aria-labelledby="hero-title" {...pointerParallax}>
      <div className={styles.sky} aria-hidden="true" />
      <motion.div style={reduceMotion ? undefined : { opacity: starsOpacity }}>
        <Stars className={styles.stars} />
      </motion.div>
      <div className={styles.lightColumn} aria-hidden="true" />
      <motion.div className={styles.moonStage} style={reduceMotion ? undefined : { opacity: moonOpacity }}>
        <Moon />
      </motion.div>
      <motion.div style={reduceMotion ? undefined : { opacity: fogOpacity }}>
        <Fog className={styles.fog} />
      </motion.div>
      <MountainSilhouettes className={styles.ridges} />
      <SoftVignette />

      <motion.div className={styles.titleWrap} style={reduceMotion ? undefined : { y: textY }}>
        <p className={styles.heroLabel}>Software engineer / product builder</p>
        <h1 id="hero-title" className={styles.heroTitle}>
          <span className={styles.line}>
            <span>I build</span>
          </span>
          <span className={`${styles.line} ${styles.script}`}>
            <span>software</span>
          </span>
          <span className={`${styles.line} ${styles.serif}`}>
            <span>that feels quiet.</span>
          </span>
        </h1>
      </motion.div>

      <div className={styles.heroFooter}>
        <motion.p
          className={styles.support}
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          Thoughtful digital products, developer tools and calm interfaces.
          <a href="#work">View selected work</a>
        </motion.p>
        <div className={styles.scrollCue} aria-hidden="true">
          <i />
          <span>scroll to wander</span>
        </div>
      </div>

      <span className={styles.siteMark} aria-hidden="true">
        {profile.name}
      </span>
    </section>
  );
}
