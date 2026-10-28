'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { NoteCategory, NoteSummary } from '@/lib/notes';
import { DesktopNotesFrame } from './DesktopNotesFrame';
import styles from './DesktopNotes.module.css';

type Filter = 'All notes' | NoteCategory;
type View = 'grid' | 'list';

const filters: Array<{ label: Filter; symbol: string }> = [
  { label: 'All notes', symbol: '▤' },
  { label: 'Building', symbol: '⌘' },
  { label: 'Learning', symbol: '↗' },
  { label: 'Beyond the code', symbol: '✧' }
];

function formatDate(date: string) {
  if (!date) return 'Undated';
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${date}T12:00:00`));
}

export function NotesLibrary({ notes, preview = false }: { notes: NoteSummary[]; preview?: boolean }) {
  const [category, setCategory] = useState<Filter>('All notes');
  const [query, setQuery] = useState('');
  const [view, setView] = useState<View>('grid');

  const filteredNotes = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return notes.filter((note) => {
      const categoryMatches = category === 'All notes' || note.category === category;
      const searchMatches = !normalized || `${note.title} ${note.description} ${note.category}`.toLowerCase().includes(normalized);
      return categoryMatches && searchMatches;
    });
  }, [category, notes, query]);

  const sidebar = (
    <nav className={styles.sidebar} aria-label="Note categories">
      <span className={styles.sideLabel}>My notebook</span>
      {filters.map((filter) => {
        const active = category === filter.label;
        return (
          <button
            aria-pressed={active}
            className={`${styles.sideButton} ${active ? styles.sideButtonActive : ''}`}
            key={filter.label}
            onClick={() => setCategory(filter.label)}
            type="button"
          >
            <span aria-hidden="true">{filter.symbol}</span>{filter.label}
          </button>
        );
      })}
      <p className={styles.sideNote}>Things I&apos;m building,<br />learning and thinking about.</p>
    </nav>
  );

  return (
    <DesktopNotesFrame
      sidebar={sidebar}
      status={(
        <>
          <span aria-live="polite">{filteredNotes.length} {preview ? 'draft ' : ''}note{filteredNotes.length === 1 ? '' : 's'}</span>
          <span>{preview ? 'Development preview · drafts are not public' : 'Amira Benbouali · Notes'}</span>
        </>
      )}
    >
      <section className={styles.main}>
        <div className={styles.headingRow}>
          <div>
            <p className={styles.eyebrow}>A little corner of my desktop</p>
            <h1>Amira&apos;s notes<span>.</span></h1>
            <p className={styles.intro}>Code, curiosity, and the things I figure out along the way.</p>
          </div>
          {preview ? <span className={styles.previewTag}>Draft preview</span> : null}
        </div>

        <div className={styles.toolbar}>
          <label className={styles.searchLabel}>
            <span className="sr-only">Search notes</span>
            <input
              className={styles.search}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search my notes..."
              type="search"
              value={query}
            />
          </label>
          <div className={styles.viewControls} aria-label="View style">
            <button aria-pressed={view === 'grid'} onClick={() => setView('grid')} type="button">Grid</button>
            <button aria-pressed={view === 'list'} onClick={() => setView('list')} type="button">List</button>
          </div>
        </div>

        {filteredNotes.length ? (
          <div className={`${styles.cards} ${view === 'list' ? styles.cardsList : ''}`}>
            {filteredNotes.map((note, index) => (
              <Link className={styles.card} href={`/notes/${note.slug}${preview ? '?preview=1' : ''}`} key={note.slug}>
                {note.coverImage ? (
                  <span className={styles.cover}><Image alt="" fill sizes="(max-width: 680px) 100vw, 320px" src={note.coverImage} /></span>
                ) : (
                  <span className={`${styles.paper} ${styles[`paper${(index % 3) + 1}`]}`} aria-hidden="true"><i /><i /><i /></span>
                )}
                <span className={styles.category}>{note.category}</span>
                <h2>{note.title}</h2>
                <p>{note.description}</p>
                <span className={styles.meta}>{note.draft ? 'Draft example' : formatDate(note.date)} · {note.readingTime} read ↗</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <span aria-hidden="true">✎</span>
            <h2>{notes.length ? 'No notes match that search.' : 'No published notes yet.'}</h2>
            <p>{notes.length ? 'Try another word or category.' : 'The first public note is still being written.'}</p>
          </div>
        )}
      </section>
    </DesktopNotesFrame>
  );
}
