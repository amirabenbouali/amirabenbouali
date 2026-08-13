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
          <article className={styles.project} data-reveal key={project.id}>
            <div className={`${styles.num} ${styles.mono}`}>{project.number}</div>
            <div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
            </div>
            <div className={`${styles.projectTech} ${styles.mono}`}>
              {project.tech.map((tech) => (
                <mark key={tech}>{tech}</mark>
              ))}
            </div>
            {project.demo === 'atria' ? <AtriaDemo /> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
