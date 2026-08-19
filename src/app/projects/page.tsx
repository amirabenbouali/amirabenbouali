import type { Metadata } from 'next';
import { DarkWork } from '@/components/portfolio/DarkWork';

export const metadata: Metadata = {
  title: 'Work — Amira Lina Benbouali',
  description: 'Selected projects: Foundry, KansoDB, Atria, and a lightweight CI/CD tool.'
};

export default function ProjectsPage() {
  return <DarkWork />;
}
