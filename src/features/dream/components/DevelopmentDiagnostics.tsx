import { useEffect } from 'react';

type DevelopmentDiagnosticsProps = {
  enabled?: boolean;
};

export function DevelopmentDiagnostics({ enabled = import.meta.env.DEV }: DevelopmentDiagnosticsProps) {
  useEffect(() => {
    if (!enabled) return undefined;

    let frames = 0;
    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      frames += 1;

      if (now - last >= 5000) {
        const fps = Math.round((frames * 1000) / (now - last));
        const canvas = document.querySelector('canvas');
        console.debug('[dream diagnostics]', {
          fps,
          canvas: canvas ? `${canvas.width}x${canvas.height}` : 'none',
          transferSize: performance.getEntriesByType('resource').reduce((total, entry) => {
            const resource = entry as PerformanceResourceTiming;
            return total + (resource.transferSize || 0);
          }, 0)
        });
        frames = 0;
        last = now;
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [enabled]);

  return null;
}
