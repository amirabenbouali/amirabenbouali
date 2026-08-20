'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export function useDarkCursor() {
  const [isBig, setIsBig] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      setHasMoved(true);
      setCursor({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return { isBig, setIsBig, cursor, hasMoved };
}

export function useWipeNavigate() {
  const router = useRouter();
  const [isWiping, setIsWiping] = useState(false);

  const wipeTo = useCallback(
    (path: string) => {
      setIsWiping(false);
      window.requestAnimationFrame(() => setIsWiping(true));
      window.setTimeout(() => router.push(path), 340);
      window.setTimeout(() => setIsWiping(false), 720);
    },
    [router]
  );

  return { isWiping, wipeTo };
}
