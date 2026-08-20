import type { Metadata } from 'next';
import { DarkContact } from '@/components/portfolio/DarkContact';

export const metadata: Metadata = {
  title: 'Contact — Amira Lina Benbouali',
  description: 'Get in touch — open to new opportunities.'
};

export default function ContactPage() {
  return <DarkContact />;
}
