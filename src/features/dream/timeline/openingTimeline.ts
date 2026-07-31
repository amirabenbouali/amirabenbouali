import { clampProgress } from '../dreamScenes.config';

export type OpeningPhases = {
  sentence: number;
  destabilize: number;
  portalFormation: number;
  cameraApproach: number;
  cameraPassage: number;
  darkExit: number;
};

export type ThoughtLetterTransform = {
  x: number;
  y: number;
  z: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  scaleX: number;
  scaleY: number;
};

export const openingRange = {
  start: 0,
  sentenceEnd: 0.09,
  destabilizeStart: 0.06,
  destabilizeEnd: 0.16,
  portalStart: 0.12,
  portalEnd: 0.23,
  approachStart: 0.14,
  approachEnd: 0.24,
  passageStart: 0.22,
  passageEnd: 0.3,
  darkExitStart: 0.27,
  darkExitEnd: 0.36
} as const;

export const thoughtLetters = [
  { value: 't', x: -1.68, drift: -1.1, depth: 0.18, baseline: -0.04, rotate: -0.05 },
  { value: 'h', x: -1.08, drift: -0.72, depth: 0.08, baseline: 0.05, rotate: 0.035 },
  { value: 'o', x: -0.43, drift: -0.08, depth: 0.42, baseline: -0.015, rotate: -0.018 },
  { value: 'u', x: 0.2, drift: 0.46, depth: 0.16, baseline: 0.07, rotate: 0.048 },
  { value: 'g', x: 0.82, drift: 0.92, depth: 0.28, baseline: -0.065, rotate: -0.04 },
  { value: 'h', x: 1.46, drift: 1.24, depth: 0.12, baseline: 0.035, rotate: 0.025 },
  { value: 't', x: 2.02, drift: 1.54, depth: 0.22, baseline: -0.025, rotate: 0.06 }
] as const;

function range(progress: number, start: number, end: number) {
  return clampProgress((progress - start) / Math.max(0.0001, end - start));
}

function smooth(progress: number) {
  const clamped = clampProgress(progress);
  return clamped * clamped * (3 - 2 * clamped);
}

export function getOpeningPhases(progress: number): OpeningPhases {
  return {
    sentence: smooth(range(progress, openingRange.start, openingRange.sentenceEnd)),
    destabilize: smooth(range(progress, openingRange.destabilizeStart, openingRange.destabilizeEnd)),
    portalFormation: smooth(range(progress, openingRange.portalStart, openingRange.portalEnd)),
    cameraApproach: smooth(range(progress, openingRange.approachStart, openingRange.approachEnd)),
    cameraPassage: smooth(range(progress, openingRange.passageStart, openingRange.passageEnd)),
    darkExit: smooth(range(progress, openingRange.darkExitStart, openingRange.darkExitEnd))
  };
}

export function getPortalMemorySignature() {
  return {
    source: 'thought-o-contour',
    rhythm: thoughtLetters.map((letter) => Number(letter.drift.toFixed(2))),
    contourScale: 1.72,
    note: 'Reuse this o-derived contour rhythm as a subtle structural echo in later dream scenes.'
  };
}

export function getThoughtLetterTransform(index: number, destabilize: number, portalFormation: number): ThoughtLetterTransform {
  const letter = thoughtLetters[index];
  const oGravity = Math.max(0, 1 - Math.abs(index - 2) * 0.22);
  const portalPull = portalFormation * oGravity;

  return {
    x: letter.drift * 0.24 * destabilize - portalPull * 0.06,
    y: letter.baseline * destabilize,
    z: letter.depth * destabilize + portalPull * 0.18,
    rotateX: letter.baseline * 0.6 * destabilize,
    rotateY: letter.drift * 0.045 * destabilize,
    rotateZ: letter.rotate * destabilize,
    scaleX: 1 + Math.abs(letter.drift) * 0.035 * destabilize + portalPull * 0.08,
    scaleY: 1 + Math.abs(letter.baseline) * 0.9 * destabilize + portalPull * 0.04
  };
}

export function getOpeningCameraRig(progress: number) {
  const phases = getOpeningPhases(progress);
  const z = 7.2 - phases.cameraApproach * 4.4 - phases.cameraPassage * 8.8;
  const x = 0.1 - phases.cameraApproach * 0.38 + phases.cameraPassage * 0.08;
  const y = 0.34 - phases.cameraApproach * 0.18 + phases.cameraPassage * 0.04;
  const targetZ = -0.2 - phases.cameraApproach * 1.8 - phases.cameraPassage * 9.5 - phases.darkExit * 8;

  return {
    position: [x, y, z] as [number, number, number],
    target: [-0.18, 0.08, targetZ] as [number, number, number],
    exposure: 1 - phases.darkExit * 0.82
  };
}
