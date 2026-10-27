import type { Metadata } from 'next';
import { DesktopCaseStudy } from '@/components/desktop/DesktopCaseStudy';
import { getDesktopProject } from '@/components/desktop/projectData';

export const metadata: Metadata = {
  title: 'Atria — Amira Lina Benbouali',
  description: 'A calm, interaction-focused planning system for events, tasks and everyday organisation.'
};

export default function AtriaPage() {
  return <DesktopCaseStudy project={getDesktopProject('atria')} />;
}
