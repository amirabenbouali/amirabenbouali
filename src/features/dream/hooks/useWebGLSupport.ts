import { useMemo } from 'react';

export function detectWebGLSupport(
  createCanvas = () => document.createElement('canvas'),
  isTestEnvironment = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('jsdom')
) {
  if (typeof document === 'undefined') return true;
  if (isTestEnvironment) return false;

  try {
    const canvas = createCanvas();
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export function useWebGLSupport() {
  return useMemo(() => detectWebGLSupport(), []);
}
