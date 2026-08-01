import { useEffect, useMemo, useRef } from 'react';
import type { CSSProperties, MutableRefObject } from 'react';
import type { DreamTimelineSnapshot } from '../timeline/dreamTimeline';
import type { PointerInfluenceRef } from './PointerInfluence';
import styles from '../DreamExperience.module.css';

type GoldenDreamOverlayProps = {
  timeline: DreamTimelineSnapshot;
  pointer: MutableRefObject<PointerInfluenceRef>;
};

const letters = ['t', 'h', 'o', 'u', 'g', 'h', 't'];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function ease(value: number) {
  return value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;
}

export function GoldenDreamOverlay({ timeline, pointer }: GoldenDreamOverlayProps) {
  const hero = useRef<HTMLElement>(null);
  const tunnel = useRef<HTMLElement>(null);
  const chamber = useRef<HTMLElement>(null);
  const tease = useRef<HTMLElement>(null);
  const portal = useRef<HTMLDivElement>(null);
  const facadeWrap = useRef<HTMLDivElement>(null);
  const lightOrb = useRef<HTMLDivElement>(null);
  const timeLabel = useRef<HTMLDivElement>(null);
  const stageLabel = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const progress = useRef(timeline.progress);
  const smoothPointer = useRef({ x: 0.5, y: 0.5 });
  const days = useMemo(() => Array.from({ length: 35 }, (_, index) => String(index + 1).padStart(2, '0')), []);

  useEffect(() => {
    progress.current = timeline.progress;
  }, [timeline.progress]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const p = clamp(progress.current, 0, 1);
      const mx = (pointer.current.targetX + 1) / 2;
      const my = (pointer.current.targetY + 1) / 2;
      smoothPointer.current.x = lerp(smoothPointer.current.x, mx, 0.05);
      smoothPointer.current.y = lerp(smoothPointer.current.y, my, 0.05);

      const smx = smoothPointer.current.x;
      const smy = smoothPointer.current.y;
      const a = clamp(p / 0.24, 0, 1);
      const b = clamp((p - 0.19) / 0.23, 0, 1);
      const c = clamp((p - 0.36) / 0.18, 0, 1);
      const d = clamp((p - 0.48) / 0.2, 0, 1);
      const e = clamp((p - 0.76) / 0.18, 0, 1);

      if (stageLabel.current) {
        stageLabel.current.textContent =
          p < 0.2
            ? 'the unfinished thought'
            : p < 0.42
              ? 'the letter becomes a passage'
              : p < 0.72
                ? 'atria · time becomes architecture'
                : 'the next transformation';
      }

      if (hero.current) {
        hero.current.style.opacity = String(clamp(1 - c * 1.35, 0, 1));
        hero.current.style.transform = `scale(${1 + b * 0.18}) translateZ(0)`;
      }

      letterRefs.current.forEach((letter, index) => {
        if (!letter) return;
        const dist = index - 2;
        const wave = Math.sin((index + 1) * 1.7 + p * 10);
        const x = dist * a * 22 + wave * a * 8;
        const y = Math.cos(index * 1.3 + p * 8) * a * 14;
        const z = Math.abs(dist) * a * 28;
        const rot = dist * a * 4;
        const scale = index === 2 ? 1 + b * 0.15 : 1;
        letter.style.transform = `translate3d(${x}px,${y}px,${z}px) rotate(${rot}deg) scale(${scale})`;
        letter.style.filter = `blur(${Math.max(0, b - 0.45) * Math.abs(dist) * 3}px)`;
      });

      if (portal.current) {
        portal.current.style.opacity = String(clamp(b * 1.4, 0, 1));
        portal.current.style.transform = `translate(-50%,-50%) scale(${0.12 + b * 34})`;
        portal.current.style.borderWidth = `${Math.max(0.3, 2 - b * 1.6)}px`;
      }

      if (tunnel.current) {
        tunnel.current.style.opacity = String(clamp(c * 1.8 * (1 - d), 0, 1));
        tunnel.current.style.transform = `scale(${0.2 + c * 4.5}) rotate(${c * 18}deg)`;
        tunnel.current.style.filter = `blur(${Math.max(0, c - 0.7) * 12}px)`;
      }

      if (chamber.current) {
        const hue = lerp(36, 215, smx);
        chamber.current.style.opacity = String(clamp(d * 1.5 - e * 0.9, 0, 1));
        chamber.current.style.background = `radial-gradient(circle at ${35 + smx * 30}% 36%, hsla(${hue},35%,55%,.12), transparent 28%), linear-gradient(180deg, hsl(${lerp(
          38,
          215,
          smx
        )},${lerp(18, 22, smx)}%,${lerp(11, 6, smx)}%), #050605 76%)`;
      }

      if (facadeWrap.current) {
        const cameraZ = lerp(-420, 0, ease(d));
        const cameraY = lerp(80, 0, ease(d));
        const rx = (smy - 0.5) * -5;
        const ry = (smx - 0.5) * 9;
        facadeWrap.current.style.transform = `translate(-50%,-50%) translateY(${cameraY}px) translateZ(${cameraZ}px) rotateX(${7 + rx}deg) rotateY(${
          -8 + ry
        }deg) scale(${0.78 + d * 0.22})`;
      }

      if (lightOrb.current) {
        lightOrb.current.style.transform = `translate(${(smx - 0.5) * 55}px,${(smy - 0.5) * 25}px) scale(${0.92 + smx * 0.16})`;
      }

      if (timeLabel.current) {
        timeLabel.current.textContent = smx < 0.33 ? 'morning · 06:42' : smx < 0.67 ? 'afternoon · 14:18' : 'night · 22:07';
      }

      if (tease.current) {
        tease.current.style.opacity = String(e);
        tease.current.style.transform = `scale(${0.92 + e * 0.08})`;
      }

      frame = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(frame);
  }, [pointer]);

  const restart = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <div className={styles.goldenTopbar}>
        <span>Amira Benbouali</span>
        <span>Lucid software dream · preview 01</span>
      </div>
      <div className={styles.goldenProgress} style={{ '--progress': Math.round(timeline.progress * 100) } as CSSProperties} />
      <div ref={stageLabel} className={styles.goldenStageLabel}>
        the unfinished thought
      </div>
      <div className={styles.goldenScene} aria-hidden="true">
        <section ref={hero} className={styles.goldenHero}>
          <div className={styles.goldenHeroInner}>
            <div className={styles.goldenKicker}>A portfolio that transforms instead of changing pages</div>
            <h1 className={styles.goldenSentence}>
              <span className={styles.goldenChunk}>everything begins as an unfinished&nbsp;</span>
              <span className={styles.goldenThought}>
                {letters.map((letter, index) => (
                  <span
                    key={letter + index}
                    ref={(node) => {
                      letterRefs.current[index] = node;
                    }}
                    className={`${styles.goldenLetter} ${index === 2 ? styles.goldenLetterO : ''}`}
                  >
                    {letter}
                    {index === 2 ? <div ref={portal} className={styles.goldenPortalRing} /> : null}
                  </span>
                ))}
              </span>
            </h1>
            <p className={styles.goldenSubcopy}>
              Scroll slowly. The sentence will not disappear—it will become the entrance to the first project.
            </p>
            <div className={styles.goldenScrollCue}>descend into the thought</div>
          </div>
        </section>

        <section ref={tunnel} className={styles.goldenTunnel} />

        <section ref={chamber} className={styles.goldenChamber}>
          <div className={styles.goldenFog} />
          <div ref={lightOrb} className={styles.goldenLightOrb} />
          <div className={styles.goldenChamberTitle}>
            <small>001 · Atria</small>
            <h2>
              Time becomes
              <br />
              architecture.
            </h2>
            <p>
              A planning environment imagined as a monumental calendar: days become rooms, events become light, and moving the cursor changes the hour of the
              dream.
            </p>
          </div>
          <div ref={facadeWrap} className={styles.goldenFacadeWrap}>
            <div className={styles.goldenFacade}>
              {days.map((day) => (
                <div key={day} className={styles.goldenDay} data-day={day}>
                  <div className={styles.goldenWindow} />
                </div>
              ))}
            </div>
          </div>
          <div className={`${styles.goldenDreamFragment} ${styles.goldenF1}`}>a quiet place for unfinished weeks</div>
          <div className={`${styles.goldenDreamFragment} ${styles.goldenF2}`}>the building remembers tomorrow</div>
          <div ref={timeLabel} className={styles.goldenTimeLabel}>
            morning · 06:42
          </div>
        </section>

        <section ref={tease} className={styles.goldenTease}>
          <h3>
            The calendar will fold
            <br />
            into a <em>living system.</em>
          </h3>
          <p>next dream: foundry</p>
        </section>
      </div>
      <button type="button" className={styles.goldenRestart} onClick={restart}>
        restart dream
      </button>
    </>
  );
}
