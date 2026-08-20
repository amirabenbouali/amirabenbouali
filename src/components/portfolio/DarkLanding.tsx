'use client';

import { useEffect, useState } from 'react';
import { pathForView } from './data';
import { useDarkCursor, useWipeNavigate } from './darkHooks';
import shell from './DarkShell.module.css';
import styles from './DarkLanding.module.css';

function IntroScreen() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setHide(true), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className={`${styles.introScreen} ${hide ? styles.introHide : ''}`} aria-hidden="true">
      <div className={styles.introMark}>
        <div className={styles.flower}>
          <div className={styles.petal} />
          <div className={styles.petal} />
          <div className={styles.petal} />
          <div className={styles.petal} />
          <div className={styles.petal} />
          <div className={styles.petal} />
        </div>
        <div className={styles.alb}>ALB</div>
      </div>
      <div className={styles.introCaption}>Amira Lina Benbouali · portfolio</div>
    </section>
  );
}

export function DarkLanding() {
  const { isBig, setIsBig, cursor, hasMoved } = useDarkCursor();
  const { isWiping, wipeTo } = useWipeNavigate();

  return (
    <main className={shell.shell}>
      <IntroScreen />

      {hasMoved ? (
        <div
          className={`${shell.cursor} ${isBig ? shell.cursorBig : ''}`}
          style={{ left: cursor.x, top: cursor.y }}
        />
      ) : null}

      <div className={`${shell.wipe} ${isWiping ? shell.wipeGo : ''}`} aria-hidden="true" />

      <div className={shell.grain} aria-hidden="true" />

      <div className={shell.content}>
        <header className={shell.top}>
          <div className={shell.brand}>
            AMIRA
            <br />
            BENBOUALI
          </div>
          <div className={shell.role}>
            software engineer
            <br />
            London, UK
          </div>
          <button
            className={shell.menu}
            onMouseEnter={() => setIsBig(true)}
            onMouseLeave={() => setIsBig(false)}
            type="button"
          >
            menu
            <span className={shell.menuLines}>
              <span />
              <span />
            </span>
          </button>
        </header>

        <div className={styles.hero}>
          <div className={styles.kicker}>software engineer / selected work</div>

          <h1 className={styles.name}>
            AMIRA
            <span className={styles.nameOutline}>BENBOUALI</span>
          </h1>

          <div
            className={styles.flowerBadge}
            onMouseEnter={() => setIsBig(true)}
            onMouseLeave={() => setIsBig(false)}
          >
            <div className={styles.miniFlower}>
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>

          <div className={styles.pinkBlock}>
            <div className={styles.introCopy}>
              <div>
                <h2>
                  Software engineer
                  <span>building across product, systems &amp; tooling.</span>
                </h2>
              </div>

              <p className={styles.desc}>
                I build full-stack applications, developer tools and interfaces — from architecture and data
                models to the parts people actually use.
              </p>

              <div className={styles.homeMeta}>
                <span>London, UK</span>
                <span>Open to software roles</span>
                <span>React · TypeScript · Next.js</span>
              </div>
            </div>

            <nav className={styles.homeNav}>
              <button
                className={styles.navBtn}
                onClick={() => wipeTo(pathForView('work'))}
                onMouseEnter={() => setIsBig(true)}
                onMouseLeave={() => setIsBig(false)}
                type="button"
              >
                <span className={styles.n}>01</span>
                <span className={styles.l}>Work</span>
                <span className={styles.a}>→</span>
              </button>
              <button
                className={styles.navBtn}
                onClick={() => wipeTo(pathForView('about'))}
                onMouseEnter={() => setIsBig(true)}
                onMouseLeave={() => setIsBig(false)}
                type="button"
              >
                <span className={styles.n}>02</span>
                <span className={styles.l}>About</span>
                <span className={styles.a}>→</span>
              </button>
              <button
                className={styles.navBtn}
                onClick={() => wipeTo(pathForView('contact'))}
                onMouseEnter={() => setIsBig(true)}
                onMouseLeave={() => setIsBig(false)}
                type="button"
              >
                <span className={styles.n}>03</span>
                <span className={styles.l}>Contact</span>
                <span className={styles.a}>→</span>
              </button>
            </nav>
          </div>
        </div>

        <div className={shell.footerNote}>
          © 2026 AMIRA BENBOUALI
          <br />
          ALL RIGHTS RESERVED
        </div>
        <div className={shell.pageNo}>01 / 03</div>
      </div>
    </main>
  );
}
