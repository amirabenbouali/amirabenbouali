import styles from './Portfolio.module.css';

export function AtriaDemo() {
  return (
    <div className={styles.projectDemo} aria-label="Atria interface preview">
      <div className={styles.mockTop}>
        <span className={styles.menuIcon}>≡</span>
        <strong>Atria</strong>
        <button type="button">+ New event</button>
      </div>
      <div className={styles.calendarMock}>
        <aside className={`${styles.calSide} ${styles.mono}`}>
          <span>MAY 2026</span>
          <span>M T W T F S S</span>
          <span>4 5 6 7 8 9 10</span>
          <span>11 12 13 14 15 16 17</span>
        </aside>
        <div className={`${styles.calMain} ${styles.mono}`}>
          <div className={`${styles.calendarEvent} ${styles.eventPink}`}>09:00 - Design review</div>
          <div className={`${styles.calendarEvent} ${styles.eventYellow}`}>11:30 - Focus block</div>
          <div className={styles.calendarEvent}>14:30 - Client call</div>
        </div>
        <aside className={`${styles.calRight} ${styles.mono}`}>
          <span>UPCOMING</span>
          <span>Team stand-up</span>
          <span>Client call</span>
        </aside>
      </div>
    </div>
  );
}
