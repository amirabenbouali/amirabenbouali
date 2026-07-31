import { dreamScenes } from '../dreamScenes.config';
import styles from '../DreamExperience.module.css';

type WebGLFallbackProps = {
  reason?: 'unsupported' | 'error';
};

export function WebGLFallback({ reason = 'unsupported' }: WebGLFallbackProps) {
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
