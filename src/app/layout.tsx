import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ScrapbookChrome } from '@/components/portfolio/ScrapbookChrome';
import './globals.css';

export const metadata: Metadata = {
  title: 'Amira Lina Benbouali — Portfolio',
  description: 'Software engineer and data scientist building full-stack products, developer tooling, and data systems.'
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ScrapbookChrome>{children}</ScrapbookChrome>
      </body>
    </html>
  );
}
