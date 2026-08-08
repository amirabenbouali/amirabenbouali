import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, FormEvent, MutableRefObject } from 'react';
import type { DreamTimelineSnapshot } from '../timeline/dreamTimeline';
import type { PointerInfluenceRef } from './PointerInfluence';
import styles from '../DreamExperience.module.css';

type GoldenDreamOverlayProps = {
  timeline: DreamTimelineSnapshot;
  pointer: MutableRefObject<PointerInfluenceRef>;
};

const letters = ['t', 'h', 'o', 'u', 'g', 'h', 't'];
const foldCells = Array.from({ length: 35 }, (_, index) => index);
const nameLetters = 'AMIRA BENBOUALI'.split('');
const atriaWeekDays = ['Mon', 'Tue', 'Wed', 'Thu'];
const atriaModes = [
  ['Calm', 'Only what matters now. More space, fewer decisions.'],
  ['Balanced', 'A readable week with tasks and events in context.'],
  ['Planner', 'Dense scheduling, time blocks and detailed planning.']
] as const;
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
  [
    '01 · origin',
    'Computer Science',
    'systems, interfaces, language',
    'The place where curiosity became method: learning how software behaves beneath the surface.',
    'f01'
  ],
  [
    '02 · rhythm',
    'Running',
    'patience measured in kilometres',
    'A reminder that consistency compounds — the same principle I use when building difficult things.',
    'f02'
  ],
  [
    '03 · place',
    'London',
    'where the work became real',
    'A city that turned study into momentum, and ideas into projects meant to be shared.',
    'f03'
  ],
  [
    '04 · raw material',
    'Unfinished notes',
    'ideas before they become products',
    'Fragments live here first: sketches, interfaces, systems, names and half-built mechanisms.',
    'f04'
  ],
  [
    '05 · practice',
    'Building',
    'the part I return to every day',
    'The point where thinking becomes tangible — code, structure, interaction and iteration.',
    'f05'
  ],
  [
    '06 · instinct',
    'Architecture',
    'quiet spaces, clear structure',
    'Why I care about systems that feel calm: good structure should make complexity easier to enter.',
    'f06'
  ]
] as const;

const memoryEdges = [
  [0, 5],
  [1, 5],
  [2, 5],
  [3, 5],
  [4, 5],
  [0, 2],
  [2, 3],
  [1, 4]
] as const;

const foundryNodes = [
  {
    label: 'Domain',
    title: 'Payments',
    details: ['Owner · Amira', 'Health · 98%'],
    className: 'n1'
  },
  {
    label: 'Incident',
    title: 'Payment latency spike',
    details: ['Severity · SEV-2', 'Status · Investigating'],
    className: 'n2'
  },
  {
    label: 'Readiness',
    title: 'Notification pipeline',
    details: ['Rollout · 25%', 'Tests · Passed'],
    className: 'n3'
  },
  {
    label: 'Monitoring',
    title: 'API latency',
    details: ['P95 · 184ms', 'Status · Healthy'],
    className: 'n4'
  }
] as const;

const foundryDashboardPanels = [
  ['Domains', 'Payments', 'Owner Amira · 98% health'],
  ['Incidents', 'Latency spike', 'SEV-2 · Investigating'],
  ['Deployments', 'Checkout service', 'Staged · 3 checks'],
  ['Readiness', 'Notification pipeline', '25% rollout · tests passed'],
  ['Monitoring', 'API latency', 'P95 184ms · healthy'],
  ['Triage queue', '2 open signals', 'Impact sorted · owner assigned']
] as const;

const kansoPipelineCards = [
  ['01 · Tokenizer', '8 tokens', 'Keywords, identifiers, operator and literal are separated.'],
  ['02 · Parser', 'SelectStatement', 'Tokens become a structured syntax tree.'],
  ['03 · Executor', '3 rows matched', 'The AST is evaluated against the in-memory tables.'],
  ['04 · Status', '2.4 ms', 'Query complete · no errors.']
] as const;

