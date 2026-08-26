'use client';

import { useState } from 'react';
import { pathForView } from './data';
import { useDarkChrome } from './DarkChromeContext';
import shell from './DarkShell.module.css';
import styles from './DarkFoundry.module.css';

const issues = [
  { id: 'FDY-021', title: 'Authentication callback failing after deploy', tags: ['backend', 'p1'] },
  { id: 'FDY-018', title: 'Slow query on project overview', tags: ['database', 'perf'] },
  { id: 'FDY-015', title: 'Postmortem ownership flow needs clarity', tags: ['product', 'ux'] }
];

const lifecycle = [
  { label: '01 / Capture', detail: 'issue enters system' },
  { label: '02 / Triage', detail: 'severity + ownership' },
  { label: '03 / Resolve', detail: 'fix + rollout' },
  { label: '04 / Learn', detail: 'postmortem + follow-up' }
];

const chapters = ['intro', 'triage', 'incidents', 'stack'];

export function DarkFoundry() {
  const { setIsBig, wipeTo } = useDarkChrome();
  const [activeChapter, setActiveChapter] = useState(0);

  const goBack = () => wipeTo(pathForView('work'));

  return (
    <main className={shell.shell}>
      <div className={shell.grain} aria-hidden="true" />

      <div className={shell.content}>
        <header className={shell.top}>
          <div className={shell.brand}>
            AMIRA
            <br />
            BENBOUALI
          </div>
          <div className={shell.role}>
            selected work / 02
            <br />
            engineering os
          </div>
          <button
            className={styles.back}
            onClick={goBack}
            onMouseEnter={() => setIsBig(true)}
            onMouseLeave={() => setIsBig(false)}
            type="button"
          >
            ← work
          </button>
        </header>

        <section className={styles.stage}>
          <div className={styles.copy}>
            <div>
              <div className={styles.kicker}>02 / Foundry</div>

              <h1 className={styles.title}>
                FOUNDRY
                <span>SYSTEMS</span>
              </h1>

              <div className={styles.tagline}>engineering work, made visible.</div>

              <p className={styles.desc}>
                A full-stack workspace for issue triage, domains, incidents and postmortems, built around the
                workflows engineering teams actually use.
              </p>

              <div className={styles.meta}>
                <div>
                  <b>Role</b>Full-stack engineering + product design
                </div>
                <div>
                  <b>Year</b>2026
                </div>
                <div>
                  <b>Stack</b>Next.js · TypeScript · Prisma · PostgreSQL
                </div>
                <div>
                  <b>Focus</b>Triage · domains · incidents · workflows
                </div>
              </div>
            </div>

            <div className={styles.foot}>case study · 02 / 04</div>
          </div>

          <div className={styles.experience}>
            <div className={styles.pinkField}>
              <div className={styles.giantWord} aria-hidden="true">
                FOUNDRY
              </div>

              <div className={styles.mechanical} aria-hidden="true" />

              <div
                className={styles.workspace}
                onMouseEnter={() => setIsBig(true)}
                onMouseLeave={() => setIsBig(false)}
              >
                <div className={styles.sysTop}>
                  <span>foundry / issue triage</span>
                  <span className={styles.healthy}>system healthy</span>
                </div>

                <div className={styles.app}>
                  <aside className={styles.sidebar}>
                    <b>Foundry</b>
                    <span className={styles.sideItem}>Overview</span>
                    <span className={styles.sideItem}>Domains</span>
                    <span className={`${styles.sideItem} ${styles.sideItemActive}`}>Issues</span>
                    <span className={styles.sideItem}>Triage</span>
                    <span className={styles.sideItem}>Postmortems</span>
                    <span className={styles.sideItem}>Settings</span>
                  </aside>

                  <div className={styles.main}>
                    <div className={styles.mainHead}>
                      <h3>Issue triage</h3>
                      <span>04 active · 01 blocked</span>
                    </div>

                    <div className={styles.grid}>
                      <div className={styles.panel}>
                        <div className={styles.panelHead}>
                          <span>queue</span>
                          <span>03</span>
                        </div>
                        <div className={styles.issues}>
                          {issues.map((issue) => (
                            <div
                              className={styles.issue}
                              key={issue.id}
                              onMouseEnter={() => setIsBig(true)}
                              onMouseLeave={() => setIsBig(false)}
                            >
                              <span className={styles.issueId}>{issue.id}</span>
                              <strong>{issue.title}</strong>
                              <div className={styles.chips}>
                                {issue.tags.map((tag) => (
                                  <span className={styles.chip} key={tag}>
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className={styles.panel}>
                        <div className={styles.panelHead}>
                          <span>incident lifecycle</span>
                          <span>live</span>
                        </div>
                        <div className={styles.flow}>
                          {lifecycle.map((step, index) => (
                            <div
                              className={`${styles.step} ${index === 1 ? styles.stepActive : ''}`}
                              key={step.label}
                              onMouseEnter={() => setIsBig(true)}
                              onMouseLeave={() => setIsBig(false)}
                            >
                              <div className={styles.stepDot} />
                              <div className={styles.stepCopy}>
                                <b>{step.label}</b>
                                {step.detail}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.chapter}>
                {chapters.map((chapter, index) => (
                  <div
                    className={`${styles.chapterItem} ${activeChapter === index ? styles.chapterActive : ''}`}
                    key={chapter}
                    onMouseEnter={() => setActiveChapter(index)}
                  >
                    <span className={styles.chapterDot} />
                    <span>{chapter}</span>
                  </div>
                ))}
              </div>

              <div className={styles.sideNote}>clarity over noise.</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
