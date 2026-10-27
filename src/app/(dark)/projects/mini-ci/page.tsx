import type { Metadata } from 'next';
import { DesktopCaseStudy } from '@/components/desktop/DesktopCaseStudy';
import { getDesktopProject } from '@/components/desktop/projectData';

export const metadata: Metadata = {
  title: 'Mini CI/CD — Amira Lina Benbouali',
  description: 'A lightweight CI/CD system for exploring visible, inspectable automation pipelines.'
};

export default function MiniCiPage() {
  return <DesktopCaseStudy project={getDesktopProject('mini-ci')} />;
}
