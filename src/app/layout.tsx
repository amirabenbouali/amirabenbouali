import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Instrument_Serif } from 'next/font/google';
import { CursorStarTrail } from '@/components/desktop/CursorStarTrail';
import './globals.css';

const serifAccent = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif-accent'
});

export const metadata: Metadata = {
  title: 'Amira Lina Benbouali — Portfolio',
  description: 'Software engineer building thoughtful products, developer tools, and full-stack systems.'
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={serifAccent.variable}>
      <body>
        {children}
        <CursorStarTrail />
      </body>
    </html>
  );
}
