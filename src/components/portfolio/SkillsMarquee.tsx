import styles from './Portfolio.module.css';

const marqueeText = 'TYPE SCRIPT * REACT * NEXT.JS * POSTGRESQL * SYSTEM DESIGN * PRODUCT ENGINEERING *';

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
