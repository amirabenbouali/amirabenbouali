import { useEffect, useState } from 'react';

export type ReducedMotionOverride = 'system' | 'reduce' | 'motion';

export type ReducedMotionController = {
  prefersReducedMotion: boolean;
  systemPrefersReduced: boolean;
  override: ReducedMotionOverride;
  setOverride: (override: ReducedMotionOverride) => void;
};

const storageKey = 'amira:dream:reduced-motion';

export function resolveReducedMotion(systemPrefersReduced: boolean, override: ReducedMotionOverride) {
  if (override === 'reduce') return true;
  if (override === 'motion') return false;
  return systemPrefersReduced;
}

function readOverride(): ReducedMotionOverride {
  if (typeof window === 'undefined') return 'system';

  const value = window.localStorage.getItem(storageKey);
  return value === 'reduce' || value === 'motion' ? value : 'system';
}

export function useReducedMotionPreference(): ReducedMotionController {
  const [systemPrefersReduced, setSystemPrefersReduced] = useState(false);
  const [override, setOverrideState] = useState<ReducedMotionOverride>(() => readOverride());

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setSystemPrefersReduced(query.matches);

    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const setOverride = (nextOverride: ReducedMotionOverride) => {
    setOverrideState(nextOverride);

    if (nextOverride === 'system') {
      window.localStorage.removeItem(storageKey);
      return;
    }

    window.localStorage.setItem(storageKey, nextOverride);
  };

  return {
    prefersReducedMotion: resolveReducedMotion(systemPrefersReduced, override),
    systemPrefersReduced,
    override,
    setOverride
  };
}
