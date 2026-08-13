import { projects } from '@/data/portfolio';
import { AtriaDemo } from './AtriaDemo';
import styles from './Portfolio.module.css';

export function ProjectsSection() {
  return (
    <section className={styles.section} id="projects">
      <div className={styles.workTop}>
        <div className={`${styles.workLabel} ${styles.mono}`}>[ selected work ]</div>
        <a className={`${styles.viewAll} ${styles.mono}`} href="#contact">
          VIEW ALL PROJECTS →
        </a>
      </div>

      <div className={styles.projects}>
        {projects.map((project) => (
          <article className={styles.project} data-project-row data-reveal key={project.id}>
            <div className={styles.projectSummary}>
              <span className={`${styles.num} ${styles.mono}`}>{project.number.slice(0, 2)}</span>
              <div>
                <h3>{project.title}</h3>
                <div className={`${styles.projectType} ${styles.mono}`}>{project.category}</div>
                <p>{project.summary}</p>
              </div>
              {project.demo === 'atria' ? <AtriaDemo /> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
