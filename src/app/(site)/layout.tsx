import type { ReactNode } from 'react';
import { ScrapbookChrome } from '@/components/portfolio/ScrapbookChrome';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <ScrapbookChrome>{children}</ScrapbookChrome>;
}
