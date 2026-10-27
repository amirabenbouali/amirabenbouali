import Link from 'next/link';
import type { DesktopProject } from './projectData';
import styles from './DesktopCaseStudy.module.css';

export function DesktopCaseStudy({ project }: { project: DesktopProject }) {
  return (
    <main className={`${styles.page} ${styles[project.accent]}`}>
      <div className={styles.noise} aria-hidden="true" />

      <header className={styles.pageHeader}>
        <Link href="/">Amira Benbouali</Link>
        <span>Project file / {project.year}</span>
      </header>

      <article className={styles.window}>
        <header className={styles.windowBar}>
          <span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span>
          <span>{project.title.toLowerCase()} — case study</span>
          <Link href="/" aria-label="Close case study and return to portfolio">×</Link>
        </header>

        <div className={styles.workspace}>
          <aside className={styles.sidebar} aria-label="Case study sections">
            <div>
              <span className={styles.fileIcon} aria-hidden="true" />
              <b>{project.title}</b>
              <small>project_{project.index}</small>
            </div>
            <nav>
              <a href="#overview">Overview</a>
              <a href="#interface">Interface</a>
              <a href="#approach">Approach</a>
              <a href="#engineering">Engineering</a>
            </nav>
            <Link className={styles.backLink} href="/">← Desktop</Link>
          </aside>

          <div className={styles.document}>
            <section className={styles.hero} id="overview">
              <p className={styles.eyebrow}>{project.index} / Selected work / {project.year}</p>
              <h1>{project.title}</h1>
              <p className={styles.tagline}>{project.descriptor}</p>
              <p className={styles.summary}>{project.summary}</p>
              <div className={styles.actions}>
                <a href={project.github} rel="noreferrer" target="_blank">View on GitHub ↗</a>
                <span>{project.status}</span>
              </div>
            </section>

            <dl className={styles.metadata}>
              <div><dt>Role</dt><dd>{project.role}</dd></div>
              <div><dt>Stack</dt><dd>{project.stack}</dd></div>
              <div><dt>Focus</dt><dd>{project.focus}</dd></div>
              <div><dt>Year</dt><dd>{project.year}</dd></div>
            </dl>

            <section className={styles.previewSection} id="interface">
              <div className={styles.sectionHeading}>
                <span>01</span>
                <div><p>Interface study</p><h2>A working view of the product.</h2></div>
              </div>
              <ProjectPreview project={project.slug} />
              <small className={styles.previewNote}>Interface recreation for the case study · project data shown illustratively</small>
            </section>

            <section className={styles.story} id="approach">
              <div>
                <span>02 / Problem</span>
                <h2>{project.challenge}</h2>
              </div>
              <div>
                <span>03 / Response</span>
                <h2>{project.response}</h2>
              </div>
            </section>

            <section className={styles.details} id="engineering">
              <div>
                <p className={styles.detailLabel}>Built around</p>
                <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              </div>
              <div>
                <p className={styles.detailLabel}>Engineering notes</p>
                <ol>{project.technicalNotes.map((note) => <li key={note}>{note}</li>)}</ol>
              </div>
            </section>

            <footer className={styles.documentFooter}>
              <span>End of project file</span>
              <Link href="/">Return to desktop ↗</Link>
            </footer>
          </div>
        </div>
      </article>
    </main>
  );
}

