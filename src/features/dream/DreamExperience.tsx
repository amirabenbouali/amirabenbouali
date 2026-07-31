import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { AtmosphericGrain } from '../../components/ui/Atmosphere';
import { AccessibleOverlay } from './components/AccessibleOverlay';
import { DevelopmentDiagnostics } from './components/DevelopmentDiagnostics';
import { DreamCanvas } from './components/DreamCanvas';
import { ReducedMotionExperience } from './components/ReducedMotionExperience';
import { usePointerInfluence } from './components/PointerInfluence';
import { usePageVisibility } from './hooks/usePageVisibility';
import { useReducedMotionPreference } from './hooks/useReducedMotionPreference';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useViewportQuality } from './hooks/useViewportQuality';
import { useWebGLSupport } from './hooks/useWebGLSupport';
import { useAtriaState } from './atria/useAtriaState';
import { dreamScrollLength } from './dreamScenes.config';
import { createDreamTimeline } from './timeline/dreamTimeline';
import styles from './DreamExperience.module.css';

export function DreamExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const reducedMotion = useReducedMotionPreference();
  const quality = useViewportQuality();
  const webglSupported = useWebGLSupport();
  const isPageVisible = usePageVisibility();
  const timeline = useScrollProgress();
  const atria = useAtriaState();
  const { pointer, handlePointerMove, handlePointerLeave } = usePointerInfluence();

  useEffect(() => {
    if (!rootRef.current || reducedMotion.prefersReducedMotion) return undefined;
    return createDreamTimeline(rootRef.current);
  }, [reducedMotion.prefersReducedMotion]);

  const handleCanvasError = (error: unknown) => {
    if (import.meta.env.DEV) {
      console.error('[dream canvas]', error);
    }
  };

  if (reducedMotion.prefersReducedMotion) {
    return <ReducedMotionExperience reducedMotion={reducedMotion} quality={quality.tier} webglSupported={webglSupported} atria={atria} />;
  }

  const style = { '--dream-scroll-length': `${dreamScrollLength}svh` } as CSSProperties;

  return (
    <main
      ref={rootRef}
      className={styles.experience}
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-labelledby="dream-title"
    >
      <div className={styles.semantic}>
        <h1 id="dream-title">Amira Benbouali lucid portfolio foundation</h1>
        <p>everything begins as an unfinished thought</p>
        <p>
          A persistent WebGL canvas, controlled camera, semantic content layer and accessible fallback prepare the portfolio
          for future dream scenes.
        </p>
      </div>

      {!isLoaded ? (
        <div className={styles.loading} role="status" aria-live="polite">
          <span>forming the dream</span>
        </div>
      ) : null}

      <div className={styles.stage}>
        <DreamCanvas
          pointer={pointer}
          quality={quality.tier}
          atria={atria}
          isActive={isPageVisible}
          webglSupported={webglSupported}
          onLoaded={() => setIsLoaded(true)}
          onError={handleCanvasError}
        />
      </div>
      <div className={styles.scrollSpace} aria-hidden="true" />
      <AccessibleOverlay
        timeline={timeline}
        reducedMotion={reducedMotion}
        quality={quality.tier}
        webglSupported={webglSupported}
        atria={atria}
      />
      <DevelopmentDiagnostics
        timeline={timeline}
        quality={quality.tier}
        pixelRatio={quality.pixelRatio}
        reducedMotion={reducedMotion.prefersReducedMotion}
        webglSupported={webglSupported}
        atria={atria}
      />
      <AtmosphericGrain />
    </main>
  );
}
