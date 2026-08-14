'use client';

import { useEffect, useRef } from 'react';

export function PortfolioInteractions() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dot = dotRef.current;
    const dossier = document.querySelector<HTMLElement>('[data-dossier]');
    const lensOne = document.querySelector<HTMLElement>('[data-lens-one]');
    const lensTwo = document.querySelector<HTMLElement>('[data-lens-two]');

    const moveDot = (event: PointerEvent) => {
      if (!dot || reduceMotion) return;
      dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const dx = (event.clientX - centerX) / centerX;
      const dy = (event.clientY - centerY) / centerY;

      if (dossier) {
        dossier.style.setProperty('--cursor-x', `${dx * 8}px`);
        dossier.style.setProperty('--cursor-y', `${dy * 6}px`);
        dossier.style.setProperty('--cursor-r', `${-1.6 + dx * 1.4}deg`);
      }

      if (lensOne) {
        lensOne.style.transform = `translate3d(${dx * 18}px, ${dy * 10}px, 0)`;
      }

      if (lensTwo) {
        lensTwo.style.transform = `translate3d(${dx * -15}px, ${dy * -8}px, 0)`;
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
