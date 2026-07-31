import { dreamScenes } from '../dreamScenes.config';
import type { DreamTimelineSnapshot } from '../timeline/dreamTimeline';
import type { QualityTier } from '../hooks/useViewportQuality';
import type { ReducedMotionController } from '../hooks/useReducedMotionPreference';
import styles from '../DreamExperience.module.css';

type AccessibleOverlayProps = {
  timeline: DreamTimelineSnapshot;
  reducedMotion: ReducedMotionController;
  quality: QualityTier;
  webglSupported: boolean;
};

const projects = [
  {
    id: 'project-atria',
    title: 'Atria',
    description: 'A calm planning environment exploring how calendars can feel clearer and less crowded.'
  },
  {
    id: 'project-foundry',
    title: 'Foundry',
    description: 'A product-system concept for engineering ownership, operational readiness and release confidence.'
  },
  {
    id: 'project-kansodb',
    title: 'kansoDB',
    description: 'A database exploration focused on small, understandable query language and learning by rebuilding.'
  },
  {
    id: 'project-mini-ci',
    title: 'Mini CI',
    description: 'A lightweight continuous-integration experiment around source, build, test, artifact and release flow.'
  }
];

export function AccessibleOverlay({ timeline, reducedMotion, quality, webglSupported }: AccessibleOverlayProps) {
  const jumpToScene = (start: number) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max * start, behavior: reducedMotion.prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const skipExperience = () => jumpToScene(0.36);

  return (
    <>
      <a className={styles.skipLink} href="#dream-accessible-content">
        Skip to portfolio content
      </a>
      <div className={styles.topbar} aria-hidden="true">
        <span>Amira Benbouali</span>
        <span>Dream shell</span>
      </div>
      <div className={styles.stageLabel} aria-live="polite">
        <span>{timeline.activeScene.index}</span>
        <span>{timeline.activeScene.label}</span>
      </div>
      <div className={styles.progressRail} aria-hidden="true">
        <span style={{ transform: `scaleY(${Math.max(0.02, timeline.progress)})` }} />
      </div>
      <div className={styles.motionControls}>
        <button type="button" onClick={skipExperience}>
          Skip experience
        </button>
        <button type="button" onClick={() => reducedMotion.setOverride(reducedMotion.prefersReducedMotion ? 'motion' : 'reduce')}>
          {reducedMotion.prefersReducedMotion ? 'Enable motion' : 'Reduce motion'}
        </button>
        {reducedMotion.override !== 'system' ? (
          <button type="button" onClick={() => reducedMotion.setOverride('system')}>
            Use system
          </button>
        ) : null}
      </div>
      <details className={styles.sceneNavigator}>
        <summary>Scenes</summary>
        <ol>
          {dreamScenes.map((scene) => (
            <li key={scene.id}>
              <button type="button" onClick={() => jumpToScene(scene.start)} aria-current={timeline.activeScene.id === scene.id ? 'step' : undefined}>
                <span>{scene.index}</span>
                {scene.label}
              </button>
            </li>
          ))}
        </ol>
      </details>
      <section id="dream-accessible-content" className={styles.accessibleContent} aria-labelledby="accessible-title">
        <p className={styles.reducedKicker}>Semantic portfolio content</p>
        <h2 id="accessible-title">Amira Benbouali</h2>
        <p className={styles.openingSentence}>everything begins as an unfinished thought</p>
        <p>
          Software engineer and product builder in London. This milestone establishes the technical shell for a future
          continuous dream portfolio while keeping the actual content readable without WebGL.
        </p>

        <section aria-labelledby="work-heading">
          <h3 id="work-heading">Selected work</h3>
          <ol>
            {projects.map((project) => (
              <li key={project.id}>
                <strong id={project.id}>{project.title}</strong>
                <span>{project.description}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="about-heading">
          <h3 id="about-heading">About</h3>
          <p>
            The future experience will describe how Amira thinks, builds and moves through software problems. For now this
            placeholder keeps that content available outside the canvas.
          </p>
        </section>

        <section aria-labelledby="contact-heading">
          <h3 id="contact-heading">Contact</h3>
          <p>Contact information and the final interaction will arrive in a later milestone.</p>
        </section>

        <p className={styles.systemMeta}>
          Progress {Math.round(timeline.progress * 100)}%. Current scene: {timeline.activeScene.label}. Quality: {quality}.
          WebGL: {webglSupported ? 'supported' : 'fallback'}.
        </p>
      </section>
    </>
  );
}
