'use client';

import { useEffect, useRef } from 'react';
import { pathForView } from './data';
import { useDarkChrome } from './DarkChromeContext';
import styles from './DarkAbout.module.css';

const moments = [
  { year: '2021', label: 'London' },
  { year: '2024', label: 'Professional experience' },
  { year: '2026', label: 'BSc Computer Science' },
  { year: 'Now', label: 'Software engineering' }
];

const toolbox = [
  { label: 'Frontend', items: ['React', 'TypeScript', 'Next.js'] },
  { label: 'Backend', items: ['Node', 'Prisma', 'Postgres'] },
  { label: 'Tooling', items: ['Testing', 'GitHub Actions', 'Bash'] }
];

const languages = ['English', 'French', 'Arabic', 'Spanish', 'Italian'];

const interests = [
  { title: 'Running', descriptor: 'movement / discipline' },
  { title: 'Astronomy', descriptor: 'curiosity / scale' },
  { title: 'Coffee', descriptor: 'ritual / detail' },
  { title: 'Travel', descriptor: 'perspective / place' },
  { title: 'Design', descriptor: 'composition / taste' }
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
              Based in London. I like taking an idea from the first sketch to a working product, thinking about the
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

        <section className={styles.editorialStory}>
          <div className={styles.storyKicker}>01 / a little context</div>

          <div data-reveal className={`${styles.storyPhrase} ${styles.reveal}`}>
            <span>I MOVED</span>
            <span className={styles.offset}>TO LONDON</span>
            <span>AND STARTED</span>
            <span className={styles.pinkWord}>BUILDING.</span>
          </div>

          <div data-reveal className={`${styles.storyCopyGrid} ${styles.reveal}`}>
            <div className={styles.storyCopy}>
              <p>
                I studied Computer Science, but most of what made software feel real to me happened while building
                products, tools, interfaces and systems that had to actually work.
              </p>
            </div>

            <div className={styles.storySide}>
              {moments.map((moment) => (
                <div className={styles.storySideRow} key={moment.year}>
                  <span>{moment.year}</span>
                  <b>{moment.label}</b>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.sym} ${styles.symOrbit} ${styles.storyOrbit}`} aria-hidden="true" />
        </section>

        <section className={styles.buildSpread}>
          <div data-reveal className={`${styles.buildLeft} ${styles.reveal}`}>
            <div className={styles.sectionLabel}>02 / how I build</div>
            <div className={styles.buildTitle}>
              <span>PRODUCT</span>
              <span>SYSTEMS</span>
              <span>INTERACTION</span>
            </div>
          </div>

          <div data-reveal className={`${styles.buildRight} ${styles.reveal}`}>
            <div className={styles.buildNote}>
              I build fast to see if an idea holds up, then refine until the details are right, always trying to{' '}
              <em>understand what is happening underneath</em>, not just make it work.
            </div>

            <div className={styles.buildColumns}>
              {toolbox.map((column) => (
                <div key={column.label}>
                  <small>{column.label}</small>
                  <b>
                    {column.items.map((item, index) => (
                      <span key={item}>
                        {item}
                        {index < column.items.length - 1 ? <br /> : null}
                      </span>
                    ))}
                  </b>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.sym} ${styles.symStar} ${styles.buildStar}`} aria-hidden="true" />
        </section>

        <section className={styles.languageSpread}>
          <div data-reveal className={`${styles.languageHead} ${styles.reveal}`}>
            <div className={styles.sectionLabel}>03 / communication</div>
            <h3>
              FIVE
              <br />
              LANGUAGES
            </h3>
            <p>Language is another kind of interface.</p>
          </div>

          <div data-reveal className={`${styles.languageCloud} ${styles.reveal}`}>
            {languages.map((language, index) => (
              <span className={styles[`l${index + 1}`]} key={language}>
                {language}
              </span>
            ))}
          </div>

          <div className={`${styles.sym} ${styles.symRings} ${styles.languageRings}`} aria-hidden="true" />
        </section>

        <section className={styles.personalSpread}>
          <div data-reveal className={`${styles.personalHead} ${styles.reveal}`}>
            <div className={styles.sectionLabel}>04 / outside code</div>
            <h3>
              THINGS THAT
              <br />
              KEEP ME CURIOUS
            </h3>
          </div>

          <div data-reveal className={`${styles.personalLines} ${styles.reveal}`}>
            {interests.map((interest) => (
              <div
                className={styles.personalLine}
                key={interest.title}
                onMouseEnter={() => setIsBig(true)}
                onMouseLeave={() => setIsBig(false)}
              >
                <span>{interest.title}</span>
                <small>{interest.descriptor}</small>
              </div>
            ))}
          </div>

          <div className={`${styles.sym} ${styles.symBurst} ${styles.personalBurst}`} aria-hidden="true" />
        </section>

        <section className={styles.currentlySpread}>
          <div data-reveal className={`${styles.currentLeft} ${styles.reveal}`}>
            <div className={styles.sectionLabel}>05 / currently</div>
            <h3>NOW</h3>
            <div className={styles.currentFlower}>
              <Petals />
            </div>
          </div>

          <div data-reveal className={`${styles.currentRight} ${styles.reveal}`}>
            {currentRows.map((row) => (
              <div className={styles.currentLine} key={row.label}>
                <span>{row.label}</span>
                <b>{row.text}</b>
              </div>
            ))}

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
