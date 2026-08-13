import { contactLinks } from '@/data/portfolio';
import { Flower } from './Flower';
import styles from './Portfolio.module.css';

export function FooterSection() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.contact}>want to build<br /><em>something good?</em></div>
      <div className={`${styles.links} ${styles.mono}`}>
        {contactLinks.map((link) => (
          <a href={link.href} key={link.label}>
            {link.label}
          </a>
        ))}
      </div>
      <Flower size="small" />
    </footer>
  );
}
