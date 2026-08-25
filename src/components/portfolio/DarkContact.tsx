'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import { pathForView } from './data';
import { useDarkChrome } from './DarkChromeContext';
import shell from './DarkShell.module.css';
import styles from './DarkContact.module.css';

type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

const sendLabel: Record<SendStatus, string> = {
  idle: 'Send message',
  sending: 'Sending…',
  sent: 'Sent',
  error: 'Retry'
};

function Petals() {
  return (
    <>
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
    </>
  );
}

export function DarkContact() {
  const { setIsBig, wipeTo } = useDarkChrome();
  const [status, setStatus] = useState<SendStatus>('idle');

  const goHome = () => wipeTo(pathForView('home'));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') ?? '').trim(),
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

        <section className={styles.wrap}>
          <div className={styles.left}>
            <div className={styles.kicker}>03 / get in touch</div>

            <h1 className={styles.title}>
              SAY
              <span>HELLO.</span>
            </h1>

            <div className={styles.copy}>
              <p>Let&apos;s talk about something worth building.</p>
              <small>Email or LinkedIn is the fastest way to reach me.</small>
            </div>

            <div className={styles.status}>open to software engineering roles</div>
          </div>

          <div className={styles.right}>
            <form className={styles.miniForm} onSubmit={handleSubmit}>
              <div className={styles.formTop}>
                <span>send a note</span>
                <span>03 / message</span>
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-name">Name</label>
                <input id="contact-name" name="name" placeholder="Your name" required type="text" />
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-email">Email</label>
                <input id="contact-email" name="email" placeholder="you@email.com" required type="email" />
              </div>

              <div className={`${styles.field} ${styles.messageField}`}>
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me a little about what you have in mind"
                  required
                />
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
                <span>{sendLabel[status]}</span>
                <span>↗</span>
              </button>
            </form>

            <div className={styles.direct}>
              <a
                href="mailto:amiralinabenbouali@gmail.com"
                onMouseEnter={() => setIsBig(true)}
                onMouseLeave={() => setIsBig(false)}
              >
                Email ↗
              </a>
              <a
                href="https://www.linkedin.com/in/amirabenbouali"
                onMouseEnter={() => setIsBig(true)}
                onMouseLeave={() => setIsBig(false)}
                rel="noreferrer"
                target="_blank"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div className={styles.flower} aria-hidden="true">
            <Petals />
          </div>
        </section>

        <div className={shell.footerNote}>AMIRA BENBOUALI · SOFTWARE ENGINEER</div>
        <div className={shell.pageNo}>03 / 03</div>
      </div>
    </main>
  );
}
