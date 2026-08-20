import type { ReactNode } from 'react';
import { DarkChrome } from '@/components/portfolio/DarkChrome';

export default function DarkLayout({ children }: { children: ReactNode }) {
  return <DarkChrome>{children}</DarkChrome>;
}
