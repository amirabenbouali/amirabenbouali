'use client';

import { useState } from 'react';
import { pathForView } from './data';
import { useDarkChrome } from './DarkChromeContext';
import shell from './DarkShell.module.css';
import styles from './DarkMetronome.module.css';

type Signal = {
  label: string;
  value: string;
  detail: string;
};

const signals: Signal[] = [
  { label: 'Traffic', value: '61', detail: 'A406: serious delays' },
  { label: 'Transit', value: '48', detail: 'Jubilee line: part suspended' },
  { label: 'Weather', value: '22', detail: 'Clear, 14°C' },
  { label: 'Events', value: '74', detail: '6 events nearby' }
];

const zoneStates: Array<'calm' | 'steady' | 'elevated' | 'busy' | 'intense'> = [
  'calm', 'steady', 'calm', 'elevated', 'steady', 'calm',
  'steady', 'busy', 'elevated', 'calm', 'steady', 'calm',
  'calm', 'steady', 'intense', 'elevated', 'steady', 'calm'
];

const chapters = ['intro', 'signals', 'map', 'stack'];

export function DarkMetronome() {
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
            selected work / 02
            <br />
            city pulse dashboard
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
              <div className={styles.kicker}>02 / Metronome</div>

              <h1 className={styles.title}>
                METRONOME
                <span>PULSE</span>
              </h1>

              <div className={styles.tagline}>the city, scored in real time.</div>

              <p className={styles.desc}>
                A live pulse dashboard for London that fuses real-time traffic, transit, weather and event data into
                a single score for every borough, shown on an interactive map.
              </p>

              <div className={styles.meta}>
                <div>
                  <b>Role</b>Full-stack engineering + data integration
                </div>
                <div>
                  <b>Year</b>2026
                </div>
                <div>
                  <b>Stack</b>FastAPI · PostGIS · React · TypeScript
                </div>
                <div>
                  <b>Focus</b>Real-time data · geospatial · live APIs
                </div>
              </div>
            </div>

            <div className={styles.foot}>case study · 02 / 02</div>
          </div>

          <div className={styles.experience}>
            <div className={styles.pinkField}>
              <div className={styles.giantWord} aria-hidden="true">
                METRONOME
              </div>

              <div
                className={styles.appCard}
                onMouseEnter={() => setIsBig(true)}
                onMouseLeave={() => setIsBig(false)}
              >
                <div className={styles.browser}>
                  <span>metronome / london</span>
                  <span>live</span>
                </div>

                <div className={styles.app}>
                  <aside className={styles.sidebar}>
                    <b>Metronome</b>
                    <span className={styles.sideItem}>Overview</span>
                    <span className={`${styles.sideItem} ${styles.sideItemActive}`}>Boroughs</span>
                    <span className={styles.sideItem}>Signals</span>
                    <span className={styles.sideItem}>Alerts</span>
                    <span className={styles.sideItem}>Settings</span>
                  </aside>

                  <div className={styles.dash}>
                    <div className={styles.scoreHead}>
                      <div>
                        <span className={styles.scoreLabel}>composite score</span>
                        <div className={styles.scoreValue}>62</div>
                      </div>
                      <div className={styles.band}>ELEVATED</div>
                    </div>

                    <div className={styles.signals}>
                      {signals.map((signal) => (
                        <div className={styles.signal} key={signal.label}>
                          <span className={styles.signalLabel}>{signal.label}</span>
                          <span className={styles.signalValue}>{signal.value}</span>
                          <span className={styles.signalDetail}>{signal.detail}</span>
                        </div>
                      ))}
                    </div>

                    <div className={styles.zones}>
                      {zoneStates.map((state, index) => (
                        <div className={`${styles.zone} ${styles[state]}`} key={index} />
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

              <div className={styles.sideNote}>a city, read like a heartbeat.</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
