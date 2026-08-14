'use client';

import { useState } from 'react';
import type { Project } from '@/data/portfolio';
import { projects } from '@/data/portfolio';
import styles from './Portfolio.module.css';

function projectMeta(project: Project) {
  return `${project.category.toUpperCase()}\n${project.tags.join(' · ').toUpperCase()}`;
}

function ProjectArchiveVisual({ project }: { project: Project }) {
  if (project.id === 'kansodb') {
    return (
      <div className={styles.archiveArt} aria-hidden="true">
        <div className={`${styles.archiveScreen} ${styles.queryScreen}`}>
          <span>kansoDB › SELECT *</span>
          <span>FROM projects</span>
          <span>WHERE status = &apos;built&apos;;</span>
          <small>4 rows returned in 3.2ms</small>
        </div>
        <div className={`${styles.archiveMini} ${styles.archiveMiniOne}`} />
        <div className={`${styles.archiveMini} ${styles.archiveMiniTwo}`} />
        <div className={`${styles.archiveMini} ${styles.archiveMiniThree}`} />
      </div>
    );
  }

  if (project.id === 'foundry') {
    return (
      <div className={styles.archiveArt} aria-hidden="true">
        <div className={`${styles.archiveScreen} ${styles.systemScreen}`}>
          <h5>Engineering overview</h5>
          <div className={styles.systemGrid}>
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className={`${styles.archiveMini} ${styles.archiveMiniOne}`} />
        <div className={`${styles.archiveMini} ${styles.archiveMiniTwo}`} />
        <div className={`${styles.archiveMini} ${styles.archiveMiniThree}`} />
      </div>
    );
  }

  if (project.id === 'mini-ci') {
    return (
      <div className={styles.archiveArt} aria-hidden="true">
        <div className={`${styles.archiveScreen} ${styles.pipelineScreen}`}>
          {['commit', 'build', 'tests', 'release'].map((step, index) => (
            <div className={styles.pipelineStep} key={step}>
              <i>{String(index + 1).padStart(2, '0')}</i>
              <strong>{step}</strong>
              <span />
            </div>
          ))}
        </div>
        <div className={`${styles.archiveMini} ${styles.archiveMiniOne}`} />
        <div className={`${styles.archiveMini} ${styles.archiveMiniTwo}`} />
        <div className={`${styles.archiveMini} ${styles.archiveMiniThree}`} />
      </div>
    );
  }

  return (
    <div className={styles.archiveArt} aria-hidden="true">
      <div className={styles.archiveScreen}>
        <div className={styles.archiveScreenHeader}>
          <i />
          <i />
          <i />
        </div>
        <div className={styles.archiveCalendar}>
          {Array.from({ length: 21 }).map((_, index) => (
            <div className={styles.archiveCell} key={index}>
              {[1, 3, 5, 7, 10, 13, 15, 17, 19].includes(index) ? (
                <span className={`${styles.archiveEvent} ${index % 3 === 0 ? styles.archiveEventGreen : ''}`} />
              ) : null}
              {[10, 17].includes(index) ? <span className={styles.archiveEventAmber} /> : null}
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.archiveMini} ${styles.archiveMiniOne}`} />
      <div className={`${styles.archiveMini} ${styles.archiveMiniTwo}`} />
      <div className={`${styles.archiveMini} ${styles.archiveMiniThree}`} />
    </div>
  );
}

export function ProjectsSection() {
  const [activeId, setActiveId] = useState(projects[0]?.id ?? '');
  const activeProject = projects.find((project) => project.id === activeId) ?? projects[0];

  return (
    <section className={styles.workArchive} id="projects">
      <div className={styles.workTransition}>
        <div className={styles.workTransitionText}>
          <div>
            <span className={styles.mono}>01 / ARCHIVE</span>
            <strong>Selected work</strong>
          </div>
          <span className={styles.mono}>INTERACT WITH THE INDEX →</span>
        </div>
      </div>

      <div className={styles.archiveHead}>
        <div>
          <div className={`${styles.archiveEyebrow} ${styles.mono}`}>A SMALL SELECTION OF THINGS I&apos;VE BUILT</div>
          <h2>
            Projects,
            <br />
            <em>not cards.</em>
          </h2>
        </div>
        <p className={styles.mono}>
          A quiet project index at first glance. Hover or click a title and the archive opens: interface fragments,
          technical context and small physical details appear beside it.
        </p>
      </div>

      <div className={styles.archiveWorkspace}>
        <div className={styles.archiveList} role="list" aria-label="Selected project index">
          {projects.map((project) => (
            <button
              className={`${styles.archiveProject} ${project.id === activeProject?.id ? styles.archiveProjectActive : ''}`}
              data-project-row
              key={project.id}
              onClick={() => setActiveId(project.id)}
              onFocus={() => setActiveId(project.id)}
              onMouseEnter={() => setActiveId(project.id)}
              type="button"
            >
              <span className={styles.archiveProjectRow}>
                <span className={styles.archiveNum}>{project.number.slice(0, 2)}</span>
                <span>
                  <strong>{project.title}</strong>
                  <small>{projectMeta(project)}</small>
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className={styles.archiveViewer}>
          {projects.map((project) => (
            <article
              className={`${styles.archiveView} ${project.id === activeProject?.id ? styles.archiveViewActive : ''}`}
              key={project.id}
              aria-hidden={project.id !== activeProject?.id}
            >
              <div className={styles.archiveViewTop}>
                <div>
                  <div className={`${styles.archiveIndex} ${styles.mono}`}>PROJECT {project.number.slice(0, 2)}</div>
                  <h3>{project.title}</h3>
                  <div className={`${styles.archiveMeta} ${styles.mono}`}>{projectMeta(project)}</div>
                  <p className={`${styles.archiveSummary} ${styles.mono}`}>{project.summary}</p>
                  <a
                    className={`${styles.archiveLink} ${styles.mono}`}
                    href="#contact"
                    tabIndex={project.id === activeProject?.id ? 0 : -1}
                  >
                    VIEW CASE STUDY <span>↗</span>
                  </a>
                </div>
              </div>

              <div className={`${styles.archivePaper} ${styles.mono}`}>
                <strong>ARCHIVE NOTE {project.number.slice(0, 2)}</strong>
                <br />
                <br />
                {project.id === 'atria'
                  ? 'Interaction, layered UI and small tactile details reveal the product.'
                  : project.id === 'kansodb'
                    ? 'A query becomes a trail: language, structure, result.'
                    : project.id === 'foundry'
                      ? 'Operational responsibility becomes a visible system.'
                      : 'A build pipeline becomes a measured release path.'}
              </div>

              <ProjectArchiveVisual project={project} />
            </article>
          ))}
        </div>
      </div>

      <div className={`${styles.archiveFooterNote} ${styles.mono}`}>
        <span>02 / SELECTED WORK</span>
        <span>NEXT — STACK / TOOLBOX ↓</span>
      </div>
    </section>
  );
}
