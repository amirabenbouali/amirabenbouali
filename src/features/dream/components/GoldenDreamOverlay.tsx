import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, FormEvent, MutableRefObject } from 'react';
import type { DreamTimelineSnapshot } from '../timeline/dreamTimeline';
import type { PointerInfluenceRef } from './PointerInfluence';
import styles from '../DreamExperience.module.css';

type GoldenDreamOverlayProps = {
  timeline: DreamTimelineSnapshot;
  pointer: MutableRefObject<PointerInfluenceRef>;
};

const letters = ['t', 'h', 'o', 'u', 'g', 'h', 't'];
const days = Array.from({ length: 35 }, (_, index) => String(index + 1).padStart(2, '0'));
const foldCells = Array.from({ length: 35 }, (_, index) => index);
const tokens = ['SELECT', 'ideas', 'FROM', 'memory', 'WHERE'];
const nameLetters = 'AMIRA BENBOUALI'.split('');
const spans = [
  [0, 0.07],
  [0.06, 0.12],
  [0.11, 0.3],
  [0.29, 0.37],
  [0.36, 0.55],
  [0.54, 0.73],
  [0.72, 0.83],
  [0.82, 0.92],
  [0.91, 0.96],
  [0.95, 1]
] as const;

const memoryFragments = [
  ['London', 'the place where the work became real', 'f01'],
  ['Computer Science', 'systems, interfaces, language', 'f02'],
  ['Running', 'patience measured in kilometres', 'f03'],
  ['Architecture', 'quiet spaces, clear structure', 'f04'],
  ['Unfinished notes', 'ideas before they become products', 'f05'],
  ['Building', 'the part I return to every day', 'f06']
] as const;

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function smooth(value: number) {
  return value * value * (3 - 2 * value);
}

function local(progress: number, start: number, end: number) {
  return clamp((progress - start) / (end - start));
}

function phase(progress: number, start: number, end: number) {
  return smooth(local(progress, start, end));
}

function setLayer(layer: HTMLElement | null, opacity: number, scale = 1, tx = 0, ty = 0, blur = 0) {
  if (!layer) return;
  layer.style.opacity = String(opacity);
  layer.style.transform = `translate3d(${tx}px,${ty}px,0) scale(${scale})`;
  layer.style.filter = `blur(${blur}px)`;
  layer.classList.toggle(styles.conceptActive, opacity > 0.45);
}

