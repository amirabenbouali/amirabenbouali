import type { Metadata } from 'next';
import { DarkAbout } from '@/components/portfolio/DarkAbout';

export const metadata: Metadata = {
  title: 'About — Amira Lina Benbouali',
  description: 'Software engineer based in London — background, tech stack, and interests.'
};

export default function AboutPage() {
  return <DarkAbout />;
}
