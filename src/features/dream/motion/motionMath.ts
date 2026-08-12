export function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

export function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

export function smooth(value: number) {
  return value * value * (3 - 2 * value);
}

export function localProgress(progress: number, start: number, end: number) {
  return clamp((progress - start) / (end - start));
}

export function phaseProgress(progress: number, start: number, end: number) {
  return smooth(localProgress(progress, start, end));
}

export function sceneGate(progress: number, [start, end]: readonly [number, number], fadeIn = 0.014, fadeOut = 0.014) {
  const entered = start <= 0 ? 1 : phaseProgress(progress, start, start + fadeIn);
  const remaining = end >= 1 ? 1 : 1 - phaseProgress(progress, end - fadeOut, end);
  return clamp(Math.min(entered, remaining));
}

export function phaseWindow(progress: number, [start, end]: readonly [number, number]) {
  return phaseProgress(progress, start, end);
}
