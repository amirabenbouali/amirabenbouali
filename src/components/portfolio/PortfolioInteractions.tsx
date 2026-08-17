'use client';

import { useEffect, useRef } from 'react';

export function PortfolioInteractions() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dot = dotRef.current;

    const moveDot = (event: PointerEvent) => {
      if (!dot || reduceMotion) return;
      dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
    };

    window.addEventListener('pointermove', moveDot, { passive: true });

    const interactiveTargets = Array.from(document.querySelectorAll<HTMLElement>('a, button, [data-project-row]'));
    const enlargeDot = () => {
      if (!dot || reduceMotion) return;
      dot.dataset.active = 'true';
    };
    const shrinkDot = () => {
      if (!dot) return;
      delete dot.dataset.active;
    };

    interactiveTargets.forEach((target) => {
      target.addEventListener('pointerenter', enlargeDot);
      target.addEventListener('pointerleave', shrinkDot);
    });

    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (reduceMotion) {
      revealTargets.forEach((target) => {
        target.dataset.visible = 'true';
      });
      return () => {
        window.removeEventListener('pointermove', moveDot);
        interactiveTargets.forEach((target) => {
          target.removeEventListener('pointerenter', enlargeDot);
          target.removeEventListener('pointerleave', shrinkDot);
        });
      };
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.visible = 'true';
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));

    return () => {
      window.removeEventListener('pointermove', moveDot);
      interactiveTargets.forEach((target) => {
        target.removeEventListener('pointerenter', enlargeDot);
        target.removeEventListener('pointerleave', shrinkDot);
      });
      revealObserver.disconnect();
    };
  }, []);

  return <div ref={dotRef} className="cursorDot" aria-hidden="true" />;
}
