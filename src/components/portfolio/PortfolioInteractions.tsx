'use client';

import { useEffect, useRef } from 'react';

export function PortfolioInteractions() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dot = dotRef.current;
    const flowerSystem = document.querySelector<HTMLElement>('[data-flower-system]');
    const note = document.querySelector<HTMLElement>('[data-note]');
    const sideCard = document.querySelector<HTMLElement>('[data-side-card]');
    const pinkBall = document.querySelector<HTMLElement>('[data-pink-ball]');

    const moveDot = (event: PointerEvent) => {
      if (!dot || reduceMotion) return;
      dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const dx = (event.clientX - centerX) / centerX;
      const dy = (event.clientY - centerY) / centerY;

      if (flowerSystem) {
        flowerSystem.style.transform = `translate3d(${dx * 18}px, ${dy * 14}px, 0) rotate(${dx * 2}deg)`;
      }

      if (note) {
        note.style.transform = `rotate(-3deg) translate3d(${dx * -8}px, ${dy * -6}px, 0)`;
      }
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

    const movePinkBall = (event: PointerEvent) => {
      if (!sideCard || !pinkBall || reduceMotion) return;
      const rect = sideCard.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      pinkBall.style.transform = `translate3d(${x * 0.08}px, ${y * 0.08}px, 0)`;
    };

    sideCard?.addEventListener('pointermove', movePinkBall, { passive: true });

    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const highlightTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-highlight]'));

    if (reduceMotion) {
      revealTargets.forEach((target) => {
        target.dataset.visible = 'true';
      });
      highlightTargets.forEach((target) => {
        target.dataset.visible = 'true';
      });
      return () => {
        window.removeEventListener('pointermove', moveDot);
        interactiveTargets.forEach((target) => {
          target.removeEventListener('pointerenter', enlargeDot);
          target.removeEventListener('pointerleave', shrinkDot);
        });
        sideCard?.removeEventListener('pointermove', movePinkBall);
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
      interactiveTargets.forEach((target) => {
        target.removeEventListener('pointerenter', enlargeDot);
        target.removeEventListener('pointerleave', shrinkDot);
      });
      sideCard?.removeEventListener('pointermove', movePinkBall);
      revealObserver.disconnect();
      highlightObserver.disconnect();
    };
  }, []);

  return <div ref={dotRef} className="cursorDot" aria-hidden="true" />;
}