export function GoldenDreamOverlay({ timeline, pointer }: GoldenDreamOverlayProps) {
  const hero = useRef<HTMLElement>(null);
  const portal = useRef<HTMLElement>(null);
  const atria = useRef<HTMLElement>(null);
  const fold = useRef<HTMLElement>(null);
  const foundry = useRef<HTMLElement>(null);
  const terminal = useRef<HTMLElement>(null);
  const pipeline = useRef<HTMLElement>(null);
  const memory = useRef<HTMLElement>(null);
  const assembly = useRef<HTMLElement>(null);
  const contact = useRef<HTMLElement>(null);
  const portalRing = useRef<HTMLDivElement>(null);
  const calendarWrap = useRef<HTMLDivElement>(null);
  const sun = useRef<HTMLDivElement>(null);
  const timeLabel = useRef<HTMLDivElement>(null);
  const stageLabel = useRef<HTMLDivElement>(null);
  const signal = useRef<HTMLDivElement>(null);
  const fracture = useRef<HTMLDivElement>(null);
  const foundryStatus = useRef<HTMLDivElement>(null);
  const cursorWorld = useRef<HTMLDivElement>(null);
  const artifact = useRef<HTMLDivElement>(null);
  const crack = useRef<HTMLDivElement>(null);
  const finalRipple = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const foldRefs = useRef<Array<HTMLDivElement | null>>([]);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const tokenRefs = useRef<Array<HTMLDivElement | null>>([]);
  const fragmentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pieceRefs = useRef<Array<HTMLDivElement | null>>([]);
  const nameRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const lineRefs = useRef<Array<SVGLineElement | null>>([]);
  const progress = useRef(timeline.progress);
  const smoothPointer = useRef({ x: 0.5, y: 0.5 });
  const [sent, setSent] = useState(false);

  const pieces = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => ({
        angle: ((index * 47) % 360) * (Math.PI / 180),
        radius: 120 + ((index * 83) % 330),
        z: -240 + ((index * 59) % 480)
      })),
    []
  );

  useEffect(() => {
    progress.current = timeline.progress;
  }, [timeline.progress]);

  useEffect(() => {
    let frame = 0;

    const updateLines = () => {
      const pairs = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 0]
      ];
      pairs.forEach(([from, to], index) => {
        const source = fragmentRefs.current[from]?.getBoundingClientRect();
        const target = fragmentRefs.current[to]?.getBoundingClientRect();
        const line = lineRefs.current[index];
        if (!source || !target || !line) return;
        line.setAttribute('x1', String(source.left + source.width / 2));
        line.setAttribute('y1', String(source.top + source.height / 2));
        line.setAttribute('x2', String(target.left + target.width / 2));
        line.setAttribute('y2', String(target.top + target.height / 2));
      });
    };

    const frameLoop = () => {
      const p = clamp(progress.current);
      const mx = (pointer.current.targetX + 1) / 2;
      const my = (pointer.current.targetY + 1) / 2;
      smoothPointer.current.x = lerp(smoothPointer.current.x, mx, 0.045);
      smoothPointer.current.y = lerp(smoothPointer.current.y, my, 0.045);
      const smx = smoothPointer.current.x;
      const smy = smoothPointer.current.y;
      const vals = spans.map(([start, end]) => local(p, start, end));

      const h = phase(vals[0], 0.5, 1);
      const po = vals[1];
      setLayer(hero.current, 1 - po * 1.4, 1 + po * 0.16, 0, -po * 25, po * 5);
      letterRefs.current.forEach((letter, index) => {
        if (!letter) return;
        const dist = index - 2;
        const wave = Math.sin(index * 1.7 + p * 20);
        letter.style.transform = `translate3d(${dist * h * 20 + wave * h * 6}px,${Math.cos(index + p * 9) * h * 12}px,${
          Math.abs(dist) * h * 26
        }px) rotate(${dist * h * 4}deg)`;
        letter.style.filter = `blur(${Math.max(0, po - 0.45) * Math.abs(dist) * 4}px)`;
      });
      if (portalRing.current) {
        portalRing.current.style.opacity = String(clamp(po * 1.6));
        portalRing.current.style.transform = `translate(-50%,-50%) scale(${0.1 + po * 35})`;
      }
      setLayer(portal.current, clamp(po * 1.5 * (1 - vals[2] * 0.8)), 0.12 + po * 4.5, 0, 0, Math.max(0, po - 0.78) * 12);

      const a = vals[2];
      const foldProgress = vals[3];
      const aIn = phase(a, 0, 0.14);
      const aDrift = phase(a, 0.16, 0.76);
      const aLeave = phase(a, 0.86, 1);
      const foldIn = phase(foldProgress, 0, 0.18);
      const foldMove = phase(foldProgress, 0.5, 1);
      setLayer(atria.current, clamp(aIn * 1.45 - foldIn * 2.4), 0.78 + aIn * 0.22, 0, lerp(70, 0, aIn) - aLeave * 16, 0);
      const rx = (smy - 0.5) * -5;
      const ry = (smx - 0.5) * 10;
      if (calendarWrap.current) {
        calendarWrap.current.style.transform = `translate(-50%,-50%) perspective(1100px) rotateX(${7 + rx}deg) rotateY(${
          -8 + ry
        }deg) scale(${0.82 + aIn * 0.18 + Math.sin(p * Math.PI * 10) * aDrift * 0.004})`;
      }
      const hue = lerp(40, 215, smx);
      if (atria.current) {
        atria.current.style.background = `radial-gradient(circle at ${35 + smx * 30}% 35%,hsla(${hue},35%,55%,.12),transparent 28%),linear-gradient(180deg,hsl(${hue},20%,${lerp(
          11,
          6,
          smx
        )}%),#050605)`;
      }
      if (sun.current) sun.current.style.transform = `translate(${(smx - 0.5) * 60}px,${(smy - 0.5) * 28 + Math.sin(p * Math.PI * 8) * aDrift * 8}px)`;
      if (timeLabel.current) {
        timeLabel.current.textContent = smx < 0.33 ? 'morning · 06:42' : smx < 0.67 ? 'afternoon · 14:18' : 'night · 22:07';
      }

      setLayer(fold.current, clamp(foldIn * 1.6 - vals[4] * 2.4));
      foldRefs.current.forEach((cell, index) => {
        if (!cell) return;
        const col = index % 7;
        const row = Math.floor(index / 7);
        const dir = col - 3;
        cell.style.transform = `translate3d(${dir * foldMove * 38}px,${(row - 2) * foldMove * 28}px,${
          -Math.abs(dir) * foldMove * 45
        }px) rotateY(${dir * foldMove * 10}deg) rotateX(${row * foldMove * 3}deg)`;
        cell.style.opacity = String(1 - foldMove * 0.25);
      });

      const f = vals[4];
      const t = vals[5];
      const fIn = phase(f, 0, 0.14);
      const fIdle = phase(f, 0.16, 0.78);
      const fTransform = phase(f, 0.84, 1);
      const tIn = phase(t, 0, 0.14);
      const tIdle = phase(t, 0.16, 0.76);
      const tTransform = phase(t, 0.82, 1);
      setLayer(foundry.current, clamp(fIn * 1.5 - tIn * 2.4), 0.9 + fIn * 0.1);
      const sig = Math.min(1, fIn * 0.22 + fTransform * 0.78);
      if (signal.current) signal.current.style.transform = `translate(${sig * 42}vw,${Math.sin(sig * Math.PI) * 18}vh)`;
      const breakPhase = phase(f, 0.76, 0.94);
      if (fracture.current) {
        fracture.current.style.height = `${breakPhase * 180}px`;
        fracture.current.style.opacity = String(breakPhase);
      }
      if (foundryStatus.current) foundryStatus.current.textContent = breakPhase > 0.7 ? 'rerouting · restoring coherence' : 'system coherent';
      nodeRefs.current.forEach((node, index) => {
        if (!node) return;
        node.style.transform = `translate(${(smx - 0.5) * (index % 2 ? 18 : -18)}px,${
          (smy - 0.5) * (index % 2 ? 12 : -12) + Math.sin(p * Math.PI * 9 + index) * fIdle * 3
        }px)`;
      });

      setLayer(terminal.current, clamp(tIn * 1.55 - vals[6] * 4), 0.92 + tIn * 0.08);
      if (cursorWorld.current) {
        cursorWorld.current.style.height = `${100 + tTransform * window.innerHeight * 0.65}px`;
        cursorWorld.current.style.transform = `translate(-50%,-50%) rotate(${tTransform * 90}deg)`;
      }
      tokenRefs.current.forEach((token, index) => {
        if (!token) return;
        const angle = (index / 5) * Math.PI * 2;
        token.style.transform = `translate(${Math.cos(angle) * tTransform * 90}px,${
          Math.sin(angle) * tTransform * 70 + Math.sin(p * Math.PI * 7 + index) * tIdle * 4
        }px) rotate(${(index - 2) * tTransform * 3}deg)`;
      });

      const pi = vals[6];
      const m = vals[7];
      setLayer(pipeline.current, clamp(pi * 1.55 - m * 4.5), 0.92 + pi * 0.08);
      const travel = clamp(pi * 1.08);
      if (artifact.current) {
        artifact.current.style.left = `${78 + Math.sin(travel * Math.PI) * 3}%`;
        artifact.current.style.right = 'auto';
        artifact.current.style.transform = `translateY(-50%) rotate(${45 + travel * 180}deg) scale(${1 + Math.sin(travel * Math.PI) * 0.12})`;
      }
      const fail = clamp((pi - 0.72) / 0.16) * (1 - clamp((pi - 0.9) / 0.08));
      if (crack.current) {
        crack.current.style.opacity = String(fail);
        crack.current.style.transform = `scale(${0.8 + fail * 0.2})`;
      }

      setLayer(memory.current, clamp(m * 1.55 - vals[8] * 2), 0.94 + m * 0.06);
      fragmentRefs.current.forEach((fragment, index) => {
        if (!fragment) return;
        const dx = (smx - 0.5) * (index % 2 ? 12 : -12);
        const dy = (smy - 0.5) * (index % 3 ? 8 : -8);
        fragment.style.translate = `${dx}px ${dy}px`;
      });
      updateLines();

      const as = vals[8];
      const co = vals[9];
      setLayer(assembly.current, clamp(as * 1.55 - co * 2), 0.9 + as * 0.1);
      pieceRefs.current.forEach((piece, index) => {
        if (!piece) return;
        const base = pieces[index];
        const angle = base.angle + as * 4;
        const radius = base.radius * (1 - as * 0.75);
        const z = base.z * (1 - as);
        piece.style.transform = `translate(-50%,-50%) translate3d(${Math.cos(angle) * radius}px,${Math.sin(angle) * radius * 0.55}px,${z}px) rotate(${
          angle * 57.3
        }deg) scale(${1 - as * 0.55})`;
        piece.style.opacity = String(1 - as * 0.42);
      });
      nameRefs.current.forEach((letter, index) => {
        if (!letter) return;
        const reveal = clamp(as * 1.35 - (index / 18) * 0.35);
        letter.style.opacity = String(reveal);
        letter.style.transform = `translateY(${(1 - reveal) * 45}px) rotate(${(1 - reveal) * (index % 2 ? 8 : -8)}deg)`;
      });

      setLayer(contact.current, clamp(co * 1.5), 0.94 + co * 0.06);
      if (stageLabel.current) {
        stageLabel.current.textContent =
          p < 0.06
            ? 'the unfinished thought'
            : p < 0.12
              ? 'the letter becomes a passage'
              : p < 0.3
                ? 'atria · time becomes architecture'
                : p < 0.37
                  ? 'the calendar folds'
                : p < 0.55
                  ? 'foundry · the living system'
                    : p < 0.73
                      ? 'kansodb · language becomes matter'
                      : p < 0.83
                        ? 'mini ci · production dream'
                        : p < 0.92
                          ? 'about · fragments of amira'
                          : p < 0.96
                            ? 'everything returns'
                            : 'wake up · send a signal';
      }

      frame = requestAnimationFrame(frameLoop);
    };

    frameLoop();
    return () => cancelAnimationFrame(frame);
  }, [pieces, pointer]);

  const restart = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 1800);
  };

  return (
    <>
      <div className={styles.conceptScene} aria-hidden="true">
        <section ref={hero} className={`${styles.conceptLayer} ${styles.conceptActive} ${styles.conceptHero}`}>
          <div className={styles.conceptHeroWrap}>
            <div className={styles.conceptKicker}>an interactive short film disguised as a portfolio</div>
            <h1 className={styles.conceptHeroTitle}>
              <span className={styles.conceptChunk}>everything begins as an unfinished&nbsp;</span>
              <span className={styles.conceptWord}>
                {letters.map((letter, index) => (
                  <span
                    key={letter + index}
                    ref={(node) => {
                      letterRefs.current[index] = node;
                    }}
                    className={styles.conceptLetter}
                  >
                    {letter}
                    {index === 2 ? <div ref={portalRing} className={styles.conceptPortalRing} /> : null}
                  </span>
                ))}
              </span>
            </h1>
            <p className={styles.conceptHeroCopy}>Scroll slowly. Nothing disappears. Every object becomes part of the next dream.</p>
            <div className={styles.conceptScrollMark}>enter the unfinished thought</div>
          </div>
        </section>

        <section ref={portal} className={`${styles.conceptLayer} ${styles.conceptPortal}`}>
          <div className={styles.conceptPortalCircle} />
          <div className={styles.conceptPortalCircle} />
          <div className={styles.conceptPortalCircle} />
        </section>

        <section ref={atria} className={`${styles.conceptLayer} ${styles.conceptAtria}`}>
          <div className={styles.conceptAtriaFog} />
          <div className={styles.conceptSceneTitle}>
            <small>001 · Atria</small>
            <h2>
              Time becomes
              <br />
              <em>architecture.</em>
            </h2>
            <p>Days become rooms. Events become light. The cursor changes the hour of the dream.</p>
          </div>
          <div ref={sun} className={styles.conceptSun} />
          <div ref={calendarWrap} className={styles.conceptCalendarWrap}>
            <div className={styles.conceptCalendar}>
              {days.map((day) => (
                <div key={day} className={styles.conceptDay} data-day={day}>
                  <div className={styles.conceptEvent} />
                </div>
              ))}
            </div>
          </div>
          <div className={`${styles.conceptAtriaWord} ${styles.conceptAw1}`}>a quiet place for unfinished weeks</div>
          <div className={`${styles.conceptAtriaWord} ${styles.conceptAw2}`}>the building remembers tomorrow</div>
          <div ref={timeLabel} className={styles.conceptTime}>
            morning · 06:42
          </div>
        </section>

        <section ref={fold} className={`${styles.conceptLayer} ${styles.conceptFold}`}>
          <div className={styles.conceptFoldGrid}>
            {foldCells.map((cell) => (
              <div
                key={cell}
                ref={(node) => {
                  foldRefs.current[cell] = node;
                }}
                className={styles.conceptFoldCell}
              />
            ))}
          </div>
        </section>

        <section ref={foundry} className={`${styles.conceptLayer} ${styles.conceptFoundry}`}>
          <div className={styles.conceptSceneTitle}>
            <small>002 · Foundry</small>
            <h2>
              The grid becomes
              <br />a <em>living system.</em>
            </h2>
            <p>Ownership, incidents and deployment readiness become architecture you can move through.</p>
          </div>
          <div className={styles.conceptGraph}>
            {[
              ['domain', 'payments', 'n1'],
              ['readiness', 'production safe', 'n2'],
              ['monitoring', 'healthy', 'n3'],
              ['issue', 'signal instability', 'n4']
            ].map(([label, value, className], index) => (
              <div
                key={label}
                ref={(node) => {
                  nodeRefs.current[index] = node;
                }}
                className={`${styles.conceptNode} ${styles[className]}`}
              >
                {label}
                <b>{value}</b>
              </div>
            ))}
            <div className={`${styles.conceptEdge} ${styles.e1}`} />
            <div className={`${styles.conceptEdge} ${styles.e2}`} />
            <div className={`${styles.conceptEdge} ${styles.e3}`} />
            <div className={`${styles.conceptEdge} ${styles.e4}`} />
            <div ref={signal} className={styles.conceptSignal} />
            <div ref={fracture} className={styles.conceptFracture} />
          </div>
          <div ref={foundryStatus} className={styles.conceptFoundryStatus}>
            system coherent
          </div>
        </section>

        <section ref={terminal} className={`${styles.conceptLayer} ${styles.conceptTerminal}`}>
          <div className={styles.conceptSceneTitle}>
            <small>003 · kansoDB</small>
            <h2>
              A signal becomes
              <br />
              <em>language.</em>
            </h2>
            <p>The query is no longer text. It becomes the world the visitor travels through.</p>
          </div>
          <div ref={cursorWorld} className={styles.conceptCursorWorld} />
          <div className={styles.conceptQuery}>
            <span className={styles.kw}>SELECT</span> <span className={styles.obj}>ideas</span>
            {'\n'}
            <span className={styles.kw}>FROM</span> <span className={styles.obj}>memory</span>
            {'\n'}
            <span className={styles.kw}>WHERE</span> <span className={styles.cond}>status = 'unfinished';</span>
          </div>
          <div className={styles.conceptTokenWorld}>
            {tokens.map((token, index) => (
              <div
                key={token}
                ref={(node) => {
                  tokenRefs.current[index] = node;
                }}
                className={`${styles.conceptTokenBlock} ${styles[`tb${index + 1}`]}`}
              >
                {token}
              </div>
            ))}
            <div className={styles.conceptAstTrunk} />
            <div className={`${styles.conceptAstBranch} ${styles.b1}`} />
            <div className={`${styles.conceptAstBranch} ${styles.b2}`} />
            <div className={`${styles.conceptAstBranch} ${styles.b3}`} />
          </div>
        </section>

        <section ref={pipeline} className={`${styles.conceptLayer} ${styles.conceptPipeline}`}>
          <div className={styles.conceptMiniCiLayout}>
            <div className={styles.conceptMiniCiCopy}>
              <div className={styles.conceptMiniCiEyebrow}>004 · Mini CI · developer tool</div>
              <h2>
                Branches
                <br />
                straighten
                <br />
                into a <em>production line.</em>
              </h2>
              <p>
                Mini CI is a small continuous-integration pipeline I built from first principles to understand what happens between a
                commit and a release. Instead of configuring an existing service, I created the queue, runner, build stages, logs,
                status handling, and artifact flow myself.
              </p>
              <dl className={styles.conceptMiniCiMeta}>
                <div>
                  <dt>Role</dt>
                  <dd>Design and engineering</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>Ruby, Bash, HTML, CSS, JavaScript</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>CI/CD internals and developer tooling</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>Learning project · v1.0</dd>
                </div>
              </dl>
              <div className={styles.conceptMiniCiLinks}>
                <a href="#dream-accessible-content">View repository ↗</a>
                <a href="#dream-accessible-content">Read the case study ↓</a>
              </div>
            </div>

            <div className={styles.conceptMachine}>
              <div className={styles.conceptMachineHead}>
                <span>Build 042</span>
                <span>main · commit 8f3a1c</span>
              </div>
              <div className={styles.conceptRails}>
                {[
                  ['01 · source', 'Commit received and queued for execution.'],
                  ['02 · build', 'Ruby runner executes the configured build steps.'],
                  ['03 · test', 'Checks run and output is streamed into the log.'],
                  ['04 · artifact', 'A successful build is packaged for later use.'],
                  ['05 · release', 'The pipeline exposes a clear final state.']
                ].map(([label, copy]) => (
                  <div key={label} className={styles.conceptStage}>
                    <b>{label}</b>
                    <p>{copy}</p>
                    <div className={styles.conceptStageBar} />
                  </div>
                ))}
              </div>
              <div className={styles.conceptScanner} />
              <div ref={artifact} className={styles.conceptArtifact} />
              <div ref={crack} className={styles.conceptCrack}>
                FAILED BUILD // RESTORING SOURCE
              </div>
              <div className={styles.conceptMachineNote}>source → build → test → artifact → release</div>
            </div>
          </div>
        </section>

        <section ref={memory} className={`${styles.conceptLayer} ${styles.conceptMemory}`}>
          <div className={`${styles.conceptSceneTitle} ${styles.conceptMemoryTitle}`}>
            <small>About · discovered, not announced</small>
            <h2>
              The system becomes
              <br />
              <em>a memory of Amira.</em>
            </h2>
            <p>Move the cursor. The fragments connect differently depending on how you look at them.</p>
          </div>
          <div className={styles.conceptMemoryLines}>
            <svg>
              {[0, 1, 2, 3, 4, 5].map((line) => (
                <line
                  key={line}
                  ref={(node) => {
                    lineRefs.current[line] = node;
                  }}
                />
              ))}
            </svg>
          </div>
          {memoryFragments.map(([title, copy, className], index) => (
            <div
              key={title}
              ref={(node) => {
                fragmentRefs.current[index] = node;
              }}
              className={`${styles.conceptFragment} ${styles[className]}`}
            >
              <strong>{title}</strong>
              {copy}
            </div>
          ))}
          <div className={styles.conceptHiddenNote}>not a biography. a constellation of choices.</div>
        </section>

        <section ref={assembly} className={`${styles.conceptLayer} ${styles.conceptAssembly}`}>
          <div className={styles.conceptOrbit}>
            {pieces.map((piece, index) => (
              <div
                key={`${piece.angle}-${index}`}
                ref={(node) => {
                  pieceRefs.current[index] = node;
                }}
                className={styles.conceptPiece}
              />
            ))}
          </div>
          <div className={styles.conceptName}>
            {nameLetters.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                ref={(node) => {
                  nameRefs.current[index] = node;
                }}
              >
                {letter === ' ' ? '\u00a0' : letter}
              </span>
            ))}
          </div>
          <div className={styles.conceptWakeCopy}>everything returns, but nothing returns unchanged</div>
        </section>

        <section ref={contact} className={`${styles.conceptLayer} ${styles.conceptContact}`}>
          <div className={styles.conceptContactInner}>
            <h2>
              shall we build
              <br />
              <em>something real?</em>
            </h2>
            <form className={styles.conceptContactForm} onSubmit={submitContact}>
              <input aria-label="Your message" placeholder="leave a signal..." />
              <button type="submit">send</button>
            </form>
          </div>
          <div ref={finalRipple} className={`${styles.conceptFinalRipple} ${sent ? styles.conceptSent : ''}`} />
          <div className={styles.conceptInspectNav}>
            <a href="#dream-accessible-content">projects</a>
            <a href="#about-heading">about</a>
            <a href="mailto:contact@amirabenbouali.com">contact</a>
          </div>
        </section>

        <div className={styles.conceptGrain} />
      </div>

      <div className={styles.conceptTopbar}>
        <span>Amira Benbouali</span>
        <span>lucid software dream · full concept preview</span>
      </div>
      <div ref={stageLabel} className={styles.conceptStageLabel}>
        the unfinished thought
      </div>
      <div className={styles.conceptProgress} style={{ '--progress': Math.round(timeline.progress * 100) } as CSSProperties} />
      <button type="button" className={styles.conceptRestart} onClick={restart}>
        restart dream
      </button>
    </>
  );
}
