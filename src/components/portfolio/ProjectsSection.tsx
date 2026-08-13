import { projects } from '@/data/portfolio';
import { AtriaDemo } from './AtriaDemo';
import { SectionHeading } from './SectionHeading';
import styles from './Portfolio.module.css';

export function ProjectsSection() {
  return (
    <section className={styles.section} id="projects">
      <SectionHeading label="[ selected projects ]">Serious engineering, presented with a little personality.</SectionHeading>

      <div className={styles.projects}>
        {projects.map((project) => (
          <details className={styles.project} data-project-row data-reveal key={project.id} open={project.demo === 'atria'}>
            <summary className={styles.projectSummary}>
              <span className={`${styles.num} ${styles.mono}`}>{project.number}</span>
              <div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
              <div className={`${styles.projectTech} ${styles.mono}`}>
                {project.tech.map((tech) => (
                  <mark key={tech}>{tech}</mark>
                ))}
              </div>
              <span className={`${styles.projectOpen} ${styles.mono}`} aria-hidden="true">
                OPEN SYSTEM
              </span>
            </summary>
            <div className={styles.projectPanel}>
              <div className={styles.projectPanelCopy}>
                <p>{project.detail}</p>
              </div>
              <div className={`${styles.flowDiagram} ${styles.mono}`} aria-label={`${project.title} system flow`}>
                {project.flow.map((step) => (
                  <span className={styles.flowNode} key={step}>
                    {step}
                  </span>
                ))}
              </div>
              {project.demo === 'atria' ? <AtriaDemo /> : null}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
