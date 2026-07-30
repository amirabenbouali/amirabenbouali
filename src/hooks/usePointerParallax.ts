import { useCallback, useEffect, useRef } from 'react';
import type { PointerEvent as ReactPointerEvent, RefObject } from 'react';

export function usePointerParallax<T extends HTMLElement>(ref: RefObject<T>) {
  const frame = useRef<number | null>(null);

  const reset = useCallback(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    node.style.setProperty('--pointer-x', '0px');
    node.style.setProperty('--pointer-y', '0px');
  }, [ref]);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<T>) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const node = ref.current;
      if (!node || event.pointerType !== 'mouse') {
        return;
      }

      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;

      if (frame.current !== null) {
        cancelAnimationFrame(frame.current);
      }

      frame.current = requestAnimationFrame(() => {
        node.style.setProperty('--pointer-x', `${x.toFixed(2)}px`);
        node.style.setProperty('--pointer-y', `${y.toFixed(2)}px`);
      });
    },
    [ref]
  );

  useEffect(() => {
    return () => {
      if (frame.current !== null) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  return { onPointerMove, onPointerLeave: reset };
}
