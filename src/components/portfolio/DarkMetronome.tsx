'use client';

import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { createPortal } from 'react-dom';
import { ARROW_NE, pathForView } from './data';
import { useDarkChrome } from './DarkChromeContext';
import { CaseStudyHeader } from './CaseStudyPrimitives';
import styles from './DarkMetronome.module.css';

type Borough = {
  name: string;
  score: number;
  band: string;
  signals: [number, number, number, number];
  position: [number, number];
};

const boroughs: Borough[] = [
  { name: 'Westminster', score: 46, band: 'Balanced', signals: [52, 38, 22, 71], position: [48, 42] },
  { name: 'Camden', score: 34, band: 'Calm', signals: [31, 44, 18, 43], position: [44, 27] },
  { name: 'Kensington & Chelsea', score: 58, band: 'Elevated', signals: [63, 41, 24, 76], position: [35, 49] },
  { name: 'Southwark', score: 67, band: 'Busy', signals: [69, 55, 20, 83], position: [57, 62] },
  { name: 'Hackney', score: 73, band: 'Intense', signals: [71, 62, 19, 91], position: [67, 35] }
];

const signalNames = ['Traffic', 'Transit', 'Weather', 'Events'];

export function DarkMetronome() {
  const { setIsBig, wipeTo } = useDarkChrome();
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const activeBorough = boroughs[selected];

  useEffect(() => {
    if (!expanded) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [expanded]);

  const interactiveProps = {
    onMouseEnter: () => setIsBig(true),
    onMouseLeave: () => setIsBig(false)
  };

  return (
    <main className={styles.scene}>
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.light} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <CaseStudyHeader
        onBack={() => wipeTo(pathForView('work'))}
        onHover={setIsBig}
      />

      <section className={styles.intro} aria-labelledby="metronome-title">
        <p className={styles.eyebrow}>Selected work / 2026</p>
        <h1 id="metronome-title">Metronome</h1>
        <p className={styles.tagline}>the city, scored in real time.</p>
        <p className={styles.summary}>
          London&apos;s traffic, transit, weather and events, brought into one borough-by-borough pulse.
        </p>
      </section>

      <section className={styles.notes} aria-labelledby="field-notes-title">
        <div className={styles.notesHeading}>
          <p>Field notes</p>
          <span aria-hidden="true" />
        </div>
        <h2 id="field-notes-title">Listening to London.</h2>

        <dl className={styles.projectMeta}>
          <div>
            <dt>Role</dt>
            <dd>Full-stack engineering + data integration</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>FastAPI · PostGIS · React · TypeScript</dd>
          </div>
        </dl>

        <ul className={styles.facts}>
          <li><span aria-hidden="true">◇</span> 33 London boroughs</li>
          <li><span aria-hidden="true">⌁</span> Five bands, Calm to Intense</li>
          <li><span aria-hidden="true">◷</span> Refreshes every 30 seconds</li>
        </ul>

        <a
          className={styles.github}
          href="https://github.com/amirabenbouali/metronome"
          rel="noreferrer"
          target="_blank"
          {...interactiveProps}
        >
          View on GitHub <span aria-hidden="true">{ARROW_NE}</span>
        </a>
        <p className={styles.comingSoon}>Live version coming soon.</p>
      </section>

      {expanded ? createPortal(
        <DashboardPreview
          activeBorough={activeBorough}
          closeButtonRef={closeButtonRef}
          expanded
          onClose={() => setExpanded(false)}
          onHover={setIsBig}
          onSelect={setSelected}
          selected={selected}
        />,
        document.body
      ) : (
        <DashboardPreview
          activeBorough={activeBorough}
          closeButtonRef={closeButtonRef}
          expanded={false}
          onClose={() => setExpanded(true)}
          onHover={setIsBig}
          onSelect={setSelected}
          selected={selected}
        />
      )}
    </main>
  );
}

type DashboardPreviewProps = {
  activeBorough: Borough;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  expanded: boolean;
  onClose: () => void;
  onHover: (active: boolean) => void;
  onSelect: (index: number) => void;
  selected: number;
};

function DashboardPreview({
  activeBorough,
  closeButtonRef,
  expanded,
  onClose,
  onHover,
  onSelect,
  selected
}: DashboardPreviewProps) {
  return (
    <section
      className={`${styles.dashboardWrap} ${expanded ? styles.dashboardExpanded : ''}`}
      aria-label="Interactive Metronome dashboard preview"
    >
      {expanded && <button className={styles.scrim} onClick={onClose} aria-label="Close dashboard" />}
      <div className={styles.dashboard}>
        <div className={styles.dashboardBar}>
          <div className={styles.productMark}><span /> metronome</div>
          <div className={styles.dashboardActions}>
            <span>Illustrative data</span>
            <button
              ref={closeButtonRef}
              type="button"
              aria-expanded={expanded}
              onClick={onClose}
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
            >
              {expanded ? 'Close' : 'Expand dashboard'} <span aria-hidden="true">{expanded ? '×' : '↗'}</span>
            </button>
          </div>
        </div>

        <div className={styles.dashboardBody}>
          <aside className={styles.boroughPicker}>
            <p>Illustrative borough samples</p>
            {boroughs.map((borough, index) => (
              <button
                className={selected === index ? styles.boroughActive : ''}
                key={borough.name}
                onClick={() => onSelect(index)}
                type="button"
                aria-pressed={selected === index}
              >
                {borough.name}
              </button>
            ))}
          </aside>

          <div className={styles.map} aria-label={`Illustrative map focused on ${activeBorough.name}`}>
            <div className={styles.river} aria-hidden="true" />
            <div className={styles.mapDistricts} aria-hidden="true">
              {Array.from({ length: 18 }, (_, index) => <i key={index} />)}
            </div>
            <div
              className={styles.mapPulse}
              style={{ left: `${activeBorough.position[0]}%`, top: `${activeBorough.position[1]}%` }}
              aria-hidden="true"
            />
            <p>London borough pulse</p>
          </div>

          <div className={styles.pulsePanel} aria-live="polite">
            <p className={styles.boroughName}>{activeBorough.name}</p>
            <span className={styles.pulseLabel}>Borough pulse</span>
            <div className={styles.score}>{activeBorough.score}<small>/ 100</small></div>
            <div className={styles.band}>{activeBorough.band}</div>
            <div className={styles.signalList}>
              {signalNames.map((name, index) => (
                <div key={name}>
                  <span>{name}</span>
                  <i><b style={{ transform: `scaleX(${activeBorough.signals[index] / 100})` }} /></i>
                  <strong>{activeBorough.signals[index]}</strong>
                </div>
              ))}
            </div>
            <small>Updated 14:03:20</small>
          </div>
        </div>
      </div>
      <p className={styles.dashboardCaption}>Interface concept · illustrative data</p>
    </section>
  );
}
