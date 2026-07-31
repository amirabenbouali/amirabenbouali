import { describe, expect, it } from 'vitest';
import { getOpeningCameraRig, getOpeningPhases, getPortalMemorySignature, getThoughtLetterTransform } from './openingTimeline';

describe('opening timeline', () => {
  it('calculates ordered portal phases', () => {
    expect(getOpeningPhases(0.01).sentence).toBeGreaterThan(0);
    expect(getOpeningPhases(0.1).destabilize).toBeGreaterThan(0);
    expect(getOpeningPhases(0.18).portalFormation).toBeGreaterThan(0);
    expect(getOpeningPhases(0.26).cameraPassage).toBeGreaterThan(0);
    expect(getOpeningPhases(0.34).darkExit).toBeGreaterThan(0);
  });

  it('keeps letter transforms deterministic', () => {
    expect(getThoughtLetterTransform(2, 0.75, 0.4)).toEqual(getThoughtLetterTransform(2, 0.75, 0.4));
    expect(getThoughtLetterTransform(0, 1, 0).x).toBeLessThan(getThoughtLetterTransform(6, 1, 0).x);
  });

  it('moves the camera forward through the opening range', () => {
    expect(getOpeningCameraRig(0.28).position[2]).toBeLessThan(getOpeningCameraRig(0.04).position[2]);
  });

  it('exposes a reusable portal memory signature', () => {
    const signature = getPortalMemorySignature();

    expect(signature.source).toBe('thought-o-contour');
    expect(signature.rhythm).toHaveLength(7);
  });
});
