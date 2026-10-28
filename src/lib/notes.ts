import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export const noteCategories = ['Building', 'Learning', 'Beyond the code'] as const;

export type NoteCategory = (typeof noteCategories)[number];

export type NoteSummary = {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: NoteCategory;
  draft: boolean;
  coverImage?: string;
  readingTime: string;
};

export type Note = NoteSummary & {
  content: string;
};

const notesDirectory = path.join(process.cwd(), 'content', 'notes');

function isCategory(value: unknown): value is NoteCategory {
  return typeof value === 'string' && noteCategories.includes(value as NoteCategory);
}

function readNote(filename: string): Note {
  const source = fs.readFileSync(path.join(notesDirectory, filename), 'utf8');
  const { data, content } = matter(source);
  const fallbackSlug = filename.replace(/\.md$/, '');

  if (typeof data.title !== 'string' || typeof data.description !== 'string' || !isCategory(data.category)) {
    throw new Error(`Invalid note frontmatter in ${filename}`);
  }

  const words = content.trim().split(/\s+/).filter(Boolean).length;

  return {
    slug: typeof data.slug === 'string' ? data.slug : fallbackSlug,
    title: data.title,
    date: typeof data.date === 'string' ? data.date : '',
    description: data.description,
    category: data.category,
    draft: data.draft !== false,
    coverImage: typeof data.coverImage === 'string' && data.coverImage ? data.coverImage : undefined,
    readingTime: `${Math.max(1, Math.ceil(words / 210))} min`,
    content
  };
}

export function canPreviewDrafts(searchParams?: { preview?: string | string[] }): boolean {
  return process.env.NODE_ENV === 'development' && searchParams?.preview === '1';
}

export function getNotes(options: { includeDrafts?: boolean } = {}): NoteSummary[] {
  if (!fs.existsSync(notesDirectory)) return [];

  return fs
    .readdirSync(notesDirectory)
    .filter((filename) => filename.endsWith('.md'))
    .map(readNote)
    .filter((note) => options.includeDrafts || !note.draft)
    .map((note): NoteSummary => ({
      slug: note.slug,
      title: note.title,
      date: note.date,
      description: note.description,
      category: note.category,
      draft: note.draft,
      coverImage: note.coverImage,
      readingTime: note.readingTime
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNoteBySlug(slug: string, options: { includeDrafts?: boolean } = {}): Note | null {
  if (!fs.existsSync(notesDirectory)) return null;

  const note = fs
    .readdirSync(notesDirectory)
    .filter((filename) => filename.endsWith('.md'))
    .map(readNote)
    .find((candidate) => candidate.slug === slug);

  if (!note || (note.draft && !options.includeDrafts)) return null;
  return note;
}
