import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Project } from '../../data/projects';
import { AtriaVisual } from './project-visuals/AtriaVisual';
import { FoundryVisual } from './project-visuals/FoundryVisual';
import { KansoDBVisual } from './project-visuals/KansoDBVisual';
import { MiniCIVisual } from './project-visuals/MiniCIVisual';
import styles from './ProjectChapter.module.css';

type ProjectChapterProps = {
  project: Project;
  id: string;
};

function visualForProject(slug: Project['slug']) {
  switch (slug) {
    case 'atria':
      return <AtriaVisual />;
    case 'foundry':
      return <FoundryVisual />;
    case 'kansodb':
      return <KansoDBVisual />;
    case 'mini-ci':
      return <MiniCIVisual />;
    default:
      return null;
  }
}

export function ChapterMetadata({ children }: { children: ReactNode }) {
  return <p className={styles.metadata}>{children}</p>;
}

export function ChapterHeading({ children }: { children: ReactNode }) {
  return <h2 className={styles.heading}>{children}</h2>;
}

export function ChapterBody({ children }: { children: ReactNode }) {
  return <p className={styles.body}>{children}</p>;
}

export function ChapterVisual({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className={styles.visual} role="img" aria-label={label}>
      {children}
    </div>
  );
}

export function ChapterNavigation({ slug }: { slug: string }) {
  return (
    <a className={styles.caseLink} href={`/work/${slug}`}>
      <span>Open case study</span>
      <ArrowDownRight aria-hidden="true" size={17} strokeWidth={1.45} />
    </a>
  );
}

export function ProjectChapter({ project, id }: ProjectChapterProps) {
  return (
    <article className={styles.chapter} id={id}>
      <motion.div
        className={styles.copy}
        initial={{ opacity: 0, y: 42 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <ChapterMetadata>
          {project.index.padStart(3, '0')} / {project.category} / {project.year}
        </ChapterMetadata>
        <ChapterHeading>{project.title}</ChapterHeading>
        <ChapterBody>{project.statement}</ChapterBody>
        <p className={styles.summary}>{project.summary}</p>
        <ChapterNavigation slug={project.slug} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 58 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={{ duration: 1.15, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <ChapterVisual label={`${project.title} atmospheric interface study`}>{visualForProject(project.slug)}</ChapterVisual>
      </motion.div>
    </article>
  );
}
