import { Link } from 'react-router-dom';
import { writingNotes } from '../../data/writing';
import styles from './WritingPage.module.css';

export function WritingIndexPage() {
  return (
    <main className={styles.page}>
      <p className={styles.kicker}>Notes from the Observatory</p>
      <h1>Field notes on product, systems, and attention.</h1>
      <div className={styles.noteList}>
        {writingNotes.map((note) => (
          <Link to={`/writing/${note.slug}`} key={note.slug}>
            <span>{note.date}</span>
            <strong>{note.title}</strong>
            <small>{note.deck}</small>
          </Link>
        ))}
      </div>
    </main>
  );
}
