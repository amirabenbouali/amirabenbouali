import type { Metadata } from 'next';
import { NotesLibrary } from '@/components/desktop/NotesLibrary';
import { canPreviewDrafts, getNotes } from '@/lib/notes';

export const metadata: Metadata = {
  title: 'Notes | Amira Benbouali',
  description: 'Notes on building software, learning in public, and life beyond the code.'
};

export default async function NotesPage({ searchParams }: { searchParams: Promise<{ preview?: string | string[] }> }) {
  const preview = canPreviewDrafts(await searchParams);
  return <NotesLibrary notes={getNotes({ includeDrafts: preview })} preview={preview} />;
}
