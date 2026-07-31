import { describe, expect, it } from 'vitest';
import {
  clampProgress,
  dreamScenes,
  getAdjacentScenes,
  getLocalSceneProgress,
  getSceneByProgress,
  getTransitionProgress
} from './dreamScenes.config';

describe('dream scene configuration', () => {
  it('clamps progress into the timeline bounds', () => {
    expect(clampProgress(-1)).toBe(0);
    expect(clampProgress(0.42)).toBe(0.42);
    expect(clampProgress(2)).toBe(1);
    expect(clampProgress(Number.NaN)).toBe(0);
  });

  it('looks up the active scene by global progress', () => {
    expect(getSceneByProgress(0).id).toBe('opening');
    expect(getSceneByProgress(0.26).id).toBe('atria');
    expect(getSceneByProgress(0.99).id).toBe('contact');
  });

  it('calculates local scene progress', () => {
    const atria = dreamScenes.find((scene) => scene.id === 'atria');
    expect(atria).toBeDefined();
    expect(getLocalSceneProgress(0.17, atria)).toBe(0);
    expect(getLocalSceneProgress(0.265, atria)).toBeCloseTo(0.5);
    expect(getLocalSceneProgress(0.36, atria)).toBe(1);
  });

  it('selects previous and next scenes', () => {
    const foundry = getSceneByProgress(0.4);
    const adjacent = getAdjacentScenes(foundry);

    expect(adjacent.previous?.id).toBe('atria');
    expect(adjacent.next?.id).toBe('kansodb');
  });

  it('calculates transition progress at scene edges', () => {
    const scene = getSceneByProgress(0.38);
    const start = getTransitionProgress(scene.start, scene);
    const middle = getTransitionProgress((scene.start + scene.end) / 2, scene);
    const end = getTransitionProgress(scene.end, scene);

    expect(start.entering).toBe(1);
    expect(middle.entering).toBe(0);
    expect(middle.leaving).toBe(0);
    expect(end.leaving).toBeCloseTo(1);
  });
});
