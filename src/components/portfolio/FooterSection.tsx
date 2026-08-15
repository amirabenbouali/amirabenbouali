'use client';

import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';
import { contactLinks } from '@/data/portfolio';
import styles from './Portfolio.module.css';

export function FooterSection() {
  const [isSent, setIsSent] = useState(false);

  const linkMap = useMemo(() => new Map(contactLinks.map((link) => [link.label.replace(' ↗', ''), link.href])), []);

  const contactChannels = [
    { label: '01 / CODE', title: 'GitHub ↗', href: linkMap.get('GitHub') ?? 'https://github.com/amirabenbouali' },
    { label: '02 / PROFILE', title: 'LinkedIn ↗', href: linkMap.get('LinkedIn') ?? 'https://www.linkedin.com/' },
    { label: '03 / DOCUMENT', title: 'CV ↗', href: linkMap.get('CV') ?? '/' }
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSent(true);
  };

  return (
    <footer className={styles.contactSection} id="contact">
      <section className={styles.contactChapter} aria-labelledby="contact-title">
        <div className={styles.contactChapterInner}>
          <div>
            <div className={`${styles.contactLabel} ${styles.mono}`}>04 / FINAL TRANSMISSION</div>
            <h2 id="contact-title">
              Say
              <br />
              <em>hello.</em>
            </h2>
          </div>
          <p className={`${styles.contactChapterNote} ${styles.mono}`}>
            NO STANDARD &ldquo;LET&apos;S CONNECT&rdquo; FOOTER.
            <br />
            THE LAST SECTION FEELS LIKE SENDING A MESSAGE OUT OF THE ARCHIVE.
          </p>
        </div>
      </section>

      <div className={styles.contactWrap}>
        <section className={styles.contactPanel} aria-label="Contact Amira">
          <div className={styles.contactLeft}>
            <div className={`${styles.contactLabel} ${styles.mono}`}>OPEN CHANNEL / LONDON, UK</div>
            <h3>
              Have something
              <br />
              interesting in mind?
            </h3>
            <p className={`${styles.contactLeftCopy} ${styles.mono}`}>
              I&apos;m interested in software engineering roles, product-focused engineering,
              developer tooling and thoughtful systems work.
              <br />
              <br />
              If the project is ambitious, slightly strange, technically interesting — even
              better.
            </p>

            <div className={styles.contactSignal} aria-hidden="true">
              <div className={styles.contactRings} />
              <div className={`${styles.contactArc} ${styles.contactArcA}`} />
              <div className={`${styles.contactArc} ${styles.contactArcB}`} />
              <div className={`${styles.contactArc} ${styles.contactArcC}`} />
              <div className={styles.contactSignalDot} />
            </div>

            <div className={`${styles.contactCoordinates} ${styles.mono}`}>
              SIGNAL ORIGIN: LONDON / UK
              <br />
              CHANNEL STATUS: OPEN
              <br />
              RESPONSE MODE: HUMAN
            </div>
          </div>

          <div className={styles.contactRight}>
            <form className={styles.contactTerminal} onSubmit={handleSubmit}>
              <div className={`${styles.contactTerminalHead} ${styles.mono}`}>
                <div className={styles.contactTerminalDots} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <span>MESSAGE.TXT</span>
                <span>READY</span>
              </div>

              <div className={styles.contactTerminalBody}>
                <div className={`${styles.contactPrompt} ${styles.mono}`}>
                  <strong>amira@portfolio</strong>:~$ compose message
                  <br />
                  <span>Fill the fields below. Nothing overly formal required.</span>
                </div>

                <div className={styles.contactField}>
                  <label htmlFor="contact-name">YOUR NAME</label>
                  <input id="contact-name" name="name" type="text" placeholder="name" autoComplete="name" />
                </div>

                <div className={styles.contactField}>
                  <label htmlFor="contact-email">YOUR EMAIL</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="email@domain.com"
                    autoComplete="email"
                  />
                </div>

                <div className={styles.contactField}>
                  <label htmlFor="contact-message">MESSAGE</label>
                  <textarea id="contact-message" name="message" placeholder="What are we building?" />
                </div>

                <button className={`${styles.contactSend} ${styles.mono}`} type="submit">
                  <span>{isSent ? 'TRANSMISSION SENT' : 'SEND TRANSMISSION'}</span>
                  <span aria-hidden="true">↗</span>
                </button>
                <p className={`${styles.contactSent} ${styles.mono}`} data-visible={isSent}>
                  TRANSMISSION QUEUED — PREVIEW MODE ONLY.
                </p>
              </div>

              <div className={`${styles.contactPaper} ${styles.mono}`} aria-hidden="true">
                <strong>OTHER CHANNELS</strong>
                <br />
                <br />
                github / linkedin
                <br />
                email / cv
                <br />
                <br />
                available from the index below.
              </div>
            </form>

            <nav className={styles.contactLinks} aria-label="Contact links">
              {contactChannels.map((link) =>
                link.href.startsWith('/') ? (
                  <Link className={`${styles.contactLink} ${styles.mono}`} href={link.href} key={link.label}>
                    <span>{link.label}</span>
                    <strong>{link.title}</strong>
                  </Link>
                ) : (
                  <a className={`${styles.contactLink} ${styles.mono}`} href={link.href} key={link.label}>
                    <span>{link.label}</span>
                    <strong>{link.title}</strong>
                  </a>
                )
              )}
            </nav>
          </div>
        </section>

        <div className={styles.contactFinal}>
          <div className={styles.contactFinalName}>
            Amira Lina
            <br />
            <em>Benbouali.</em>
          </div>

          <div className={`${styles.contactFinalMeta} ${styles.mono}`}>
            SOFTWARE ENGINEER
            <br />
            INDEPENDENT BUILDER
            <br />
            <br />
            PORTFOLIO / 2026
            <br />
            END OF FILE ✳
          </div>
        </div>
      </div>
    </footer>
  );
}
