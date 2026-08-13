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

    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const highlightTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-highlight]'));

    if (reduceMotion) {
      revealTargets.forEach((target) => {
        target.dataset.visible = 'true';
      });
      highlightTargets.forEach((target) => {
        target.dataset.visible = 'true';
      });
      return () => window.removeEventListener('pointermove', moveDot);
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

    const highlightObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          highlightTargets.forEach((target, index) => {
            window.setTimeout(() => {
              target.dataset.visible = 'true';
            }, index * 120);
          });
          highlightObserver.disconnect();
        });
      },
      { threshold: 0.35 }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
    const firstHighlight = highlightTargets[0];
    if (firstHighlight) highlightObserver.observe(firstHighlight.parentElement ?? firstHighlight);

    return () => {
      window.removeEventListener('pointermove', moveDot);
      revealObserver.disconnect();
      highlightObserver.disconnect();
    };
  }, []);

  return <div ref={dotRef} className="cursorDot" aria-hidden="true" />;
}
