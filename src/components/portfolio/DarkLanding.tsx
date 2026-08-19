'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { pathForView } from './data';
import styles from './DarkLanding.module.css';

type NavRow = {
  num: string;
  label: string;
  target: 'work' | 'about' | 'playground' | 'contact';
};

const rows: NavRow[] = [
  { num: '01', label: 'work', target: 'work' },
  { num: '02', label: 'about', target: 'about' },
  { num: '03', label: 'playground', target: 'playground' },
  { num: '04', label: 'contact', target: 'contact' }
];

export function DarkLanding() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBig, setIsBig] = useState(false);
  const [isWiping, setIsWiping] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      setHasMoved(true);
      setCursor({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const navigate = useCallback(
    (target: NavRow['target']) => {
      const path = pathForView(target);
      setIsWiping(false);
      window.requestAnimationFrame(() => setIsWiping(true));
      window.setTimeout(() => router.push(path), 350);
      window.setTimeout(() => setIsWiping(false), 700);
    },
    [router]
  );

  return (
    <main className={styles.shell}>
      {hasMoved ? (
        <div
          className={`${styles.cursor} ${isBig ? styles.cursorBig : ''}`}
          style={{ left: cursor.x, top: cursor.y }}
        />
      ) : null}

      <div className={`${styles.wipe} ${isWiping ? styles.wipeGo : ''}`} aria-hidden="true" />

      <header className={styles.top}>
        <div className={styles.brand}>
          AMIRA
          <br />
          BENBOUALI
        </div>
        <div className={styles.role}>
          Software engineer
          <br />
          Building digital experiences
        </div>
        <div className={styles.close} aria-hidden="true" />
      </header>

      <div className={styles.layout}>
        <aside className={styles.info}>
          <div>
            <section className={styles.intro}>
              <h1>
                <span>hi, my name is</span>
                <span className={styles.script}>Amira.</span>
              </h1>
              <p>
                I&apos;m a software engineer focused on building thoughtful, full-stack products, developer tools
                and interfaces with real attention to detail.
              </p>
            </section>
            <div className={styles.availability}>
              Based in London, UK
              <br />
              Available for software engineering roles
            </div>
            <div className={styles.contact}>
              <a href="mailto:amiralinabenbouali@gmail.com">amiralinabenbouali@gmail.com</a>
              <br />
              London, United Kingdom
            </div>
          </div>
          <div className={styles.footer}>
            © 2026 Amira Benbouali
            <br />
            All rights reserved
            <div className={styles.socials}>
              <a href="https://github.com/amirabenbouali" rel="noopener noreferrer" target="_blank">
                Github
              </a>
              <a href="https://www.linkedin.com/in/amirabenbouali" rel="noopener noreferrer" target="_blank">
                LinkedIn
              </a>
              <a href="mailto:amiralinabenbouali@gmail.com">Email</a>
            </div>
          </div>
        </aside>

        <section className={styles.nav} aria-label="Portfolio sections">
          <div className={styles.ghost} aria-hidden="true">portfolio</div>
          {rows.map((row, index) => (
            <button
              className={`${styles.navRow} ${activeIndex === index ? styles.navRowActive : ''}`}
              key={row.target}
              onClick={() => navigate(row.target)}
              onMouseEnter={() => {
                setActiveIndex(index);
                setIsBig(true);
              }}
              onMouseLeave={() => setIsBig(false)}
              type="button"
            >
              <span className={styles.navNum}>{row.num}</span>
              <span className={styles.navLabel}>{row.label}</span>
              <span className={styles.arrow} aria-hidden="true" />
            </button>
          ))}
          <div className={styles.micro}>Scroll to explore</div>
        </section>
      </div>
    </main>
  );
}
