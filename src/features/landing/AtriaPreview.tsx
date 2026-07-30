import styles from './AtriaPreview.module.css';

const rituals = ['Planning', 'Review', 'Decision'];
const days = ['M', 'T', 'W', 'T', 'F'];

export function AtriaPreview() {
  return (
    <div className={styles.preview} aria-label="Atria interface preview">
      <aside className={styles.sidebar} aria-label="Atria navigation preview">
        <span className={styles.mark} />
        {rituals.map((ritual) => (
          <button key={ritual} type="button" className={styles.sidebarItem}>
            {ritual}
          </button>
        ))}
      </aside>

      <div className={styles.workspace}>
        <div className={styles.toolbar}>
          <span>Product rhythm</span>
          <button type="button">Sync</button>
        </div>

        <div className={styles.calendar} aria-label="Weekly planning preview">
          {days.map((day, index) => (
            <button key={`${day}-${index}`} type="button" className={styles.day}>
              <span>{day}</span>
              <strong>{index + 12}</strong>
            </button>
          ))}
        </div>

        <div className={styles.panelGrid}>
          <button type="button" className={styles.card}>
            <span>Decision</span>
            <strong>Ship review notes</strong>
          </button>
          <button type="button" className={styles.card}>
            <span>Signal</span>
            <strong>Evidence gathered</strong>
          </button>
        </div>

        <div className={styles.chart} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
