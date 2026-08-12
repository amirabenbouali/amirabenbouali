import type { DreamSceneId } from '../dreamScenes.config';
import { phaseWindow } from './motionMath';

export type CinematicPhaseName = 'prepare' | 'enter' | 'hold' | 'transform' | 'resolve' | 'exit';

export type CinematicPhases = Record<CinematicPhaseName, readonly [number, number]>;

export type ScenePersonality = 'calm' | 'system' | 'language' | 'tracked' | 'constellation' | 'neutral';

export type CameraPersonality = {
  weight: number;
  drift: number;
  push: number;
  rotation: number;
  pointer: number;
};

export type DepthLayer = 'background' | 'grid' | 'connections' | 'cards' | 'signals' | 'typography';

export const cinematicPhasePreset = {
  prepare: [0, 0.08],
  enter: [0.06, 0.18],
  hold: [0.16, 0.54],
  transform: [0.5, 0.72],
  resolve: [0.68, 0.86],
  exit: [0.82, 1]
} as const satisfies CinematicPhases;

export const scenePersonalities: Record<DreamSceneId, ScenePersonality> = {
  opening: 'neutral',
  portal: 'neutral',
  atria: 'calm',
  fold: 'calm',
  foundry: 'system',
  kansodb: 'language',
  'mini-ci': 'tracked',
  memory: 'constellation',
  assembly: 'constellation',
  contact: 'neutral'
};

export const cameraPersonalities: Record<ScenePersonality, CameraPersonality> = {
  neutral: { weight: 0.06, drift: 0.08, push: 0.08, rotation: 0, pointer: 0.08 },
  calm: { weight: 0.05, drift: 0.12, push: 0.04, rotation: 0.01, pointer: 0.06 },
  system: { weight: 0.08, drift: 0.04, push: 0.16, rotation: 0.005, pointer: 0.09 },
  language: { weight: 0.065, drift: 0.06, push: 0.1, rotation: 0.025, pointer: 0.07 },
  tracked: { weight: 0.07, drift: 0.02, push: 0.12, rotation: 0, pointer: 0.04 },
  constellation: { weight: 0.05, drift: 0.045, push: 0.03, rotation: 0.005, pointer: 0.035 }
};

export const depthLayers: Record<DepthLayer, number> = {
  background: 0.08,
  grid: 0.15,
  connections: 0.3,
  cards: 0.5,
  signals: 0.75,
  typography: 0.03
} as const;

export const foundrySystemDepth = {
  background: depthLayers.background,
  grid: depthLayers.grid,
  connections: depthLayers.connections,
  cards: depthLayers.cards,
  signals: depthLayers.signals,
  typography: 0
} as const satisfies Record<DepthLayer, number>;

export const kansoLanguageDepth = {
  background: 0.07,
  grid: 0.11,
  connections: 0.34,
  cards: 0.48,
  signals: 0.66,
  typography: 0
} as const satisfies Record<DepthLayer, number>;

export const atriaCalmDepth = {
  background: 0.05,
  grid: 0.09,
  connections: 0.16,
  cards: 0.28,
  signals: 0.42,
  typography: 0
} as const satisfies Record<DepthLayer, number>;

export const foundryMotionPhases = {
  prepare: [0, 0.06],
  enter: [0, 0.14],
  hold: [0.16, 0.56],
  transform: [0.58, 0.68],
  resolve: [0.7, 0.82],
  exit: [0.78, 0.9]
} as const satisfies CinematicPhases;

export const kansoMotionPhases = {
  prepare: [0, 0.1],
  enter: [0.08, 0.22],
  hold: [0.18, 0.54],
  transform: [0.54, 0.72],
  resolve: [0.72, 0.92],
  exit: [0.82, 1]
} as const satisfies CinematicPhases;

export const atriaMotionPhases = {
  prepare: [0, 0.12],
  enter: [0.08, 0.24],
  hold: [0.2, 0.58],
  transform: [0.58, 0.74],
  resolve: [0.74, 0.9],
  exit: [0.86, 1]
} as const satisfies CinematicPhases;

export function getScenePersonality(sceneId: DreamSceneId) {
  return scenePersonalities[sceneId];
}

export function getCameraPersonality(sceneId: DreamSceneId) {
  return cameraPersonalities[getScenePersonality(sceneId)];
}

export function getPhaseValues(localProgress: number, phases: CinematicPhases = cinematicPhasePreset) {
  return {
    prepare: phaseWindow(localProgress, phases.prepare),
    enter: phaseWindow(localProgress, phases.enter),
    hold: phaseWindow(localProgress, phases.hold),
    transform: phaseWindow(localProgress, phases.transform),
    resolve: phaseWindow(localProgress, phases.resolve),
    exit: phaseWindow(localProgress, phases.exit)
  };
}
