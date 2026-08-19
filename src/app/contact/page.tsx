import type { Metadata } from 'next';
import { ContactContent } from '@/components/portfolio/pages';

export const metadata: Metadata = {
  title: 'Contact — Amira Lina Benbouali',
  description: 'Get in touch — open to new opportunities.'
};

export default function ContactPage() {
  return <ContactContent />;
}
