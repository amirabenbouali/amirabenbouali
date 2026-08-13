import { navItems } from '@/data/portfolio';
import styles from './Portfolio.module.css';

export function SiteHeader() {
  return (
    <header className={styles.topbar}>
      <a className={styles.brand} href="#top" aria-label="Amira Lina Benbouali home">
        AMIRA LINA BENBOUALI
        <span aria-hidden="true" />
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
