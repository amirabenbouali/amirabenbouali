import type { Metadata } from 'next';
import { DesktopAboutPage } from '@/components/desktop/DesktopAbout';

export const metadata: Metadata = {
  title: 'About — Amira Lina Benbouali',
  description: 'Meet Amira, a London-based software engineer building thoughtful products, systems and developer tools.'
};

export default function AboutPage() {
  return <DesktopAboutPage />;
}
