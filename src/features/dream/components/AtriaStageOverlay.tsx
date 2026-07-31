import { getAtriaPhases, getTimeLabel } from '../atria/atriaModel';
import { getFoundryPhases } from '../foundry/foundryTransition';
import type { DreamTimelineSnapshot } from '../timeline/dreamTimeline';
import type { useAtriaState } from '../atria/useAtriaState';
import styles from '../DreamExperience.module.css';

type AtriaStageOverlayProps = {
  timeline: DreamTimelineSnapshot;
  atria: ReturnType<typeof useAtriaState>;
};

export function AtriaStageOverlay({ timeline, atria }: AtriaStageOverlayProps) {
  const atriaPhases = getAtriaPhases(timeline.progress);
  const foundryPhases = getFoundryPhases(timeline.progress);
  const opacity = Math.max(0, Math.min(1, atriaPhases.arrival * 1.45 - foundryPhases.detach * 1.15));

  return (
    <div
      className={styles.sceneHtmlOverlay}
      style={{
        opacity,
        visibility: opacity < 0.02 ? 'hidden' : 'visible',
        transform: `translate3d(0, ${70 * (1 - atriaPhases.arrival)}px, 0)`
      }}
      aria-hidden="true"
    >
      <div className={styles.atriaSceneOverlay}>
        <div className={styles.atriaSceneTitle}>
          <small>001 · Atria</small>
          <h2>
            Time becomes
            <br />
            <em>architecture.</em>
          </h2>
          <p>Days become rooms. Events become light. The cursor changes the hour of the dream.</p>
        </div>
        <div className={styles.atriaSun} />
        <div className={styles.atriaTime}>{getTimeLabel(atria.timeOfDay)}</div>
        <div className={`${styles.atriaWord} ${styles.atriaWordOne}`}>a quiet place for unfinished weeks</div>
        <div className={`${styles.atriaWord} ${styles.atriaWordTwo}`}>the building remembers tomorrow</div>
      </div>
    </div>
  );
}
