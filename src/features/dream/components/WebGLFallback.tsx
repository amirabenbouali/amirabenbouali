import { dreamScenes } from '../dreamScenes.config';
import { getProjectBySlug } from '../../../data/projects';
import type { useAtriaState } from '../atria/useAtriaState';
import { getFoundryModeReadiness } from '../foundry/foundryTransition';
import { AtriaControls } from './AtriaControls';
import styles from '../DreamExperience.module.css';

type WebGLFallbackProps = {
  reason?: 'unsupported' | 'error';
  atria?: ReturnType<typeof useAtriaState>;
};

export function WebGLFallback({ reason = 'unsupported', atria }: WebGLFallbackProps) {
  const atriaProject = getProjectBySlug('atria');

  return (
    <main className={styles.fallback} role="status" aria-labelledby="fallback-title">
      <p>WebGL {reason === 'error' ? 'initialization failed' : 'unavailable'}</p>
      <h1 id="fallback-title">Amira Benbouali lucid portfolio foundation</h1>
      <p className={styles.openingSentence}>everything begins as an unfinished thought</p>
      <div className={styles.staticPortalFrame} aria-hidden="true">
        <span>o</span>
        <i />
      </div>
      <span>
        The interactive canvas could not be rendered, so the opening is preserved as a static editorial composition: the
        letter o becomes a frame, with Atria only hinted at beyond it.
      </span>
      {atriaProject ? (
        <section className={styles.atriaStaticFallback} aria-labelledby="fallback-atria-title">
          <h2 id="fallback-atria-title">Atria — Time Becomes Architecture</h2>
          <p>{atriaProject.summary}</p>
          {atria ? (
            <AtriaControls atria={atria} />
          ) : null}
          <div className={styles.staticCalendar} aria-hidden="true">
            {Array.from({ length: 28 }, (_, index) => (
              <span key={index} data-lit={index % 6 === 1 || index % 9 === 0 ? 'true' : undefined} />
            ))}
          </div>
          {atria ? (
            <p className={styles.systemMeta}>
              Foundry inherits {atria.memory.source}; {getFoundryModeReadiness(atria.mode).label}; selected cell{' '}
              {atria.memory.selectedCell}.
            </p>
          ) : null}
        </section>
      ) : null}
      <ol>
        {dreamScenes.map((scene) => (
          <li key={scene.id}>
            <strong>{scene.title}</strong>
            <span>{scene.summary}</span>
          </li>
        ))}
      </ol>
    </main>
  );
}
