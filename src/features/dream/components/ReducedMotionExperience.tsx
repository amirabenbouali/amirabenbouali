import { dreamScenes } from '../dreamScenes.config';
import styles from '../DreamExperience.module.css';

export function ReducedMotionExperience() {
  return (
    <main className={styles.reduced} aria-labelledby="dream-title">
      <section>
        <p className={styles.reducedKicker}>Reduced motion dream</p>
        <h1 id="dream-title">everything begins as an unfinished thought</h1>
        <p>
          Nothing is replaced. Everything transforms through a restrained story version of the lucid portfolio: thought,
          portal, projects, memory, identity and contact.
        </p>
      </section>
      {dreamScenes.slice(1).map((scene) => (
        <section key={scene.id}>
          <p className={styles.reducedKicker}>
            {scene.index} / {scene.label}
          </p>
          <h2>{scene.title}</h2>
          <p>{scene.summary}</p>
        </section>
      ))}
    </main>
  );
}
