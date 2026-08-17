'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './ScrapbookPortfolio.module.css';

type PortfolioView = 'home' | 'work' | 'about' | 'atria' | 'foundry' | 'playground' | 'contact';
type PrimaryView = Exclude<PortfolioView, 'atria' | 'foundry'>;

type PortfolioPageProps = {
  initialPage?: PrimaryView;
};

const primaryOrder: PrimaryView[] = ['home', 'work', 'about', 'playground', 'contact'];

const navItems: Array<{ id: PrimaryView; label: string; number: string }> = [
  { id: 'home', label: 'Home', number: '01' },
  { id: 'work', label: 'Work', number: '02' },
  { id: 'about', label: 'About', number: '03' },
  { id: 'playground', label: 'Playground', number: '04' },
  { id: 'contact', label: 'Contact', number: '05' }
];

const projects = [
  { index: '01', title: 'Atria', kind: 'Productivity app', year: '2026', target: 'atria' as const },
  { index: '02', title: 'Foundry', kind: 'Engineering OS', year: '2026', target: 'foundry' as const },
  { index: '03', title: 'KansoDB', kind: 'SQL query engine', year: '2026' },
  { index: '04', title: 'Mini CI/CD', kind: 'DevOps tooling', year: '2026' }
];

function Sidebar({
  active,
  onNavigate,
  footer = '© 2026 Amira\nAll rights reserved'
}: {
  active: PortfolioView;
  footer?: string;
  onNavigate: (target: PortfolioView) => void;
}) {
  const activePrimary = active === 'atria' || active === 'foundry' ? 'work' : active;

  return (
    <aside className={styles.scrapSidebar}>
      <div className={styles.scrapMark}>✣</div>
      <nav className={styles.scrapNav} aria-label="Portfolio pages">
        {navItems.map((item) => (
          <button
            className={activePrimary === item.id ? styles.scrapNavActive : undefined}
            data-go={item.id}
            key={item.id}
            onClick={() => onNavigate(item.id)}
            type="button"
          >
            <span className={styles.scrapNavNum}>{item.number}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className={styles.scrapFooterNote}>
        {footer.split('\n').map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    </aside>
  );
}

function PageShell({
  active,
  children,
  name,
  onNavigate,
  topRight = (
    <>
      Based in London, UK
      <br />
      Available for work
    </>
  ),
  sidebarFooter
}: {
  active: PortfolioView;
  children: ReactNode;
  name: PortfolioView;
  onNavigate: (target: PortfolioView) => void;
  sidebarFooter?: string;
  topRight?: ReactNode;
}) {
  return (
    <section className={`${styles.scrapPage} ${active === name ? styles.scrapPageActive : ''}`} aria-hidden={active !== name}>
      <Sidebar active={active} footer={sidebarFooter} onNavigate={onNavigate} />
      <div className={styles.scrapContent}>
        <div className={styles.scrapTopRight}>{topRight}</div>
        {children}
      </div>
    </section>
  );
}

function MiniPeek() {
  return (
    <div className={styles.scrapPeek} aria-hidden="true">
      <div className={styles.scrapMiniWindow}>
        <div className={styles.scrapMiniSide} />
        <div className={styles.scrapMiniBody}>
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AtriaCalendar() {
  const events = [
    null,
    null,
    'Deep work',
    null,
    'Design review',
    null,
    null,
    null,
    'Run',
    null,
    null,
    'Build',
    null,
    null,
    null,
    null,
    'Meeting',
    null,
    null,
    null,
    null
  ];

  return (
    <div className={styles.scrapAppFrame}>
      <div className={styles.scrapAppUi}>
        <div className={styles.scrapAppNav}>
          Atria
          <br />
          <br />
          Today
          <br />
          Calendar
          <br />
          Tasks
          <br />
          Insights
          <br />
          Settings
        </div>
        <div className={styles.scrapCalendar}>
          <div className={styles.scrapCalHead}>
            <b>April 2026</b>
            <span>＋ Add event</span>
          </div>
          <div className={styles.scrapCalGrid}>
            {events.map((event, index) => (
              <div className={styles.scrapDay} key={`${event ?? 'empty'}-${index}`}>
                {event ? (
                  <div className={`${styles.scrapEvent} ${index % 3 === 2 ? styles.scrapEventBlue : ''} ${index % 4 === 1 ? styles.scrapEventWarm : ''}`}>
                    {event}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className={styles.scrapHomeWrap}>
      <div>
        <div className={`${styles.scrapHello} ${styles.scrapScribble}`}>hello!</div>
        <h1 className={`${styles.scrapName} ${styles.scrapScribble}`}>AMIRA<br />BENBOUALI</h1>
        <div className={styles.scrapRoleCopy}>
          Software engineer
          <br />
          I build digital experiences
          <br />
          that are useful, beautiful
          <br />
          and thoughtful.
        </div>
      </div>
      <div className={styles.scrapPortraitWrap}>
        <div className={styles.scrapPortraitCard}>
          <Image alt="Amira Lina Benbouali" height={1000} priority src="/images/amira-portrait.jpg" width={780} />
        </div>
        <div className={`${styles.scrapAnnot} ${styles.scrapAnnotMe} ${styles.scrapScribble}`}>
          that&apos;s me
          <br />
          ↙
        </div>
        <div className={`${styles.scrapAnnot} ${styles.scrapAnnotStar} ${styles.scrapScribble}`}>✣</div>
      </div>
    </div>
  );
}

function WorkPage({ onNavigate }: { onNavigate: (target: PortfolioView) => void }) {
  return (
    <div className={styles.scrapWorkWrap}>
      <div className={styles.scrapMicro}>(selected work)</div>
      <div className={styles.scrapWorkList}>
        {projects.map((project) => (
          <button
            className={styles.scrapWorkRow}
            key={project.title}
            onClick={() => project.target && onNavigate(project.target)}
            type="button"
          >
            <span className={`${styles.scrapWorkIndex} ${styles.scrapScribble}`}>{project.index}</span>
            <span className={styles.scrapWorkTitle}>{project.title}</span>
            <span className={styles.scrapWorkKind}>{project.kind}</span>
            <span className={styles.scrapWorkYear}>{project.year}</span>
            {project.target ? <MiniPeek /> : null}
          </button>
        ))}
      </div>
      <div className={`${styles.scrapGithubNote} ${styles.scrapScribble}`}>more projects on github ↗</div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className={styles.scrapAboutGrid}>
      <div className={styles.scrapAboutCopy}>
        <div className={styles.scrapMicro}>(about me)</div>
        <h2>I&apos;m a software engineer who loves building things that matter.</h2>
        <p>
          I enjoy turning complex problems into simple, elegant and intuitive solutions. I care about thoughtful design,
          clean code and creating products people actually want to use.
        </p>
        <p>Currently based in London and open to new opportunities.</p>
        <div className={`${styles.scrapLearning} ${styles.scrapScribble}`}>always learning ✶</div>
      </div>
      <div className={styles.scrapInfoStack}>
        <div className={styles.scrapInfoBlock}>
          <h4>Education</h4>
          <p>BSc Computer Science<br />City, University of London</p>
        </div>
        <div className={styles.scrapInfoBlock}>
          <h4>Tech stack</h4>
          <p>TypeScript · React · Next.js<br />Node.js · PostgreSQL · Git<br />Docker · AWS · Testing</p>
        </div>
        <div className={styles.scrapInfoBlock}>
          <h4>Interests</h4>
          <p>Product design · Astronomy · Running<br />Developer tooling · Coffee · Travel</p>
        </div>
      </div>
    </div>
  );
}

function AtriaPage() {
  return (
    <div className={styles.scrapProjectLayout}>
      <div className={styles.scrapProjectHead}>
        <div className={`${styles.scrapBigIndex} ${styles.scrapScribble}`}>01</div>
        <h2 className={styles.scrapScribble}>ATRIA</h2>
        <div className={`${styles.scrapProjectSub} ${styles.scrapScribble}`}>
          calendar made simple.
          <br />
          scheduling made smart.
        </div>
        <p className={styles.scrapProjectDesc}>
          A modern calendar and task-management experience focused on clarity, speed and flexible interaction.
        </p>
        <div className={styles.scrapTech}>
          <b>Tech stack</b>
          <br />
          React · TypeScript · Zustand · Framer Motion · date-fns
        </div>
      </div>
      <div>
        <AtriaCalendar />
        <div className={`${styles.scrapCalendarNote} ${styles.scrapScribble}`}>drag / schedule / rearrange ✦</div>
      </div>
    </div>
  );
}

function FoundryWorkspace() {
  const issues = [
    { id: 'FDY-021', title: 'Authentication callback failing after deploy', tags: ['BACKEND', 'P1'] },
    { id: 'FDY-018', title: 'Slow query on project overview', tags: ['DATABASE', 'PERF'] },
    { id: 'FDY-015', title: 'Improve postmortem ownership flow', tags: ['PRODUCT', 'UX'] }
  ];

  const lifecycle = [
    ['01 / CAPTURE', 'Issue enters system'],
    ['02 / TRIAGE', 'Severity + ownership'],
    ['03 / RESOLVE', 'Fix + rollout'],
    ['04 / LEARN', 'Postmortem + follow-up']
  ];

  return (
    <div className={styles.foundryWorkspace} aria-label="Foundry engineering workspace preview">
      <div className={`${styles.foundryWorkspaceTop} ${styles.scrapMono}`}>
        <span>FOUNDRY / ENGINEERING WORKSPACE</span>
        <span>
          <i /> SYSTEM HEALTHY
        </span>
      </div>
      <div className={styles.foundryWorkspaceBody}>
        <aside className={`${styles.foundryWorkspaceNav} ${styles.scrapMono}`}>
          <span>Overview</span>
          <span>Domains</span>
          <b>Issues</b>
          <span>Triage</span>
          <span>Postmortems</span>
          <span>Settings</span>
        </aside>
        <div className={styles.foundryWorkspaceMain}>
          <div className={styles.foundryWorkspaceHeading}>
            <h3>Issue triage</h3>
            <small>04 active / 01 blocked</small>
          </div>
          <div className={styles.foundryIssueGrid}>
            <section className={styles.foundryIssuePanel}>
              <div className={`${styles.foundryPanelMeta} ${styles.scrapMono}`}>
                <span>Queue</span>
                <span>03</span>
              </div>
              {issues.map((issue) => (
                <article className={styles.foundryIssueCard} key={issue.id}>
                  <span className={styles.foundryIssueId}>{issue.id}</span>
                  <strong>{issue.title}</strong>
                  <div className={styles.foundryIssueTags}>
                    {issue.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </section>
            <section className={styles.foundryLifecyclePanel}>
              <div className={`${styles.foundryPanelMeta} ${styles.scrapMono}`}>
                <span>Lifecycle</span>
                <span>Live</span>
              </div>
              <div className={styles.foundryLifecycleTrack}>
                {lifecycle.map(([title, detail], index) => (
                  <div className={styles.foundryLifecycleStep} key={title}>
                    <span className={index === 1 ? styles.foundryActiveNode : undefined} />
                    <div>
                      <strong>{title}</strong>
                      <p>{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function FoundryPage() {
  return (
    <div className={styles.foundryLayout}>
      <div className={styles.foundryCopy}>
        <div className={`${styles.foundryNumber} ${styles.scrapScribble}`}>02</div>
        <h2><span>FOUNDRY</span></h2>
        <div className={`${styles.foundrySub} ${styles.scrapScribble}`}>
          engineering work,
          <br />
          organised into a system.
        </div>
        <p>
          A full-stack engineering workspace for planning work, triaging issues, tracking domains and turning incidents
          into useful postmortems — designed around the workflows software teams actually use.
        </p>
        <div className={styles.foundryStack}>
          <b>Core system</b>
          <span>NEXT.JS · TYPESCRIPT · PRISMA · POSTGRESQL · VITEST · PLAYWRIGHT · GITHUB ACTIONS</span>
        </div>
        <div className={`${styles.foundryNote} ${styles.scrapScribble}`}>built to think like an engineer ↗</div>
      </div>
      <div className={styles.foundryVisual}>
        <FoundryWorkspace />
        <div className={`${styles.foundryWorkspaceNote} ${styles.scrapScribble}`}>
          systems should make work clearer, not noisier ✦
        </div>
      </div>
    </div>
  );
}

function PlaygroundPage() {
  return (
    <div className={styles.scrapPlayWrap}>
      <div className={styles.scrapMicro}>(playground)</div>
      <h2 className={styles.scrapPlayTitle}>
        Experiments, ideas
        <br />
        and work in progress.
      </h2>
      <div className={styles.scrapPlayGrid}>
        <div className={styles.scrapExpCard}>
          <div className={`${styles.scrapExpThumb} ${styles.scrapCodeThumb}`}>
            const spring = motion({'{'}
            <br />
            &nbsp;&nbsp;stiffness: 120,
            <br />
            &nbsp;&nbsp;damping: 18
            <br />
            {'}'})
            <br />
            <br />
            {'// cinematic transitions'}
            <br />
            {'// motion studies'}
            <br />
            {'// interaction systems'}
          </div>
          <h4>Animation explorations</h4>
          <p>Playing with motion</p>
        </div>
        <div className={styles.scrapExpCard}>
          <div className={styles.scrapExpThumb}>
            <div className={styles.scrapNodes} />
          </div>
          <h4>Visualizing algorithms</h4>
          <p>Turning logic into visuals</p>
        </div>
        <div className={styles.scrapExpCard}>
          <div className={`${styles.scrapExpThumb} ${styles.scrapUiThumb}`}>
            <div />
            <div />
            <div />
            <div />
          </div>
          <h4>UI/UX concepts</h4>
          <p>Designing experiences</p>
        </div>
        <div className={styles.scrapExpCard}>
          <div className={`${styles.scrapExpThumb} ${styles.scrapCodeThumb}`}>
            #!/usr/bin/env ruby
            <br />
            <br />
            pipeline.run
            <br />
            &nbsp;&nbsp;.test
            <br />
            &nbsp;&nbsp;.build
            <br />
            &nbsp;&nbsp;.deploy
            <br />
            <br />
            puts &quot;done ✓&quot;
          </div>
          <h4>Tiny projects</h4>
          <p>Small things, big impact</p>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className={styles.scrapContactGrid}>
      <div className={styles.scrapContactCopy}>
        <div className={styles.scrapMicro}>(get in touch)</div>
        <h2>
          Let&apos;s build
          <br />
          something great
          <br />
          together. ✣
        </h2>
        <div className={styles.scrapContactMeta}>
          <b>Email</b>
          <br />
          amira@example.com
          <br />
          <br />
          <b>Location</b>
          <br />
          London, UK
          <br />
          <br />
          <b>Availability</b>
          <br />
          Open to new opportunities
        </div>
      </div>
      <div className={styles.scrapFormWrap}>
        <div className={`${styles.scrapSendNote} ${styles.scrapScribble}`}>
          send a
          <br />
          message! →
        </div>
        <form
          className={styles.scrapForm}
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <input aria-label="Name" placeholder="NAME" />
          <input aria-label="Email" placeholder="EMAIL" type="email" />
          <textarea aria-label="Message" placeholder="MESSAGE" />
          <button className={styles.scrapSend} type="submit">
            {sent ? 'MESSAGE SENT ✦' : 'Send message →'}
          </button>
        </form>
      </div>
    </div>
  );
}

export function PortfolioPage({ initialPage = 'home' }: PortfolioPageProps) {
  const [activePage, setActivePage] = useState<PortfolioView>(initialPage);
  const [isWiping, setIsWiping] = useState(false);

  const counterIndex = useMemo(() => {
    const page = activePage === 'atria' || activePage === 'foundry' ? 'work' : activePage;
    return Math.max(primaryOrder.indexOf(page), 0) + 1;
  }, [activePage]);

  const navigate = useCallback((target: PortfolioView) => {
    if (target === activePage) return;
    setIsWiping(false);
    window.requestAnimationFrame(() => setIsWiping(true));
    window.setTimeout(() => {
      setActivePage(target);
    }, 345);
    window.setTimeout(() => setIsWiping(false), 760);
  }, [activePage]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) return;
      const current = activePage === 'atria' || activePage === 'foundry' ? 'work' : activePage;
      const currentIndex = Math.max(primaryOrder.indexOf(current), 0);
      const nextIndex =
        event.key === 'ArrowRight' ? Math.min(primaryOrder.length - 1, currentIndex + 1) : Math.max(0, currentIndex - 1);
      navigate(primaryOrder[nextIndex]);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePage, navigate]);

  return (
    <main className={styles.scrapStage}>
      <div className={styles.scrapPortfolio}>
        <div className={`${styles.scrapTransitionLayer} ${isWiping ? styles.scrapTransitionGo : ''}`} aria-hidden="true" />

        <PageShell active={activePage} name="home" onNavigate={navigate}>
          <HomePage />
        </PageShell>
        <PageShell active={activePage} name="work" onNavigate={navigate}>
          <WorkPage onNavigate={navigate} />
        </PageShell>
        <PageShell active={activePage} name="about" onNavigate={navigate}>
          <AboutPage />
        </PageShell>
        <PageShell
          active={activePage}
          name="atria"
          onNavigate={navigate}
          sidebarFooter="Open all projects"
          topRight={<button className={styles.scrapBackButton} onClick={() => navigate('work')} type="button">← Back to work</button>}
        >
          <AtriaPage />
        </PageShell>
        <PageShell
          active={activePage}
          name="foundry"
          onNavigate={navigate}
          sidebarFooter="Open all projects"
          topRight={<button className={styles.scrapBackButton} onClick={() => navigate('work')} type="button">← Back to work</button>}
        >
          <FoundryPage />
        </PageShell>
        <PageShell active={activePage} name="playground" onNavigate={navigate}>
          <PlaygroundPage />
        </PageShell>
        <PageShell active={activePage} name="contact" onNavigate={navigate}>
          <ContactPage />
        </PageShell>

        <div className={`${styles.scrapPageCounter} ${styles.scrapScribble}`}>
          {String(counterIndex).padStart(2, '0')} / 05
        </div>
      </div>
    </main>
  );
}
