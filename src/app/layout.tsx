import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Instrument_Serif } from 'next/font/google';
import './globals.css';

const serifAccent = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif-accent'
});

export const metadata: Metadata = {
  title: 'Amira Lina Benbouali — Portfolio',
  description: 'Software engineer and data scientist building full-stack products, developer tooling, and data systems.'
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={serifAccent.variable}>
      <body>{children}</body>
    </html>
  );
}
