'use client';

import { useEffect, useRef } from 'react';
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
      <div className={styles.cal}>
        {Array.from({ length: 20 }).map((_, index) => (
          <i key={index} />
        ))}
      </div>
    );
  }

  if (title === 'Foundry') {
    return (
      <div className={styles.nodes}>
        <i />
        <i />
        <i />
        <i />
      </div>
    );
  }

  if (title === 'KansoDB') {
    return (
      <div className={styles.code}>
        <b>SELECT</b> name, role
        <br />
        <b>FROM</b> engineers
        <br />
        <b>WHERE</b> stack = &apos;typescript&apos;;
        <div className={styles.tokens}>
          <span>SELECT</span>
          <span>IDENTIFIER</span>
          <span>WHERE</span>
          <span>STRING</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pipeline}>
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}

export function DarkWork() {
  const { setIsBig, wipeTo } = useDarkChrome();
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
      { threshold: 0.12 }
    );
    reveals.forEach((el) => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

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

      <section className={styles.cover}>
        <div data-reveal className={styles.reveal}>
          <div className={styles.kicker}>01 / work</div>
          <h1 className={styles.coverTitle}>WORK</h1>
          <div className={styles.statement}>
            <span>FOUR PROJECTS.</span>
            <span>FOUR DIFFERENT</span>
            <span>SYSTEMS.</span>
          </div>
          <div className={styles.note}>Product work, systems work, and the engineering in between.</div>
          <a
            className={styles.enter}
            href="#projects"
            onMouseEnter={() => setIsBig(true)}
            onMouseLeave={() => setIsBig(false)}
          >
            enter projects ↓
          </a>
        </div>

        <div data-reveal className={`${styles.coverIndex} ${styles.reveal}`}>
          {projects.map((project) => {
            const info = previewInfo[project.title];
            return (
              <div
                className={styles.indexRow}
                key={project.title}
                onMouseEnter={() => setIsBig(true)}
                onMouseLeave={() => setIsBig(false)}
              >
                <small>{project.index}</small>
                <b>{project.title}</b>
                <em>
                  {project.kind.toLowerCase()} / {info.tag}
                </em>
              </div>
            );
          })}
        </div>
      </section>

      <main className={styles.projects} id="projects">
        <div data-reveal className={`${styles.projectsIntro} ${styles.reveal}`}>
          <div>
            <div className={styles.kicker}>02 / selected projects</div>
            <h2 className={styles.projectsHeading}>
              SELECTED
              <br />
              WORK
            </h2>
          </div>
          <p>
            Four projects, each exploring a different layer of software, from interaction to infrastructure.
          </p>
        </div>

        {projects.map((project, index) => {
          const info = previewInfo[project.title];
          const openCaseStudy = () => {
            if (project.target) {
              wipeTo(pathForView(project.target));
            } else if (project.href) {
              window.open(project.href, '_blank', 'noopener,noreferrer');
            }
          };

          return (
            <article
              className={`${styles.spread} ${index % 2 === 1 ? styles.reverse : ''} ${styles.reveal}`}
              data-reveal
              key={project.title}
            >
              <div className={styles.copy}>
                <div className={styles.number}>
                  0{index + 1} / 0{projects.length}
                </div>
                <h3 className={styles.title}>
                  {project.title === 'Mini CI/CD' ? (
                    <>
                      MINI
                      <br />
                      CI/CD
                    </>
                  ) : (
                    project.title.toUpperCase()
                  )}
                </h3>
                <div className={styles.desc}>{info.tagline}</div>
                <div className={styles.detail}>{info.description}</div>
                <div className={styles.stack}>{info.stack}</div>
                <button
                  className={styles.case}
                  onClick={openCaseStudy}
                  onMouseEnter={() => setIsBig(true)}
                  onMouseLeave={() => setIsBig(false)}
                  type="button"
                >
                  {project.target ? 'view case study' : 'view on github'} <span>{ARROW_NE}</span>
                </button>
              </div>

              <div className={styles.visual}>
                <div className={styles.visualLabel}>
                  <span>{project.title}</span>
                  <span>
                    0{index + 1} / {info.tag}
                  </span>
                </div>
                <div className={styles.window}>
                  <div className={styles.bar}>
                    <span>{info.tag}</span>
                    <span>{project.target ? 'live' : 'passing'}</span>
                  </div>
                  <ProjectMock title={project.title} />
                </div>
              </div>
            </article>
          );
        })}
      </main>

      <section className={styles.more}>
        <div data-reveal className={`${styles.moreHead} ${styles.reveal}`}>
          <div>
            <div className={styles.kicker}>03 / experiments · prototypes · smaller builds</div>
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
        <span>work / 01—04</span>
      </footer>
    </div>
  );
}
