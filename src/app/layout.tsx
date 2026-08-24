import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Instrument_Serif, Pinyon_Script } from 'next/font/google';
import './globals.css';

const serifAccent = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif-accent'
});

const script = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-script'
});

export const metadata: Metadata = {
  title: 'Amira Lina Benbouali — Portfolio',
  description: 'Software engineer and data scientist building full-stack products, developer tooling, and data systems.'
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${serifAccent.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
