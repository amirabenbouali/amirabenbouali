'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ARROW_NE, pathForView } from './data';
import { useDarkChrome } from './DarkChromeContext';
import shell from './DarkShell.module.css';
import styles from './DarkLanding.module.css';

type JournalPage = 'work' | 'about' | 'contact' | 'skills';

type Project = {
  name: string;
  world: string;
  description: string;
  focus: string;
  stack: string;
  route?: string;
  repository: string;
};

const projects: Project[] = [
  {
    name: 'Metronome',
    world: 'The living landscape',
    description: 'A live pulse dashboard for London, combining traffic, transit, weather and event data into one borough-level score.',
    focus: 'Geospatial data and an interactive map become a readable portrait of the city.',
    stack: 'FastAPI · PostGIS · React · TypeScript',
    route: '/projects/metronome',
    repository: 'https://github.com/amirabenbouali/metronome'
  },
  {
    name: 'Atria',
    world: 'The quiet observatory',
    description: 'A calm calendar and task-planning workspace built around clarity, flexible scheduling and fast interaction.',
    focus: 'Planning software should create room to think rather than make a busy week feel busier.',
    stack: 'React · TypeScript · Zustand · Motion',
    route: '/projects/atria',
    repository: 'https://github.com/amirabenbouali/atria'
  },
  {
    name: 'Foundry',
    world: 'The inventor’s workshop',
    description: 'An engineering operations workspace for domains, issues, triage and postmortems.',
    focus: 'Making the people, systems and decisions behind software easier to understand.',
    stack: 'Next.js · TypeScript · PostgreSQL · Prisma',
    repository: 'https://github.com/amirabenbouali/foundry'
  },
  {
    name: 'KansoDB',
    world: 'The hidden engine',
    description: 'A small SQL query engine built to understand what happens between a query and its result.',
    focus: 'Going beneath the interface to explore tokenisation, parsing and execution.',
    stack: 'TypeScript · SQL · Parser · AST',
    repository: 'https://github.com/amirabenbouali/kansodb'
  },
  {
    name: 'Mini CI/CD',
    world: 'The clockwork passage',
    description: 'A lightweight pipeline runner exploring build automation and developer tooling.',
    focus: 'Following a commit through build, tests, quality checks and release.',
    stack: 'Ruby · Bash · Automation · CI/CD',
    repository: 'https://github.com/amirabenbouali/miniCI'
  }
];

const destinations = [
  { name: 'The project worlds', action: 'Open the magical door' },
  { name: 'The workbench', action: 'Explore the workbench' },
  { name: 'A quiet corner', action: 'Meet the engineer' },
  { name: 'The postbox', action: 'Open the postbox' }
];

