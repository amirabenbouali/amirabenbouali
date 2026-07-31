import { describe, expect, it } from 'vitest';
import {
  foundryDomains,
  foundryEdges,
  getFoundryCameraRig,
  getFoundryIncidentStage,
  getFoundryMemorySignature,
  getFoundrySignalPath,
  getFoundrySignalPosition,
  getFoundrySystemSnapshot,
  getIncidentReadiness,
  interpolatePath
} from './foundrySystem';

describe('foundrySystem', () => {
  it('defines a small semantic engineering system', () => {
    expect(foundryDomains).toHaveLength(5);
    expect(foundryEdges.some((edge) => edge.kind === 'alternate')).toBe(true);
    expect(foundryEdges.some((edge) => edge.kansoAnchor === 'parser-branch')).toBe(true);
  });

  it('derives reversible incident stages from local progress', () => {
    expect(getFoundryIncidentStage(0.1)).toBe('healthy');
    expect(getFoundryIncidentStage(0.4)).toBe('unstable');
    expect(getFoundryIncidentStage(0.62)).toBe('rerouting');
    expect(getFoundryIncidentStage(0.9)).toBe('stable');
  });

  it('changes signal route during rerouting', () => {
    const warning = getFoundrySystemSnapshot(0.36 + 0.49 * 0);
    const rerouting = { ...warning, stage: 'rerouting' as const, local: 0.64, reroute: 0.8 };

    expect(getFoundrySignalPath(warning)).toContain('data');
    expect(getFoundrySignalPath(rerouting)).toContain('identity');
  });

  it('interpolates signal positions along a path', () => {
    const position = interpolatePath(
      [
        [0, 0, 0],
        [2, 0, 0],
        [2, 2, 0]
      ],
      0.75
    );

    expect(position[0]).toBe(2);
    expect(position[1]).toBe(1);
  });

  it('marks affected readiness without relying on color alone', () => {
    const data = foundryDomains.find((domain) => domain.id === 'data');
    const snapshot = { ...getFoundrySystemSnapshot(0.43), fracture: 0.8, recovery: 0.1 };

    expect(data && getIncidentReadiness(data, snapshot, false)).toBe('blocked');
  });

  it('prepares the live signal as the kansoDB memory anchor', () => {
    const memory = getFoundryMemorySignature();
    const signal = getFoundrySignalPosition(getFoundrySystemSnapshot(0.49));
    const camera = getFoundryCameraRig(0.49);

    expect(memory.identity).toBe('foundry-live-signal');
    expect(memory.nextInheritance).toBe('kansoDB cursor');
    expect(signal[2]).toBeGreaterThan(1);
    expect(camera.target[2]).toBeLessThan(camera.position[2]);
  });
});
