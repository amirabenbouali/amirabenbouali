import type { DreamTimelineSnapshot } from '../timeline/dreamTimeline';
import type { QualityTier } from '../hooks/useViewportQuality';
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

  return (
    <aside className={styles.diagnostics} aria-hidden="true">
      <span>progress {timeline.progress.toFixed(3)}</span>
      <span>scene {timeline.activeScene.id}</span>
      <span>local {timeline.localProgress.toFixed(3)}</span>
      <span>quality {quality}</span>
      <span>dpr {pixelRatio}</span>
      <span>motion {reducedMotion ? 'reduced' : 'on'}</span>
      <span>webgl {webglSupported ? 'yes' : 'no'}</span>
    </aside>
  );
}
