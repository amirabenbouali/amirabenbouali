'use client';

import { useState } from 'react';
import { pathForView, projects } from './data';
import { useDarkChrome } from './DarkChromeContext';
import shell from './DarkShell.module.css';
import styles from './DarkWork.module.css';

type PreviewInfo = {
  tagline: string;
  description: string;
  role: string;
  stack: string;
  tag: string;
};

type SmallProject = {
  index: string;
  status: string;
  title: string;
  description: string;
  size: 'wide' | 'narrow' | 'third' | 'long' | 'half';
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
    size: 'wide',
    tone: 'pink',
    visual: 'capsules'
  },
  {
    index: '02 / next',
    status: 'soon',
    title: 'In The Works',
    description: 'Another experiment, not started yet',
    size: 'narrow',
    tone: 'dark',
    flower: true
  },
  {
    index: '03 / idea',
    status: 'soon',
    title: 'Reserved',
    description: 'Space for the next small build',
    size: 'third',
    tone: 'dark'
  },
  {
    index: '04 / next',
    status: 'soon',
    title: 'Coming Soon',
    description: 'A product experiment, in progress',
    size: 'long',
    tone: 'pink',
    flower: true
  },
  {
    index: '05 / future',
    status: 'next',
    title: 'Future Build',
    description: 'Reserved for whatever comes next.',
    size: 'half',
    tone: 'dark'
  }
];

const previewInfo: Record<string, PreviewInfo> = {
  Atria: {
    tagline: 'calendar, without the friction.',
    description:
      'A modern calendar and task-management system focused on clarity, flexible scheduling and fast interaction.',
    role: 'Product design + frontend engineering',
    stack: 'React · TypeScript · Zustand · Framer Motion',
    tag: 'calendar'
  },
  Foundry: {
    tagline: 'engineering work, organised into a system.',
    description:
      'A full-stack workspace for issue triage, domains, incidents and postmortems — built around the workflows engineering teams actually use.',
    role: 'Full-stack engineering + product design',
    stack: 'Next.js · Prisma · Postgres · Testing',
    tag: 'triage'
  },
  KansoDB: {
    tagline: 'from text, to execution.',
    description:
      'A lightweight SQL-style engine exploring tokenisation, parsing, AST construction and query execution from the inside out.',
    role: 'Systems exploration + implementation',
    stack: 'TypeScript · Parser · AST · Execution',
    tag: 'query engine'
  },
  'Mini CI/CD': {
    tagline: 'commit, test, build, ship.',
    description:
      'A configuration-driven CI pipeline runner built in Ruby — running YAML-defined workflows with retries, timeouts and environment management.',
    role: 'CLI + automation engineering',
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
  const [activeIndex, setActiveIndex] = useState(0);

  const goHome = () => wipeTo(pathForView('home'));
  const active = projects[activeIndex];
  const info = previewInfo[active.title];

  const openActive = () => {
    if (active.target) {
      wipeTo(pathForView(active.target));
    } else if (active.href) {
      window.open(active.href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <main className={shell.shell}>
        <header className={shell.top}>
          <div className={shell.brand}>
            AMIRA
            <br />
            BENBOUALI
          </div>
          <div className={shell.role}>
            selected work
            <br />
            2026
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

        <section className={styles.workWrap}>
          <div className={styles.indexSide}>
            <div className={styles.kicker}>projects / software engineering</div>

            <div className={styles.workHeading}>
              <h1 className={styles.bigTitle}>WORK</h1>
              <div className={styles.workSub}>selected projects · 01—04</div>
            </div>

            <div className={styles.projectList}>
              {projects.map((project, index) => {
                const rowProps = {
                  className: `${styles.project} ${activeIndex === index ? styles.projectActive : ''}`,
                  onMouseEnter: () => {
                    setActiveIndex(index);
                    setIsBig(true);
                  },
                  onMouseLeave: () => setIsBig(false)
                };

                const detail = (
                  <>
                    <span className={styles.num}>{project.index}</span>
                    <span className={styles.name}>{project.title}</span>
                    <span className={styles.meta}>
                      <b>{project.kind}</b>
                      {project.stack[0]}
                    </span>
                    <span className={styles.arrow} aria-hidden="true" />
                  </>
                );

                if (project.target) {
                  return (
                    <button
                      {...rowProps}
                      key={project.title}
                      onClick={() => {
                        setActiveIndex(index);
                        wipeTo(pathForView(project.target!));
                      }}
                      type="button"
                    >
                      {detail}
                    </button>
                  );
                }

                return (
                  <a
                    {...rowProps}
                    href={project.href}
                    key={project.title}
                    onClick={() => setActiveIndex(index)}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {detail}
                  </a>
                );
              })}
            </div>

            <div className={styles.foot}>
              {projects.length} selected projects · hover to inspect
            </div>
          </div>

          <div className={styles.previewSide}>
            <div className={styles.previewCard}>
              <div className={styles.flower} aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>

              <div className={styles.previewHead}>
                <span>
                  {active.index} / {active.title}
                </span>
                <span>{active.kind}</span>
              </div>

              <div className={styles.previewBody}>
                <div className={styles.previewCopy}>
                  <h2>{active.title}</h2>
                  <div className={styles.type}>{info.tagline}</div>
                  <p>{info.description}</p>
                  <button
                    className={styles.open}
                    onClick={openActive}
                    onMouseEnter={() => setIsBig(true)}
                    onMouseLeave={() => setIsBig(false)}
                    type="button"
                  >
                    {active.target ? 'open case study' : 'view on github'}{' '}
                    <span>→</span>
                  </button>
                </div>

                <div className={styles.mock} key={activeIndex}>
                  <div className={styles.mockTop}>
                    <span>{active.title}</span>
                    <span>{info.tag}</span>
                  </div>
                  <div className={styles.mockBody}>
                    <ProjectMock title={active.title} />
                  </div>
                </div>
              </div>

              <div className={styles.previewFoot}>
                <span>{info.role}</span>
                <span>{info.stack}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className={styles.moreWork}>
        <div className={styles.moreHead}>
          <div>
            <div className={styles.moreLabel}>
              experiments / smaller builds / ongoing
            </div>
            <h2 className={styles.moreTitle}>MORE WORK</h2>
          </div>
          <div className={styles.moreDesc}>
            Smaller products, prototypes and experiments — a place for
            everything I build between the larger case studies.
          </div>
        </div>

        <div className={styles.smallGrid}>
          {smallProjects.map((project) => (
            <article
              className={`${styles.smallProject} ${styles[project.size]} ${styles[project.tone]}`}
              key={project.title}
            >
              <div className={styles.smallTop}>
                <span>{project.index}</span>
                <span>{project.status}</span>
              </div>

              <div className={styles.smallVisual}>
                {project.visual === 'capsules' ? (
                  <div className={styles.capsules}>
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                ) : null}
              </div>

              <div className={styles.smallInfo}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

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

              <div className={styles.smallArrow}>↗</div>
            </article>
          ))}

          <article className={styles.addProject}>
            <div>
              <div className={styles.addCircle}>+</div>
              <b>Next Project</b>
              <span>the gallery grows with the work</span>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
