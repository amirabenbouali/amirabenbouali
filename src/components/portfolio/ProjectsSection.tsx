import { projects } from '@/data/portfolio';
import { AtriaDemo } from './AtriaDemo';
import { SectionHeading } from './SectionHeading';
import styles from './Portfolio.module.css';

export function ProjectsSection() {
  return (
    <section className={styles.section} id="projects">
      <SectionHeading label="[ selected projects ]">Each project has its own little engineering stack.</SectionHeading>

      <div className={styles.projects}>
        {projects.map((project) => (
          <details className={styles.project} data-project-row data-reveal key={project.id} open={project.demo === 'atria'}>
            <summary className={styles.projectSummary}>
              <span className={`${styles.num} ${styles.mono}`}>{project.number}</span>
              <div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <dl className={styles.projectMeta}>
                  <div>
                    <dt>ROLE</dt>
                    <dd>{project.role}</dd>
                  </div>
                  <div>
                    <dt>FOCUS</dt>
                    <dd>{project.focus}</dd>
                  </div>
                  <div>
                    <dt>STATUS</dt>
                    <dd>{project.status}</dd>
                  </div>
                </dl>
              </div>
              <div className={styles.techStack} aria-label={`${project.title} technology stack`}>
                {project.techLayers.map((tech) => (
                  <span className={`${styles.techLayer} ${styles.mono}`} key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
              <span className={`${styles.projectOpen} ${styles.mono}`} aria-hidden="true">
                OPEN SYSTEM
              </span>
            </summary>
            <div className={styles.projectPanel}>
              <div className={styles.projectVisual}>
                <div className={styles.visualLeft}>
                  <strong>{project.visualStatement}</strong>
                  <p>{project.detail}</p>
                </div>
                <div className={`${styles.systemMap} ${styles.mono}`} aria-label={`${project.title} system flow`}>
                  {project.flow.map((step) => (
                    <span className={styles.node} key={step}>
                      {step}
                    </span>
                  ))}
                </div>
                <div className={`${styles.projectHighlights} ${styles.mono}`} aria-label={`${project.title} highlights`}>
                  {project.highlights.map((highlight) => (
                    <span key={highlight}>{highlight}</span>
                  ))}
                </div>
              </div>
              {project.demo === 'atria' ? <AtriaDemo /> : null}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
