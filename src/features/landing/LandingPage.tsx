import { ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import { profile } from '../../data/profile';
import { writingNotes } from '../../data/writing';
import styles from './LandingPage.module.css';

export function LandingPage() {
  const featuredProjects = projects.slice(0, 4);

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.stars} aria-hidden="true" />
        <div className={styles.moonWrap} aria-hidden="true">
          <svg className={styles.moon} viewBox="0 0 420 420" role="img">
            <defs>
              <radialGradient id="moon-shadow" cx="72%" cy="45%" r="70%">
                <stop offset="0%" stopColor="#2b2b27" />
                <stop offset="44%" stopColor="#151612" />
                <stop offset="82%" stopColor="#090a09" />
              </radialGradient>
              <mask id="moon-edge">
                <rect width="420" height="420" fill="black" />
                <circle cx="210" cy="210" r="190" fill="white" />
              </mask>
            </defs>
            <circle className={styles.moonHalo} cx="210" cy="210" r="202" />
            <circle cx="210" cy="210" r="190" fill="url(#moon-shadow)" />
            <g className={styles.craters} mask="url(#moon-edge)">
              <circle cx="285" cy="116" r="20" />
              <circle cx="318" cy="188" r="12" />
              <circle cx="254" cy="247" r="31" />
              <circle cx="333" cy="304" r="18" />
              <circle cx="203" cy="156" r="11" />
              <path d="M305 42 C345 98 363 167 354 238 C348 287 329 334 296 376" />
            </g>
            <path
              className={styles.litEdge}
              d="M320 35 C383 87 415 178 397 259 C384 319 344 370 289 395 C338 333 363 260 359 188 C356 128 342 79 320 35Z"
            />
          </svg>
        </div>
        <div className={styles.heroContent}>
          <motion.p
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {profile.location} / Product systems / Field note 001
          </motion.p>
          <motion.h1
            id="hero-title"
            className={styles.headline}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>I build</span>
            <span>software</span>
            <span>
              that feels <em>quiet.</em>
            </span>
          </motion.h1>
          <motion.p
            className={styles.support}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {profile.introduction}
          </motion.p>
          <motion.a
            className={styles.enterLink}
            href="#work-introduction"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>Enter the observatory</span>
            <ArrowDownRight aria-hidden="true" size={17} strokeWidth={1.5} />
          </motion.a>
        </div>
        <div className={styles.diagram} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={styles.fog} aria-hidden="true" />
        <div className={styles.mountainsBack} aria-hidden="true" />
        <div className={styles.mountainsFront} aria-hidden="true" />
      </section>

      <section id="work-introduction" className={styles.workIntro} aria-labelledby="work-title">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Selected work chapters</p>
          <h2 id="work-title">Product engineering as quiet observation.</h2>
        </div>
        <p className={styles.sectionCopy}>{profile.philosophy}</p>
        <div className={styles.chapterList}>
          {featuredProjects.map((project) => (
            <a href={`/work/${project.slug}`} className={styles.chapter} key={project.slug}>
              <span className={styles.chapterIndex}>{project.index}</span>
              <span>
                <strong>{project.title}</strong>
                <small>{project.category}</small>
              </span>
              <span className={styles.chapterSummary}>{project.summary}</span>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.notesPreview} aria-labelledby="notes-title">
        <p className={styles.kicker}>Notes from the Observatory</p>
        <h2 id="notes-title">Field notes on product, systems, and attention.</h2>
        <p>{writingNotes[0]?.deck}</p>
      </section>

      <section className={styles.aboutPreview} aria-labelledby="about-title">
        <p className={styles.kicker}>About</p>
        <h2 id="about-title">{profile.title}</h2>
        <p>{profile.philosophy}</p>
      </section>

      <section className={styles.contact} aria-labelledby="contact-title">
        <p className={styles.kicker}>Contact</p>
        <h2 id="contact-title">Careful software, built with patience.</h2>
        <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
      </section>
      <div className="grain" aria-hidden="true" />
    </main>
  );
}
