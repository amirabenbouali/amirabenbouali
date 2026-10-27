'use client';

import type { ReactNode } from 'react';
import styles from './CaseStudyPrimitives.module.css';

type CaseStudyHeaderProps = {
  onBack: () => void;
  onHover: (active: boolean) => void;
};

export function CaseStudyHeader({ onBack, onHover }: CaseStudyHeaderProps) {
  return (
    <header className={styles.header}>
      <span className={styles.identity}>
        <span aria-hidden="true">✦</span>
        <span>
          <strong>Amira Benbouali</strong>
          <small>Portfolio · 2026</small>
        </span>
      </span>
      <span className={styles.section}>Selected work</span>
      <button
        className={styles.back}
        onClick={onBack}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        type="button"
      >
        <span aria-hidden="true">←</span> Workshop
      </button>
    </header>
  );
}

type JournalFeature = {
  label: string;
  detail?: string;
};

type CaseStudyJournalProps = {
  title: string;
  role: string;
  year: string;
  stack: string;
  focus: string;
  features: JournalFeature[];
  githubHref: string;
  status: string;
  footer?: ReactNode;
  onHover: (active: boolean) => void;
};

export function CaseStudyJournal({
  title,
  role,
  year,
  stack,
  focus,
  features,
  githubHref,
  status,
  footer,
  onHover
}: CaseStudyJournalProps) {
  return (
    <article className={styles.journal} aria-labelledby="case-study-notes-title">
      <div className={styles.heading}>
        <p>Field notes</p>
        <span aria-hidden="true" />
      </div>
      <h2 id="case-study-notes-title">{title}</h2>

      <dl className={styles.meta}>
        <div>
          <dt>Role · {year}</dt>
          <dd>{role}</dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd>{stack}</dd>
        </div>
      </dl>

      <ol className={styles.features}>
        {features.map((feature, index) => (
          <li key={feature.label}>
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <strong>{feature.label}</strong>
              {feature.detail ? <p>{feature.detail}</p> : null}
            </div>
          </li>
        ))}
      </ol>

      <a
        className={styles.github}
        href={githubHref}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        rel="noreferrer"
        target="_blank"
      >
        View on GitHub <span aria-hidden="true">↗︎</span>
      </a>
      <p className={styles.status}>{status}</p>
      <p className={styles.focus}>{footer ?? focus}</p>
    </article>
  );
}