export function DarkLanding() {
  const { wipeTo } = useDarkChrome();
  const [evening, setEvening] = useState(false);
  const [destination, setDestination] = useState(0);
  const [journal, setJournal] = useState<JournalPage | null>(null);
  const [journalProject, setJournalProject] = useState<number | null>(null);
  const [cinemaOpen, setCinemaOpen] = useState(false);
  const [doorOpened, setDoorOpened] = useState(false);
  const [arrived, setArrived] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [changing, setChanging] = useState(false);
  const worldRef = useRef<HTMLElement>(null);
  const doorRef = useRef<HTMLButtonElement>(null);
  const closeJournalRef = useRef<HTMLButtonElement>(null);
  const returnRef = useRef<HTMLElement | null>(null);
  const reducedMotionRef = useRef(false);

  const openJournal = useCallback((page: JournalPage, project: number | null = null) => {
    returnRef.current = document.activeElement as HTMLElement;
    setJournal(page);
    setJournalProject(project);
  }, []);

  const closeJournal = useCallback(() => {
    setJournal(null);
    setJournalProject(null);
    window.setTimeout(() => returnRef.current?.focus(), 0);
  }, []);

  const enterCinema = useCallback(() => {
    returnRef.current = document.activeElement as HTMLElement;
    setCinemaOpen(true);
    setDoorOpened(false);
    setArrived(false);
    window.setTimeout(() => doorRef.current?.focus(), 0);
  }, []);

  const leaveCinema = useCallback(() => {
    setCinemaOpen(false);
    setDoorOpened(false);
    setArrived(false);
    window.setTimeout(() => returnRef.current?.focus(), 0);
  }, []);

  const stepThrough = () => {
    if (doorOpened) return;
    setDoorOpened(true);
    window.setTimeout(() => setArrived(true), reducedMotionRef.current ? 0 : 950);
  };

  const changeChapter = useCallback((next: number) => {
    if (changing) return;
    setChanging(true);
    window.setTimeout(() => {
      setChapter((next + projects.length) % projects.length);
      setChanging(false);
    }, reducedMotionRef.current ? 0 : 280);
  }, [changing]);

  const activateDestination = () => {
    if (destination < 2) enterCinema();
    else openJournal(destination === 2 ? 'about' : 'contact');
  };

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    document.body.style.overflow = cinemaOpen || journal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [cinemaOpen, journal]);

  useEffect(() => {
    if (journal) window.setTimeout(() => closeJournalRef.current?.focus(), 0);
  }, [journal, journalProject]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (journal) {
        if (event.key === 'Escape') closeJournal();
        return;
      }
      if (!cinemaOpen) return;
      if (event.key === 'Escape') leaveCinema();
      if (arrived && event.key === 'ArrowRight') changeChapter(chapter + 1);
      if (arrived && event.key === 'ArrowLeft') changeChapter(chapter - 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [arrived, chapter, changeChapter, cinemaOpen, closeJournal, journal, leaveCinema]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reducedMotionRef.current || !worldRef.current) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 7;
    const y = (event.clientY / window.innerHeight - 0.5) * 5;
    worldRef.current.style.setProperty('--scene-x', `${x}px`);
    worldRef.current.style.setProperty('--scene-y', `${y}px`);
  };

  const trapFocus = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Tab') return;
    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]'));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const selectedProject = projects[chapter];
  const detailedProject = journalProject === null ? null : projects[journalProject];

  return (
    <main className={`${shell.shell} ${styles.portfolio} ${evening ? styles.evening : ''}`}>
      <section className={styles.world} onPointerMove={handlePointerMove} ref={worldRef}>
        <div className={styles.painting} role="img" aria-label="A painted magical workshop with an arched garden view, a wooden door and a friendly fire in the hearth" />
        <div className={styles.lightWash} aria-hidden="true" />
        <div className={styles.motes} aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <i key={index} />)}</div>

        <header className={styles.header}>
          <button className={styles.brand} onClick={() => openJournal('about')} type="button">
            <span className={styles.brandMark} aria-hidden="true">✦</span>
            <span className={styles.brandCopy}>
              <strong>Amira Benbouali</strong>
              <small>Portfolio · 2026</small>
            </span>
          </button>
          <nav aria-label="Main navigation">
            <button onClick={() => openJournal('work')} type="button">Work</button>
            <button onClick={() => openJournal('about')} type="button">About</button>
            <button onClick={() => openJournal('contact')} type="button">Contact</button>
          </nav>
          <button
            aria-pressed={evening}
            className={styles.eveningButton}
            onClick={() => setEvening((value) => !value)}
            type="button"
          >
            <span className={styles.lightIcon} aria-hidden="true">{evening ? '☀' : '☾'}</span>
            <span>{evening ? 'Morning light' : 'Evening light'}</span>
          </button>
        </header>

        <section className={styles.intro}>
          <div className={styles.eyebrow}>Software engineer · London</div>
          <h1>A little magic.<br />A lot of<br /><em>engineering.</em></h1>
          <p>Hello, I’m Amira. I build thoughtful digital products, developer tools and small systems.</p>
          <button className={styles.enterButton} onClick={() => openJournal('work')} type="button">Explore my work <span>{ARROW_NE}</span></button>
          <p className={styles.note}>Every door leads somewhere interesting.</p>
        </section>

        <button className={`${styles.hotspot} ${styles.doorHotspot}`} onClick={activateDestination} type="button">✧ {destinations[destination].action}</button>
        <button className={`${styles.hotspot} ${styles.fireHotspot}`} onClick={() => openJournal('skills')} type="button">✦ Meet Calcifer</button>

        <footer className={styles.footer}>
          <p>A moving workshop<br />A portfolio of useful things</p>
          <div className={styles.dialBar}><button aria-label="Turn the magical door dial" className={styles.dial} onClick={() => setDestination((value) => (value + 1) % destinations.length)} style={{ transform: `rotate(${destination * 90}deg)` }} type="button" /><div>Destination: <span>{destinations[destination].name}</span><small>Turn the dial. Choose a world.</small></div></div>
          <p>Built with curiosity<br />and a little fire</p>
        </footer>
      </section>

      <section aria-label="A journey through Amira’s projects" aria-modal="true" className={`${styles.cinema} ${cinemaOpen ? styles.cinemaActive : ''} ${arrived ? styles.arrived : ''}`} onKeyDown={trapFocus} role="dialog">
        <div className={`${styles.vista} ${styles[`chapter${chapter}`]}`} />
        <div className={styles.cinemaTop}><span>Amira’s worlds / selected work</span><button onClick={leaveCinema} type="button">← Back to the workshop</button></div>
        <p className={styles.cinemaQuote}>A different world<br />behind every idea.</p>
        <article className={`${styles.chapterContent} ${changing ? styles.chapterChanging : ''}`} aria-live="polite">
          <span>World 0{chapter + 1} / {selectedProject.world}</span><h2>{selectedProject.name}</h2><p>{selectedProject.description}</p><small>{selectedProject.stack}</small>
          <div className={styles.chapterActions}>{selectedProject.route ? <button onClick={() => wipeTo(selectedProject.route!)} type="button">Look inside this project {ARROW_NE}</button> : null}<a href={selectedProject.repository} rel="noreferrer" target="_blank">Repository {ARROW_NE}</a></div>
        </article>
        <nav aria-label="Browse projects" className={styles.chapterNav}>
          <button aria-label="Previous project" onClick={() => changeChapter(chapter - 1)} type="button">←</button>
          <div>{projects.map((project, index) => <button aria-current={index === chapter ? 'true' : undefined} className={index === chapter ? styles.selectedDot : ''} key={project.name} onClick={() => changeChapter(index)} type="button"><span>0{index + 1}</span>{project.name}</button>)}</div>
          <button aria-label="Next project" onClick={() => changeChapter(chapter + 1)} type="button">→</button>
        </nav>

        <div className={`${styles.threshold} ${arrived ? styles.thresholdPassed : ''}`}>
          <div className={styles.doorFrame}><div className={styles.doorEmblem} /><button aria-label="Step through the magical door" className={`${styles.actualDoor} ${doorOpened ? styles.doorOpened : ''}`} onClick={stepThrough} ref={doorRef} type="button"><span className={styles.panelTop} /><span className={styles.panelBottom} /><span className={styles.knob} /></button></div>
          <div className={styles.thresholdCaption}><strong>Some doors open into other worlds.</strong><span>{doorOpened ? 'Welcome to the other side…' : 'Open the door to step inside'}</span></div>
        </div>
      </section>

      {journal ? (
        <div className={styles.veil} onMouseDown={(event) => { if (event.target === event.currentTarget) closeJournal(); }}>
          <section aria-labelledby="journal-title" aria-modal="true" className={styles.journal} onKeyDown={trapFocus} role="dialog">
            <button aria-label="Close journal" className={styles.closeJournal} onClick={closeJournal} ref={closeJournalRef} type="button">×</button>
            {detailedProject ? <><div className={styles.journalEyebrow}>{detailedProject.world}</div><h2 id="journal-title">{detailedProject.name}</h2><p className={styles.journalStack}>{detailedProject.stack}</p><div className={styles.projectDetail}><p>{detailedProject.description}</p><p>{detailedProject.focus}</p></div><div className={styles.journalLinks}>{detailedProject.route ? <button onClick={() => wipeTo(detailedProject.route!)} type="button">Open case study {ARROW_NE}</button> : null}<a href={detailedProject.repository} rel="noreferrer" target="_blank">Repository {ARROW_NE}</a></div><button className={styles.backButton} onClick={() => setJournalProject(null)} type="button">← Back to the workbench</button></> : <JournalContent page={journal} onProject={(index) => setJournalProject(index)} />}
          </section>
        </div>
      ) : null}
    </main>
  );
}

