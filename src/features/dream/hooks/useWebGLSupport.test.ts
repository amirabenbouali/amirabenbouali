import { describe, expect, it } from 'vitest';
import { detectWebGLSupport } from './useWebGLSupport';

describe('detectWebGLSupport', () => {
  it('returns true when a WebGL context can be created', () => {
    expect(detectWebGLSupport(() => ({ getContext: () => ({}) }) as HTMLCanvasElement, false)).toBe(true);
  });

  it('returns false when context creation fails', () => {
    expect(detectWebGLSupport(() => ({ getContext: () => null }) as HTMLCanvasElement, false)).toBe(false);
  });
});
