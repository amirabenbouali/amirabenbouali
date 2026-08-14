import { navItems } from '@/data/portfolio';
import styles from './Portfolio.module.css';

export function SiteHeader() {
  return (
    <header className={styles.topbar}>
      <a className={`${styles.yearMark} ${styles.mono}`} href="#top" aria-label="Amira Lina Benbouali home">
        <span className={styles.yearDot} aria-hidden="true" />
        <span className={styles.yearPill}>2026</span>
      </a>
      <nav className={`${styles.nav} ${styles.mono}`} aria-label="Main navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label.toUpperCase()}
          </a>
        ))}
      </nav>
      <a className={`${styles.smallLink} ${styles.mono}`} href="#contact">
        CV / LINKS ↗
      </a>
    </header>
  );
}
