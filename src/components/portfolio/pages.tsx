'use client';

import styles from './ScrapbookPortfolio.module.css';

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