const kansoResults = [
  ['build a SQL engine', 'unfinished'],
  ['redesign the parser', 'unfinished'],
  ['add query optimisation', 'unfinished']
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
  layer.style.visibility = opacity < 0.002 ? 'hidden' : 'visible';
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
  const finalRipple = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const foldRefs = useRef<Array<HTMLDivElement | null>>([]);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const fragmentRefs = useRef<Array<HTMLElement | null>>([]);
  const pieceRefs = useRef<Array<HTMLDivElement | null>>([]);
  const nameRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const lineRefs = useRef<Array<SVGLineElement | null>>([]);
  const progress = useRef(timeline.progress);
  const smoothPointer = useRef({ x: 0.5, y: 0.5 });
  const [sent, setSent] = useState(false);
  const [activeMemoryFragment, setActiveMemoryFragment] = useState<number | null>(null);

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
    let lastFrame = 0;
    let isRunning = false;

    const updateLines = () => {
      memoryEdges.forEach(([from, to], index) => {
        const source = fragmentRefs.current[from]?.getBoundingClientRect();
        const target = fragmentRefs.current[to]?.getBoundingClientRect();
        const line = lineRefs.current[index];
        if (!source || !target || !line) return;
        const svg = line.ownerSVGElement?.getBoundingClientRect();
        if (!svg) return;
        line.setAttribute('x1', String(source.left - svg.left + source.width / 2));
        line.setAttribute('y1', String(source.top - svg.top + source.height / 2));
        line.setAttribute('x2', String(target.left - svg.left + target.width / 2));
        line.setAttribute('y2', String(target.top - svg.top + target.height / 2));
      });
    };

    const stopLoop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
      isRunning = false;
    };

    const frameLoop = (now = 0) => {
      if (document.hidden) {
        stopLoop();
        return;
      }

      frame = requestAnimationFrame(frameLoop);
      if (now - lastFrame < 16) return;
      lastFrame = now;

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
        calendarWrap.current.style.transform = `perspective(1100px) rotateX(${5 + rx * 0.45}deg) rotateY(${
          -4 + ry * 0.42
        }deg) scale(${0.96 + aIn * 0.04 + Math.sin(p * Math.PI * 10) * aDrift * 0.004})`;
      }
      const hue = lerp(40, 215, smx);
      if (atria.current) {
        const calendarExit = phase(a, 0.36, 0.54);
        const modeIn = phase(a, 0.42, 0.58);
        const modeOut = phase(a, 0.6, 0.74);
        const workspaceIn = phase(a, 0.68, 0.82);
        atria.current.style.setProperty('--atria-progress', a.toFixed(3));
        atria.current.style.setProperty('--atria-calendar', String(clamp(1 - calendarExit)));
        atria.current.style.setProperty('--atria-calendar-exit', calendarExit.toFixed(3));
        atria.current.style.setProperty('--atria-modes', String(modeIn * (1 - modeOut)));
        atria.current.style.setProperty('--atria-modes-in', modeIn.toFixed(3));
        atria.current.style.setProperty('--atria-modes-out', modeOut.toFixed(3));
        atria.current.style.setProperty('--atria-workspace', String(workspaceIn));
        atria.current.style.setProperty('--atria-hue', hue.toFixed(1));
        atria.current.style.background = `radial-gradient(circle at ${55 + smx * 24}% 43%,rgba(185,140,143,.12),transparent 32%),linear-gradient(rgba(75,74,66,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(75,74,66,.035) 1px,transparent 1px),#f3eee7`;
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
      const tTransform = phase(t, 0.82, 1);
      setLayer(foundry.current, clamp(fIn * 1.5 - tIn * 2.4), 0.9 + fIn * 0.1);
      const sig = Math.min(1, fIn * 0.22 + fTransform * 0.78);
      const foundryResolve = phase(f, 0.62, 0.94);
      if (foundry.current) foundry.current.style.setProperty('--foundry-resolve', foundryResolve.toFixed(3));
      if (signal.current) signal.current.style.transform = `translate(${sig * 32}vw,${Math.sin(sig * Math.PI) * 18}vh)`;
      if (signal.current) signal.current.style.opacity = String(1 - foundryResolve * 0.82);
      const breakPhase = phase(f, 0.76, 0.94);
      if (fracture.current) {
        fracture.current.style.height = `${breakPhase * 180}px`;
        fracture.current.style.opacity = String(breakPhase * (1 - foundryResolve * 0.9));
      }
      if (foundryStatus.current) {
        foundryStatus.current.textContent = foundryResolve > 0.68 ? 'operations dashboard resolved' : 'system responsibilities connecting';
      }
      nodeRefs.current.forEach((node, index) => {
        if (!node) return;
        node.style.transform = `translate(${(smx - 0.5) * (index % 2 ? 18 : -18)}px,${
          (smy - 0.5) * (index % 2 ? 12 : -12) + Math.sin(p * Math.PI * 9 + index) * fIdle * 3
        }px)`;
      });

      const miniHandoff = phase(vals[6], 0, 0.16);
      setLayer(terminal.current, clamp(tIn * 1.55 - miniHandoff * 1.7), 0.92 + tIn * 0.08);
      const orbitOut = phase(t, 0.15, 0.27);
      const pipelineIn = phase(t, 0.23, 0.34);
      const pipelineOut = phase(t, 0.43, 0.54);
      const astIn = phase(t, 0.5, 0.61);
      const astOut = phase(t, 0.69, 0.79);
      const resultPhase = phase(t, 0.72, 0.92);
      if (terminal.current) {
        terminal.current.style.setProperty('--kanso-orbit', (1 - orbitOut).toFixed(3));
        terminal.current.style.setProperty('--kanso-pipeline', (pipelineIn * (1 - pipelineOut)).toFixed(3));
        terminal.current.style.setProperty('--kanso-ast', (astIn * (1 - astOut)).toFixed(3));
        terminal.current.style.setProperty('--kanso-result', resultPhase.toFixed(3));
      }
      if (cursorWorld.current) {
        cursorWorld.current.style.height = `${120 + tTransform * window.innerHeight * 0.18}px`;
        cursorWorld.current.style.transform = `translate(-50%,-50%) rotate(${tTransform * 90}deg)`;
      }

      const pi = vals[6];
      const m = vals[7];
      const miniSceneIn = phase(pi, 0, 0.22);
      const miniSceneOut = phase(m, 0, 0.2);
      const miniStory = phase(pi, 0.34, 0.98);
      setLayer(pipeline.current, clamp(miniSceneIn * 1.2 - miniSceneOut * 1.8), 0.96 + miniSceneIn * 0.04);
      if (pipeline.current) {
        const commitOut = phase(miniStory, 0.18, 0.32);
        const pipelineIn = phase(miniStory, 0.24, 0.38);
        const pipelineOut = phase(miniStory, 0.62, 0.74);
        const failureIn = phase(miniStory, 0.54, 0.68);
        const failureOut = phase(miniStory, 0.74, 0.84);
        const dashboardIn = phase(miniStory, 0.78, 0.9);
        const dashboardOut = phase(miniStory, 0.92, 0.98);
        const finalIn = phase(miniStory, 0.94, 1);
        const travel = phase(miniStory, 0.34, 0.6);
        pipeline.current.style.setProperty('--mini-story', miniStory.toFixed(3));
        pipeline.current.style.setProperty('--mini-commit', String(1 - commitOut));
        pipeline.current.style.setProperty('--mini-pipeline', String(pipelineIn * (1 - pipelineOut)));
        pipeline.current.style.setProperty('--mini-travel', travel.toFixed(3));
        pipeline.current.style.setProperty('--mini-failure', String(failureIn * (1 - failureOut)));
        pipeline.current.style.setProperty('--mini-dashboard', String(dashboardIn * (1 - dashboardOut)));
        pipeline.current.style.setProperty('--mini-dashboard-in', dashboardIn.toFixed(3));
        pipeline.current.style.setProperty('--mini-final', String(finalIn));
        [0, 0.25, 0.5, 0.75, 1].forEach((threshold, index) => {
          const passed = phase(travel, Math.max(0, threshold - 0.018), Math.min(1, threshold + 0.018));
          pipeline.current?.style.setProperty(`--mini-stage-${index + 1}`, passed.toFixed(3));
        });
      }

      const memoryEntrance = phase(m, 0.18, 0.42);
      const memoryOpacity = clamp(memoryEntrance * 1.55 - vals[8] * 2);
      setLayer(memory.current, memoryOpacity, 0.94 + m * 0.06);
      const memoryFinal = phase(m, 0.68, 0.94);
      if (memory.current) {
        memory.current.style.setProperty('--memory-main', String(1 - memoryFinal));
        memory.current.style.setProperty('--memory-final', String(memoryFinal));
      }
      fragmentRefs.current.forEach((fragment, index) => {
        if (!fragment) return;
        const dx = Math.sin(m * 3.2 + index * 1.1) * 8 + (smx - 0.5) * (index % 2 ? 8 : -8);
        const dy = Math.cos(m * 2.6 + index * 0.7) * 5 + (smy - 0.5) * (index % 3 ? 5 : -5);
        fragment.style.translate = `${dx}px ${dy}px`;
      });
      if (memoryOpacity > 0.05) updateLines();

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
                        ? 'mini ci · confidence before release'
                        : p < 0.92
                          ? 'about · fragments of amira'
                          : p < 0.96
                            ? 'everything returns'
                            : 'wake up · send a signal';
      }

    };

    const startLoop = () => {
      if (isRunning || document.hidden) return;
      isRunning = true;
      lastFrame = 0;
      frame = requestAnimationFrame(frameLoop);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    startLoop();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopLoop();
    };
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
          <div className={styles.conceptAtriaLayout}>
            <div className={styles.conceptAtriaCopy}>
              <small>001 · Atria</small>
              <h2>
                The room becomes
                <br />
                <em>a calendar.</em>
              </h2>
              <p>
                Atria is a planning environment for events, tasks and weekly reflection, designed to make busy schedules easier
                to understand and rearrange.
              </p>
              <p className={styles.conceptAtriaSecondary}>
                The interface adapts to how much structure you need — from a quiet daily view to a dense planning workspace.
              </p>
              <dl className={styles.conceptAtriaMeta}>
                <div>
                  <dt>Product</dt>
                  <dd>Calendar · Tasks · Recurring events · Insights · Weekly review</dd>
                </div>
                <div>
                  <dt>Engineering</dt>
                  <dd>React · TypeScript · Zustand · date-fns · Framer Motion · dnd-kit</dd>
                </div>
              </dl>
              <a className={styles.conceptAtriaCta} href="/work/atria">
                Explore Atria ↗
              </a>
            </div>
            <div ref={calendarWrap} className={styles.conceptAtriaWorkspace}>
              <div className={styles.conceptAtriaOrbit} />
              <div className={`${styles.conceptAtriaLine} ${styles.al1}`} />
              <div className={`${styles.conceptAtriaLine} ${styles.al2}`} />
              <div className={styles.conceptAtriaCalendarShell}>
                <div className={styles.conceptAtriaCalendar}>
                  <div className={styles.conceptAtriaCorner} />
                  {atriaWeekDays.map((day) => (
                    <div key={day} className={styles.conceptAtriaDay}>
                      {day}
                    </div>
                  ))}
                  {['09', '11', '14', '16', '18'].map((time, row) => (
                    <Fragment key={time}>
                      <div className={styles.conceptAtriaTimeCell}>{time}</div>
                      {atriaWeekDays.map((day, col) => {
                        const key = `${day}-${time}`;
                        return (
                          <div key={key} className={styles.conceptAtriaCell}>
                            {row === 0 && col === 0 ? (
                              <div className={`${styles.conceptAtriaEvent} ${styles.ae1}`}>
                                <b>Deep work</b>
                                <span>09:00–11:00</span>
                              </div>
                            ) : null}
                            {row === 1 && col === 1 ? (
                              <div className={`${styles.conceptAtriaEvent} ${styles.ae2}`}>
                                <b>Design review</b>
                                <span>11:30</span>
                              </div>
                            ) : null}
                            {row === 2 && col === 2 ? (
                              <div className={`${styles.conceptAtriaEvent} ${styles.ae3}`}>
                                <b>Project review</b>
                                <span>14:00</span>
                              </div>
                            ) : null}
                            {row === 3 && col === 3 ? (
                              <div className={`${styles.conceptAtriaEvent} ${styles.ae4}`}>
                                <b>Weekly reflection</b>
                                <span>16:30</span>
                              </div>
                            ) : null}
                            {row === 4 && col === 0 ? (
                              <div className={`${styles.conceptAtriaEvent} ${styles.ae5}`}>
                                <b>Run</b>
                                <span>18:00</span>
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                    </Fragment>
                  ))}
                </div>
                <div className={styles.conceptAtriaNote}>Move “Project review” to Wednesday?</div>
              </div>
              <div className={styles.conceptAtriaModePanel}>
                <div className={styles.conceptAtriaModeCard}>
                  <small>How much structure do you need today?</small>
                  <div className={styles.conceptAtriaModes}>
                    {atriaModes.map(([mode, copy]) => (
                      <div key={mode} className={mode === 'Balanced' ? styles.conceptAtriaModeActive : styles.conceptAtriaMode}>
                        <b>{mode}</b>
                        <span>{copy}</span>
                      </div>
                    ))}
                  </div>
                  <p>Atria changes its density without changing your data. The same week can feel quiet, balanced or highly structured.</p>
                </div>
              </div>
              <div className={styles.conceptWorkspaceShell}>
                <aside className={styles.conceptWorkspaceSidebar}>
                  <div>atria.</div>
                  <nav>
                    <strong>Today</strong>
                    <span>Calendar</span>
                    <span>Tasks</span>
                    <span>Insights</span>
                    <span>Weekly review</span>
                    <span>Settings</span>
                  </nav>
                </aside>
                <main className={styles.conceptWorkspaceMain}>
                  <div className={styles.conceptWorkspaceHead}>
                    <h3>Your week</h3>
                    <span>Balanced mode</span>
                  </div>
                  <div className={styles.conceptWorkspaceWeek}>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday'].map((day, index) => (
                      <div key={day} className={styles.conceptWorkspaceDay}>
                        <small>{day}</small>
                        {index === 0 ? (
                          <>
                            <div className={styles.conceptWorkspaceTask}>Deep work<br />09:00</div>
                            <div className={styles.conceptWorkspaceTaskSage}>Run<br />18:00</div>
                          </>
                        ) : null}
                        {index === 1 ? <div className={styles.conceptWorkspaceTaskSage}>Design review<br />11:30</div> : null}
                        {index === 2 ? <div className={styles.conceptWorkspaceTaskGold}>Project review<br />14:00</div> : null}
                        {index === 3 ? <div className={styles.conceptWorkspaceTask}>Weekly reflection<br />16:30</div> : null}
                      </div>
                    ))}
                  </div>
                  <div className={styles.conceptWorkspaceInsight}>
                    <span>Your most focused window this week</span>
                    <strong>09:00–11:00</strong>
                  </div>
                </main>
              </div>
            </div>
          </div>
          <div ref={sun} className={styles.conceptSun} />
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
          <div className={`${styles.conceptSceneTitle} ${styles.conceptFoundryTitle}`}>
            <small>002 · Foundry</small>
            <h2>
              The grid becomes
              <br />a <em>living system.</em>
            </h2>
            <p>
              Foundry is an engineering operations platform for managing service ownership, incidents, deployment readiness and
              operational health in one place.
            </p>
            <p>
              Built to simulate how core engineering teams plan, ship, monitor and maintain production systems.
            </p>
            <dl className={styles.conceptFoundryMeta}>
              <div>
                <dt>Role</dt>
                <dd>Product design · Frontend architecture · Backend systems</dd>
              </div>
              <div>
                <dt>Stack</dt>
                <dd>Next.js · TypeScript · PostgreSQL · Prisma · Vitest · Playwright</dd>
              </div>
            </dl>
            <a href="/work/foundry" className={styles.conceptFoundryCta}>
              View Foundry case study ↗
            </a>
          </div>
          <div className={styles.conceptGraph}>
            {foundryNodes.map((node, index) => (
              <div
                key={node.label}
                ref={(node) => {
                  nodeRefs.current[index] = node;
                }}
                className={`${styles.conceptNode} ${styles[node.className]}`}
              >
                <span>{node.label}</span>
                <b>{node.title}</b>
                {node.details.map((detail) => (
                  <small key={detail}>{detail}</small>
                ))}
              </div>
            ))}
            <svg className={styles.conceptGraphLines} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line x1="26" y1="26" x2="76" y2="32" />
              <line x1="20" y1="32" x2="20" y2="71" />
              <line x1="29" y1="75" x2="71" y2="72" />
              <line x1="84" y1="39" x2="80" y2="67" />
            </svg>
            <div ref={signal} className={styles.conceptSignal} />
            <div ref={fracture} className={styles.conceptFracture} />
          </div>
          <div className={styles.conceptFoundryDashboard} aria-hidden="true">
            <div className={styles.conceptFoundryDashboardHeader}>
              <span>Foundry operations</span>
              <b>Production readiness</b>
            </div>
            <div className={styles.conceptFoundryDashboardGrid}>
              {foundryDashboardPanels.map(([label, title, detail]) => (
                <div key={label} className={styles.conceptFoundryPanel}>
                  <span>{label}</span>
                  <b>{title}</b>
                  <small>{detail}</small>
                </div>
              ))}
            </div>
          </div>
          <div ref={foundryStatus} className={styles.conceptFoundryStatus}>
            system coherent
          </div>
        </section>

        <section ref={terminal} className={`${styles.conceptLayer} ${styles.conceptTerminal}`}>
          <div className={`${styles.conceptSceneTitle} ${styles.conceptKansoTitle}`}>
            <small>003 · kansoDB</small>
            <h2>
              A signal becomes
              <br />
              <em>language.</em>
            </h2>
            <p>
              KansoDB is a lightweight SQL query engine that tokenises, parses and executes queries against an in-memory database.
            </p>
            <p>
              Built from scratch to explore how database systems transform declarative language into structured execution.
            </p>
            <dl className={styles.conceptKansoMeta}>
              <div>
                <dt>Engineering focus</dt>
                <dd>Lexing · Parsing · AST design · Query execution · Error handling</dd>
              </div>
              <div>
                <dt>Stack</dt>
                <dd>Ruby · SQL · RSpec · CLI</dd>
              </div>
            </dl>
            <a href="/work/kansodb" className={styles.conceptKansoCta}>
              Explore the query engine ↗
            </a>
          </div>
          <div className={styles.conceptKansoEngine}>
            <div className={styles.conceptQueryOrbit}>
              <div className={`${styles.conceptOrbitWord} ${styles.kansoWordOne}`}>SELECT</div>
              <div className={`${styles.conceptOrbitWord} ${styles.kansoWordTwo}`}>FROM</div>
              <div className={`${styles.conceptOrbitWord} ${styles.kansoWordThree}`}>WHERE</div>
              <div className={`${styles.conceptOrbitWord} ${styles.kansoWordFour}`}>memory</div>
              <div ref={cursorWorld} className={styles.conceptCursorWorld} />
              <div className={`${styles.conceptAstBranch} ${styles.b1}`} />
              <div className={`${styles.conceptAstBranch} ${styles.b2}`} />
              <div className={`${styles.conceptAstBranch} ${styles.b3}`} />
              <div className={styles.conceptQuery}>
                <span className={styles.kw}>SELECT</span> <span className={styles.obj}>ideas</span>
                {'\n'}
                <span className={styles.kw}>FROM</span> <span className={styles.obj}>memory</span>
                {'\n'}
                <span className={styles.kw}>WHERE</span> <span className={styles.obj}>status</span> ={' '}
                <span className={styles.cond}>'unfinished'</span>;
              </div>
            </div>
            <div className={styles.conceptKansoPipeline}>
              <div className={styles.conceptKansoPipelineRow}>
                {kansoPipelineCards.map(([label, title, body]) => (
                  <div key={label} className={styles.conceptKansoPipelineCard}>
                    <small>{label}</small>
                    <b>{title}</b>
                    <span>{body}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.conceptAstPanel}>
              <div className={styles.conceptAstBox}>
                <small>Abstract syntax tree</small>
                <pre>
                  <strong>SelectStatement</strong>
                  {'\n'}├── columns
                  {'\n'}│   └── Identifier("ideas")
                  {'\n'}├── source
                  {'\n'}│   └── Table("memory")
                  {'\n'}└── condition
                  {'\n'}    ├── Identifier("status")
                  {'\n'}    ├── Operator("=")
                  {'\n'}    └── Literal("unfinished")
                </pre>
              </div>
            </div>
            <div className={styles.conceptResultPanel}>
              <div className={styles.conceptResultCard}>
                <div className={styles.conceptResultHeader}>
                  <div>
                    <small>Execution result</small>
                    <h3>Meaning emerges.</h3>
                  </div>
                  <span>3 rows · 2.4 ms</span>
                </div>
                <table className={styles.conceptResultTable}>
                  <thead>
                    <tr>
                      <th>ideas</th>
                      <th>status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kansoResults.map(([idea, status]) => (
                      <tr key={idea}>
                        <td>{idea}</td>
                        <td>{status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section ref={pipeline} className={`${styles.conceptLayer} ${styles.conceptPipeline}`}>
          <div className={styles.conceptMiniCiLayout}>
            <div className={styles.conceptMiniCiCopy}>
              <div className={styles.conceptMiniCiEyebrow}>004 · Mini CI</div>
              <h2>
                Every change
                <br />
                <em>earns trust.</em>
              </h2>
              <p>
                Mini CI is a lightweight continuous integration platform that turns every commit into a repeatable, observable
                release process.
              </p>
              <p className={styles.conceptMiniCiSecondary}>
                Built to explore how engineering teams verify changes, surface failures and safely move code toward release.
              </p>
              <dl className={styles.conceptMiniCiMeta}>
                <div>
                  <dt>Engineering</dt>
                  <dd>Pipelines · Build automation · Test orchestration · Logs · Failure handling · Releases</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>Ruby · Bash · Git · Docker · GitHub Actions</dd>
                </div>
              </dl>
              <div className={styles.conceptMiniCiLinks}>
                <a href="#dream-accessible-content">Explore Mini CI ↗</a>
              </div>
            </div>

            <div className={styles.conceptMachine}>
              <div className={styles.conceptCommitLayer}>
                <div className={styles.conceptMiniTerminal}>
                  <small>Local repository</small>
                  <div>
                    <span>amira@mini-ci %</span> git commit -m "ship pipeline"
                  </div>
                </div>
              </div>
              <div className={styles.conceptPipelineLayer}>
                <div className={styles.conceptMiniTrack}>
                  <div className={styles.conceptMiniRail} />
                  {[
                    ['Commit', 'received', 's1'],
                    ['Build', 'compile', 's2'],
                    ['Tests', '127 checks', 's3'],
                    ['Quality', 'lint + scan', 's4'],
                    ['Release', 'ready', 's5']
                  ].map(([title, copy, className]) => (
                    <div key={title} className={`${styles.conceptMiniStation} ${styles[className]}`}>
                      <i />
                      <b>{title}</b>
                      <span>{copy}</span>
                    </div>
                  ))}
                  <div className={styles.conceptMiniDot} />
                  <div className={styles.conceptMiniDotLabel}>a91c2f</div>
                </div>
              </div>
              <div className={styles.conceptFailureLayer}>
                <div className={styles.conceptFailureCard}>
                  <small>Pipeline paused · test gate</small>
                  <h3>One failure stops the journey.</h3>
                  <p>
                    PaymentServiceTest
                    <br />
                    expected status: 200
                    <br />
                    received status: 500
                    <br />
                    line 82
                  </p>
                </div>
              </div>
              <div className={styles.conceptMiniDashboardLayer}>
                <div className={styles.conceptMiniApp}>
                  <aside className={styles.conceptMiniSidebar}>
                    <div>mini ci.</div>
                    <nav>
                      <b>Runs</b>
                      <span>Pipelines</span>
                      <span>Artifacts</span>
                      <span>Logs</span>
                      <span>Settings</span>
                    </nav>
                  </aside>
                  <main className={styles.conceptMiniMain}>
                    <div className={styles.conceptMiniAppHead}>
                      <h3>Pipeline #184</h3>
                      <span>all checks passed</span>
                    </div>
                    <div className={styles.conceptMiniJobs}>
                      {[
                        ['01', 'Build', '31s · passed'],
                        ['02', 'Tests', '127 passed'],
                        ['03', 'Lint', '0 issues'],
                        ['04', 'Security', 'clean'],
                        ['05', 'Release', 'ready']
                      ].map(([index, title, copy]) => (
                        <div key={title} className={styles.conceptMiniJob}>
                          <small>{index}</small>
                          <b>{title}</b>
                          <span>{copy}</span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.conceptMiniLogs}>
                      14:04:11 build completed
                      <br />
                      14:04:42 test suite passed
                      <br />
                      14:05:08 security scan clean
                      <br />
                      14:05:21 artifact created
                      <br />
                      14:05:23 release candidate ready
                    </div>
                  </main>
                </div>
              </div>
              <div className={styles.conceptMiniFinal}>
                <div>
                  <h3>
                    Trust is built
                    <em>one commit at a time.</em>
                  </h3>
                  <p>The pipeline disappears. What remains is confidence that the change has earned its way forward.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={memory} className={`${styles.conceptLayer} ${styles.conceptMemory}`}>
          <div className={styles.conceptMemoryLayout}>
            <div className={styles.conceptMemoryCopy}>
              <small>About · discovered, not announced</small>
              <h2>
                The system becomes
                <br />
                <em>a memory of Amira.</em>
              </h2>
              <p>
                Not a biography. A constellation of the things that shaped how I build: systems, cities, repetition, curiosity
                and the habit of turning unfinished ideas into something real.
              </p>
              <div className={styles.conceptMemoryNote}>
                Move through the fragments. The closer you get to one, the more the rest rearrange around it.
              </div>
              <div className={styles.conceptMemoryHint}>Hover or click a fragment to reveal the connection</div>
            </div>

            <div className={styles.conceptConstellation} onMouseLeave={() => setActiveMemoryFragment(null)}>
              <div className={styles.conceptMemoryLines}>
                <svg aria-hidden="true">
                  {memoryEdges.map((edge, index) => {
                    const active =
                      activeMemoryFragment === null
                        ? false
                        : edge[0] === activeMemoryFragment || edge[1] === activeMemoryFragment || (activeMemoryFragment === 5 && index < 5);
                    return (
                      <line
                        key={`${edge[0]}-${edge[1]}`}
                        ref={(node) => {
                          lineRefs.current[index] = node;
                        }}
                        className={active ? styles.conceptMemoryEdgeActive : undefined}
                      />
                    );
                  })}
                </svg>
              </div>
              <div className={styles.conceptMemoryCenterMark} />
              {memoryFragments.map(([kicker, title, copy, detail, className], index) => (
                <article
                  key={title}
                  ref={(node) => {
                    fragmentRefs.current[index] = node;
                  }}
                  className={`${styles.conceptFragment} ${styles[className]} ${
                    activeMemoryFragment === index ? styles.conceptFragmentActive : ''
                  }`}
                  onMouseEnter={() => setActiveMemoryFragment(index)}
                  onClick={() => setActiveMemoryFragment((current) => (current === index ? null : index))}
                >
                  <small>{kicker}</small>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <div className={styles.conceptFragmentDetail}>{detail}</div>
                </article>
              ))}
              <div className={styles.conceptHiddenNote}>not a biography. a constellation of choices.</div>
            </div>
          </div>
          <div className={styles.conceptMemoryFinal}>
            <div>
              <h2>
                The system
                <em>was always connected.</em>
              </h2>
              <p>
                Every project is a different expression of the same habits: curiosity, structure, patience and the need to make
                ideas usable.
              </p>
            </div>
          </div>
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
