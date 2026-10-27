'use client';

import { useEffect, useRef } from 'react';
import styles from './CursorStarTrail.module.css';

const STAR_COUNT = 16;
const MIN_DISTANCE = 11;
const MIN_INTERVAL = 38;

export function CursorStarTrail() {
  const starsRef = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    if (reducedMotion.matches || coarsePointer.matches || !finePointer.matches) return;

    const stars = starsRef.current;
    let nextStar = 0;
    let animationFrame = 0;
    let pendingX = 0;
    let pendingY = 0;
    let lastX = -100;
    let lastY = -100;
    let lastTime = 0;

    const emitStar = (x: number, y: number, now: number) => {
      const distance = Math.hypot(x - lastX, y - lastY);
      if (distance < MIN_DISTANCE || now - lastTime < MIN_INTERVAL) return;

      const star = stars[nextStar];
      if (!star) return;

      nextStar = (nextStar + 1) % STAR_COUNT;
      lastX = x;
      lastY = y;
      lastTime = now;

      const driftX = (Math.random() - 0.5) * 18;
      const driftY = -10 - Math.random() * 16;
      const scale = 0.58 + Math.random() * 0.48;
      const rotation = Math.random() * 90;

      star.getAnimations().forEach((animation) => animation.cancel());
      star.animate(
        [
          {
            opacity: 0,
            transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(.2)`
          },
          {
            opacity: 0.82,
            offset: 0.2,
            transform: `translate3d(${x + driftX * 0.2}px, ${y + driftY * 0.18}px, 0) rotate(${rotation + 15}deg) scale(${scale})`
          },
          {
            opacity: 0,
            transform: `translate3d(${x + driftX}px, ${y + driftY}px, 0) rotate(${rotation + 48}deg) scale(.08)`
          }
        ],
        {
          duration: 520 + Math.random() * 220,
          easing: 'cubic-bezier(.22,.7,.25,1)',
          fill: 'both'
        }
      );
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      pendingX = event.clientX - 4;
      pendingY = event.clientY - 4;

      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame((now) => {
        animationFrame = 0;
        emitStar(pendingX, pendingY, now);
      });
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      stars.forEach((star) => star?.getAnimations().forEach((animation) => animation.cancel()));
    };
  }, []);

  return (
    <div className={styles.trail} aria-hidden="true">
      {Array.from({ length: STAR_COUNT }, (_, index) => (
        <span
          className={styles.star}
          key={index}
          ref={(element) => {
            starsRef.current[index] = element;
          }}
        />
      ))}
    </div>
  );
}
