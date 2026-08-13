import { contactLinks } from '@/data/portfolio';
import { Flower } from './Flower';
import styles from './Portfolio.module.css';

export function FooterSection() {
  return (
    <footer className={styles.footer} id="contact">
      <div>
        <p className={`${styles.footerKicker} ${styles.mono}`}>[ contact ]</p>
        <div className={styles.contact}>want to build<br /><em>something good?</em></div>
        <p className={styles.footerCopy}>
          I am open to thoughtful engineering roles, product-minded teams and collaborations where the interface and the
          system underneath both matter.
        </p>
      </div>
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
