import { describe, expect, it } from 'vitest';
import { foundryMotionPhases, foundrySystemDepth, getCameraPersonality, getPhaseValues, getScenePersonality } from './motionConfig';

describe('dream motion config', () => {
  it('assigns scene personalities without changing the timeline source of truth', () => {
    expect(getScenePersonality('atria')).toBe('calm');
    expect(getScenePersonality('foundry')).toBe('system');
    expect(getScenePersonality('kansodb')).toBe('language');
    expect(getScenePersonality('mini-ci')).toBe('tracked');
  });

  it('derives camera behavior from scene personality', () => {
    expect(getCameraPersonality('foundry').push).toBeGreaterThan(getCameraPersonality('atria').push);
    expect(getCameraPersonality('mini-ci').drift).toBeLessThan(getCameraPersonality('atria').drift);
  });

  it('keeps Foundry typography grounded while the system layers carry depth', () => {
    expect(foundrySystemDepth.typography).toBe(0);
    expect(foundrySystemDepth.signals).toBeGreaterThan(foundrySystemDepth.cards);
    expect(foundrySystemDepth.cards).toBeGreaterThan(foundrySystemDepth.connections);
    expect(foundrySystemDepth.connections).toBeGreaterThan(foundrySystemDepth.grid);
  });

  it('exposes the full cinematic phase rhythm for Foundry', () => {
    const phases = getPhaseValues(0.75, foundryMotionPhases);

    expect(phases.prepare).toBe(1);
    expect(phases.enter).toBe(1);
    expect(phases.hold).toBe(1);
    expect(phases.transform).toBe(1);
    expect(phases.resolve).toBeGreaterThan(0);
    expect(phases.exit).toBe(0);
  });
});
