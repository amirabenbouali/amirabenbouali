import { describe, expect, it } from 'vitest';
import {
  atriaCalmDepth,
  atriaMotionPhases,
  foundryMotionPhases,
  foundrySystemDepth,
  getCameraPersonality,
  getPhaseValues,
  getScenePersonality,
  kansoLanguageDepth,
  kansoMotionPhases,
  miniMotionPhases,
  miniTrackedDepth
} from './motionConfig';

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

  it('keeps KansoDB precise and language-led rather than heavy', () => {
    expect(kansoLanguageDepth.typography).toBe(0);
    expect(kansoLanguageDepth.signals).toBeGreaterThan(kansoLanguageDepth.cards);
    expect(kansoLanguageDepth.grid).toBeLessThan(foundrySystemDepth.grid);
    expect(getCameraPersonality('kansodb').rotation).toBeGreaterThan(getCameraPersonality('foundry').rotation);
    expect(getCameraPersonality('kansodb').push).toBeLessThan(getCameraPersonality('foundry').push);
  });

  it('gives KansoDB a readable hold before structural transformation', () => {
    const hold = getPhaseValues(0.36, kansoMotionPhases);
    const transform = getPhaseValues(0.56, kansoMotionPhases);

    expect(hold.hold).toBeGreaterThanOrEqual(0.49);
    expect(hold.transform).toBe(0);
    expect(transform.transform).toBeGreaterThan(0);
  });

  it('keeps Atria shallow, calm and readable before flexible planning begins', () => {
    const hold = getPhaseValues(0.4, atriaMotionPhases);
    const transform = getPhaseValues(0.62, atriaMotionPhases);

    expect(atriaCalmDepth.typography).toBe(0);
    expect(atriaCalmDepth.cards).toBeLessThan(kansoLanguageDepth.cards);
    expect(atriaCalmDepth.signals).toBeLessThan(kansoLanguageDepth.signals);
    expect(getCameraPersonality('atria').rotation).toBeLessThan(getCameraPersonality('kansodb').rotation);
    expect(hold.hold).toBeGreaterThan(0.5);
    expect(hold.transform).toBe(0);
    expect(transform.transform).toBeGreaterThan(0);
  });

  it('keeps Mini CI tracked, shallow and stationary through its readable hold', () => {
    const hold = getPhaseValues(0.38, miniMotionPhases);
    const transform = getPhaseValues(0.62, miniMotionPhases);

    expect(miniTrackedDepth.typography).toBe(0);
    expect(miniTrackedDepth.cards).toBeLessThan(kansoLanguageDepth.cards);
    expect(miniTrackedDepth.signals).toBeLessThan(kansoLanguageDepth.signals);
    expect(getCameraPersonality('mini-ci').rotation).toBe(0);
    expect(getCameraPersonality('mini-ci').drift).toBeLessThan(getCameraPersonality('atria').drift);
    expect(hold.hold).toBeGreaterThan(0.5);
    expect(hold.transform).toBe(0);
    expect(transform.transform).toBeGreaterThan(0);
  });
});
