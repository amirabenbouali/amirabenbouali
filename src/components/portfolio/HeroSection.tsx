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
          Amira Lina Benbouali
        </p>
        <div className={`${styles.role} ${styles.mono}`} data-reveal>
          [ Software Engineer & Data Scientist ]
        </div>
        <p className={styles.intro} data-reveal>
          I build full-stack products from concept to deployment, with a focus on maintainable architecture, developer tooling,
          data systems and interfaces that feel intuitive.
        </p>
        <div className={styles.heroActions} data-reveal>
          <a className={`${styles.pill} ${styles.mono}`} href="#projects">
            VIEW SELECTED PROJECTS
          </a>
          <a className={`${styles.pill} ${styles.mono}`} href="#toolbox">
            OPEN TOOLBOX
          </a>
        </div>
      </div>

      <div className={styles.flowerWrap}>
        <div className={styles.flowerOrbit}>
          <div className={styles.orbitLine} />
          <div className={styles.orbitDot} />
          <Flower />
        </div>
        <div className={`${styles.stickyNote} ${styles.mono}`} data-note>
          <span className={styles.pin} />
          currently building thoughtful software, learning in public and trying not to over-engineer the tiny things.
        </div>
        <div className={`${styles.micro} ${styles.mono}`}>MOVE YOUR CURSOR →</div>
      </div>
    </section>
  );
}
