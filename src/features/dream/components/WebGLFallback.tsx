import { dreamScenes } from '../dreamScenes.config';
import styles from '../DreamExperience.module.css';

export function WebGLFallback() {
  return (
    <main className={styles.fallback} role="status" aria-labelledby="fallback-title">
      <p>WebGL fallback</p>
      <h1 id="fallback-title">everything begins as an unfinished thought</h1>
      <span>The interactive dream could not be rendered, so the transformation story is preserved as readable portfolio text.</span>
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
