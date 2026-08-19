import type { Metadata } from 'next';
import { WorkContent } from '@/components/portfolio/pages';

export const metadata: Metadata = {
  title: 'Work — Amira Lina Benbouali',
  description: 'Selected projects: Foundry, KansoDB, Atria, and a lightweight CI/CD tool.'
};

export default function ProjectsPage() {
  return <WorkContent />;
}
