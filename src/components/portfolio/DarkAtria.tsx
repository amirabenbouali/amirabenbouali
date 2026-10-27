'use client';

import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { createPortal } from 'react-dom';
import { CaseStudyHeader, CaseStudyJournal } from './CaseStudyPrimitives';
import { pathForView } from './data';
import { useDarkChrome } from './DarkChromeContext';
import styles from './DarkAtria.module.css';

const features = [
  { label: 'Drag-and-drop scheduling', detail: 'Across day, week and month views.' },
  { label: 'Tasks and calendar events', detail: 'One unified timeline for both.' },
  { label: 'Keyboard-driven editing', detail: 'Fast event creation and updates.' },
  { label: 'Persistent local state', detail: 'Planning state powered by Zustand.' },
  { label: 'Physics-based transitions', detail: 'Interaction motion via Framer Motion.' }
];

const days = ['Mon 13', 'Tue 14', 'Wed 15', 'Thu 16', 'Fri 17'];
const events = [
  { title: 'Deep work', time: '09:00', day: 1, row: 1, tone: 'moss' },
  { title: 'Design review', time: '11:30', day: 2, row: 3, tone: 'rose' },
  { title: 'Client call', time: '14:00', day: 3, row: 4, tone: 'gold' },
  { title: 'Write', time: '15:30', day: 1, row: 5, tone: 'sage' },
  { title: 'Weekly reflection', time: '16:30', day: 5, row: 5, tone: 'lavender' }
];

export function DarkAtria() {
  const { setIsBig, wipeTo } = useDarkChrome();
  const [expanded, setExpanded] = useState(false);
  const [selectedDay, setSelectedDay] = useState(2);
  const [planningMode, setPlanningMode] = useState<'Calm' | 'Balanced' | 'Planner'>('Balanced');
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previewButtonRef = useRef<HTMLButtonElement>(null);
  const interactiveHover = (active: boolean) => setIsBig(active);

  useEffect(() => {
    if (!expanded) return;

    const previousOverflow = document.body.style.overflow;
    const previewButton = previewButtonRef.current;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = previousOverflow;
      previewButton?.focus();
    };
  }, [expanded]);

  return (
    <main className={styles.scene}>
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.light} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <CaseStudyHeader
        onBack={() => wipeTo(pathForView('work'))}
        onHover={interactiveHover}
      />

      <section className={styles.intro} aria-labelledby="atria-title">
        <p className={styles.eyebrow}>Selected work / 2026</p>
        <h1 id="atria-title">Atria</h1>
        <p className={styles.tagline}>calendar, without the friction.</p>
        <p className={styles.summary}>
          A modern calendar and task-management system focused on clarity, flexible scheduling and fast interaction.
        </p>
      </section>

      <div className={styles.journalWrap}>
        <CaseStudyJournal
          features={features}
          focus="Scheduling · interaction · state"
          githubHref="https://github.com/amirabenbouali/atria"
          onHover={interactiveHover}
          role="Product design + frontend engineering"
          stack="React · TypeScript · Zustand · Framer Motion"
          status="Live version coming soon"
          title="Space for your day."
          year="2026"
        />
      </div>

      {expanded ? createPortal(
        <AtriaWorkspace
          closeButtonRef={closeButtonRef}
          expanded
          mode={planningMode}
          onHover={interactiveHover}
          onModeChange={setPlanningMode}
          onSelectDay={setSelectedDay}
          onToggle={() => setExpanded(false)}
          previewButtonRef={previewButtonRef}
          selectedDay={selectedDay}
        />,
        document.body
      ) : (
        <AtriaWorkspace
          closeButtonRef={closeButtonRef}
          expanded={false}
          mode={planningMode}
          onHover={interactiveHover}
          onModeChange={setPlanningMode}
          onSelectDay={setSelectedDay}
          onToggle={() => setExpanded(true)}
          previewButtonRef={previewButtonRef}
          selectedDay={selectedDay}
        />
      )}
    </main>
  );
}

