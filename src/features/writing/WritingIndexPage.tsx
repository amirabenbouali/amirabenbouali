import { Link } from 'react-router-dom';
import { Container } from '../../components/layout/Layout';
import { AtmosphericGrain } from '../../components/ui/Atmosphere';
import { writingNotes } from '../../data/writing';
import styles from './WritingPage.module.css';

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
});

export function WritingIndexPage() {
  return (
    <main className={styles.indexPage}>
      <Container>
        <header className={styles.indexHero}>
          <p className={styles.kicker}>Engineering journal</p>
          <h1>Field Notes</h1>
          <p>Thoughts on software, design and building things.</p>
        </header>

        <section className={styles.articleList} aria-label="Field Notes articles">
          {writingNotes.map((note, index) => (
            <Link to={`/writing/${note.slug}`} key={note.slug} className={styles.articleRow}>
              <span className={styles.rowIndex}>{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.rowMeta}>
                <time dateTime={note.publishedAt}>{dateFormatter.format(new Date(`${note.publishedAt}T00:00:00`))}</time>
                <span>{note.readingTime}</span>
                <span>{note.category}</span>
              </span>
              <strong>{note.title}</strong>
              <small>{note.excerpt}</small>
            </Link>
          ))}
        </section>
      </Container>
      <AtmosphericGrain />
    </main>
  );
}
