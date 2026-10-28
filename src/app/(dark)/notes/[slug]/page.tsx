import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NoteArticle } from '@/components/desktop/NoteArticle';
import { canPreviewDrafts, getNoteBySlug, getNotes } from '@/lib/notes';

type NotePageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string | string[] }>;
};

export function generateStaticParams() {
  return getNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params, searchParams }: NotePageProps): Promise<Metadata> {
  const preview = canPreviewDrafts(await searchParams);
  const note = getNoteBySlug((await params).slug, { includeDrafts: preview });
  if (!note) return {};
  return { title: `${note.title} | Amira's notes`, description: note.description };
}

export default async function NotePage({ params, searchParams }: NotePageProps) {
  const preview = canPreviewDrafts(await searchParams);
  const note = getNoteBySlug((await params).slug, { includeDrafts: preview });
  if (!note) notFound();
  return <NoteArticle note={note} preview={preview} />;
}
