import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { profile } from '../../data/profile';
import styles from './SiteHeader.module.css';

type NavItem = { label: string; href: string; to?: never } | { label: string; to: string; href?: never };

const navItems: NavItem[] = [
  { label: 'Work', href: '/#work' },
  { label: 'Writing', to: '/writing' },
  { label: 'About', to: '/about' },
  { label: 'Contact', href: '/#signal' }
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header} aria-label="Site header">
      <Link className={styles.identity} to="/">
        {profile.name}
      </Link>
      <button
        className={styles.menuButton}
        type="button"
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsOpen((value) => !value)}
      >
        {isOpen ? <X aria-hidden="true" size={18} strokeWidth={1.5} /> : <Menu aria-hidden="true" size={18} strokeWidth={1.5} />}
      </button>
      <nav id="primary-navigation" className={isOpen ? styles.navOpen : styles.nav} aria-label="Primary navigation">
        {navItems.map((item) => {
          if (item.to !== undefined) {
            return (
              <NavLink key={item.label} to={item.to} className={styles.navLink} onClick={() => setIsOpen(false)}>
                {item.label}
              </NavLink>
            );
          }

          return (
            <a key={item.label} href={item.href} className={styles.navLink} onClick={() => setIsOpen(false)}>
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
