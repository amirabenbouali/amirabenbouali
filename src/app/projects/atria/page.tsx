import type { Metadata } from 'next';
import { AtriaContent } from '@/components/portfolio/pages';

export const metadata: Metadata = {
  title: 'Atria — Amira Lina Benbouali',
  description: 'A calm, interaction-focused planning system for events, tasks and everyday organisation.'
};

export default function AtriaPage() {
  return <AtriaContent />;
}
