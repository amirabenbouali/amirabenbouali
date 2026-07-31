import { useEffect, useState } from 'react';

export type QualityTier = 'low' | 'medium' | 'high';

export type QualitySignals = {
  devicePixelRatio: number;
  width: number;
  height: number;
  coarsePointer: boolean;
  hardwareConcurrency?: number;
};

export function resolveQualityTier(signals: QualitySignals): QualityTier {
  const smallViewport = Math.min(signals.width, signals.height) < 640;
  const limitedCores = typeof signals.hardwareConcurrency === 'number' && signals.hardwareConcurrency <= 4;

  if (signals.coarsePointer || smallViewport || signals.devicePixelRatio > 2.5 || limitedCores) {
    return 'low';
  }

  if (signals.devicePixelRatio > 1.75 || signals.width < 1100) {
    return 'medium';
  }

  return 'high';
}

function getSignals(): QualitySignals {
  if (typeof window === 'undefined') {
    return { devicePixelRatio: 1, width: 1280, height: 720, coarsePointer: false, hardwareConcurrency: 8 };
  }

  return {
    devicePixelRatio: window.devicePixelRatio || 1,
    width: window.innerWidth,
    height: window.innerHeight,
    coarsePointer: typeof window.matchMedia === 'function' ? window.matchMedia('(pointer: coarse)').matches : false,
    hardwareConcurrency: navigator.hardwareConcurrency
  };
}

export function getPixelRatioForQuality(tier: QualityTier) {
  if (tier === 'high') return 1.5;
  if (tier === 'medium') return 1.25;
  return 1;
}

export function useViewportQuality() {
  const [signals, setSignals] = useState<QualitySignals>(() => getSignals());

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setSignals(getSignals());
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('resize', requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  const tier = resolveQualityTier(signals);

  return {
    tier,
    pixelRatio: getPixelRatioForQuality(tier),
    signals
  };
}
