import type { Metadata } from 'next';
import { DarkMetronome } from '@/components/portfolio/DarkMetronome';

export const metadata: Metadata = {
  title: 'Metronome — Amira Lina Benbouali',
  description:
    'A live pulse dashboard for London that fuses real-time traffic, transit, weather and event data into a single score for every borough.'
};

export default function MetronomePage() {
  return <DarkMetronome />;
}
