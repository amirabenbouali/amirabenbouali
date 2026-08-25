'use client';

import { useEffect, useRef } from 'react';
import { pathForView } from './data';
import { useDarkChrome } from './DarkChromeContext';
import styles from './DarkAbout.module.css';

const moments = [
  { year: '2021', text: 'London became the place where study, work and technology started turning into one direction.' },
  {
    year: '2024',
    text: 'Professional experience taught me how much good technical work depends on communication, ownership and delivery.'
  },
  { year: '2026', text: 'Completed a BSc in Computer Science and shifted my focus fully toward software engineering.' },
  {
    year: 'NOW',
    text: 'Building products, systems and developer tools while looking for the right engineering team to grow with.'
  }
];

const principles = [
  { n: '01', title: 'Build', text: 'I understand ideas fastest when I can turn them into something real.' },
  { n: '02', title: 'Understand', text: 'I like knowing what is happening underneath the abstraction.' },
  { n: '03', title: 'Refine', text: 'Once the system works, the small details start to matter too.' },
  { n: '04', title: 'Learn', text: 'Every project should teach me something I did not know before.' }
];

const languages = ['English', 'French', 'Arabic', 'Spanish', 'Italian'];

const interests = [
  { label: 'movement', title: 'Running' },
  { label: 'curiosity', title: 'Astronomy', deco: 'orbit' as const },
  { label: 'ritual', title: 'Coffee' },
  { label: 'perspective', title: 'Travel' }
];

const currentRows = [
  { label: 'Building', text: 'software products and developer tools' },
  { label: 'Learning', text: 'system design and deeper product engineering' },
  { label: 'Looking for', text: 'a software engineering role with real ownership' }
];

const marqueeItems = [
  'ENGLISH', 'FRENCH', 'ARABIC', 'SPANISH', 'ITALIAN', 'SOFTWARE', 'SYSTEMS', 'PRODUCT', 'DESIGN'
];

function Petals() {
  return (
    <>
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
    </>
  );
}

