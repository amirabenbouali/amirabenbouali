import styles from './AtriaVisual.module.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const events = [
  { day: 'Mon', label: 'Planning', tone: 'olive' },
  { day: 'Tue', label: 'Review', tone: 'paper' },
  { day: 'Wed', label: 'Focus', tone: 'lunar' },
  { day: 'Thu', label: 'Notes', tone: 'paper' },
  { day: 'Fri', label: 'Ship', tone: 'olive' }
];

export function AtriaVisual() {
  return (
    <div className={styles.atria}>
      <svg className={styles.orbits} viewBox="0 0 620 520" aria-hidden="true">
        <ellipse cx="312" cy="256" rx="250" ry="104" />
        <ellipse cx="312" cy="256" rx="208" ry="172" />
        <path d="M112 340 C206 194 368 168 520 252" />
        <circle cx="186" cy="228" r="4" />
        <circle cx="456" cy="302" r="4" />
      </svg>
      <div className={styles.calendar}>
        <div className={styles.calendarHeader}>
          <span>Atria</span>
          <span>Week 27</span>
        </div>
        <div className={styles.week}>
          {days.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className={styles.events}>
          {events.map((event) => (
            <div className={`${styles.event} ${styles[event.tone]}`} key={event.label}>
              <small>{event.day}</small>
              <strong>{event.label}</strong>
            </div>
          ))}
        </div>
        <div className={styles.reflection}>
          <span />
          <p>Decision notes linked to the week before the calendar becomes noise.</p>
        </div>
      </div>
    </div>
  );
}
