'use client';

import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { DesktopAboutPreview } from './DesktopAbout';
import { DesktopNotesPreview } from './DesktopNotesPreview';
import { DesktopWorkArchive } from './DesktopWorkArchive';
import type { NoteSummary } from '@/lib/notes';
import styles from './DesktopPortfolio.module.css';

type WindowName = 'about' | 'work' | 'blog' | 'contact';
type LockState = 'idle' | 'typing' | 'opening' | 'unlocked';

const ACCESS_CODE_LENGTH = 8;

const folders: Array<{ id: WindowName; label: string; tone: string }> = [
  { id: 'about', label: 'about me', tone: 'coral' },
  { id: 'work', label: 'work', tone: 'charcoal' },
  { id: 'blog', label: 'blog', tone: 'lilac' },
  { id: 'contact', label: 'contact', tone: 'silver' }
];

export function DesktopPortfolio({ notes, notesPreview = false }: { notes: NoteSummary[]; notesPreview?: boolean }) {
  const [lockState, setLockState] = useState<LockState>('idle');
  const [lockReady, setLockReady] = useState(false);
  const [passwordLength, setPasswordLength] = useState(0);
  const [clock, setClock] = useState({ time: '20:26', date: 'Portfolio access' });
  const [activeWindow, setActiveWindow] = useState<WindowName | null>(null);
  const [windowOrigin, setWindowOrigin] = useState('50% 50%');
  const [isClosing, setIsClosing] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (window.sessionStorage.getItem('amira-portfolio-unlocked') === 'true') {
        setLockState('unlocked');
      }
      setLockReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClock({
        time: new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).format(now),
        date: new Intl.DateTimeFormat('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long'
        }).format(now)
      });
    };

    updateClock();
    const timer = setInterval(updateClock, 60_000);
    return () => clearInterval(timer);
  }, []);

  const unlockPortfolio = () => {
    if (lockState !== 'idle') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.sessionStorage.setItem('amira-portfolio-unlocked', 'true');
      setLockState('unlocked');
      return;
    }

    setLockState('typing');
    let nextLength = 0;
    typingTimerRef.current = setInterval(() => {
      nextLength += 1;
      setPasswordLength(nextLength);

      if (nextLength === ACCESS_CODE_LENGTH && typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
        unlockTimerRef.current = setTimeout(() => {
          setLockState('opening');
          unlockTimerRef.current = setTimeout(() => {
            window.sessionStorage.setItem('amira-portfolio-unlocked', 'true');
            setLockState('unlocked');
            unlockTimerRef.current = null;
          }, 760);
        }, 260);
      }
    }, 105);
  };

  const openWindow = (name: WindowName, opener: HTMLButtonElement) => {
    const bounds = opener.getBoundingClientRect();
    const originX = ((bounds.left + bounds.width / 2) / window.innerWidth) * 100;
    const originY = ((bounds.top + bounds.height / 2) / window.innerHeight) * 100;

    openerRef.current = opener;
    setWindowOrigin(`${originX}% ${originY}%`);
    setIsClosing(false);
    setActiveWindow(name);
  };

  const closeWindow = useCallback(() => {
    if (!activeWindow || isClosing) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActiveWindow(null);
      requestAnimationFrame(() => openerRef.current?.focus());
      return;
    }

    setIsClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setActiveWindow(null);
      setIsClosing(false);
      closeTimerRef.current = null;
      requestAnimationFrame(() => openerRef.current?.focus());
    }, 340);
  }, [activeWindow, isClosing]);

  useEffect(() => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
  }, []);

  useEffect(() => {
    if (!activeWindow) return;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeWindow();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeWindow, closeWindow]);

  return (
    <main className={styles.desktop}>
      <div className={styles.noise} aria-hidden="true" />
      <div
        aria-hidden={lockState !== 'unlocked'}
        className={`${styles.desktopSurface} ${lockState === 'opening' ? styles.desktopPreparing : ''} ${lockState === 'unlocked' ? styles.desktopRevealed : ''}`}
        inert={lockState !== 'unlocked'}
      >
        <header className={styles.topline}>
          <span>Amira Benbouali</span>
          <span>Portfolio / 2026</span>
        </header>

        <section className={styles.hero} aria-labelledby="portfolio-title">
          <h1 id="portfolio-title" className={styles.word} aria-label="Portfolio">
            <span className={styles.script}>P</span>
            <span className={styles.serif}>or</span>
            <span className={styles.sans}>t</span>
            <span className={styles.loop}>f</span>
            <span className={styles.pixel}>o</span>
            <span className={styles.italic}>li</span>
            <span className={styles.finalO}>o</span>
            <span className={styles.star} aria-hidden="true">✦</span>
          </h1>
          <div className={styles.identity}>
            <span>Amira Lina Benbouali</span>
            <span>Software engineer</span>
          </div>
        </section>

        <nav className={styles.folderField} aria-label="Desktop folders">
          {folders.map((folder) => (
            <button
              className={`${styles.folder} ${styles[folder.id]} ${styles[folder.tone]}`}
              key={folder.id}
              onClick={(event) => openWindow(folder.id, event.currentTarget)}
              type="button"
            >
              <span className={styles.folderIcon} aria-hidden="true"><i /></span>
              <span className={styles.folderLabel}>{folder.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {lockReady && lockState !== 'unlocked' ? (
        <section
          aria-label="Portfolio lock screen"
          className={`${styles.lockScreen} ${lockState === 'opening' ? styles.lockOpening : ''}`}
        >
          <div className={styles.lockClock} aria-label={`${clock.time}, ${clock.date}`}>
            <time>{clock.time}</time>
            <span>{clock.date}</span>
          </div>

          <div className={styles.lockAccess}>
            <span className={styles.lockAvatar} aria-hidden="true">AB</span>
            <h1>Amira Lina Benbouali</h1>
            <p>Software engineer · London</p>
            <button
              aria-live="polite"
              className={`${styles.accessButton} ${lockState !== 'idle' ? styles.accessButtonActive : ''}`}
              disabled={lockState !== 'idle'}
              onClick={unlockPortfolio}
              type="button"
            >
              {lockState === 'idle' ? (
                <><span>Access portfolio</span><b aria-hidden="true">→</b></>
              ) : (
                <span className={styles.passwordDots} aria-label="Entering portfolio access code">
                  {Array.from({ length: ACCESS_CODE_LENGTH }, (_, index) => (
                    <i className={index < passwordLength ? styles.passwordDotFilled : ''} key={index} />
                  ))}
                </span>
              )}
            </button>
            <small>{lockState === 'opening' ? 'Access granted' : 'Press to enter'}</small>
          </div>

          <div className={styles.lockFooter} aria-hidden="true">
            <span>Portfolio / 2026</span>
            <span>London, UK</span>
          </div>
        </section>
      ) : null}

      {activeWindow ? (
        <div className={`${styles.backdrop} ${isClosing ? styles.backdropClosing : ''}`} onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeWindow();
        }}>
          <section
            aria-labelledby="desktop-window-title"
            aria-modal="true"
            className={`${styles.window} ${styles[`window${activeWindow}`]} ${isClosing ? styles.windowClosing : ''}`}
            role="dialog"
            style={{ '--window-origin': windowOrigin } as CSSProperties}
          >
            <div className={styles.windowBar}>
              <span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span>
              <span className={styles.windowName}>{folders.find((folder) => folder.id === activeWindow)?.label}</span>
              <button className={styles.close} onClick={closeWindow} ref={closeRef} type="button" aria-label="Close window">×</button>
            </div>
            <div className={styles.windowBody}>
              <WindowContent activeWindow={activeWindow} notes={notes} notesPreview={notesPreview} />
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}

function WindowContent({ activeWindow, notes, notesPreview }: { activeWindow: WindowName; notes: NoteSummary[]; notesPreview: boolean }) {
  if (activeWindow === 'about') {
    return <DesktopAboutPreview />;
  }

  if (activeWindow === 'work') {
    return <DesktopWorkArchive />;
  }

  if (activeWindow === 'blog') {
    return <DesktopNotesPreview notes={notes} preview={notesPreview} />;
  }

  return (
    <>
      <p className={styles.eyebrow}>Say hello</p>
      <h2 id="desktop-window-title">Let&apos;s connect.</h2>
      <p className={styles.lead}>Have a role, a project or an interesting problem in mind? My inbox is open.</p>
      <div className={styles.contactList}>
        <a href="mailto:amiralinabenbouali@gmail.com"><span>Email</span><strong>Send a message</strong><b>↗</b></a>
        <a href="https://www.linkedin.com/in/amirabenbouali/" rel="noreferrer" target="_blank"><span>LinkedIn</span><strong>Connect with me</strong><b>↗</b></a>
        <a href="https://github.com/amirabenbouali" rel="noreferrer" target="_blank"><span>GitHub</span><strong>Explore the code</strong><b>↗</b></a>
      </div>
    </>
  );
}
