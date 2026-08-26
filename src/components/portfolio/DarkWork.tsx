'use client';

import { useEffect, useRef, useState } from 'react';
import { ARROW_NE, pathForView, projects } from './data';
import { useDarkChrome } from './DarkChromeContext';
import styles from './DarkWork.module.css';

type PreviewInfo = {
  tagline: string;
  description: string;
  stack: string;
  tag: string;
};

type SmallProject = {
  index: string;
  status: string;
  title: string;
  description: string;
  tone: 'pink' | 'dark';
  flower?: boolean;
  visual?: 'capsules';
};

const smallProjects: SmallProject[] = [
  {
    index: '01 / experiment',
    status: '2026',
    title: 'Spotify Capsules',
    description: 'React · Spotify API · music memory experiment',
    tone: 'pink',
    visual: 'capsules'
  },
  {
    index: '02 / next',
    status: 'soon',
    title: 'In The Works',
    description: 'Another experiment, not started yet',
    tone: 'dark',
    flower: true
  },
  {
    index: '03 / idea',
    status: 'soon',
    title: 'Reserved',
    description: 'Space for the next small build',
    tone: 'dark'
  },
  {
    index: '04 / next',
    status: 'soon',
    title: 'Coming Soon',
    description: 'A product experiment, in progress',
    tone: 'pink',
    flower: true
  },
  {
    index: '05 / future',
    status: 'next',
    title: 'Future Build',
    description: 'Reserved for whatever comes next.',
    tone: 'dark'
  }
];

const previewInfo: Record<string, PreviewInfo> = {
  Atria: {
    tagline: 'calendar, without the friction.',
    description:
      'A modern calendar and task-management system focused on clarity, flexible scheduling and fast interaction.',
    stack: 'React · TypeScript · Zustand · Framer Motion',
    tag: 'calendar'
  },
  Foundry: {
    tagline: 'engineering work, made visible.',
    description:
      'A full-stack workspace for issue triage, domains, incidents and postmortems, built around the workflows engineering teams actually use.',
    stack: 'Next.js · Prisma · Postgres · Testing',
    tag: 'triage'
  },
  KansoDB: {
    tagline: 'from text, to execution.',
    description:
      'A lightweight SQL-style engine exploring tokenisation, parsing, AST construction and query execution from the inside out.',
    stack: 'TypeScript · Parser · AST · Execution',
    tag: 'query engine'
  },
  'Mini CI/CD': {
    tagline: 'commit, test, build, ship.',
    description:
      'A configuration-driven CI pipeline runner built in Ruby, running YAML-defined workflows with retries, timeouts and environment management.',
    stack: 'Ruby · Bash · Pipelines · Automation',
    tag: 'pipeline'
  }
};

