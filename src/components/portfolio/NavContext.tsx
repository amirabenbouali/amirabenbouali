'use client';

import { createContext, useContext } from 'react';
import type { PortfolioView } from './data';

type NavigateFn = (target: PortfolioView) => void;

export const NavigateContext = createContext<NavigateFn | null>(null);

export function useScrapNavigate(): NavigateFn {
  const navigate = useContext(NavigateContext);
  if (!navigate) {
    throw new Error('useScrapNavigate must be used within ScrapbookChrome');
  }
  return navigate;
}
