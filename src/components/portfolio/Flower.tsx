import styles from './Portfolio.module.css';

export function Flower() {
  return (
    <div className={styles.flower} data-flower aria-hidden="true">
      <div className={`${styles.petal} ${styles.p1}`} />
      <div className={`${styles.petal} ${styles.p2}`} />
      <div className={`${styles.petal} ${styles.p3}`} />
      <div className={`${styles.petal} ${styles.p4}`} />
      <div className={`${styles.petal} ${styles.p5}`} />
      <div className={styles.center}>&lt;/&gt;</div>
    </div>
  );
}
