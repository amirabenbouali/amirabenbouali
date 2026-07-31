import { describe, expect, it } from 'vitest';
import { resolveStoredAtriaMode } from './useAtriaState';

describe('resolveStoredAtriaMode', () => {
  it('resolves persisted Atria mode values', () => {
    expect(resolveStoredAtriaMode('calm')).toBe('calm');
    expect(resolveStoredAtriaMode('balanced')).toBe('balanced');
    expect(resolveStoredAtriaMode('planner')).toBe('planner');
    expect(resolveStoredAtriaMode('unknown')).toBe('balanced');
    expect(resolveStoredAtriaMode(null)).toBe('balanced');
  });
});
