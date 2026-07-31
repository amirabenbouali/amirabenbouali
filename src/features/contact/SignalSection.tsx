import { profile } from '../../data/profile';
import styles from './SignalSection.module.css';

const links = [
  { label: 'GitHub', href: 'https://github.com/amirabenbouali' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/amirabenbouali' },
  { label: 'Email', href: `mailto:${profile.contact.email}` }
];

export function SignalSection() {
  return (
    <section className={styles.signal} id="signal" aria-labelledby="signal-title">
      <h2 id="signal-title">
        Send a <em>signal.</em>
      </h2>
      <a className={styles.email} href={`mailto:${profile.contact.email}`}>
        {profile.contact.email}
      </a>
      <nav className={styles.links} aria-label="Signal links">
        {links.map((link) => (
          <a href={link.href} key={link.label}>
            {link.label}
          </a>
        ))}
      </nav>
    </section>
  );
}
