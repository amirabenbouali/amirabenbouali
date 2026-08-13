import styles from './Portfolio.module.css';

const marqueeText = 'PRODUCT ENGINEERING * FRONTEND * BACKEND * DATABASES * TESTING * CI/CD * SYSTEM DESIGN *';

export function SkillsMarquee() {
  return (
    <div className={`${styles.marquee} ${styles.mono}`} aria-hidden="true">
      <div className={styles.marqueeTrack}>
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
      </div>
    </div>
  );
}
