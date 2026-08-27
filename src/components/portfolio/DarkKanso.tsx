'use client';

import { Fragment, useState } from 'react';
import { pathForView } from './data';
import { useDarkChrome } from './DarkChromeContext';
import shell from './DarkShell.module.css';
import styles from './DarkKanso.module.css';

const tokens = ['SELECT', 'IDENTIFIER', 'FROM', 'IDENTIFIER', 'WHERE', 'EQUALS', 'STRING', 'ORDER_BY'];

const astNodes = [
  'Query',
  'SelectClause → name, role',
  'FromClause → engineers',
  "WhereClause → stack = 'typescript'",
  'OrderClause → experience DESC'
];

const resultRows = [
  ['Amira', 'Engineer', '04'],
  ['Lina', 'Builder', '03'],
  ['Kanso', 'Engine', '01']
];

const chapters = ['intro', 'parser', 'execution', 'stack'];

export function DarkKanso() {
  const { setIsBig, wipeTo } = useDarkChrome();
  const [activeChapter, setActiveChapter] = useState(0);

  const goBack = () => wipeTo(pathForView('work'));

  return (
    <main className={shell.shell}>
      <div className={shell.grain} aria-hidden="true" />

      <div className={shell.content}>
        <header className={shell.top}>
          <div className={shell.brand}>
            AMIRA
            <br />
            BENBOUALI
          </div>
          <div className={shell.role}>
            selected work / 03
            <br />
            query engine
          </div>
          <button
            className={styles.back}
            onClick={goBack}
            onMouseEnter={() => setIsBig(true)}
            onMouseLeave={() => setIsBig(false)}
            type="button"
          >
            ← work
          </button>
        </header>

        <section className={styles.stage}>
          <div className={styles.copy}>
            <div>
              <div className={styles.kicker}>03 / KansoDB</div>

              <h1 className={styles.title}>
                KANSODB
                <span>QUERY</span>
              </h1>

              <div className={styles.tagline}>from text, to execution.</div>

              <p className={styles.desc}>
                A lightweight SQL-style engine built to explore tokenisation, parsing, AST construction and query
                execution from the inside out.
              </p>

              <div className={styles.meta}>
                <div>
                  <b>Role</b>Systems exploration + implementation
                </div>
                <div>
                  <b>Year</b>2026
                </div>
                <div>
                  <b>Stack</b>TypeScript · Parser · AST · Execution
                </div>
                <div>
                  <b>Focus</b>Language processing · execution · internals
                </div>
              </div>
            </div>

            <div className={styles.foot}>case study · 03 / 04</div>
          </div>

          <div className={styles.experience}>
            <div className={styles.pinkField}>
              <div className={styles.giantWord} aria-hidden="true">
                KANSODB
              </div>

              <div className={styles.signal} aria-hidden="true">
                <div className={styles.signalCore} />
              </div>

              <div
                className={styles.workspace}
                onMouseEnter={() => setIsBig(true)}
                onMouseLeave={() => setIsBig(false)}
              >
                <div className={styles.sysTop}>
                  <span>kansodb / query lab</span>
                  <span className={styles.healthy}>engine ready</span>
                </div>

                <div className={styles.kansoBody}>
                  <div className={styles.querySide}>
                    <div className={styles.panelHead}>
                      <span>01 / input query</span>
                      <span>SQL-ish</span>
                    </div>

                    <pre className={styles.editor}>
                      <span className={styles.kw}>SELECT</span> name, role{'\n'}
                      <span className={styles.kw}>FROM</span> engineers{'\n'}
                      <span className={styles.kw}>WHERE</span> stack = <span className={styles.dim}>&apos;typescript&apos;</span>
                      {'\n'}
                      <span className={styles.kw}>ORDER BY</span> experience <span className={styles.kw}>DESC</span>;
                    </pre>

                    <div className={styles.tokens}>
                      <div className={styles.tokensTitle}>02 / tokens</div>
                      <div className={styles.tokenWrap}>
                        {tokens.map((token, index) => (
                          <span className={styles.token} key={`${token}-${index}`}>
                            {token}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.flowline}>
                      <b>tokenise</b> → <b>parse</b> → <b>AST</b> → <b>execute</b>
                    </div>
                  </div>

                  <div className={styles.executeSide}>
                    <div className={styles.panelHead}>
                      <span>03 / parse tree</span>
                      <span>AST</span>
                    </div>

                    <div className={styles.ast}>
                      {astNodes.map((node, index) => (
                        <div
                          className={`${styles.astNode} ${index === 0 ? styles.astNodeActive : ''}`}
                          key={node}
                        >
                          {node}
                        </div>
                      ))}
                    </div>

                    <div className={styles.result}>
                      <div className={styles.resultHead}>
                        <span>04 / result</span>
                        <span>3 rows · 2ms</span>
                      </div>
                      <div className={styles.resultTable}>
                        <span>
                          <b>name</b>
                        </span>
                        <span>
                          <b>role</b>
                        </span>
                        <span>
                          <b>exp</b>
                        </span>
                        {resultRows.map((row) => (
                          <Fragment key={row[0]}>
                            <span>{row[0]}</span>
                            <span>{row[1]}</span>
                            <span>{row[2]}</span>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.chapter}>
                {chapters.map((chapter, index) => (
                  <div
                    className={`${styles.chapterItem} ${activeChapter === index ? styles.chapterActive : ''}`}
                    key={chapter}
                    onMouseEnter={() => setActiveChapter(index)}
                  >
                    <span className={styles.chapterDot} />
                    <span>{chapter}</span>
                  </div>
                ))}
              </div>

              <div className={styles.sideNote}>learning databases from the inside out.</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
