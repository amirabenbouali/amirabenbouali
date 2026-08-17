import Link from 'next/link';
import { navItems } from '@/data/portfolio';
import styles from './Portfolio.module.css';

type SiteHeaderProps = {
  homeNav?: boolean;
};

export function SiteHeader({ homeNav = false }: SiteHeaderProps) {
  const items = homeNav
    ? [
        { label: 'About', href: '/about' },
        { label: 'Stack', href: '/stack' },
        { label: 'Projects', href: '/projects' },
        { label: 'Experience', href: '/about' },
        { label: 'Contact', href: '/contact' }
      ]
    : navItems;

  return (
    <header className={`${styles.topbar} ${homeNav ? styles.topbarHome : ''}`}>
      <Link className={`${styles.yearMark} ${styles.mono}`} href="/" aria-label="Amira Lina Benbouali home">
        <span className={styles.yearDot} aria-hidden="true" />
        <span className={styles.yearPill}>2026</span>
      </Link>
      <nav className={`${styles.nav} ${styles.mono}`} aria-label="Main navigation">
        {items.map((item) => (
          <Link key={`${item.label}-${item.href}`} href={item.href}>
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
