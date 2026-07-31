import { describe, expect, it } from 'vitest';
import { resolveQualityTier } from './useViewportQuality';

describe('resolveQualityTier', () => {
  it('selects low quality for coarse or constrained devices', () => {
    expect(resolveQualityTier({ devicePixelRatio: 1, width: 1280, height: 720, coarsePointer: true, hardwareConcurrency: 8 })).toBe(
      'low'
    );
    expect(resolveQualityTier({ devicePixelRatio: 3, width: 1280, height: 720, coarsePointer: false, hardwareConcurrency: 8 })).toBe(
      'low'
    );
  });

  it('selects medium quality for mid-sized desktops', () => {
    expect(resolveQualityTier({ devicePixelRatio: 2, width: 1280, height: 720, coarsePointer: false, hardwareConcurrency: 8 })).toBe(
      'medium'
    );
  });

  it('selects high quality for spacious capable displays', () => {
    expect(resolveQualityTier({ devicePixelRatio: 1, width: 1440, height: 900, coarsePointer: false, hardwareConcurrency: 8 })).toBe(
      'high'
    );
  });
});
