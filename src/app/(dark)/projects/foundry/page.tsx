import type { Metadata } from 'next';
import { DarkFoundry } from '@/components/portfolio/DarkFoundry';

export const metadata: Metadata = {
  title: 'Foundry — Amira Lina Benbouali',
  description: 'An engineering operating system for managing domains, issues, triage and postmortems.'
};

export default function FoundryPage() {
  return <DarkFoundry />;
}
