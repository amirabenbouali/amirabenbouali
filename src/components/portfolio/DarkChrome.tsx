'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { DarkChromeContext } from './DarkChromeContext';
import shell from './DarkShell.module.css';

type WipePhase = 'idle' | 'covering' | 'covered';

// Matches the .45s wipeIn/wipeOut CSS animations in DarkShell.module.css, plus slack.
const COVER_MS = 460;
const REVEAL_MS = 460;
// A deliberate beat at full cover before revealing, even when navigation is instant.
const MIN_HOLD_MS = 140;

export function DarkChrome({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isBig, setIsBig] = useState(false);
  const [phase, setPhase] = useState<WipePhase>('idle');
  const [holdReady, setHoldReady] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const pendingPath = useRef<string | null>(null);

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
      pendingPath.current = path;
      setPhase('covering');
      // Wait for the cover animation to fully hide the page before swapping
      // content, then hold it covered until the new route has rendered.
      window.setTimeout(() => {
        const nextPath = pendingPath.current;
        pendingPath.current = null;
        setPhase('covered');
        setHoldReady(false);
        window.setTimeout(() => setHoldReady(true), MIN_HOLD_MS);
        if (nextPath) startTransition(() => router.push(nextPath));
      }, COVER_MS);
    },
    [router]
  );

  // Reveal only once BOTH the minimum hold has played (so there's always a
  // deliberate beat at full cover) AND the new route has actually rendered
  // (a fixed timer alone would show the old page again on a slow navigation).
  const isRevealing = phase === 'covered' && !isPending && holdReady;

  useEffect(() => {
    if (!isRevealing) return;
    const timer = window.setTimeout(() => setPhase('idle'), REVEAL_MS);
    return () => window.clearTimeout(timer);
  }, [isRevealing]);

  const wipeClass = phase === 'idle' ? '' : isRevealing ? shell.wipeOut : shell.wipeIn;

  return (
    <DarkChromeContext.Provider value={{ setIsBig, wipeTo }}>
      {hasMoved ? (
        <div
          className={`${shell.cursor} ${isBig ? shell.cursorBig : ''}`}
          style={{ left: cursor.x, top: cursor.y }}
        />
      ) : null}
      <div className={`${shell.wipe} ${wipeClass}`} aria-hidden="true" />
      {children}
    </DarkChromeContext.Provider>
  );
}