function ProjectPreview({ project }: { project: DesktopProject['slug'] }) {
  if (project === 'atria') {
    const days = ['Mon 13', 'Tue 14', 'Wed 15', 'Thu 16', 'Fri 17'];
    return (
      <div className={`${styles.productFrame} ${styles.atriaPreview}`}>
        <div className={styles.productToolbar}><b>Atria</b><span>April 2026</span><button type="button">+ New event</button></div>
        <div className={styles.atriaApp}>
          <aside><b>Workspace</b><span>Today</span><strong>Calendar</strong><span>Tasks</span><span>Insights</span></aside>
          <div className={styles.calendarGrid}>
            {days.map((day) => <b key={day}>{day}</b>)}
            {days.map((day, index) => (
              <div key={`${day}-column`}>
                {index === 0 ? <i className={styles.eventCoral}>Deep work<br /><small>09:00</small></i> : null}
                {index === 1 ? <i className={styles.eventGreen}>Design review<br /><small>11:30</small></i> : null}
                {index === 2 ? <i className={styles.eventGrey}>Project notes<br /><small>14:00</small></i> : null}
                {index === 4 ? <i className={styles.eventCoral}>Weekly review<br /><small>16:30</small></i> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (project === 'foundry') {
    return (
      <div className={`${styles.productFrame} ${styles.foundryPreview}`}>
        <div className={styles.productToolbar}><b>Foundry</b><span>Engineering workspace</span><button type="button">System healthy</button></div>
        <div className={styles.foundryApp}>
          <aside><b>Workspace</b><span>Overview</span><span>Domains</span><strong>Issues</strong><span>Triage</span><span>Postmortems</span></aside>
          <section className={styles.foundryQueue}>
            <header><div><small>Issue triage</small><h3>Operational queue</h3></div><span>04 active</span></header>
            <div className={styles.foundryCards}>
              <article><small>FDY-021 · P1</small><b>Authentication callback failing after deploy</b><span>Backend · investigating</span></article>
              <article><small>FDY-018 · PERF</small><b>Slow query on project overview</b><span>Database · triage</span></article>
              <article><small>FDY-015 · UX</small><b>Improve postmortem ownership flow</b><span>Product · ready</span></article>
            </div>
          </section>
          <aside className={styles.lifecycle}><small>Lifecycle</small><b>Capture</b><i /><b>Triage</b><i /><b>Resolve</b><i /><b>Learn</b></aside>
        </div>
      </div>
    );
  }

  if (project === 'kansodb') {
    return (
      <div className={`${styles.productFrame} ${styles.kansoPreview}`}>
        <div className={styles.productToolbar}><b>KansoDB</b><span>Query laboratory</span><button type="button">Engine ready</button></div>
        <div className={styles.kansoApp}>
          <section className={styles.queryEditor}>
            <small>01 / Query</small>
            <code><b>SELECT</b> ideas<br /><b>FROM</b> memory<br /><b>WHERE</b> status = <em>&apos;unfinished&apos;</em>;</code>
            <div><span>SELECT</span><span>IDENTIFIER</span><span>FROM</span><span>WHERE</span><span>STRING</span></div>
          </section>
          <section className={styles.astPanel}>
            <small>02 / Parse tree</small>
            <ol><li>Query</li><li>SelectClause → ideas</li><li>FromClause → memory</li><li>WhereClause → status</li></ol>
          </section>
          <section className={styles.resultPanel}>
            <small>03 / Result · 3 rows</small>
            <table><thead><tr><th>idea</th><th>status</th></tr></thead><tbody><tr><td>calendar</td><td>unfinished</td></tr><tr><td>query engine</td><td>unfinished</td></tr><tr><td>pipeline</td><td>unfinished</td></tr></tbody></table>
          </section>
        </div>
      </div>
    );
  }

  if (project === 'mini-ci') {
    const stages = [
      ['Commit', 'received'],
      ['Build', 'compiled'],
      ['Tests', '127 checks'],
      ['Quality', 'lint + scan'],
      ['Release', 'ready']
    ];
    return (
      <div className={`${styles.productFrame} ${styles.ciPreview}`}>
        <div className={styles.productToolbar}><b>Mini CI/CD</b><span>Build 042</span><button type="button">Passing</button></div>
        <div className={styles.ciApp}>
          <div className={styles.pipelineTrack}>
            {stages.map(([title, detail], index) => (
              <article key={title}><i className={index < 4 ? styles.pipelinePassed : ''} /><b>{title}</b><span>{detail}</span></article>
            ))}
          </div>
          <pre><code>$ mini-ci run a91c2f{`\n`}✓ source received{`\n`}✓ build complete{`\n`}✓ tests passed{`\n`}✓ artifact ready</code></pre>
        </div>
      </div>
    );
  }

  const boroughs = ['Camden', 'Westminster', 'Southwark', 'Hackney'];
  return (
    <div className={`${styles.productFrame} ${styles.metronomePreview}`}>
      <div className={styles.productToolbar}><b>Metronome</b><span>London pulse</span><button type="button">Live</button></div>
      <div className={styles.metroApp}>
        <aside>{boroughs.map((borough, index) => <span className={index === 1 ? styles.metroActive : ''} key={borough}>{borough}</span>)}</aside>
        <div className={styles.map}>
          <span className={styles.river} />
          {[0, 1, 2, 3, 4, 5].map((pin) => <i className={styles.mapPin} key={pin} />)}
        </div>
        <div className={styles.pulsePanel}>
          <small>Westminster</small><strong>62</strong><span>Elevated</span>
          <dl><div><dt>Traffic</dt><dd>61</dd></div><div><dt>Transit</dt><dd>48</dd></div><div><dt>Weather</dt><dd>22</dd></div><div><dt>Events</dt><dd>74</dd></div></dl>
        </div>
      </div>
    </div>
  );
}
