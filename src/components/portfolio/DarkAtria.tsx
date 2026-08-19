'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { pathForView } from './data';
import styles from './DarkAtria.module.css';

type Day = {
  label: string;
  events?: Array<{ text: string; slot: 'e1' | 'e2' | 'e3' }>;
};

const days: Day[] = [
  { label: '13' },
  { label: '14', events: [{ text: 'gym / push', slot: 'e1' }] },
  { label: '15', events: [{ text: 'portfolio review', slot: 'e1' }, { text: 'run · 5k', slot: 'e2' }] },
  { label: '16' },
  { label: '17', events: [{ text: 'build atria', slot: 'e3' }] },
  { label: '18' },
  { label: '19' },
  { label: '20' },
  { label: '21', events: [{ text: 'deep work', slot: 'e1' }] },
  { label: '22' },
  { label: '23', events: [{ text: 'project planning', slot: 'e2' }] },
  { label: '24' },
  { label: '25' },
  { label: '26' },
  { label: '27' },
  { label: '28', events: [{ text: 'interview prep', slot: 'e1' }] },
  { label: '29' },
  { label: '30', events: [{ text: 'ship update', slot: 'e3' }] },
  { label: '01' },
  { label: '02' },
  { label: '03' }
];

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function DarkAtria() {
  const router = useRouter();
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

  const goBack = useCallback(() => {
    const path = pathForView('work');
    setIsWiping(false);
    window.requestAnimationFrame(() => setIsWiping(true));
    window.setTimeout(() => router.push(path), 350);
    window.setTimeout(() => setIsWiping(false), 700);
  }, [router]);

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
        <div className={styles.section}>
          selected work / 01
          <br />
          productivity system
        </div>
        <button
          className={styles.back}
          onClick={goBack}
          onMouseEnter={() => setIsBig(true)}
          onMouseLeave={() => setIsBig(false)}
          type="button"
        >
          work
        </button>
      </header>

      <div className={styles.layout}>
        <aside className={styles.copy}>
          <div>
            <div className={styles.index}>01 / ATRIA</div>

            <h1 className={styles.title}>
              <span>Atria</span>
              <span className={styles.titleGhost}>calendar</span>
            </h1>

            <div className={styles.subtitle}>
              scheduling,
              <em>without the friction.</em>
            </div>

            <p className={styles.desc}>
              Atria is a modern calendar and task-management product built around clarity, fast interaction and
              flexible scheduling. I designed and engineered it as a complete product system rather than a static
              UI exercise.
            </p>

            <div className={styles.meta}>
              <div>
                <b>Role</b>Product design + frontend engineering
              </div>
              <div>
                <b>Year</b>2026
              </div>
              <div>
                <b>Stack</b>React · TypeScript · Zustand · Framer Motion
              </div>
              <div>
                <b>Focus</b>Scheduling · interaction · state
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            PRODUCT CASE STUDY
            <br />
            01 / 04
          </div>
        </aside>

        <section className={styles.product}>
          <div className={styles.label}>live interface study</div>

          <div
            className={styles.frame}
            onMouseEnter={() => setIsBig(true)}
            onMouseLeave={() => setIsBig(false)}
          >
            <div className={styles.browser}>
              <span>atria / calendar</span>
              <span>apr 2026 · week 16</span>
            </div>

            <div className={styles.app}>
              <aside className={styles.sidebar}>
                <b>Atria</b>
                <br />
                <br />
                <span className={styles.sideItem}>Today</span>
                <span className={`${styles.sideItem} ${styles.sideItemActive}`}>Calendar</span>
                <span className={styles.sideItem}>Tasks</span>
                <span className={styles.sideItem}>Insights</span>
                <span className={styles.sideItem}>Settings</span>
              </aside>

              <div className={styles.calendar}>
                <div className={styles.calHead}>
                  <h3>April 2026</h3>
                  <div
                    className={styles.add}
                    onMouseEnter={() => setIsBig(true)}
                    onMouseLeave={() => setIsBig(false)}
                  >
                    + add event
                  </div>
                </div>

                <div className={styles.week}>
                  {weekdays.map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>

                <div className={styles.grid}>
                  {days.map((day, index) => (
                    <div className={styles.day} key={`${day.label}-${index}`}>
                      {day.label}
                      {day.events?.map((event) => (
                        <div className={`${styles.event} ${styles[event.slot]}`} key={event.text}>
                          {event.text}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.miniStats}>
            <div>
              <b>Views</b>Today / Calendar / Insights
            </div>
            <div>
              <b>Motion</b>Framer Motion
            </div>
            <div>
              <b>State</b>Zustand + LocalStorage
            </div>
          </div>

          <div className={styles.note}>designed to feel calm</div>
        </section>
      </div>
    </main>
  );
}
