import { useSyncExternalStore } from 'react';
import { getDreamTimelineSnapshot, subscribeDreamTimeline } from '../timeline/dreamTimeline';

export function useScrollProgress() {
  return useSyncExternalStore(subscribeDreamTimeline, getDreamTimelineSnapshot, getDreamTimelineSnapshot);
}
