'use client';

import { useState } from 'react';
import { pathForView } from './data';
import { useDarkChrome } from './DarkChromeContext';
import shell from './DarkShell.module.css';
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
const chapters = ['intro', 'system', 'interaction', 'stack'];

export function DarkAtria() {
  const { setIsBig, wipeTo } = useDarkChrome();
  const [activeChapter, setActiveChapter] = useState(0);

  const goBack = () => wipeTo(pathForView('work'));

  return (
    <main className={shell.shell}>
      <div className={shell.grain} aria-hidden="true" />

      <div className={shell.content}>
        <header className={shell.top}>
          <div className={shell.brand}>
            AMIRA
            <br />
            BENBOUALI
          </div>
          <div className={shell.role}>
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
            ← work
          </button>
        </header>

        <section className={styles.stage}>
          <div className={styles.copy}>
            <div>
              <div className={styles.kicker}>01 / Atria</div>

              <h1 className={styles.title}>
                ATRIA
                <span>CALENDAR</span>
              </h1>

              <div className={styles.tagline}>calendar, without the friction.</div>

              <p className={styles.desc}>
                A modern calendar and task-management system focused on clarity, flexible scheduling and fast
                interaction.
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

            <div className={styles.foot}>case study · 01 / 04</div>
          </div>

          <div className={styles.experience}>
            <div className={styles.pinkField}>
              <div className={styles.giantWord} aria-hidden="true">
                ATRIA
              </div>

              <div className={styles.flower} aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>

              <div
                className={styles.appCard}
                onMouseEnter={() => setIsBig(true)}
                onMouseLeave={() => setIsBig(false)}
              >
                <div className={styles.browser}>
                  <span>atria / calendar</span>
                  <span>apr 2026</span>
                </div>

                <div className={styles.app}>
                  <aside className={styles.sidebar}>
                    <b>Atria</b>
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

              <div className={styles.chapter}>
                {chapters.map((chapter, index) => (
                  <div
                    className={`${styles.chapterItem} ${activeChapter === index ? styles.chapterActive : ''}`}
                    key={chapter}
                    onMouseEnter={() => setActiveChapter(index)}
                  >
                    <span className={styles.dot} />
                    <span>{chapter}</span>
                  </div>
                ))}
              </div>

              <div className={styles.sideNote}>designed to feel calm, not busy.</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
