import { useRef } from 'react';
import type { PointerEvent } from 'react';

export type PointerInfluenceRef = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
};

export function usePointerInfluence() {
  const pointer = useRef<PointerInfluenceRef>({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointer.current.targetX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    pointer.current.targetY = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  };

  const handlePointerLeave = () => {
    pointer.current.targetX = 0;
    pointer.current.targetY = 0;
  };

  return { pointer, handlePointerMove, handlePointerLeave };
}
