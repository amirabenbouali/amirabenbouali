import Link from 'next/link';
import Image from 'next/image';
import type { NoteSummary } from '@/lib/notes';
import styles from './DesktopNotes.module.css';

export function DesktopNotesPreview({ notes, preview = false }: { notes: NoteSummary[]; preview?: boolean }) {
  const href = `/notes${preview ? '?preview=1' : ''}`;

  return (
    <div className={styles.folderPreview}>
      <header>
        <div><p id="desktop-window-title">Notebook / 2026</p><h2>Amira&apos;s notes<span>.</span></h2></div>
        {preview ? <span>Draft preview</span> : null}
      </header>
      <p className={styles.folderIntro}>Code, curiosity, and the things I figure out along the way.</p>

      {notes.length ? (
        <div className={styles.folderNotes}>
          {notes.slice(0, 3).map((note, index) => (
            <Link href={`/notes/${note.slug}${preview ? '?preview=1' : ''}`} key={note.slug}>
              {note.coverImage ? (
                <span className={`${styles.miniPaper} ${styles.miniCover}`}><Image alt="" fill sizes="240px" src={note.coverImage} /></span>
              ) : (
                <span className={`${styles.miniPaper} ${styles[`miniPaper${index + 1}`]}`} aria-hidden="true"><i /><i /></span>
              )}
              <small>{note.category}</small>
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <b>{note.draft ? 'Draft example' : note.date} · {note.readingTime} read ↗</b>
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.folderEmpty}><span aria-hidden="true">✎</span><div><h3>The notebook is still quiet.</h3><p>The first public note is being written.</p></div></div>
      )}

      <Link className={styles.openNotebook} href={href}>Open the notebook ↗</Link>
    </div>
  );
}
