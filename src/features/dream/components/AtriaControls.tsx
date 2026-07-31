import { getTimeLabel } from '../atria/atriaModel';
import type { TimeOfDay } from '../atria/atriaModel';
import type { useAtriaState } from '../atria/useAtriaState';
import styles from '../DreamExperience.module.css';

type AtriaControlsProps = {
  atria: ReturnType<typeof useAtriaState>;
};

const timeOptions: TimeOfDay[] = ['morning', 'afternoon', 'night'];
const modeOptions = ['calm', 'balanced', 'planner'] as const;

export function AtriaControls({ atria }: AtriaControlsProps) {
  return (
    <div className={styles.atriaControls}>
      <p className={styles.systemMeta} aria-live="polite">
        {getTimeLabel(atria.timeOfDay)} / {atria.mode} mode / selected event {atria.selectedEvent}
      </p>
      <div className={styles.controlGroup}>
        <span>Time</span>
        <div className={styles.segmentedControls} aria-label="Atria time of day">
          {timeOptions.map((time) => (
            <button key={time} type="button" aria-pressed={atria.timeOfDay === time} onClick={() => atria.setTimeOfDay(time)}>
              {time}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.controlGroup}>
        <span>Mode</span>
        <div className={styles.segmentedControls} aria-label="Atria workspace mode">
          {modeOptions.map((mode) => (
            <button key={mode} type="button" aria-pressed={atria.mode === mode} onClick={() => atria.setMode(mode)}>
              {mode}
            </button>
          ))}
        </div>
      </div>
      <button type="button" className={styles.editorialAction} onClick={atria.toggleSelectedEvent}>
        {atria.selectedEvent === 'moved' ? 'Reset selected event' : 'Move selected event'}
      </button>
    </div>
  );
}
