import Image from 'next/image';
import Link from 'next/link';
import styles from './DesktopAbout.module.css';

const principles = [
  {
    index: '01',
    title: 'Start with the shape of the problem.',
    text: 'Before choosing a stack or drawing a screen, I try to understand what is genuinely difficult and what can be made simpler.'
  },
  {
    index: '02',
    title: 'Make complexity legible.',
    text: 'The structure underneath can be sophisticated; the experience presented to a person should still feel calm and direct.'
  },
  {
    index: '03',
    title: 'Refine until it feels inevitable.',
    text: 'I use working versions to expose weak assumptions, then keep editing until the product has a clear reason for being the way it is.'
  }
];

const workingNotes = [
  ['In practice', 'Follow the question until the problem has a clear shape'],
  ['At the interface', 'Keep information calm, useful and easy to act on'],
  ['Under the surface', 'Give architecture the same attention as presentation'],
  ['In the margins', 'Keep small experiments alive long enough to teach something']
];

const toolbox = [
  ['Languages', 'TypeScript · JavaScript · Python · SQL · Ruby'],
  ['Frontend', 'React · Next.js · CSS'],
  ['Backend', 'Node.js · PostgreSQL · Prisma · FastAPI · PostGIS'],
  ['Engineering', 'Testing · GitHub Actions · CI/CD']
];

export function DesktopAboutPreview() {
  return (
    <div className={styles.preview}>
      <header className={styles.previewHeader}>
        <div>
          <p id="desktop-window-title">Profile / 2026</p>
        </div>
        <span><i /> Available for the right role</span>
      </header>

      <div className={styles.snapshot}>
        <figure className={styles.portraitCard}>
          <div className={styles.portrait}>
            <Image
              alt="Amira Lina Benbouali"
              fill
              priority
              sizes="(max-width: 680px) 160px, 220px"
              src="/images/amira-portrait-profile.jpg"
            />
          </div>
          <figcaption><span>amira.jpg</span><small>London · 2026</small></figcaption>
        </figure>

        <div className={styles.introduction}>
          <p className={styles.role}>Software engineer · London</p>
          <p className={styles.introLead}>I care about the moment a complicated system becomes simple enough for someone else to use without thinking about it.</p>
          <p>My work moves between product decisions, interface details and the engineering underneath. I like seeing the whole path, then making each layer clearer.</p>

          <dl className={styles.profileFacts}>
            <div><dt>Based</dt><dd>London, UK</dd></div>
            <div><dt>Focus</dt><dd>Full-stack · product · systems</dd></div>
            <div><dt>Status</dt><dd><i /> Open to work</dd></div>
          </dl>
        </div>
      </div>

      <div className={styles.principleStrip}>
        {principles.map((principle) => (
          <article key={principle.index}>
            <span>{principle.index}</span>
            <h3>{principle.title}</h3>
          </article>
        ))}
      </div>

      <footer className={styles.previewFooter}>
        <Link href="/about">Open full profile ↗</Link>
        <a href="https://github.com/amirabenbouali" rel="noreferrer" target="_blank">GitHub ↗</a>
        <a href="https://www.linkedin.com/in/amirabenbouali/" rel="noreferrer" target="_blank">LinkedIn ↗</a>
      </footer>
    </div>
  );
}

export function DesktopAboutPage() {
  return (
    <main className={styles.page}>
      <div className={styles.noise} aria-hidden="true" />

      <header className={styles.pageHeader}>
        <Link href="/">Amira Benbouali</Link>
        <span>Personal profile / 2026</span>
      </header>

      <article className={styles.window}>
        <header className={styles.windowBar}>
          <span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span>
          <span>amira — profile</span>
          <Link href="/" aria-label="Close profile and return to desktop">×</Link>
        </header>

        <div className={styles.workspace}>
          <aside className={styles.sidebar} aria-label="About page sections">
            <div className={styles.sidebarPortrait}>
              <Image alt="Amira Lina Benbouali" fill loading="eager" sizes="180px" src="/images/amira-portrait-profile.jpg" />
            </div>
            <div className={styles.sidebarIdentity}>
              <b>Amira Lina Benbouali</b>
              <span>Software engineer</span>
              <small><i /> London, UK</small>
            </div>
            <nav>
              <a href="#profile">Profile</a>
              <a href="#approach">How I work</a>
              <a href="#currently">Working notes</a>
              <a href="#toolbox">Toolbox</a>
            </nav>
            <Link className={styles.backLink} href="/">← Desktop</Link>
          </aside>

          <div className={styles.document}>
            <section className={styles.hero} id="profile">
              <div className={styles.heroTopline}>
                <p>Profile / 2026</p>
                <span><i /> Open to work</span>
              </div>
              <h1>The person<br />behind the <em>tabs.</em></h1>
              <p className={styles.heroLead}>I&apos;m Amira, a software engineer who likes turning fuzzy product problems into software with a clear shape.</p>
              <dl className={styles.heroMeta}>
                <div><dt>Background</dt><dd>BSc Computer Science</dd></div>
                <div><dt>Focus</dt><dd>Products · tools · systems</dd></div>
                <div><dt>Languages</dt><dd>English · French · Arabic · Spanish · Italian</dd></div>
              </dl>
            </section>

            <section className={styles.story}>
              <p className={styles.sectionLabel}>01 / The work</p>
              <div>
                <h2>I&apos;m interested in the whole path from first question to finished interaction.</h2>
                <div className={styles.storyCopy}>
                  <p>I rarely think of design and engineering as separate jobs. A data model changes what an interface can explain; an interaction can reveal where a system is fighting its user.</p>
                  <p>I enjoy moving between those layers: asking what belongs in the product, mapping how it should behave, and giving the implementation enough structure to keep evolving.</p>
                </div>
              </div>
            </section>

            <section className={styles.approach} id="approach">
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>02 / How I work</p>
                <h2>How the work takes shape.</h2>
              </div>
              <div className={styles.principles}>
                {principles.map((principle) => (
                  <article key={principle.index}>
                    <span>{principle.index}</span>
                    <h3>{principle.title}</h3>
                    <p>{principle.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.currently} id="currently">
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>03 / Working notes</p>
                <h2>What guides the work.</h2>
              </div>
              <dl>
                {workingNotes.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
              </dl>
            </section>

            <section className={styles.toolbox} id="toolbox">
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>04 / Toolbox</p>
                <h2>The practical bit.</h2>
              </div>
              <dl>
                {toolbox.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
              </dl>
            </section>

            <section className={styles.elsewhere}>
              <div>
                <p className={styles.sectionLabel}>05 / Elsewhere</p>
                <h2>Continue the conversation.</h2>
              </div>
              <nav aria-label="External profile links">
                <a href="mailto:amiralinabenbouali@gmail.com"><span>Email</span><b>Start a conversation ↗</b></a>
                <a href="https://github.com/amirabenbouali" rel="noreferrer" target="_blank"><span>GitHub</span><b>Explore the code ↗</b></a>
                <a href="https://www.linkedin.com/in/amirabenbouali/" rel="noreferrer" target="_blank"><span>LinkedIn</span><b>Connect with me ↗</b></a>
              </nav>
            </section>

            <footer className={styles.documentFooter}>
              <span>End of profile</span>
              <Link href="/">Return to desktop ↗</Link>
            </footer>
          </div>
        </div>
      </article>
    </main>
  );
}
