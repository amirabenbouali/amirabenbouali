import { useEffect, useMemo, useState } from 'react';
import { getAtriaMemorySignature, getSelectedEventState } from './atriaModel';
import type { AtriaEventState, AtriaMode, TimeOfDay } from './atriaModel';

const storageKey = 'amira:dream:atria-mode';

export function resolveStoredAtriaMode(value: string | null): AtriaMode {
  return value === 'calm' || value === 'planner' || value === 'balanced' ? value : 'balanced';
}

function readMode(): AtriaMode {
  if (typeof window === 'undefined') return 'balanced';
  return resolveStoredAtriaMode(window.localStorage.getItem(storageKey));
}

export function useAtriaState() {
  const [mode, setModeState] = useState<AtriaMode>(() => readMode());
  const [selectedEvent, setSelectedEvent] = useState<AtriaEventState>('resting');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('afternoon');

  useEffect(() => {
    window.localStorage.setItem(storageKey, mode);
  }, [mode]);

  const toggleSelectedEvent = () => setSelectedEvent((current) => getSelectedEventState(current));
  const memory = useMemo(() => getAtriaMemorySignature(mode, selectedEvent), [mode, selectedEvent]);

  return {
    mode,
    setMode: setModeState,
    selectedEvent,
    toggleSelectedEvent,
    timeOfDay,
    setTimeOfDay,
    memory
  };
}
