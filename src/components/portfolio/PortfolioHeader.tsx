'use client';

import { pathForView, type PrimaryView } from './data';
import { useDarkChrome } from './DarkChromeContext';
import styles from './PortfolioHeader.module.css';

type Section = Exclude<PrimaryView, 'home'>;

type PortfolioHeaderProps = {
  active: Section;
  fixed?: boolean;
  tone?: 'dark' | 'paper';
};

const sections: Array<{ label: string; view: Section }> = [
  { label: 'Work', view: 'work' },
  { label: 'About', view: 'about' },
  { label: 'Contact', view: 'contact' }
];

export function PortfolioHeader({ active, fixed = false, tone = 'dark' }: PortfolioHeaderProps) {
  const { setIsBig, wipeTo } = useDarkChrome();
  const hover = (value: boolean) => setIsBig(value);

  return (
    <header
      className={`${styles.header} ${styles[tone]} ${fixed ? styles.fixed : ''}`}
      data-portfolio-header
    >
      <button
        className={styles.brand}
        onClick={() => wipeTo(pathForView('home'))}
        onMouseEnter={() => hover(true)}
        onMouseLeave={() => hover(false)}
        type="button"
      >
        <span className={styles.brandMark} aria-hidden="true">✦</span>
        <span className={styles.brandCopy}>
          <strong>Amira Benbouali</strong>
          <small>Portfolio · 2026</small>
        </span>
      </button>

      <nav className={styles.nav} aria-label="Portfolio">
        {sections.map((section) => (
          <button
            aria-current={active === section.view ? 'page' : undefined}
            className={active === section.view ? styles.active : undefined}
            key={section.view}
            onClick={() => wipeTo(pathForView(section.view))}
            onMouseEnter={() => hover(true)}
            onMouseLeave={() => hover(false)}
            type="button"
          >
            {section.label}
          </button>
        ))}
      </nav>

      <button
        className={styles.workshop}
        onClick={() => wipeTo(pathForView('home'))}
        onMouseEnter={() => hover(true)}
        onMouseLeave={() => hover(false)}
        type="button"
      >
        <span className={styles.workshopIcon} aria-hidden="true">←</span>
        <span>Workshop</span>
      </button>
    </header>
  );
}
