import styles from './Portfolio.module.css';

const cells = Array.from({ length: 20 }, (_, index) => index);

export function AtriaDemo() {
  return (
    <div className={styles.projectDemo} aria-label="Atria interface preview">
      <div className={`${styles.demoSide} ${styles.mono}`}>
        <div>ATRIA / TODAY</div>
        <div>CALENDAR</div>
        <div>INSIGHTS</div>
        <div>TASKS</div>
        <div>SETTINGS</div>
      </div>
      <div className={styles.demoCanvas}>
        {cells.map((cell) => (
          <div className={styles.cell} key={cell} />
        ))}
        <div className={`${styles.event} ${styles.mono}`}>DEEP WORK<br />10:00—12:00</div>
        <div className={`${styles.event} ${styles.secondary} ${styles.mono}`}>BUILD REVIEW<br />14:00</div>
      </div>
    </div>
  );
}
