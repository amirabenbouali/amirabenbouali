import type { Metadata } from 'next';
import { DarkWork } from '@/components/portfolio/DarkWork';

export const metadata: Metadata = {
  title: 'Work — Amira Lina Benbouali',
  description: 'Selected projects: Atria, a calendar without the friction, and Metronome, a live pulse dashboard for London.'
};

export default function ProjectsPage() {
  return <DarkWork />;
}
