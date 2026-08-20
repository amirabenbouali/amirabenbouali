'use client';

import { createContext, useContext } from 'react';

type DarkChromeValue = {
  setIsBig: (big: boolean) => void;
  wipeTo: (path: string) => void;
};

export const DarkChromeContext = createContext<DarkChromeValue | null>(null);

export function useDarkChrome(): DarkChromeValue {
  const ctx = useContext(DarkChromeContext);
  if (!ctx) {
    throw new Error('useDarkChrome must be used within DarkChrome');
  }
  return ctx;
}
