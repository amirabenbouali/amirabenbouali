'use client';

import { useState } from 'react';
import { pathForView, projects } from './data';
import { useDarkChrome } from './DarkChromeContext';
import shell from './DarkShell.module.css';
import styles from './DarkWork.module.css';

function ProjectPreview({ title }: { title: string }) {
  if (title === 'Atria') {
    return (
      <div className={styles.atriaUi}>
        <div className={styles.atriaSide} />
        <div className={styles.atriaGrid}>
          {Array.from({ length: 15 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (title === 'Foundry') {
    return (
      <div className={styles.foundryUi}>
        <div className={styles.foundryCol}>
          <div className={styles.issue} />
          <div className={styles.issue} />
          <div className={styles.issue} />
          <div className={styles.issue} />
        </div>
        <div className={`${styles.foundryCol} ${styles.pipeline}`}>
          <div className={styles.node} />
          <div className={styles.node} />
          <div className={styles.node} />
          <div className={styles.node} />
        </div>
      </div>
    );
  }

  if (title === 'KansoDB') {
    return (
      <div className={styles.kansoUi}>
        <div className={styles.code}>
          <span className={styles.kw}>SELECT</span> name
          <br />
          <span className={styles.kw}>FROM</span> engineers
          <br />
          <span className={styles.kw}>WHERE</span> stack = &apos;ts&apos;;
        </div>
        <div className={styles.ast}>
          <div>Query</div>
          <div>Select</div>
          <div>From</div>
          <div>Where</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.ciUi}>
      <div className={styles.terminal}>
        $ mini-ci run
        <br />
        <br />
        <span className={styles.ok}>✓ setup</span>
        <br />
        <span className={styles.ok}>✓ tests</span>
        <br />
        <span className={styles.ok}>✓ build</span>
        <br />
        <span className={styles.ok}>✓ release</span>
      </div>
      <div className={styles.stages}>
        <div className={styles.stageCard}>01 setup</div>
        <div className={styles.stageCard}>02 test</div>
        <div className={styles.stageCard}>03 build</div>
        <div className={styles.stageCard}>04 ship</div>
      </div>
    </div>
  );
}

export function DarkWork() {
  const { setIsBig, wipeTo } = useDarkChrome();
  const [activeIndex, setActiveIndex] = useState(0);

  const goHome = () => wipeTo(pathForView('home'));

  return (
    <main className={shell.shell}>
      <header className={styles.top}>
        <div className={styles.brand}>
          AMIRA
          <br />
          BENBOUALI
        </div>
        <div className={styles.sectionLabel}>
          selected work
          <br />
          software engineering
        </div>
        <button className={styles.back} onClick={goHome} type="button">
          home
        </button>
      </header>

      <div className={styles.layout}>
        <aside className={styles.intro}>
          <div>
            <h1>
              selected
              <em>work.</em>
            </h1>
            <p>
              A selection of products, systems and developer tools I&apos;ve built — each one exploring a
              different part of software engineering.
            </p>
          </div>
          <div className={styles.meta}>
            {projects.length} selected projects
            <br />
            product · systems · tooling
          </div>
        </aside>

        <section className={styles.projects}>
          <div className={styles.ghost} aria-hidden="true">projects</div>

          {projects.map((project, index) => {
            const detail = (
              <>
                <span className={styles.num}>{project.index}</span>
                <span className={styles.title}>{project.title}</span>
                <span className={styles.details}>
                  <b>{project.kind}</b>
                  {project.stack[0]}
                  <br />
                  {project.stack[1]}
                </span>
                <span className={styles.year}>{project.year}</span>
                <span className={styles.arrow} aria-hidden="true" />
                <div className={styles.preview}>
                  <div className={styles.previewTop}>
                    <span>{project.title}</span>
                    <span>{project.kind}</span>
                  </div>
                  <div className={styles.previewBody}>
                    <ProjectPreview title={project.title} />
                  </div>
                </div>
              </>
            );

            const rowProps = {
              className: `${styles.project} ${activeIndex === index ? styles.projectActive : ''}`,
              onMouseEnter: () => {
                setActiveIndex(index);
                setIsBig(true);
              },
              onMouseLeave: () => setIsBig(false)
            };

            if (project.target) {
              return (
                <button
                  {...rowProps}
                  key={project.title}
                  onClick={() => wipeTo(pathForView(project.target!))}
                  type="button"
                >
                  {detail}
                </button>
              );
            }

            return (
              <a {...rowProps} href={project.href} key={project.title} rel="noopener noreferrer" target="_blank">
                {detail}
              </a>
            );
          })}

          <div className={styles.micro}>hover to inspect · click to open</div>
        </section>
      </div>
    </main>
  );
}
