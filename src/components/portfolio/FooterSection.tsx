import { contactLinks } from '@/data/portfolio';
import styles from './Portfolio.module.css';

export function FooterSection() {
  return (
    <footer className={styles.contactSection} id="contact">
      <div className={`${styles.contactKicker} ${styles.mono}`}>[ one last thing ]</div>
      <h2 className={styles.contactBig}>
        let&apos;s build
        <br />
        <span>something good.</span>
      </h2>
      <div className={styles.contactBottom}>
        <p className={`${styles.contactText} ${styles.mono}`}>
          Have an interesting engineering problem, product idea, or just want to say hello? My inbox is open.
        </p>
        <div className={`${styles.socials} ${styles.mono}`}>
          {contactLinks.map((link) => (
            <a className={styles.social} href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className={styles.contactOrbit} aria-hidden="true" />
    </footer>
  );
}
