import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { dreamTimelineProgress } from '../timeline/dreamTimeline';
import { getOpeningPhases, getThoughtLetterTransform, thoughtLetters } from '../timeline/openingTimeline';
import type { PointerInfluenceRef } from './PointerInfluence';
import type { MutableRefObject } from 'react';
import styles from '../DreamExperience.module.css';

type OpeningSentenceProps = {
  pointer: MutableRefObject<PointerInfluenceRef>;
};

export function OpeningSentence({ pointer }: OpeningSentenceProps) {
  const layer = useRef<HTMLDivElement>(null);
  const lead = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const portal = useRef<HTMLSpanElement>(null);

  useFrame(() => {
    const phases = getOpeningPhases(dreamTimelineProgress.current);
    const portalDominance = Math.max(phases.portalFormation, phases.cameraPassage);
    const heroOpacity = Math.max(0, 1 - phases.cameraPassage * 1.8 - phases.darkExit * 1.2);

    if (layer.current) {
      const environmentalCover = Math.max(0, 0.96 - phases.cameraPassage * 1.45 - phases.darkExit * 1.8);
      layer.current.style.backgroundColor = `rgba(236, 231, 221, ${environmentalCover})`;
      layer.current.style.opacity = `${heroOpacity}`;
      layer.current.style.transform = `translate3d(${pointer.current.x * 8}px, ${pointer.current.y * 5 - phases.cameraPassage * 24}px, 0) scale(${
        1 + phases.portalFormation * 0.06
      })`;
      layer.current.style.visibility = phases.darkExit > 0.72 ? 'hidden' : 'visible';
    }

    if (lead.current) {
      lead.current.style.transform = `translate3d(0, ${-phases.destabilize * 3}px, 0)`;
      lead.current.style.filter = `blur(${phases.cameraPassage * 2.2}px)`;
    }

    thoughtLetters.forEach((_, index) => {
      const letter = letterRefs.current[index];
      if (!letter) return;

      const transform = getThoughtLetterTransform(index, phases.destabilize, phases.portalFormation);
      const peripheral = Math.max(0, index === 2 ? 0 : phases.cameraPassage);
      letter.style.transform = `translate3d(${transform.x * 7.2}vw, ${transform.y * 54}px, ${transform.z * 92}px) rotateX(${
        transform.rotateX * 18
      }deg) rotateY(${transform.rotateY * 34}deg) rotateZ(${transform.rotateZ * 38}deg) scale(${transform.scaleX}, ${transform.scaleY})`;
      letter.style.filter = `blur(${peripheral * Math.abs(index - 2) * 2.4}px)`;
      letter.style.opacity = `${1 - peripheral * Math.min(0.72, Math.abs(index - 2) * 0.16)}`;
    });

    if (portal.current) {
      const portalOpacity = Math.min(1, phases.portalFormation * 1.55 + phases.cameraPassage * 0.35);
      portal.current.style.opacity = `${portalOpacity}`;
      portal.current.style.visibility = portalOpacity < 0.04 ? 'hidden' : 'visible';
      portal.current.style.transform = `translate(-50%, -50%) scale(${0.1 + phases.portalFormation * 22 + phases.cameraPassage * 17})`;
      portal.current.style.borderColor = portalDominance > 0.55 ? 'rgba(238, 232, 220, 0.16)' : 'rgba(17, 18, 15, 0.55)';
    }
  });

  return (
    <Html fullscreen zIndexRange={[2, 0]}>
      <div ref={layer} className={styles.openingLayer} aria-hidden="true">
        <div className={styles.openingWrap}>
          <p className={styles.openingKicker}>an interactive short film disguised as a portfolio</p>
          <h1 className={styles.openingTitle}>
            <span ref={lead} className={styles.openingLead}>
              everything begins as an unfinished
            </span>{' '}
            <span className={styles.openingWord}>
              {thoughtLetters.map((letter, index) => (
                <span
                  key={letter.value + index}
                  ref={(node) => {
                    letterRefs.current[index] = node;
                  }}
                  className={styles.openingLetter}
                >
                  {letter.value}
                  {letter.value === 'o' && index === 2 ? <span ref={portal} className={styles.openingPortal} /> : null}
                </span>
              ))}
            </span>
          </h1>
          <p className={styles.openingCopy}>Scroll slowly. Nothing disappears. Every object becomes part of the next dream.</p>
          <p className={styles.openingScroll}>enter the unfinished thought</p>
        </div>
      </div>
    </Html>
  );
}
