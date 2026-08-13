import type { ReactNode } from 'react';
import styles from './Portfolio.module.css';

type SectionHeadingProps = {
  label: string;
  children: ReactNode;
};

export function SectionHeading({ label, children }: SectionHeadingProps) {
  return (
    <div className={styles.sectionHead}>
      <div className={styles.label}>{label}</div>
      <h2>{children}</h2>
    </div>
  );
}