function JournalContent({ page, onProject }: { page: JournalPage; onProject: (index: number) => void }) {
  if (page === 'work') return <><div className={styles.journalEyebrow}>Chapter 01 · The workbench</div><h2 id="journal-title">Small worlds. Real software.</h2><p>A collection of things I’ve been building. Pick up a project to look inside.</p><div className={styles.projectList}>{projects.map((project, index) => <button key={project.name} onClick={() => onProject(index)} type="button"><span>0{index + 1}</span><strong>{project.name}</strong><small>{project.description}<br />{project.stack}</small><b>{ARROW_NE}</b></button>)}</div></>;
  if (page === 'about') return <><div className={styles.journalEyebrow}>Chapter 02 · The person behind the door</div><h2 id="journal-title">Hello, I’m Amira.</h2><p>I’m a software engineer based in London and a Computer Science graduate. I enjoy working across the interface and the systems underneath it.</p><p>This workshop is a home for that curiosity: useful products, developer tools and the details that make software feel considered.</p><button className={styles.routeButton} onClick={() => window.location.assign(pathForView('about'))} type="button">Read more about me {ARROW_NE}</button></>;
  if (page === 'contact') return <><div className={styles.journalEyebrow}>Chapter 03 · The postbox</div><h2 id="journal-title">Let’s make something.</h2><p>Have a role, a project or an interesting problem in mind? Come say hello.</p><div className={styles.contactLinks}><a href="mailto:amiralinabenbouali@gmail.com">Send an email {ARROW_NE}</a><a href="https://www.linkedin.com/in/amirabenbouali/" rel="noreferrer" target="_blank">LinkedIn {ARROW_NE}</a><a href="https://github.com/amirabenbouali" rel="noreferrer" target="_blank">GitHub {ARROW_NE}</a></div></>;
  return <><div className={styles.journalEyebrow}>Calcifer’s corner · Keeping the fire alive</div><h2 id="journal-title">What fuels the workshop.</h2><p>Every curious invention needs a dependable engine.</p><div className={styles.skills}>{['React', 'TypeScript', 'Next.js', 'Python', 'FastAPI', 'SQL', 'PostgreSQL', 'PostGIS', 'Ruby', 'Bash'].map((skill) => <span key={skill}>{skill}</span>)}</div></>;
}
