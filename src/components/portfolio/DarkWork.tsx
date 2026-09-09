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
  stack?: string;
  blurb: string;
  tone: 'pink' | 'dark';
  flower?: boolean;
  visual?: 'capsules' | 'code' | 'pipeline';
  href?: string;
};

const smallProjects: SmallProject[] = [
  {
    index: '01 / query engine',
    status: '2026',
    title: 'KansoDB',
    stack: 'TypeScript · Parser · AST',
    blurb: 'A small SQL query engine and educational database workbench.',
    tone: 'pink',
    visual: 'code',
    href: 'https://github.com/amirabenbouali/kansodb'
  },
  {
    index: '02 / pipeline',
    status: '2026',
    title: 'Mini CI/CD',
    stack: 'Ruby · Bash · Automation',
    blurb: "A lightweight CI/CD pipeline runner for exploring how automation behaves once it's actually running.",
    tone: 'dark',
    visual: 'pipeline',
    href: 'https://github.com/amirabenbouali/miniCI'
  },
  {
    index: '03 / experiment',
    status: 'in progress',
    title: 'Spotify Capsules',
    stack: 'React · Spotify API',
    blurb: 'An experiment turning old Spotify listening history into small, revisitable capsules of memory.',
    tone: 'pink',
    visual: 'capsules'
  },
  {
    index: '04 / future',
    status: 'next',
    title: 'Future Build',
    blurb: 'Reserved for whatever comes next.',
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
  Metronome: {
    tagline: 'the city, scored in real time.',
    description:
      'A live pulse dashboard for London that fuses real-time traffic, transit, weather and event data into a single score for every borough.',
    stack: 'FastAPI · PostGIS · React · TypeScript',
    tag: 'pulse'
  }
};

function ProjectMock({ title }: { title: string }) {
  if (title === 'Atria') {
    return (
      <div className={styles.previewApp}>
        <aside className={styles.previewSidebar}>
          <span className={styles.previewSideActive}>Calendar</span>
          <span>Tasks</span>
          <span>Insights</span>
        </aside>
        <div className={styles.cal}>
          {Array.from({ length: 20 }).map((_, index) => (
            <i key={index}>{index === 6 || index === 12 ? <em /> : null}</i>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.previewApp}>
      <aside className={styles.previewSidebar}>
        <span className={styles.previewSideActive}>Boroughs</span>
        <span>Signals</span>
        <span>Alerts</span>
      </aside>
      <div className={styles.previewDash}>
        <div className={styles.previewScoreRow}>
          <span className={styles.previewScore}>62</span>
          <span className={styles.previewBand}>Elevated</span>
        </div>
        <div className={styles.zones}>
          {Array.from({ length: 24 }).map((_, index) => (
            <i key={index} className={index % 7 === 0 ? styles.zoneHot : undefined} />
          ))}
        </div>
      </div>
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
            <span>TWO PROJECTS.</span>
            <span>TWO DIFFERENT</span>
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
              <a
                className={styles.indexRow}
                href={`#${project.target}`}
                key={project.title}
                onMouseEnter={() => setIsBig(true)}
                onMouseLeave={() => setIsBig(false)}
              >
                <small>{project.index}</small>
                <b>{project.title}</b>
                <em>
                  {project.kind.toLowerCase()} / {info.tag}
                </em>
              </a>
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
            Two projects, each exploring a different layer of software, from interaction to infrastructure.
          </p>
        </div>

        {projects.map((project, index) => {
          const info = previewInfo[project.title];
          const openCaseStudy = () => wipeTo(pathForView(project.target));

          return (
            <article
              className={`${styles.spread} ${index % 2 === 1 ? styles.reverse : ''} ${styles.reveal}`}
              data-reveal
              id={project.target}
              key={project.title}
            >
              <div className={styles.copy}>
                <div className={styles.number}>
                  0{index + 1} / 0{projects.length}
                </div>
                <h3 className={styles.title}>{project.title.toUpperCase()}</h3>
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
                  more details <span>{ARROW_NE}</span>
                </button>
              </div>

              <div className={`${styles.visual} ${styles[`visual${project.title}`]}`}>
                <div className={styles.visualLabel}>
                  <span>{project.title}</span>
                  <span>
                    0{index + 1} / {info.tag}
                  </span>
                </div>
                <div className={styles.window}>
                  <div className={styles.bar}>
                    <span>{info.tag}</span>
                    <span>live</span>
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
          {smallProjects.map((project) => {
            const openProject = () => {
              if (project.href) window.open(project.href, '_blank', 'noopener,noreferrer');
            };

            return (
              <article
                className={`${styles.card} ${styles[project.tone]} ${project.href ? styles.linkable : ''}`}
                key={project.title}
                onClick={openProject}
                onMouseEnter={() => project.href && setIsBig(true)}
                onMouseLeave={() => project.href && setIsBig(false)}
              >
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
                  {project.visual === 'code' ? (
                    <div className={styles.miniCode}>
                      <span>SELECT</span>
                      <span>FROM</span>
                      <span>WHERE</span>
                    </div>
                  ) : null}
                  {project.visual === 'pipeline' ? (
                    <div className={styles.miniPipeline}>
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
                  {project.stack ? <p className={styles.cardStack}>{project.stack}</p> : null}
                  <p className={styles.cardBlurb}>{project.blurb}</p>
                </div>

                {project.href ? (
                  <div className={styles.cardStrip}>
                    <span>view on github</span>
                    <span>{ARROW_NE}</span>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <footer className={styles.footer}>
        <span>© 2026 AMIRA BENBOUALI</span>
        <span>work / 01—02</span>
      </footer>
    </div>
  );
}
