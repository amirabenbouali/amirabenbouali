import type { Metadata } from 'next';
import { DesktopCaseStudy } from '@/components/desktop/DesktopCaseStudy';
import { getDesktopProject } from '@/components/desktop/projectData';

export const metadata: Metadata = {
  title: 'Foundry — Amira Lina Benbouali',
  description: 'An engineering workspace for domains, issues, triage and postmortems.'
};

export default function FoundryPage() {
  return <DesktopCaseStudy project={getDesktopProject('foundry')} />;
}
