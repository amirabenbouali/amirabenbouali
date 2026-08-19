'use client';

import Image from 'next/image';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { useScrapNavigate } from './NavContext';
import { projects } from './data';
import { heroMarker } from './fonts';
import styles from './ScrapbookPortfolio.module.css';

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

export function HomeContent() {
  return (
    <div className={styles.scrapHomeWrap}>
      <div>
        <div className={`${styles.scrapHello} ${styles.scrapScribble}`}>hello!</div>
        <h1 className={`${styles.scrapHeroName} ${heroMarker.className}`}>AMIRA<br />BENBOUALI</h1>
        <div className={styles.scrapRoleTag}>
          <span>↗</span>
          <span>Software engineer</span>
        </div>
        <div className={styles.scrapRoleCopy}>
          I build digital experiences
          <br />
          that are useful, beautiful
          <br />
          and thoughtful.
        </div>
        <div className={`${styles.scrapHomeLearning} ${styles.scrapScribble}`}>always learning ✶</div>
      </div>
      <div className={styles.scrapPortraitWrap}>
        <div className={styles.scrapDotGrid} aria-hidden="true" />
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
      <div className={styles.scrapCurrentlyBlock}>
        <b>Currently:</b>
        <span>Building foundry, exploring infrastructure, shipping small things.</span>
      </div>
      <div className={styles.scrapExploreHint}>
        <span>←</span>
        <span>Use arrow keys to explore</span>
        <span>→</span>
      </div>
    </div>
  );
}

export function WorkContent() {
  const navigate = useScrapNavigate();

  return (
    <div className={styles.scrapWorkWrap}>
      <div className={styles.scrapMicro}>(selected work)</div>
      <div className={styles.scrapWorkList}>
        {projects.map((project) => (
          <button
            className={styles.scrapWorkRow}
            key={project.title}
            onClick={() => project.target && navigate(project.target)}
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

export function AboutContent() {
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

export function AtriaContent() {
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

export function FoundryContent() {
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

function KansoQueryLab() {
  const tokens = ['SELECT', 'IDENTIFIER', 'FROM', 'IDENTIFIER', 'WHERE', 'EQUALS', 'STRING', 'ORDER_BY'];
  const tree = [
    ['Query', ''],
    ['SelectClause →', 'name, role'],
    ['FromClause →', 'engineers'],
    ['WhereClause → stack', "= 'typescript'"],
    ['OrderClause →', 'experience DESC']
  ];
  const rows = [
    ['Amira', 'Engineer', '04'],
    ['Lina', 'Builder', '03'],
    ['Kanso', 'Engine', '01']
  ];

  return (
    <div className={styles.kansoLab} aria-label="KansoDB query lab preview">
      <div className={`${styles.kansoLabTop} ${styles.scrapMono}`}>
        <span>KANSODB / QUERY LAB</span>
        <span>
          <i /> ENGINE READY
        </span>
      </div>
      <div className={styles.kansoLabBody}>
        <section className={styles.kansoQueryColumn}>
          <div className={`${styles.kansoPanelHead} ${styles.scrapMono}`}>
            <span>01 / Query</span>
            <span>SQL-ish</span>
          </div>
          <pre className={styles.kansoCode}>
            <span>SELECT</span> name, role{'\n'}
            <span>FROM</span> engineers{'\n'}
            <span>WHERE</span> stack = {'\n'}
            <em>&apos;typescript&apos;</em>{'\n'}
            <span>ORDER BY</span> experience{'\n'}
            <span>DESC;</span>
          </pre>
          <div className={styles.kansoTokenPanel}>
            <div className={`${styles.kansoPanelHead} ${styles.scrapMono}`}>
              <span>02 / Tokens</span>
            </div>
            <div className={styles.kansoTokens}>
              {tokens.map((token, index) => (
                <span key={`${token}-${index}`}>{token}</span>
              ))}
            </div>
          </div>
          <div className={styles.kansoExecution}>
            <div className={`${styles.kansoPanelHead} ${styles.scrapMono}`}>
              <span>03 / Execution</span>
            </div>
            <p>scan → filter → project → sort → return</p>
          </div>
        </section>
        <section className={styles.kansoParseColumn}>
          <div className={`${styles.kansoPanelHead} ${styles.scrapMono}`}>
            <span>04 / Parse tree</span>
            <span>AST</span>
          </div>
          <div className={styles.kansoTree}>
            {tree.map(([label, detail], index) => (
              <div className={styles.kansoTreeNode} key={label}>
                <span className={index === 0 ? styles.kansoTreeRoot : undefined} />
                <div>
                  <b>{label}</b>
                  {detail ? <small>{detail}</small> : null}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.kansoResult}>
            <div className={`${styles.kansoPanelHead} ${styles.scrapMono}`}>
              <span>05 / Result</span>
              <span>3 rows · 2ms</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>name</th>
                  <th>role</th>
                  <th>exp</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([name, role, exp]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{role}</td>
                    <td>{exp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <div className={styles.kansoPulse} aria-hidden="true" />
    </div>
  );
}

export function KansoContent() {
  return (
    <div className={styles.kansoLayout}>
      <div className={styles.kansoCopy}>
        <div className={`${styles.kansoNumber} ${styles.scrapScribble}`}>03</div>
        <h2><span>KANSODB</span></h2>
        <div className={`${styles.kansoSub} ${styles.scrapScribble}`}>
          tiny query engine.
          <br />
          big systems lesson.
        </div>
        <p>
          A lightweight SQL-style query engine built to understand what happens between a query string and a result set
          — from tokenisation and parsing to execution and output.
        </p>
        <div className={styles.kansoStack}>
          <b>Core concepts</b>
          <span>TYPESCRIPT · TOKENISER · PARSER · AST · QUERY EXECUTION · TESTING</span>
        </div>
        <div className={`${styles.kansoNote} ${styles.scrapScribble}`}>learning databases by building one ↗</div>
      </div>
      <div className={styles.kansoVisual}>
        <KansoQueryLab />
        <div className={`${styles.kansoLabNote} ${styles.scrapScribble}`}>
          query → structure → execution → result ✦
        </div>
      </div>
    </div>
  );
}

export function PlaygroundContent() {
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

type ContactStatus = 'idle' | 'sending' | 'sent' | 'error';

const contactButtonLabel: Record<ContactStatus, string> = {
  idle: 'Send message →',
  sending: 'Sending…',
  sent: 'MESSAGE SENT ✦',
  error: 'Failed — try again'
};

export function ContactContent() {
  const [status, setStatus] = useState<ContactStatus>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Request failed');

      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

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
          amiralinabenbouali@gmail.com
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
        <form className={styles.scrapForm} onSubmit={handleSubmit}>
          <input aria-label="Name" name="name" placeholder="NAME" required />
          <input aria-label="Email" name="email" placeholder="EMAIL" required type="email" />
          <textarea aria-label="Message" name="message" placeholder="MESSAGE" required />
          <button className={styles.scrapSend} disabled={status === 'sending'} type="submit">
            {contactButtonLabel[status]}
          </button>
          {status === 'error' ? (
            <p className={styles.scrapFormError}>
              Something went wrong — email me directly at amiralinabenbouali@gmail.com instead.
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
