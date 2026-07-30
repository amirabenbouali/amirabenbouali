import { Link, NavLink } from 'react-router-dom';
import { Moon } from 'lucide-react';
import { profile } from '../../data/profile';
import styles from './SiteHeader.module.css';

type NavItem = { label: string; href: string; to?: never } | { label: string; to: string; href?: never };

const navItems: NavItem[] = [
  { label: 'Work', href: '#work-introduction' },
  { label: 'Writing', to: '/writing' },
  { label: 'About', to: '/about' }
];

export function SiteHeader() {
  return (
    <header className={styles.header} aria-label="Site header">
      <Link className={styles.identity} to="/">
        <Moon aria-hidden="true" size={16} strokeWidth={1.5} />
        <span>{profile.identityLabel}</span>
      </Link>
      <nav className={styles.nav} aria-label="Primary navigation">
        {navItems.map((item) => {
          if (item.to !== undefined) {
            return (
              <NavLink key={item.label} to={item.to} className={styles.navLink}>
                {item.label}
              </NavLink>
            );
          }

          return (
            <a key={item.label} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
