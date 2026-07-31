import { describe, expect, it } from 'vitest';
import { resolveFoundryDomain } from './useFoundryState';

describe('useFoundryState helpers', () => {
  it('resolves known domains and falls back safely', () => {
    expect(resolveFoundryDomain('delivery')).toBe('delivery');
    expect(resolveFoundryDomain('unknown')).toBe('core-platform');
    expect(resolveFoundryDomain(null)).toBe('core-platform');
  });
});
