'use client';

import { useEffect, useRef, useState } from 'react';
import { pathForView } from './data';
import { useDarkChrome } from './DarkChromeContext';
import shell from './DarkShell.module.css';
import styles from './DarkAbout.module.css';

const moments = [
  { year: '2021', text: 'Moved to London and started building a new chapter around study, work and technology.' },
  { year: '2024', text: 'Built professional experience across technical work, teamwork and real-world delivery.' },
  {
    year: '2026',
    text: 'Completed a BSc in Computer Science at City, University of London and shifted full focus toward software engineering.'
  },
  { year: 'NOW', text: 'Building products, developer tools and systems while looking for the right engineering team to grow with.' }
];

const principles = [
  { n: '01', title: 'Build', text: 'I learn fastest by turning an idea into something real.' },
  { n: '02', title: 'Understand', text: 'I like knowing what happens underneath the abstraction.' },
  { n: '03', title: 'Refine', text: 'Once the system works, the small details start to matter.' },
  { n: '04', title: 'Learn', text: 'Every project should leave me knowing something I did not know before.' }
];

const languages = ['English', 'French', 'Arabic', 'Spanish', 'Italian'];

type Interest = { n: string; title: string; deco?: 'runline' | 'orbit' | 'steam' };

const interests: Interest[] = [
  { n: '01', title: 'Running', deco: 'runline' },
  { n: '02', title: 'Astronomy', deco: 'orbit' },
  { n: '03', title: 'Coffee', deco: 'steam' },
  { n: '04', title: 'Travel' },
  { n: '05', title: 'Design' }
];

const currentRows = [
  { label: 'Building', text: 'software products and developer tools' },
  { label: 'Learning', text: 'system design and deeper product engineering' },
  { label: 'Looking for', text: 'a software engineering role with real ownership' }
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
  const [step, setStep] = useState(1);
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

    const sections = [...root.querySelectorAll<HTMLElement>('[data-step]')];
    const stepObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setStep(Number((visible.target as HTMLElement).dataset.step));
      },
      { threshold: [0.2, 0.4, 0.6] }
    );
    sections.forEach((el) => stepObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      stepObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.page} ref={rootRef}>
      <div className={styles.grain} aria-hidden="true" />

      <header className={styles.top}>
        <div className={shell.brand}>
          AMIRA
          <br />
          BENBOUALI
        </div>
        <div className={`${shell.role} ${styles.role}`}>
          about
          <br />
          software engineer
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

      <div className={styles.flowerProgress} data-step={step} aria-hidden="true">
        <Petals />
      </div>

      <section className={`${styles.section} ${styles.intro}`} data-step={1}>
        <div data-reveal className={styles.reveal}>
          <div className={styles.eyebrow}>01 / introduction</div>
          <h1 className={styles.heroTitle}>
            ABOUT
            <span>AMIRA</span>
          </h1>
        </div>

        <div data-reveal className={`${styles.introCopy} ${styles.reveal}`}>
          <h2>
            Engineer. Builder.
            <span>always curious.</span>
          </h2>
          <p>
            Software engineer based in London. I enjoy taking an idea from the first sketch to a working product —
            thinking about the system underneath and the details people actually interact with.
          </p>
          <div className={styles.introMeta}>
            <span>BSc Computer Science</span>
            <span>London, UK</span>
            <span>Full-stack · Product · Tooling</span>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.story}`} data-step={2}>
        <div data-reveal className={styles.reveal}>
          <div className={styles.eyebrow}>02 / story</div>
          <h2 className={styles.bigHeading}>
            MY
            <br />
            STORY
          </h2>
        </div>

        <div data-reveal className={`${styles.timeline} ${styles.reveal}`}>
          {moments.map((moment) => (
            <div
              className={styles.moment}
              key={moment.year}
              onMouseEnter={() => setIsBig(true)}
              onMouseLeave={() => setIsBig(false)}
            >
              <div className={styles.year}>{moment.year}</div>
              <p>{moment.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.thinking}`} data-step={3}>
        <div data-reveal className={`${styles.thinkingHead} ${styles.reveal}`}>
          <div>
            <div className={styles.eyebrow}>03 / how I think</div>
            <h2 className={styles.bigHeading}>
              HOW I
              <br />
              WORK
            </h2>
          </div>
          <p>Not percentages. Not skill bars. Just the principles I actually bring into the work.</p>
        </div>

        <div data-reveal className={`${styles.principles} ${styles.reveal}`}>
          {principles.map((principle) => (
            <div
              className={styles.principle}
              key={principle.n}
              onMouseEnter={() => setIsBig(true)}
              onMouseLeave={() => setIsBig(false)}
            >
              <div className={styles.n}>{principle.n}</div>
              <b>{principle.title}</b>
              <span>{principle.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.languages}`} data-step={4}>
        <div data-reveal className={styles.reveal}>
          <div className={styles.eyebrow}>04 / languages</div>
          <h2 className={styles.bigHeading}>
            HOW I
            <br />
            CONNECT
          </h2>
          <div className={styles.langNote}>language is another kind of interface.</div>
        </div>

        <div data-reveal className={`${styles.langList} ${styles.reveal}`}>
          {languages.map((language) => (
            <div
              className={styles.lang}
              key={language}
              onMouseEnter={() => setIsBig(true)}
              onMouseLeave={() => setIsBig(false)}
            >
              {language}
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.outside}`} data-step={5}>
        <div data-reveal className={styles.reveal}>
          <div className={styles.eyebrow}>05 / outside code</div>
          <h2 className={styles.bigHeading}>
            WHEN I&rsquo;M
            <br />
            NOT CODING
          </h2>
        </div>

        <div data-reveal className={`${styles.outsideGrid} ${styles.reveal}`}>
          {interests.map((interest) => (
            <div
              className={styles.interest}
              key={interest.title}
              onMouseEnter={() => setIsBig(true)}
              onMouseLeave={() => setIsBig(false)}
            >
              <span className={styles.micro}>{interest.n}</span>
              {interest.deco === 'runline' ? <div className={styles.runline} /> : null}
              {interest.deco === 'orbit' ? <div className={styles.orbit} /> : null}
              {interest.deco === 'steam' ? <div className={styles.steam} /> : null}
              <b>{interest.title}</b>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.currently}`} data-step={6}>
        <div data-reveal className={styles.reveal}>
          <div className={styles.eyebrow}>06 / currently</div>
          <h2 className={styles.bigHeading}>CURRENTLY</h2>

          <div className={styles.currentList}>
            {currentRows.map((row) => (
              <div className={styles.currentRow} key={row.label}>
                <b>{row.label}</b>
                <span>{row.text}</span>
              </div>
            ))}
          </div>

          <button
            className={styles.contactCta}
            onClick={goContact}
            onMouseEnter={() => setIsBig(true)}
            onMouseLeave={() => setIsBig(false)}
            type="button"
          >
            contact me <span>→</span>
          </button>
        </div>

        <div data-reveal className={styles.reveal}>
          <div className={styles.fullFlower} aria-hidden="true">
            <Petals />
          </div>
          <div className={styles.albEnd}>ALB</div>
          <div className={styles.albCaption}>amira lina benbouali</div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>© 2026 AMIRA BENBOUALI</span>
        <span>about / 01—06</span>
      </footer>
    </div>
  );
}
