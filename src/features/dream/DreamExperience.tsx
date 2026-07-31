import { useRef, useState } from 'react';
import { AtmosphericGrain } from '../../components/ui/Atmosphere';
import { AccessibleOverlay } from './components/AccessibleOverlay';
import { DevelopmentDiagnostics } from './components/DevelopmentDiagnostics';
import { DreamCanvas } from './components/DreamCanvas';
import { ReducedMotionExperience } from './components/ReducedMotionExperience';
import { usePointerInfluence } from './components/PointerInfluence';
import { useReducedMotionPreference } from './hooks/useReducedMotionPreference';
import { useScrollProgress } from './hooks/useScrollProgress';
import styles from './DreamExperience.module.css';

export function DreamExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotionPreference();
  const { pointer, handlePointerMove, handlePointerLeave } = usePointerInfluence();
  const { progress, activeScene } = useScrollProgress();

  if (prefersReducedMotion) {
    return <ReducedMotionExperience />;
  }

  return (
    <main
      ref={rootRef}
      className={styles.experience}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-labelledby="dream-title"
    >
      <div className={styles.semantic}>
        <h1 id="dream-title">everything begins as an unfinished thought</h1>
        <p>
          Nothing is replaced. Everything transforms from unfinished thought into Atria, Foundry, kansoDB, Mini CI, memory,
          identity and contact.
        </p>
      </div>

      {!isLoaded ? (
        <div className={styles.loading} role="status" aria-live="polite">
          <span>opening the thought</span>
        </div>
      ) : null}

      <div className={styles.stage}>
        <DreamCanvas rootRef={rootRef} pointer={pointer} onLoaded={() => setIsLoaded(true)} />
      </div>
      <div className={styles.scrollSpace} aria-hidden="true" />
      <AccessibleOverlay activeScene={activeScene} progress={progress} />
      <DevelopmentDiagnostics />
      <AtmosphericGrain />
    </main>
  );
}
