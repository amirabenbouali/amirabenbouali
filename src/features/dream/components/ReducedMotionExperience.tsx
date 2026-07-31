import { dreamScenes } from '../dreamScenes.config';
import { getProjectBySlug } from '../../../data/projects';
import type { ReducedMotionController } from '../hooks/useReducedMotionPreference';
import type { QualityTier } from '../hooks/useViewportQuality';
import type { useAtriaState } from '../atria/useAtriaState';
import { AtriaControls } from './AtriaControls';
import styles from '../DreamExperience.module.css';

type ReducedMotionExperienceProps = {
  reducedMotion: ReducedMotionController;
  quality: QualityTier;
  webglSupported: boolean;
  atria: ReturnType<typeof useAtriaState>;
};

const atriaProject = getProjectBySlug('atria');

export function ReducedMotionExperience({ reducedMotion, quality, webglSupported, atria }: ReducedMotionExperienceProps) {
  return (
    <main className={styles.reduced} aria-labelledby="dream-title">
      <a className={styles.skipLink} href="#reduced-content">
        Skip to portfolio content
      </a>
      <p className={styles.reducedKicker}>Reduced motion dream shell</p>
      <h1 id="dream-title">Amira Benbouali lucid portfolio foundation</h1>
      <p className={styles.openingSentence}>everything begins as an unfinished thought</p>
      <div className={styles.staticPortalFrame} aria-hidden="true">
        <span>o</span>
        <i />
      </div>
      <p>
        Motion is reduced, so the portfolio story is presented as a quiet vertical reading experience. Future scenes remain
        in order without camera travel, pointer motion or spatial deformation: thought becomes an architectural opening,
        then a distant Atria silhouette waits beyond it.
      </p>
      <div className={styles.motionControlsStatic}>
        <button type="button" onClick={() => reducedMotion.setOverride('motion')}>
          Enable motion
        </button>
        {reducedMotion.override !== 'system' ? (
          <button type="button" onClick={() => reducedMotion.setOverride('system')}>
            Use system preference
          </button>
        ) : null}
      </div>
      <section id="reduced-content" aria-labelledby="reduced-scenes">
        <p className={styles.reducedKicker}>Scene order</p>
        <h2 id="reduced-scenes">Foundation scenes</h2>
        <ol className={styles.readingList}>
          {dreamScenes.map((scene) => (
            <li key={scene.id}>
              <span>{scene.index}</span>
              <strong>{scene.title}</strong>
              <p>{scene.summary}</p>
            </li>
          ))}
        </ol>
      </section>
      <section aria-labelledby="reduced-work">
        <p className={styles.reducedKicker}>Accessible project content</p>
        <h2 id="reduced-work">Selected work</h2>
        <p>Atria, Foundry, kansoDB and Mini CI are present as semantic placeholders for future project scenes.</p>
      </section>
      {atriaProject ? (
        <section className={styles.atriaPanel} aria-labelledby="reduced-atria">
          <p className={styles.reducedKicker}>Atria chamber</p>
          <h2 id="reduced-atria">Atria — Time Becomes Architecture</h2>
          <p>{atriaProject.summary}</p>
          <AtriaControls atria={atria} />
        </section>
      ) : null}
      <section aria-labelledby="reduced-about">
        <h2 id="reduced-about">About</h2>
        <p>Amira is a London-based software engineer and product builder. The reflective About scene is deferred.</p>
      </section>
      <section aria-labelledby="reduced-contact">
        <h2 id="reduced-contact">Contact</h2>
        <p>The final contact signal is deferred to a later milestone.</p>
      </section>
      <p className={styles.systemMeta}>
        Quality: {quality}. WebGL: {webglSupported ? 'supported' : 'fallback available'}.
      </p>
    </main>
  );
}