export function DarkAbout() {
  const { setIsBig, wipeTo } = useDarkChrome();
  const rootRef = useRef<HTMLDivElement>(null);

  const goHome = () => wipeTo(pathForView('home'));
  const goContact = () => wipeTo(pathForView('contact'));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reveals = [...root.querySelectorAll('[data-reveal]')];
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealVisible);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    reveals.forEach((el) => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  return (
    <div className={styles.shell} ref={rootRef}>
      <main className={styles.paper}>
        <div className={styles.symbolLayer} aria-hidden="true">
          <div className={`${styles.sym} ${styles.symOrbit} ${styles.s1}`} />
          <div className={`${styles.sym} ${styles.symStar} ${styles.s2}`} />
          <div className={`${styles.sym} ${styles.symFrame} ${styles.s3}`} />
          <div className={`${styles.sym} ${styles.symPetal} ${styles.s4}`}>
            <Petals />
          </div>
          <div className={`${styles.sym} ${styles.symBurst} ${styles.s5}`} />
          <div className={`${styles.sym} ${styles.symRings} ${styles.s6}`} />
          <div className={`${styles.sym} ${styles.symStar} ${styles.s7}`} />
          <div className={`${styles.sym} ${styles.symOrbit} ${styles.s8}`} />
        </div>

        <header className={styles.top}>
          <div className={styles.brand}>
            AMIRA
            <br />
            BENBOUALI
          </div>
          <button
            className={styles.back}
            onClick={goHome}
            onMouseEnter={() => setIsBig(true)}
            onMouseLeave={() => setIsBig(false)}
            type="button"
          >
            ← home
          </button>
        </header>

        <section className={styles.hero}>
          <div data-reveal className={`${styles.heroWord} ${styles.reveal}`}>
            <div className={styles.smallNote}>About / 2026</div>
            <div className={styles.sideNote}>Software engineer</div>
            <h1>
              <span>WHO</span>
              <span>I AM</span>
            </h1>
            <div className={styles.centerMark}>
              <span>*</span>
              <span>(</span>
              <div
                className={styles.photo}
                onMouseEnter={() => setIsBig(true)}
                onMouseLeave={() => setIsBig(false)}
              >
                <div className={styles.flower}>
                  <Petals />
                </div>
              </div>
              <span>)</span>
            </div>
          </div>

          <div data-reveal className={`${styles.heroIntro} ${styles.reveal}`}>
            <h2>Software engineer, product-minded, always curious.</h2>
            <p>
              Based in London. I like taking an idea from the first sketch to a working product — thinking about the
              system underneath and the parts people actually use.
            </p>
            <div className={styles.heroMeta}>
              <span>BSc Computer Science</span>
              <span>London, UK</span>
              <span>Full-stack · Product · Tooling</span>
            </div>
          </div>
        </section>

        <div className={styles.strip}>
          <div className={styles.stripTrack}>
            {marqueeItems.join(' · ')} · {marqueeItems.join(' · ')} ·
          </div>
        </div>

        <section className={styles.profile}>
          <div data-reveal className={styles.reveal}>
            <div className={styles.sectionLabel}>01 / story</div>
            <h3>
              MY
              <br />
              STORY
            </h3>
          </div>

          <div data-reveal className={`${styles.storyList} ${styles.reveal}`}>
            {moments.map((moment) => (
              <div
                className={styles.storyRow}
                key={moment.year}
                onMouseEnter={() => setIsBig(true)}
                onMouseLeave={() => setIsBig(false)}
              >
                <b>{moment.year}</b>
                <p>{moment.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.details}>
          <div data-reveal className={`${styles.detailsHead} ${styles.reveal}`}>
            <div>
              <div className={styles.sectionLabel}>02 / how I work</div>
              <h3>
                WHAT
                <br />
                MATTERS
              </h3>
            </div>
            <div className={styles.detailsNote}>
              less &ldquo;skill percentages&rdquo;, more about the way I actually approach building software.
            </div>
          </div>

          <div data-reveal className={`${styles.principles} ${styles.reveal}`}>
            {principles.map((principle) => (
              <article
                className={styles.principle}
                key={principle.n}
                onMouseEnter={() => setIsBig(true)}
                onMouseLeave={() => setIsBig(false)}
              >
                <small>{principle.n}</small>
                <b>{principle.title}</b>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.outside}>
          <div data-reveal className={styles.reveal}>
            <div className={styles.sectionLabel}>03 / beyond code</div>
            <h3>
              MORE
              <br />
              ABOUT ME
            </h3>
          </div>

          <div data-reveal className={`${styles.outsideGrid} ${styles.reveal}`}>
            <div className={styles.languagePanel}>
              <div className={styles.sectionLabel}>Languages</div>
              {languages.map((language) => (
                <div
                  className={styles.lang}
                  key={language}
                  onMouseEnter={() => setIsBig(true)}
                  onMouseLeave={() => setIsBig(false)}
                >
                  {language} <span>communication</span>
                </div>
              ))}
            </div>

            <div className={styles.interests}>
              {interests.map((interest) => (
                <div
                  className={styles.interest}
                  key={interest.title}
                  onMouseEnter={() => setIsBig(true)}
                  onMouseLeave={() => setIsBig(false)}
                >
                  <small>{interest.label}</small>
                  {interest.deco === 'orbit' ? <div className={styles.miniOrbit} /> : null}
                  <b>{interest.title}</b>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.end}>
          <div data-reveal className={styles.reveal}>
            <div className={styles.sectionLabel}>04 / now</div>
            <h3>CURRENTLY</h3>
          </div>

          <div data-reveal className={styles.reveal}>
            <div className={styles.current}>
              {currentRows.map((row) => (
                <div className={styles.currentRow} key={row.label}>
                  <b>{row.label}</b>
                  <span>{row.text}</span>
                </div>
              ))}
            </div>

            <button
              className={styles.contact}
              onClick={goContact}
              onMouseEnter={() => setIsBig(true)}
              onMouseLeave={() => setIsBig(false)}
              type="button"
            >
              contact me →
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
