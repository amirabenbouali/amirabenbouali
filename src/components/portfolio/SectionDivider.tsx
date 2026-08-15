import styles from './Portfolio.module.css';

type SectionDividerProps = {
  eyebrow: string;
  from: string;
  to: string;
  tone?: 'dark' | 'paper';
};

export function SectionDivider({ eyebrow, from, to, tone = 'dark' }: SectionDividerProps) {
  return (
    <div className={`${styles.sectionDivider} ${tone === 'paper' ? styles.sectionDividerPaper : ''}`} aria-hidden="true">
      <div className={`${styles.dividerEyebrow} ${styles.mono}`}>{eyebrow}</div>
      <div className={styles.dividerRule}>
        <span className={styles.dividerDot} />
        <span className={styles.dividerNeedle} />
        <span className={styles.dividerDot} />
      </div>
      <div className={`${styles.dividerMeta} ${styles.mono}`}>
        <span>{from}</span>
        <span>{to}</span>
      </div>
    </div>
  );
}
