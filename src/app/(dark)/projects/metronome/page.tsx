import type { Metadata } from 'next';
import { DesktopCaseStudy } from '@/components/desktop/DesktopCaseStudy';
import { getDesktopProject } from '@/components/desktop/projectData';

export const metadata: Metadata = {
  title: 'Metronome — Amira Lina Benbouali',
  description:
    'A live pulse dashboard for London that fuses real-time traffic, transit, weather and event data into a single score for every borough.'
};

export default function MetronomePage() {
  return <DesktopCaseStudy project={getDesktopProject('metronome')} />;
}
