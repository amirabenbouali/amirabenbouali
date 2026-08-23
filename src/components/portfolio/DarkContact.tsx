'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import { pathForView } from './data';
import { useDarkChrome } from './DarkChromeContext';
import shell from './DarkShell.module.css';
import styles from './DarkContact.module.css';

type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

const sendLabel: Record<SendStatus, string> = {
  idle: 'Send',
  sending: 'Sending…',
  sent: 'Sent',
  error: 'Retry'
};

export function DarkContact() {
  const { setIsBig, wipeTo } = useDarkChrome();
  const [status, setStatus] = useState<SendStatus>('idle');

  const goHome = () => wipeTo(pathForView('home'));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get('firstName') ?? '').trim();
    const lastName = String(formData.get('lastName') ?? '').trim();
    const payload = {
      name: [firstName, lastName].filter(Boolean).join(' '),
      email: formData.get('email'),
      message: formData.get('message')
    };

    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Request failed');

      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className={shell.shell}>
      <div className={shell.grain} aria-hidden="true" />

      <div className={shell.content}>
        <header className={shell.top}>
          <div className={shell.brand}>
            AMIRA
            <br />
            BENBOUALI
          </div>
          <div className={shell.role}>
            contact
            <br />
            London, UK
          </div>
          <button
            className={styles.backHome}
            onClick={goHome}
            onMouseEnter={() => setIsBig(true)}
            onMouseLeave={() => setIsBig(false)}
            type="button"
          >
            ← home
          </button>
        </header>

        <div className={styles.contactWrap}>
          <h1 className={styles.contactTitle}>
            CONTACT
            <span>ME</span>
          </h1>

          <div className={styles.contactPanel}>
            <div className={styles.flower} aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>

            <div className={styles.contactCopy}>
              <div>
                <div className={styles.tiny}>Get in touch</div>
                <h2>
                  Let&apos;s talk
                  <span>about something worth building.</span>
                </h2>

                <div className={styles.links}>
                  <a
                    className={styles.contactLink}
                    href="mailto:amiralinabenbouali@gmail.com"
                    onMouseEnter={() => setIsBig(true)}
                    onMouseLeave={() => setIsBig(false)}
                  >
                    <div className={styles.linkCopy}>
                      <b>Email</b>
                      <span>send me a message</span>
                    </div>
                    <div className={styles.linkArrow}>↗</div>
                  </a>

                  <a
                    className={styles.contactLink}
                    href="https://www.linkedin.com/in/amirabenbouali"
                    onMouseEnter={() => setIsBig(true)}
                    onMouseLeave={() => setIsBig(false)}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div className={styles.linkCopy}>
                      <b>LinkedIn</b>
                      <span>connect professionally</span>
                    </div>
                    <div className={styles.linkArrow}>↗</div>
                  </a>
                </div>
              </div>

              <div className={styles.meta}>
                <span>London, UK</span>
                <span>Open to software roles</span>
              </div>
            </div>

            <div className={styles.formWrap}>
              <div className={styles.formHead}>
                <span>or send a note</span>
                <span>03 / 03</span>
              </div>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                  <label htmlFor="contact-first-name">First name</label>
                  <input id="contact-first-name" name="firstName" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-last-name">Last name</label>
                  <input id="contact-last-name" name="lastName" />
                </div>
                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label htmlFor="contact-email">Email</label>
                  <input id="contact-email" name="email" required type="email" />
                </div>
                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" name="message" required />
                </div>

                {status === 'error' ? (
                  <p className={styles.formError}>Something went wrong — email me directly instead.</p>
                ) : null}

                <button
                  className={styles.send}
                  disabled={status === 'sending'}
                  onMouseEnter={() => setIsBig(true)}
                  onMouseLeave={() => setIsBig(false)}
                  type="submit"
                >
                  {sendLabel[status]} <span>→</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className={shell.footerNote}>AMIRA BENBOUALI · SOFTWARE ENGINEER</div>
        <div className={shell.pageNo}>03 / 03</div>
      </div>
    </main>
  );
}
