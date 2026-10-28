import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Note } from '@/lib/notes';
import { CopyNoteLink } from './CopyNoteLink';
import { DesktopNotesFrame } from './DesktopNotesFrame';
import styles from './DesktopNotes.module.css';

function formatDate(date: string) {
  if (!date) return 'Undated';
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(`${date}T12:00:00`));
}

export function NoteArticle({ note, preview = false }: { note: Note; preview?: boolean }) {
  const notesHref = `/notes${preview ? '?preview=1' : ''}`;
  const sidebar = (
    <aside className={`${styles.sidebar} ${styles.articleSidebar}`}>
      <span className={styles.sideLabel}>Reading</span>
      <Link className={styles.articleBack} href={notesHref}>← All notes</Link>
      <dl>
        <div><dt>Category</dt><dd>{note.category}</dd></div>
        <div><dt>Date</dt><dd>{formatDate(note.date)}</dd></div>
        <div><dt>Length</dt><dd>{note.readingTime} read</dd></div>
      </dl>
      <CopyNoteLink />
    </aside>
  );

  return (
    <DesktopNotesFrame
      sidebar={sidebar}
      status={<><span>Reading / {note.slug}</span><Link href={notesHref}>Back to notes ↗</Link></>}
    >
      <article className={styles.article}>
        <Link className={styles.mobileBack} href={notesHref}>← Back to notes</Link>
        <p className={styles.eyebrow}>{note.category} · {note.draft ? 'Draft example' : formatDate(note.date)}</p>
        <h1>{note.title}</h1>
        <p className={styles.articleDek}>{note.description}</p>
        <div className={styles.articleMeta}><span>Amira Benbouali</span><span>{note.readingTime} read</span></div>
        {note.coverImage ? (
          <figure className={styles.articleCover}><Image alt="" fill priority sizes="(max-width: 680px) 100vw, 760px" src={note.coverImage} /></figure>
        ) : null}
        {preview && note.draft ? (
          <p className={styles.draftNotice}><b>Development preview.</b> This sample demonstrates the reading experience and is not published writing.</p>
        ) : null}
        <div className={styles.prose}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.content}</ReactMarkdown>
        </div>
        <footer className={styles.articleFooter}>
          <span>End of note</span>
          <Link href={notesHref}>Return to the notebook ↗</Link>
        </footer>
      </article>
    </DesktopNotesFrame>
  );
}
