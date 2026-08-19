import type { Metadata } from 'next';
import { PlaygroundContent } from '@/components/portfolio/pages';

export const metadata: Metadata = {
  title: 'Playground — Amira Lina Benbouali',
  description: 'Experiments, ideas and work in progress.'
};

export default function StackPage() {
  return <PlaygroundContent />;
}
