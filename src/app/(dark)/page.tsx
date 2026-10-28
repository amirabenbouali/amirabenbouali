import { DesktopPortfolio } from '@/components/desktop/DesktopPortfolio';
import { getNotes } from '@/lib/notes';

export default function Home() {
  const preview = process.env.NODE_ENV === 'development';
  return <DesktopPortfolio notes={getNotes({ includeDrafts: preview })} notesPreview={preview} />;
}
