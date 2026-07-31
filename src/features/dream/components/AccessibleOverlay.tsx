import { dreamScenes } from '../dreamScenes.config';
import type { DreamSceneConfig } from '../dreamScenes.config';
import styles from '../DreamExperience.module.css';

type AccessibleOverlayProps = {
  activeScene: DreamSceneConfig;
  progress: number;
};

export function AccessibleOverlay({ activeScene, progress }: AccessibleOverlayProps) {
  const jumpToScene = (start: number) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max * start, behavior: 'smooth' });
  };

  return (
    <>
      <a className={styles.skipLink} href="#dream-accessible-content">
        Skip to portfolio story
      </a>
      <div className={styles.topbar} aria-hidden="true">
        <span>Amira Benbouali</span>
        <span>lucid software dream</span>
      </div>
      <div className={styles.stageLabel} aria-live="polite">
        <span>{activeScene.index}</span>
        <span>{activeScene.label}</span>
      </div>
      <div className={styles.progressRail} aria-hidden="true">
        <span style={{ transform: `scaleY(${Math.max(0.02, progress)})` }} />
      </div>
      <details className={styles.sceneNavigator}>
        <summary>Scenes</summary>
        <ol>
          {dreamScenes.map((scene) => (
            <li key={scene.id}>
              <button type="button" onClick={() => jumpToScene(scene.start)} aria-current={activeScene.id === scene.id ? 'step' : undefined}>
                <span>{scene.index}</span>
                {scene.label}
              </button>
            </li>
          ))}
        </ol>
      </details>
      <section id="dream-accessible-content" className={styles.accessibleContent} aria-labelledby="dream-story-title">
        <p className={styles.reducedKicker}>Semantic portfolio story</p>
        <h2 id="dream-story-title">Nothing is replaced. Everything transforms.</h2>
        <p>
          The immersive canvas presents Amira Benbouali&apos;s portfolio as one continuous lucid software dream. The same
          objects transform from unfinished thought into project architecture, engineering systems, query language, production
          machinery, memory fragments, identity and contact.
        </p>
        <ol>
          {dreamScenes.map((scene) => (
            <li key={scene.id}>
              <strong>{scene.title}</strong>
              <span>{scene.summary}</span>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
