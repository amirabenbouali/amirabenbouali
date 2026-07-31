import type { DreamTimelineSnapshot } from '../timeline/dreamTimeline';
import type { QualityTier } from '../hooks/useViewportQuality';
import { getOpeningCameraRig, getOpeningPhases } from '../timeline/openingTimeline';
import { generateCalendarCells, getAtriaCameraRig, getAtriaPhases } from '../atria/atriaModel';
import { foundryRange, getFoundryPhases } from '../foundry/foundryTransition';
import { getFoundryCameraRig, getFoundrySystemSnapshot } from '../foundry/foundrySystem';
import type { useAtriaState } from '../atria/useAtriaState';
import type { useFoundryState } from '../foundry/useFoundryState';
import styles from '../DreamExperience.module.css';

type DevelopmentDiagnosticsProps = {
  enabled?: boolean;
  timeline: DreamTimelineSnapshot;
  quality: QualityTier;
  pixelRatio: number;
  reducedMotion: boolean;
  webglSupported: boolean;
  atria: ReturnType<typeof useAtriaState>;
  foundry: ReturnType<typeof useFoundryState>;
};

export function DevelopmentDiagnostics({
  enabled = import.meta.env.VITE_DREAM_DIAGNOSTICS === 'true',
  timeline,
  quality,
  pixelRatio,
  reducedMotion,
  webglSupported,
  atria,
  foundry
}: DevelopmentDiagnosticsProps) {
  if (!enabled) return null;

  const phases = getOpeningPhases(timeline.progress);
  const atriaPhases = getAtriaPhases(timeline.progress);
  const foundryPhases = getFoundryPhases(timeline.progress);
  const foundrySnapshot = getFoundrySystemSnapshot(timeline.progress);
  const camera =
    timeline.progress >= foundryRange.start && timeline.progress <= foundryRange.end
      ? getFoundryCameraRig(timeline.progress)
      : timeline.activeScene.id === 'atria'
        ? getAtriaCameraRig(timeline.progress)
        : getOpeningCameraRig(timeline.progress);
  const visibleCells = generateCalendarCells(quality).length;

  return (
    <aside className={styles.diagnostics} aria-hidden="true">
      <span>progress {timeline.progress.toFixed(3)}</span>
      <span>scene {timeline.activeScene.id}</span>
      <span>local {timeline.localProgress.toFixed(3)}</span>
      <span>quality {quality}</span>
      <span>portal {phases.portalFormation.toFixed(3)}</span>
      <span>passage {phases.cameraPassage.toFixed(3)}</span>
      <span>atria {atriaPhases.local.toFixed(3)}</span>
      <span>foundry {foundryPhases.local.toFixed(3)}</span>
      <span>incident {foundrySnapshot.stage}</span>
      <span>time {atria.timeOfDay}</span>
      <span>mode {atria.mode}</span>
      <span>owner {foundry.ownershipAligned ? 'aligned' : 'unclear'}</span>
      <span>cells {visibleCells}</span>
      <span>event {atria.selectedEvent}</span>
      <span>memory {atria.memory.selectedCell}</span>
      <span>camera {camera.position.map((value) => value.toFixed(1)).join(',')}</span>
      <span>dpr {pixelRatio}</span>
      <span>motion {reducedMotion ? 'reduced' : 'on'}</span>
      <span>webgl {webglSupported ? 'yes' : 'no'}</span>
    </aside>
  );
}
