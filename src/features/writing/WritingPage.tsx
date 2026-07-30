import { useParams } from 'react-router-dom';
import { writingNotes } from '../../data/writing';
import styles from './WritingPage.module.css';

export function WritingPage() {
  const { slug } = useParams();
  const note = writingNotes.find((item) => item.slug === slug);

  return (
    <main className={styles.page}>
      <p className={styles.kicker}>Writing</p>
      <h1>{note?.title ?? 'Note not found'}</h1>
      <p>{note?.deck ?? 'This observatory note has not been written yet.'}</p>
    </main>
  );
}
