'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { DarkChromeContext } from './DarkChromeContext';
import shell from './DarkShell.module.css';

const PUSH_AT = 400;
const CLEAR_AT = 850;

export function DarkChrome({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isBig, setIsBig] = useState(false);
  const [isWiping, setIsWiping] = useState(false);
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

  const wipeTo = useCallback(
    (path: string) => {
      setIsWiping(false);
      window.requestAnimationFrame(() => setIsWiping(true));
      window.setTimeout(() => router.push(path), PUSH_AT);
      window.setTimeout(() => setIsWiping(false), CLEAR_AT);
    },
    [router]
  );

  return (
    <DarkChromeContext.Provider value={{ setIsBig, wipeTo }}>
      {hasMoved ? (
        <div
          className={`${shell.cursor} ${isBig ? shell.cursorBig : ''}`}
          style={{ left: cursor.x, top: cursor.y }}
        />
      ) : null}
      <div className={`${shell.wipe} ${isWiping ? shell.wipeGo : ''}`} aria-hidden="true" />
      {children}
    </DarkChromeContext.Provider>
  );
}
