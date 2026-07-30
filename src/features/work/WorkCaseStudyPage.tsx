import { Link, useParams } from 'react-router-dom';
import { getProjectBySlug } from '../../data/projects';
import styles from './WorkCaseStudyPage.module.css';

export function WorkCaseStudyPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <main className={styles.page}>
        <p>Case study not found.</p>
        <Link to="/">Return to the observatory</Link>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <p className={styles.kicker}>
        {project.index} / {project.category} / {project.year}
      </p>
      <h1>{project.title}</h1>
      <p>{project.statement}</p>
    </main>
  );
}
