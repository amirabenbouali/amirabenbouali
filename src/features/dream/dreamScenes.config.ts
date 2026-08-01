export type DreamSceneId =
  | 'opening'
  | 'portal'
  | 'atria'
  | 'foundry'
  | 'kansodb'
  | 'mini-ci'
  | 'memory'
  | 'assembly'
  | 'contact';

export type DreamSceneConfig = {
  id: DreamSceneId;
  index: string;
  label: string;
  title: string;
  summary: string;
  start: number;
  end: number;
  camera?: {
    position: [number, number, number];
    target: [number, number, number];
  };
  quality?: 'low' | 'medium' | 'high';
  accessibleHeadingId?: string;
};

export const dreamScenes: DreamSceneConfig[] = [
  {
    id: 'opening',
    index: '00',
    label: 'Opening',
    title: 'Technical dream shell',
    summary: 'A pale spatial world establishes the persistent canvas, camera and timeline without final scene design.',
    start: 0,
    end: 0.1,
    camera: { position: [0, 0.2, 7.6], target: [0, 0.05, 0] },
    quality: 'low',
    accessibleHeadingId: 'dream-title'
  },
  {
    id: 'portal',
    index: '01',
    label: 'Portal',
    title: 'Portal placeholder',
    summary: 'A restrained coordinate marker reserves the future transition without building the morphing letter yet.',
    start: 0.1,
    end: 0.17,
    camera: { position: [0.35, 0.18, 4.2], target: [0.1, 0.02, -2] },
    quality: 'low'
  },
  {
    id: 'atria',
    index: '02',
    label: 'Atria',
    title: 'Atria',
    summary: 'Placeholder for the future calendar architecture scene.',
    start: 0.17,
    end: 0.36,
    camera: { position: [0.1, 0.36, 0.4], target: [0, 0.12, -7] },
    quality: 'medium',
    accessibleHeadingId: 'project-atria'
  },
  {
    id: 'foundry',
    index: '03',
    label: 'Foundry',
    title: 'Foundry',
    summary: 'Placeholder for the future engineering-system scene.',
    start: 0.36,
    end: 0.49,
    camera: { position: [-0.25, 0.42, -5.3], target: [0.2, 0.1, -12] },
    quality: 'medium',
    accessibleHeadingId: 'project-foundry'
  },
  {
    id: 'kansodb',
    index: '04',
    label: 'kansoDB',
    title: 'kansoDB',
    summary: 'Placeholder for the future query-language scene.',
    start: 0.49,
    end: 0.62,
    camera: { position: [0.3, 0.5, -11], target: [-0.15, 0.08, -17] },
    quality: 'medium',
    accessibleHeadingId: 'project-kansodb'
  },
  {
    id: 'mini-ci',
    index: '05',
    label: 'Mini CI',
    title: 'Mini CI',
    summary: 'Placeholder for the future production-line scene.',
    start: 0.62,
    end: 0.74,
    camera: { position: [-0.2, 0.42, -16.2], target: [0, 0.08, -23] },
    quality: 'medium',
    accessibleHeadingId: 'project-mini-ci'
  },
  {
    id: 'memory',
    index: '06',
    label: 'Memory',
    title: 'About',
    summary: 'Placeholder for the future personal-memory scene.',
    start: 0.74,
    end: 0.84,
    camera: { position: [0.2, 0.52, -21.5], target: [0, 0.06, -28] },
    quality: 'low',
    accessibleHeadingId: 'about-heading'
  },
  {
    id: 'assembly',
    index: '07',
    label: 'Assembly',
    title: 'Identity assembly',
    summary: 'Placeholder for the future name-assembly scene.',
    start: 0.84,
    end: 0.93,
    camera: { position: [-0.12, 0.46, -26.2], target: [0.08, 0.08, -33] },
    quality: 'low'
  },
  {
    id: 'contact',
    index: '08',
    label: 'Contact',
    title: 'Contact',
    summary: 'Placeholder for the future contact signal.',
    start: 0.93,
    end: 1,
    camera: { position: [0, 0.38, -31], target: [0, 0.04, -37] },
    quality: 'low',
    accessibleHeadingId: 'contact-heading'
  }
];

export const dreamScrollLength = 1180;

export function clampProgress(progress: number) {
  if (Number.isNaN(progress)) return 0;
  return Math.min(1, Math.max(0, progress));
}

export function getSceneByProgress(progress: number) {
  const clamped = clampProgress(progress);
  return (
    dreamScenes.find((scene) => clamped >= scene.start && clamped < scene.end) ??
    dreamScenes[dreamScenes.length - 1]
  );
}

export function getLocalSceneProgress(progress: number, scene = getSceneByProgress(progress)) {
  const span = Math.max(0.0001, scene.end - scene.start);
  return clampProgress((clampProgress(progress) - scene.start) / span);
}

export function getAdjacentScenes(scene: DreamSceneConfig) {
  const index = dreamScenes.findIndex((candidate) => candidate.id === scene.id);
  return {
    previous: index > 0 ? dreamScenes[index - 1] : null,
    next: index >= 0 && index < dreamScenes.length - 1 ? dreamScenes[index + 1] : null
  };
}

export function getTransitionProgress(progress: number, scene = getSceneByProgress(progress)) {
  const local = getLocalSceneProgress(progress, scene);
  const edge = 0.18;
  return {
    entering: clampProgress((edge - local) / edge),
    leaving: clampProgress((local - (1 - edge)) / edge)
  };
}
