import type { Metadata } from 'next';
import { DesktopCaseStudy } from '@/components/desktop/DesktopCaseStudy';
import { getDesktopProject } from '@/components/desktop/projectData';

export const metadata: Metadata = {
  title: 'KansoDB — Amira Lina Benbouali',
  description: 'A small SQL query engine built to make the path from query text to execution understandable.'
};

export default function KansoDBPage() {
  return <DesktopCaseStudy project={getDesktopProject('kansodb')} />;
}