type WorkspaceProps = {
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  expanded: boolean;
  mode: 'Calm' | 'Balanced' | 'Planner';
  onHover: (active: boolean) => void;
  onModeChange: (mode: 'Calm' | 'Balanced' | 'Planner') => void;
  onSelectDay: (day: number) => void;
  onToggle: () => void;
  previewButtonRef: RefObject<HTMLButtonElement | null>;
  selectedDay: number;
};

function AtriaWorkspace({
  closeButtonRef,
  expanded,
  mode,
  onHover,
  onModeChange,
  onSelectDay,
  onToggle,
  previewButtonRef,
  selectedDay
}: WorkspaceProps) {
  return (
    <section
      className={`${styles.preview} ${expanded ? styles.previewExpanded : ''}`}
      aria-label="Interactive Atria planning workspace"
      role={expanded ? 'dialog' : undefined}
      aria-modal={expanded ? 'true' : undefined}
    >
      {expanded ? <button className={styles.scrim} onClick={onToggle} aria-label="Close expanded workspace" /> : null}
      <div className={styles.previewWindow} data-mode={mode.toLowerCase()}>
        <div className={styles.previewBar}>
          <span className={styles.productMark}><i aria-hidden="true" /> Atria</span>
          <span className={styles.previewActions}>
            <small>Illustrative planning data</small>
            <button
              aria-expanded={expanded}
              onClick={onToggle}
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
              ref={expanded ? closeButtonRef : previewButtonRef}
              type="button"
            >
              {expanded ? 'Close' : 'Expand workspace'} <span aria-hidden="true">{expanded ? '×' : '↗'}</span>
            </button>
          </span>
        </div>

        <div className={styles.workspaceBody}>
          <aside className={styles.workspaceNav} aria-label="Atria views">
            <strong>A</strong>
            <span className={styles.navActive}>Calendar</span>
            <span>Tasks</span>
            <span>Today</span>
            <span>Insights</span>
            <small>Local first</small>
          </aside>

          <div className={styles.calendarPanel}>
            <div className={styles.calendarTop}>
              <div>
                <small>Weekly orbit</small>
                <strong>13–17 April</strong>
              </div>
              <div className={styles.modePicker} aria-label="Planning density">
                {(['Calm', 'Balanced', 'Planner'] as const).map((item) => (
                  <button
                    aria-pressed={mode === item}
                    className={mode === item ? styles.modeActive : ''}
                    key={item}
                    onClick={() => onModeChange(item)}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.dayTabs}>
              {days.map((day, index) => (
                <button
                  aria-pressed={selectedDay === index + 1}
                  className={selectedDay === index + 1 ? styles.dayActive : ''}
                  key={day}
                  onClick={() => onSelectDay(index + 1)}
                  type="button"
                >
                  {day}
                </button>
              ))}
            </div>

            <div className={styles.schedule} aria-label="Illustrative weekly calendar">
              <div className={styles.timeLabels} aria-hidden="true">
                <span>09</span><span>11</span><span>13</span><span>15</span><span>17</span>
              </div>
              <div className={styles.scheduleGrid}>
                {events.map((event) => (
                  <button
                    className={`${styles.event} ${styles[event.tone]} ${selectedDay === event.day ? styles.eventSelected : ''}`}
                    key={`${event.day}-${event.title}`}
                    onClick={() => onSelectDay(event.day)}
                    style={{ gridColumn: event.day, gridRow: `${event.row} / span 2` }}
                    type="button"
                  >
                    <strong>{event.title}</strong>
                    <small>{event.time}</small>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className={styles.taskPanel}>
            <div><small>Today&apos;s focus</small><strong>Make space, then make progress.</strong></div>
            <ul>
              <li><i /> Write project update</li>
              <li><i /> Review prototype</li>
              <li><i /> Plan next sprint</li>
            </ul>
            <p><span>3</span> tasks · <span>4</span> events</p>
          </aside>
        </div>
      </div>
      <p className={styles.previewMeta}>Interface concept · illustrative planning data</p>
    </section>
  );
}
