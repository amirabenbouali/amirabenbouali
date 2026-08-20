'use client';

import { pathForView } from './data';
import { useDarkChrome } from './DarkChromeContext';
import shell from './DarkShell.module.css';
import styles from './DarkAbout.module.css';

const stack = ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Git', 'Docker'];

function FlowerArt({ variant }: { variant: 'large' | 'small' }) {
  return (
    <div className={`${styles.flowerArt} ${variant === 'large' ? styles.flowerLarge : styles.flowerSmall}`}>
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}

export function DarkAbout() {
  const { setIsBig, wipeTo } = useDarkChrome();

  const goHome = () => wipeTo(pathForView('home'));

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
            about
            <br />
            software engineer
          </div>
          <button
            className={styles.back}
            onClick={goHome}
            onMouseEnter={() => setIsBig(true)}
            onMouseLeave={() => setIsBig(false)}
            type="button"
          >
            ← home
          </button>
        </header>

        <section className={styles.aboutWrap}>
          <div className={styles.heroSide}>
            <div className={styles.kicker}>profile / about</div>

            <h1 className={styles.aboutTitle}>
              ABOUT
              <span className={styles.outline}>ME</span>
            </h1>

            <div className={styles.statement}>
              <h2>
                Software, systems,
                <span>and everything in between.</span>
              </h2>

              <p>
                London, UK — software engineer
                <br />
                full-stack · product · tooling
              </p>
            </div>
          </div>

          <div className={styles.infoSide}>
            <div className={styles.pinkPanel}>
              <div className={styles.panelCopy}>
                <div>
                  <div className={styles.tiny}>Profile</div>
                  <h3>
                    Engineer first.
                    <br />
                    Product minded.
                  </h3>
                </div>

                <div className={styles.panelMeta}>
                  <span>London, UK</span>
                  <span>Full-stack</span>
                </div>
              </div>

              <div className={styles.profileGrid}>
                <div
                  className={styles.profileRow}
                  onMouseEnter={() => setIsBig(true)}
                  onMouseLeave={() => setIsBig(false)}
                >
                  <b>Focus</b>
                  <span>Product engineering · systems · tooling</span>
                </div>
                <div
                  className={styles.profileRow}
                  onMouseEnter={() => setIsBig(true)}
                  onMouseLeave={() => setIsBig(false)}
                >
                  <b>Education</b>
                  <span>BSc Computer Science, City, University of London</span>
                </div>
                <div
                  className={styles.profileRow}
                  onMouseEnter={() => setIsBig(true)}
                  onMouseLeave={() => setIsBig(false)}
                >
                  <b>Outside code</b>
                  <span>Product design · astronomy · running · coffee · travel</span>
                </div>
              </div>
            </div>

            <div className={styles.lower}>
              <div className={styles.module}>
                <div className={styles.moduleHead}>
                  <span>01 / stack</span>
                  <span>tools I use</span>
                </div>
                <div className={styles.stackWrap}>
                  {stack.map((item) => (
                    <span
                      className={styles.tag}
                      key={item}
                      onMouseEnter={() => setIsBig(true)}
                      onMouseLeave={() => setIsBig(false)}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.flowerModule}>
                <div className={styles.flowerLabel}>always learning</div>
                <FlowerArt variant="large" />
                <FlowerArt variant="small" />
              </div>
            </div>
          </div>
        </section>

        <div className={shell.footerNote}>
          © 2026 AMIRA BENBOUALI
          <br />
          ALL RIGHTS RESERVED
        </div>
        <div className={shell.pageNo}>02 / 03</div>
      </div>
    </main>
  );
}
