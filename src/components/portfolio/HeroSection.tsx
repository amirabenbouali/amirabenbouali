import { Flower } from './Flower';
import styles from './Portfolio.module.css';

export function HeroSection() {
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={styles.heroCopy}>
        <h1 className={styles.hello} data-reveal>
          hello, I’m
        </h1>
        <p className={styles.name} id="hero-title" data-reveal>
          Amira Lina
          <span>Benbouali</span>
        </p>
        <div className={`${styles.role} ${styles.mono}`} data-reveal>
          Software Engineer &
          <br />
          Data Scientist
        </div>
        <p className={styles.intro} data-reveal>
          I build products from systems to the interface people touch.
          <br />
          Clean architecture. Intuitive experiences.
          <br />
          Thoughtful code.
        </p>
        <div className={styles.heroActions} data-reveal>
          <a className={`${styles.pill} ${styles.mono}`} href="#projects">
            VIEW SELECTED WORK →
          </a>
          <a className={`${styles.pill} ${styles.mono}`} href="#toolbox">
            EXPLORE STACK ::
          </a>
        </div>
      </div>

      <div className={styles.flowerWrap}>
        <div className={styles.flowerOrbit} data-flower-system>
          <div className={styles.orbitLine} />
          <div className={styles.orbitLineTwo} />
          <div className={styles.orbitDot} />
          <div className={`${styles.orbitDot} ${styles.orbitDotTwo}`} />
          <div className={`${styles.orbitDot} ${styles.orbitDotThree}`} />
          <div className={`${styles.orbitLabel} ${styles.orbitLabelData} ${styles.mono}`}>DATA</div>
          <div className={`${styles.orbitLabel} ${styles.orbitLabelCode} ${styles.mono}`}>CODE</div>
          <div className={`${styles.orbitLabel} ${styles.orbitLabelDesign} ${styles.mono}`}>DESIGN</div>
          <div className={styles.handNote}>thoughtful underneath</div>
          <div className={styles.previewTag}>Preview</div>
          <Flower />
        </div>
        <div className={styles.stackCluster} aria-label="Engineering focus areas">
          <div className={`${styles.stackCard} ${styles.mono}`}>
            <strong>FRONTEND / React · Next.js</strong>
            <small>interfaces, motion, accessibility</small>
          </div>
          <div className={`${styles.stackCard} ${styles.mono}`}>
            <strong>BACKEND / Node · APIs</strong>
            <small>services, data flow, product logic</small>
          </div>
          <div className={`${styles.stackCard} ${styles.mono}`}>
            <strong>DATA / PostgreSQL · SQL</strong>
            <small>queries, modelling, analysis</small>
          </div>
          <div className={`${styles.stackCard} ${styles.mono}`}>
            <strong>SYSTEMS / CI · Testing · Design</strong>
            <small>shipping paths that stay understandable</small>
          </div>
        </div>
        <div className={`${styles.stickyNote} ${styles.mono}`} data-note>
          <span className={styles.pin} />
          building software that feels clear on the surface and thoughtful underneath.
        </div>
        <div className={`${styles.statusCard} ${styles.mono}`} aria-label="Current portfolio status">
          <b>CURRENTLY</b>
          <span><i /> available for thoughtful teams</span>
          <span>London · remote-friendly</span>
          <span>portfolio in motion</span>
        </div>
        <a className={styles.scrollCue} href="#projects" aria-label="Scroll to selected projects">
          ↓
        </a>
        <div className={`${styles.micro} ${styles.mono}`}>MOVE YOUR CURSOR →</div>
      </div>
    </section>
  );
}
