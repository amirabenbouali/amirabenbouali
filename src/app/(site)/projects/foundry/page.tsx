import type { Metadata } from 'next';
import { FoundryContent } from '@/components/portfolio/pages';

export const metadata: Metadata = {
  title: 'Foundry — Amira Lina Benbouali',
  description: 'An engineering operating system for managing domains, issues, triage and postmortems.'
};

export default function FoundryPage() {
  return <FoundryContent />;
}