function ProjectMock({ title }: { title: string }) {
  if (title === 'Atria') {
    return (
      <div className={styles.atriaUi}>
        <div className={styles.atriaSide} />
        <div className={styles.cal}>
          {Array.from({ length: 15 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (title === 'Foundry') {
    return (
      <div className={styles.foundryUi}>
        <div className={styles.col}>
          <div className={styles.issue} />
          <div className={styles.issue} />
          <div className={styles.issue} />
          <div className={styles.issue} />
        </div>
        <div className={`${styles.col} ${styles.pipe}`}>
          <div className={styles.node} />
          <div className={styles.node} />
          <div className={styles.node} />
          <div className={styles.node} />
        </div>
      </div>
    );
  }

  if (title === 'KansoDB') {
    return (
      <div className={styles.kansoUi}>
        <div className={styles.code}>
          <b>SELECT</b> name, role
          <br />
          <b>FROM</b> engineers
          <br />
          <b>WHERE</b> stack = &apos;typescript&apos;;
        </div>
        <div className={styles.ast}>
          <div>Query</div>
          <div>SelectClause</div>
          <div>FromClause</div>
          <div>WhereClause</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.ciUi}>
      <div className={styles.terminal}>
        $ mini-ci run
        <br />
        <br />
        <b>✓ setup</b>
        <br />
        <b>✓ test</b>
        <br />
        <b>✓ build</b>
        <br />
        <b>✓ release</b>
      </div>
      <div className={styles.stages}>
        <div className={styles.stage}>01 setup</div>
        <div className={styles.stage}>02 test</div>
        <div className={styles.stage}>03 build</div>
        <div className={styles.stage}>04 ship</div>
      </div>
    </div>
  );
}

export function DarkWork() {
  const { setIsBig, wipeTo } = useDarkChrome();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const goHome = () => wipeTo(pathForView('home'));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reveals = [...root.querySelectorAll('[data-reveal]')];
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealVisible);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  const toggleProject = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <div className={styles.page} ref={rootRef}>
      <div className={styles.grain} aria-hidden="true" />

      <header className={styles.top}>
        <div className={styles.brand}>
          AMIRA
          <br />
          BENBOUALI
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

      <section className={styles.featured}>
        <div className={`${styles.symbol} ${styles.star} ${styles.s1}`} aria-hidden="true" />
        <div className={`${styles.symbol} ${styles.star} ${styles.s2}`} aria-hidden="true" />
        <div className={`${styles.symbol} ${styles.orbitSymbol} ${styles.o1}`} aria-hidden="true" />

        <div data-reveal className={styles.reveal}>
          <div className={styles.kicker}>01 / selected work</div>
          <h1 className={styles.workTitle}>WORK</h1>
          <div className={styles.workSub}>selected projects · 01—04</div>
        </div>

        <div data-reveal className={`${styles.projectList} ${styles.reveal}`}>
          {projects.map((project, index) => {
            const info = previewInfo[project.title];
            const isActive = activeIndex === index;
            const openCaseStudy = () => {
              if (project.target) {
                wipeTo(pathForView(project.target));
              } else if (project.href) {
                window.open(project.href, '_blank', 'noopener,noreferrer');
              }
            };

            return (
              <article className={`${styles.project} ${isActive ? styles.active : ''}`} key={project.title}>
                <div
                  className={styles.projectHead}
                  onClick={() => toggleProject(index)}
                  onMouseEnter={() => setIsBig(true)}
                  onMouseLeave={() => setIsBig(false)}
                >
                  <div className={styles.num}>{project.index}</div>
                  <div className={styles.name}>{project.title}</div>
                  <div className={styles.meta}>
                    <b>{project.kind}</b>
                    {project.stack[0]}
                  </div>
                  <div className={styles.arrow}>{ARROW_NE}</div>
                </div>

                <div className={styles.projectBody}>
                  <div className={styles.projectContent}>
                    <div className={styles.projectCopy}>
                      <div className={styles.tagline}>{info.tagline}</div>
                      <p>{info.description}</p>
                      <div className={styles.stack}>{info.stack}</div>
                      <button
                        className={styles.case}
                        onClick={openCaseStudy}
                        onMouseEnter={() => setIsBig(true)}
                        onMouseLeave={() => setIsBig(false)}
                        type="button"
                      >
                        {project.target ? 'open case study' : 'view on github'} <span>{ARROW_NE}</span>
                      </button>
                    </div>

                    <div className={styles.visualStage}>
                      <div className={styles.visualTop}>
                        <span>{project.title}</span>
                        <span>{info.tag}</span>
                      </div>
                      <div className={styles.visualBody}>
                        <ProjectMock title={project.title} />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.more}>
        <div data-reveal className={`${styles.moreHead} ${styles.reveal}`}>
          <div>
            <div className={styles.kicker}>02 / experiments · prototypes · smaller builds</div>
            <h2 className={styles.moreTitle}>MORE WORK</h2>
          </div>
          <div className={styles.moreNote}>
            A growing archive for smaller projects and experiments that do not need a full case study.
          </div>
        </div>

        <div data-reveal className={`${styles.ribbon} ${styles.reveal}`}>
          {smallProjects.map((project) => (
            <article className={`${styles.card} ${styles[project.tone]}`} key={project.title}>
              <div className={styles.cardTop}>
                <span>{project.index}</span>
                <span>{project.status}</span>
              </div>

              <div className={styles.cardVisual}>
                {project.visual === 'capsules' ? (
                  <div className={styles.capsules}>
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                ) : null}
                {project.flower ? (
                  <div className={styles.miniFlower} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                ) : null}
              </div>

              <div className={styles.cardInfo}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

              <div className={styles.cardStrip}>
                <span>open project</span>
                <span>{ARROW_NE}</span>
              </div>
            </article>
          ))}

          <article className={`${styles.card} ${styles.addCard}`}>
            <div>
              <div className={styles.addCircle}>+</div>
              <b>Next Project</b>
              <span>the archive grows with the work</span>
            </div>
          </article>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>© 2026 AMIRA BENBOUALI</span>
        <span>work / selected + more</span>
      </footer>
    </div>
  );
}
