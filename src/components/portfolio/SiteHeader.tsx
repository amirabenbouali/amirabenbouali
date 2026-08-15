import Link from 'next/link';
import { navItems } from '@/data/portfolio';
import styles from './Portfolio.module.css';

export function SiteHeader() {
  return (
    <header className={styles.topbar}>
      <Link className={`${styles.yearMark} ${styles.mono}`} href="/" aria-label="Amira Lina Benbouali home">
        <span className={styles.yearDot} aria-hidden="true" />
        <span className={styles.yearPill}>2026</span>
      </Link>
      <nav className={`${styles.nav} ${styles.mono}`} aria-label="Main navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label.toUpperCase()}
          </Link>
        ))}
      </nav>
      <Link className={`${styles.smallLink} ${styles.mono}`} href="/contact">
        CV / LINKS ↗
      </Link>
    </header>
  );
}
