'use client';

import Link from 'next/link';
import { useState } from 'react';
import { desktopProjects, type DesktopProject } from './projectData';
import styles from './DesktopWorkArchive.module.css';

export function DesktopWorkArchive() {
  const [selectedSlug, setSelectedSlug] = useState<DesktopProject['slug']>('atria');
  const selectedProject = desktopProjects.find((project) => project.slug === selectedSlug) ?? desktopProjects[0];

  const moveSelection = (direction: -1 | 1) => {
    const currentIndex = desktopProjects.findIndex((project) => project.slug === selectedProject.slug);
    const nextIndex = (currentIndex + direction + desktopProjects.length) % desktopProjects.length;
    setSelectedSlug(desktopProjects[nextIndex].slug);
    document.getElementById(`project-file-${desktopProjects[nextIndex].slug}`)?.focus();
  };

  return (
    <div className={styles.archive}>
      <header className={styles.archiveHeader}>
        <div>
          <p>Selected work / 2026</p>
          <h2 id="desktop-window-title">Project archive</h2>
        </div>
        <span>{desktopProjects.length} project files</span>
      </header>

      <div className={styles.archiveWorkspace}>
        <nav className={styles.fileList} aria-label="Project files">
          <span className={styles.listLabel}>Name</span>
          {desktopProjects.map((project) => {
            const isSelected = project.slug === selectedProject.slug;
            return (
              <button
                aria-current={isSelected ? 'page' : undefined}
                className={`${styles.fileRow} ${styles[project.accent]} ${isSelected ? styles.fileRowSelected : ''}`}
                id={`project-file-${project.slug}`}
                key={project.slug}
                onClick={() => setSelectedSlug(project.slug)}
                onDoubleClick={() => document.getElementById(`open-${project.slug}`)?.click()}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    moveSelection(1);
                  }
                  if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    moveSelection(-1);
                  }
                }}
                type="button"
              >
                <span className={`${styles.fileIcon} ${styles[project.accent]}`} aria-hidden="true"><i /></span>
                <span>
                  <b>{project.title}</b>
                  <small>{project.focus}</small>
                </span>
                <em>{project.index}</em>
              </button>
            );
          })}
          <p className={styles.fileHint}>Use ↑ ↓ to browse · double-click to open</p>
        </nav>

        <article className={`${styles.preview} ${styles[selectedProject.accent]}`} aria-live="polite">
          <div className={styles.previewBar}>
            <span><i /><i /><i /></span>
            <b>project_{selectedProject.index}</b>
            <small>{selectedProject.year}</small>
          </div>

          <div className={styles.previewBody}>
            <div className={styles.previewCopy}>
              <p>{selectedProject.index} / {selectedProject.focus}</p>
              <h3>{selectedProject.title}</h3>
              <strong>{selectedProject.descriptor}</strong>
              <span>{selectedProject.summary}</span>
              <dl>
                <div><dt>Stack</dt><dd>{selectedProject.stack}</dd></div>
                <div><dt>Status</dt><dd>{selectedProject.status}</dd></div>
              </dl>
              <div className={styles.previewActions}>
                <Link id={`open-${selectedProject.slug}`} href={`/projects/${selectedProject.slug}`}>Open case study ↗</Link>
                <a href={selectedProject.github} rel="noreferrer" target="_blank">GitHub ↗</a>
              </div>
            </div>

            <ProjectFilePreview project={selectedProject} />
          </div>
        </article>
      </div>
    </div>
  );
}

function ProjectFilePreview({ project }: { project: DesktopProject }) {
  if (project.kind === 'calendar') {
    return (
      <div className={`${styles.visual} ${styles.calendarVisual}`} aria-hidden="true">
        <div className={styles.visualToolbar}><i /><span>April 2026</span><b>+</b></div>
        <div className={styles.miniCalendar}>
          {Array.from({ length: 20 }, (_, index) => <i key={index}>{[6, 12, 18].includes(index) ? <b /> : null}</i>)}
        </div>
      </div>
    );
  }

  if (project.kind === 'city') {
    return (
      <div className={`${styles.visual} ${styles.cityVisual}`} aria-hidden="true">
        <div className={styles.cityMap}><i /><i /><i /><i /><i /></div>
        <div className={styles.cityScore}><small>London pulse</small><b>62</b><span>Elevated</span></div>
      </div>
    );
  }

  if (project.kind === 'operations') {
    return (
      <div className={`${styles.visual} ${styles.operationsVisual}`} aria-hidden="true">
        <header><b>Foundry</b><span>System healthy</span></header>
        <aside><i>Overview</i><i>Domains</i><strong>Issues</strong><i>Triage</i></aside>
        <div className={styles.issueQueue}>
          <small>Issue triage · 03</small>
          <b>Authentication callback</b>
          <b>Slow query</b>
          <b>Postmortem ownership</b>
        </div>
      </div>
    );
  }

  if (project.kind === 'query') {
    return (
      <div className={`${styles.visual} ${styles.queryVisual}`} aria-hidden="true">
        <code><b>SELECT</b> ideas<br /><b>FROM</b> memory<br /><b>WHERE</b> status = <em>&apos;unfinished&apos;</em>;</code>
        <div className={styles.queryFlow}><span>tokens</span><i>→</i><span>AST</span><i>→</i><span>3 rows</span></div>
      </div>
    );
  }

  return (
    <div className={`${styles.visual} ${styles.pipelineVisual}`} aria-hidden="true">
      <small>build #042</small>
      <div>{['Commit', 'Build', 'Tests', 'Release'].map((stage, index) => <span key={stage}><i className={index < 3 ? styles.stageComplete : ''} /><b>{stage}</b></span>)}</div>
      <code>checks completed · artifact ready</code>
    </div>
  );
}
