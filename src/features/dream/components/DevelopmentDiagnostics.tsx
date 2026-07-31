import type { DreamTimelineSnapshot } from '../timeline/dreamTimeline';
import type { QualityTier } from '../hooks/useViewportQuality';
import { getOpeningCameraRig, getOpeningPhases } from '../timeline/openingTimeline';
import styles from '../DreamExperience.module.css';

type DevelopmentDiagnosticsProps = {
  enabled?: boolean;
  timeline: DreamTimelineSnapshot;
  quality: QualityTier;
  pixelRatio: number;
  reducedMotion: boolean;
  webglSupported: boolean;
};

export function DevelopmentDiagnostics({
  enabled = import.meta.env.DEV,
  timeline,
  quality,
  pixelRatio,
  reducedMotion,
  webglSupported
}: DevelopmentDiagnosticsProps) {
  if (!enabled) return null;

  const phases = getOpeningPhases(timeline.progress);
  const camera = getOpeningCameraRig(timeline.progress);

  return (
    <aside className={styles.diagnostics} aria-hidden="true">
      <span>progress {timeline.progress.toFixed(3)}</span>
      <span>scene {timeline.activeScene.id}</span>
      <span>local {timeline.localProgress.toFixed(3)}</span>
      <span>quality {quality}</span>
      <span>portal {phases.portalFormation.toFixed(3)}</span>
      <span>passage {phases.cameraPassage.toFixed(3)}</span>
      <span>camera {camera.position.map((value) => value.toFixed(1)).join(',')}</span>
      <span>dpr {pixelRatio}</span>
      <span>motion {reducedMotion ? 'reduced' : 'on'}</span>
      <span>webgl {webglSupported ? 'yes' : 'no'}</span>
    </aside>
  );
}
