import type { Metadata } from 'next';
import { DarkKanso } from '@/components/portfolio/DarkKanso';

export const metadata: Metadata = {
  title: 'KansoDB — Amira Lina Benbouali',
  description: 'A small SQL query engine built to understand what actually happens between a query and its result.'
};

export default function KansoDbPage() {
  return <DarkKanso />;
}
