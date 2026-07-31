import { AtmosphericGrain } from '../../components/ui/Atmosphere';
import { projects } from '../../data/projects';
import { useActiveSection } from '../../hooks/useActiveSection';
import { SignalSection } from '../contact/SignalSection';
import { ProjectChapter } from '../work/ProjectChapter';
import { WorkIntroduction } from '../work/WorkIntroduction';
import { CinematicHero } from './CinematicHero';
import { LandingTransition } from './LandingTransition';
import styles from './LandingPage.module.css';

export function LandingPage() {
  const chapterIds = projects.map((project) => `chapter-${project.slug}`);
  const activeChapter = useActiveSection(chapterIds);

  return (
    <main className={styles.page}>
      <CinematicHero />
      <LandingTransition />
      <WorkIntroduction />

      <aside className={`${styles.projectIndex} ${activeChapter ? styles.projectIndexVisible : ''}`} aria-label="Project index">
        {projects.map((project) => {
          const id = `chapter-${project.slug}`;
          return (
            <a key={project.slug} href={`#${id}`} className={activeChapter === id ? styles.projectIndexActive : undefined}>
              <span>{project.index.padStart(3, '0')}</span>
              <span>{project.title}</span>
            </a>
          );
        })}
      </aside>

      <section className={styles.chapters} aria-label="Selected work chapters">
        {projects.map((project) => (
          <ProjectChapter key={project.slug} project={project} id={`chapter-${project.slug}`} />
        ))}
      </section>
      <SignalSection />
      <AtmosphericGrain />
    </main>
  );
}
