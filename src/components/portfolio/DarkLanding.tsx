'use client';

import { useEffect, useState } from 'react';
import { pathForView } from './data';
import { useDarkChrome } from './DarkChromeContext';
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
  const { setIsBig, wipeTo } = useDarkChrome();

  return (
    <main className={shell.shell}>
      <IntroScreen />

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

          <div className={`${styles.symbol} ${styles.star} ${styles.s1}`} aria-hidden="true" />
          <div className={`${styles.symbol} ${styles.star} ${styles.s2}`} aria-hidden="true" />
          <div className={`${styles.symbol} ${styles.orbitSymbol} ${styles.o1}`} aria-hidden="true" />
          <div className={`${styles.symbol} ${styles.orbitSymbol} ${styles.o2}`} aria-hidden="true" />

          <div className={styles.nameWrap} onMouseEnter={() => setIsBig(true)} onMouseLeave={() => setIsBig(false)}>
            <h1 className={styles.name}>
              AMIRA
              <span className={styles.nameOutline}>BENBOUALI</span>
            </h1>

            <div className={styles.nameFlower}>
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>

            <div className={styles.engineer}>
              software engineer
              <strong>full-stack · product · tooling</strong>
            </div>
          </div>
        </div>

        <nav className={styles.navStrip}>
          <button
            className={styles.navItem}
            onClick={() => wipeTo(pathForView('work'))}
            onMouseEnter={() => setIsBig(true)}
            onMouseLeave={() => setIsBig(false)}
            type="button"
          >
            <span className={styles.navNum}>01</span>
            <span className={styles.navLabel}>Work</span>
            <span className={styles.navArrow}>↗</span>
          </button>
          <button
            className={styles.navItem}
            onClick={() => wipeTo(pathForView('about'))}
            onMouseEnter={() => setIsBig(true)}
            onMouseLeave={() => setIsBig(false)}
            type="button"
          >
            <span className={styles.navNum}>02</span>
            <span className={styles.navLabel}>About</span>
            <span className={styles.navArrow}>↗</span>
          </button>
          <button
            className={styles.navItem}
            onClick={() => wipeTo(pathForView('contact'))}
            onMouseEnter={() => setIsBig(true)}
            onMouseLeave={() => setIsBig(false)}
            type="button"
          >
            <span className={styles.navNum}>03</span>
            <span className={styles.navLabel}>Contact</span>
            <span className={styles.navArrow}>↗</span>
          </button>
        </nav>

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
