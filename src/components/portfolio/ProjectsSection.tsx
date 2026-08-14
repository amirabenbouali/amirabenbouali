import { projects } from '@/data/portfolio';
import { AtriaDemo } from './AtriaDemo';
import styles from './Portfolio.module.css';

export function ProjectsSection() {
  const [featuredProject, ...moreProjects] = projects;

  return (
    <>
      <section className={styles.section} id="projects">
        <div className={styles.workTop}>
          <div className={`${styles.workLabel} ${styles.mono}`}>[ selected work ]</div>
          <a className={`${styles.viewAll} ${styles.mono}`} href="#more-work">
            VIEW ALL PROJECTS →
          </a>
        </div>

        {featuredProject ? (
          <article className={styles.project} data-project-row data-reveal>
            <div className={styles.projectSummary}>
              <span className={`${styles.num} ${styles.mono}`}>{featuredProject.number.slice(0, 2)}</span>
              <div>
                <h3>{featuredProject.title}</h3>
                <div className={`${styles.projectType} ${styles.mono}`}>{featuredProject.category}</div>
                <p>{featuredProject.summary}</p>
              </div>
              <AtriaDemo />
            </div>
          </article>
        ) : null}
      </section>

      <section className={styles.moreWorkSection} id="more-work">
        <div className={styles.workTop}>
          <div className={`${styles.workLabel} ${styles.mono}`}>[ more things I&apos;ve built ]</div>
          <div className={`${styles.viewAll} ${styles.mono}`}>hover to inspect ↓</div>
        </div>
        <div className={styles.workList}>
          {moreProjects.map((project) => (
            <article className={styles.workRow} data-project-row data-reveal key={project.id}>
              <div className={`${styles.workIndex} ${styles.mono}`}>{project.number.slice(0, 2)} /</div>
              <div>
                <h3 className={styles.workName}>{project.title}</h3>
                <p className={`${styles.workDesc} ${styles.mono}`}>{project.summary}</p>
              </div>
              <div className={`${styles.workTags} ${styles.mono}`}>
                {project.tags.map((tag) => (
                  <span className={styles.workTag} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
