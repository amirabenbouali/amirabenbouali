import { useRef } from 'react';
import type { PointerEvent } from 'react';

export type PointerInfluenceRef = {
  targetX: number;
  targetY: number;
};

export function usePointerInfluence() {
  const pointer = useRef<PointerInfluenceRef>({ targetX: 0, targetY: 0 });

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') {
      pointer.current.targetX = 0;
      pointer.current.targetY = 0;
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);

    pointer.current.targetX = Math.min(1, Math.max(-1, x));
    pointer.current.targetY = Math.min(1, Math.max(-1, y));
  };

  const handlePointerLeave = () => {
    pointer.current.targetX = 0;
    pointer.current.targetY = 0;
  };

  return { pointer, handlePointerMove, handlePointerLeave };
}
