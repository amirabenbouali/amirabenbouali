import type { ReactNode } from 'react';
import Link from 'next/link';
import styles from './DesktopNotes.module.css';

type DesktopNotesFrameProps = {
  children: ReactNode;
  sidebar: ReactNode;
  status: ReactNode;
};

export function DesktopNotesFrame({ children, sidebar, status }: DesktopNotesFrameProps) {
  return (
    <main className={styles.page}>
      <div className={styles.grain} aria-hidden="true" />
      <header className={styles.desktopBar}>
        <Link href="/">← Amira&apos;s desktop</Link>
        <span>Thoughts, in progress.</span>
      </header>

      <section className={styles.window} aria-label="Amira's notes">
        <header className={styles.titlebar}>
          <span className={styles.dots} aria-hidden="true"><i /><i /><i /></span>
          <span>Amira&apos;s notes</span>
          <Link className={styles.close} href="/" aria-label="Close notes and return to desktop">×</Link>
        </header>
        <div className={styles.layout}>
          {sidebar}
          {children}
        </div>
        <footer className={styles.statusbar}>{status}</footer>
      </section>
    </main>
  );
}

