import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type * as THREE from 'three';
import { dreamScenes } from '../dreamScenes.config';

export type DreamTimelineRefs = {
  camera: THREE.PerspectiveCamera | null;
  cameraTarget: THREE.Vector3;
  sentence: THREE.Group | null;
  thoughtLetters: Array<THREE.Group | null>;
  portal: THREE.Group | null;
  portalRing: THREE.Mesh | null;
  atriaChamber: THREE.Group | null;
  atriaFacade: THREE.Group | null;
};

type CreateDreamTimelineOptions = {
  root: HTMLElement;
  refs: DreamTimelineRefs;
};

export function createDreamTimeline({ root, refs }: CreateDreamTimelineOptions) {
  if (typeof window !== 'undefined' && 'matchMedia' in window) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: root,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.4
    }
  });

  if (!refs.camera || !refs.sentence || !refs.portal || !refs.portalRing || !refs.atriaChamber || !refs.atriaFacade) {
    return () => timeline.kill();
  }

  const thought = dreamScenes.find((scene) => scene.id === 'thought') ?? dreamScenes[0];
  const portal = dreamScenes.find((scene) => scene.id === 'portal') ?? dreamScenes[1];
  const atria = dreamScenes.find((scene) => scene.id === 'atria') ?? dreamScenes[2];

  timeline
    .to(refs.sentence.position, { z: -0.85, y: 0.5, duration: thought.end - thought.start }, thought.start)
    .to(refs.camera.position, { y: 0.22, z: 6.15, duration: thought.end - thought.start }, thought.start)
    .to(refs.cameraTarget, { x: 0.16, y: 0.02, z: 0, duration: thought.end - thought.start }, thought.start);

  refs.thoughtLetters.forEach((letter, index) => {
    if (!letter) return;

    const offset = index - 3;
    timeline
      .to(
        letter.scale,
        { x: 1 + Math.abs(offset) * 0.13, y: 1.08 + Math.abs(offset) * 0.055, z: 1 + Math.abs(offset) * 0.18, duration: 1.2 },
        thought.start + 0.045,
      )
      .to(
        letter.position,
        { x: letter.position.x + offset * 0.2, y: letter.position.y + Math.sin(index * 1.4) * 0.16, z: Math.abs(offset) * 0.18, duration: 1.2 },
        thought.start + 0.045,
      )
      .to(letter.rotation, { z: offset * 0.055, y: offset * 0.025, duration: 1.2 }, thought.start + 0.045);
  });

  timeline
    .to(refs.portal.scale, { x: 4.1, y: 4.1, z: 4.1, duration: portal.end - portal.start }, portal.start)
    .to(refs.portal.rotation, { z: 0.18, duration: portal.end - portal.start }, portal.start)
    .to(refs.portalRing.material, { opacity: 0.64, duration: (portal.end - portal.start) * 0.82 }, portal.start)
    .to(refs.camera.position, { x: 0.14, y: 0.08, z: 1.15, duration: portal.end - portal.start }, portal.start + 0.02)
    .to(refs.cameraTarget, { x: 0.16, y: -0.02, z: -2.6, duration: portal.end - portal.start }, portal.start + 0.02)
    .to(refs.sentence.position, { z: -3.2, y: 0.46, duration: portal.end - portal.start }, portal.end - 0.02);

  timeline
    .to(refs.camera.position, { x: 0.18, y: 0.56, z: -9.6, duration: atria.end - atria.start }, atria.start)
    .to(refs.cameraTarget, { x: 0, y: 0.28, z: -18.5, duration: atria.end - atria.start }, atria.start)
    .to(refs.sentence.position, { z: -6.2, y: 1.7, duration: atria.end - atria.start }, atria.start + 0.02)
    .to(refs.sentence.scale, { x: 3.4, y: 3.4, z: 3.4, duration: atria.end - atria.start }, atria.start + 0.02)
    .to(refs.atriaChamber.position, { z: -18, duration: atria.end - atria.start }, atria.start)
    .to(refs.atriaChamber.scale, { x: 1, y: 1, z: 1, duration: atria.end - atria.start }, atria.start)
    .to(refs.atriaFacade.rotation, { x: -0.04, y: 0.04, duration: atria.end - atria.start }, atria.start + 0.04);

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
  };
}
