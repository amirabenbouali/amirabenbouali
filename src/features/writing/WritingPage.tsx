import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Container } from '../../components/layout/Layout';
import { AtmosphericGrain } from '../../components/ui/Atmosphere';
import { getWritingNoteBySlug } from '../../data/writing';
import type { ArticleBlock } from '../../data/writing';
import styles from './WritingPage.module.css';

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
});

function ArticleBlockRenderer({ block }: { block: ArticleBlock }) {
  if (block.type === 'paragraph') {
    return <p>{block.text}</p>;
  }

  if (block.type === 'blockquote') {
    return (
      <blockquote>
        <p>{block.text}</p>
        {block.cite ? <cite>{block.cite}</cite> : null}
      </blockquote>
    );
  }

  if (block.type === 'code') {
    return (
      <pre aria-label={`${block.language} code example`}>
        <code>{block.code}</code>
      </pre>
    );
  }

  if (block.type === 'divider') {
    return <hr />;
  }

  return <p className={styles.footnote}>{block.text}</p>;
}

export function WritingPage() {
  const { slug } = useParams();
  const note = getWritingNoteBySlug(slug);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 26, mass: 0.4 });

  if (!note) {
    return (
      <main className={styles.articlePage}>
        <Container>
          <div className={styles.notFound}>
            <p className={styles.kicker}>Field Notes</p>
            <h1>Note not found</h1>
            <Link to="/writing">Return to Field Notes</Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className={styles.articlePage}>
      <motion.div className={styles.progress} style={{ scaleX: progress }} aria-hidden="true" />
      <Container>
        <motion.article
          className={styles.article}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to="/writing" className={styles.backLink}>
            Field Notes
          </Link>
          <header className={styles.articleHeader}>
            <p className={styles.kicker}>{note.category}</p>
            <h1>{note.title}</h1>
            <p>{note.excerpt}</p>
            <div className={styles.articleMeta}>
              <time dateTime={note.publishedAt}>{dateFormatter.format(new Date(`${note.publishedAt}T00:00:00`))}</time>
              <span>{note.readingTime}</span>
              <span>{note.tags.join(' / ')}</span>
            </div>
          </header>
          <div className={styles.articleBody}>
            {note.content.map((block, index) => (
              <ArticleBlockRenderer block={block} key={`${block.type}-${index}`} />
            ))}
          </div>
        </motion.article>
      </Container>
      <AtmosphericGrain />
    </main>
  );
}
