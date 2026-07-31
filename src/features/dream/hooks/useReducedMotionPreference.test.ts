import { describe, expect, it } from 'vitest';
import { resolveReducedMotion } from './useReducedMotionPreference';

describe('resolveReducedMotion', () => {
  it('uses system preference by default', () => {
    expect(resolveReducedMotion(true, 'system')).toBe(true);
    expect(resolveReducedMotion(false, 'system')).toBe(false);
  });

  it('allows explicit user overrides', () => {
    expect(resolveReducedMotion(false, 'reduce')).toBe(true);
    expect(resolveReducedMotion(true, 'motion')).toBe(false);
  });
});
