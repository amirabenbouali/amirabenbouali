import {
  getAdjacentScenes,
  getLocalSceneProgress,
  getSceneByProgress,
  getTransitionProgress
} from '../dreamScenes.config';
import type { DreamSceneConfig } from '../dreamScenes.config';

export type DreamTimelineSnapshot = {
  progress: number;
  activeScene: DreamSceneConfig;
  localProgress: number;
  previous: DreamSceneConfig | null;
  next: DreamSceneConfig | null;
  entering: number;
  leaving: number;
};

type DreamTimelineSubscriber = () => void;

const subscribers = new Set<DreamTimelineSubscriber>();

export const dreamTimelineProgress = { current: 0 };

function createSnapshot(progress: number): DreamTimelineSnapshot {
  const activeScene = getSceneByProgress(progress);
  const adjacent = getAdjacentScenes(activeScene);
  const transition = getTransitionProgress(progress, activeScene);

  return {
    progress,
    activeScene,
    localProgress: getLocalSceneProgress(progress, activeScene),
    previous: adjacent.previous,
    next: adjacent.next,
    entering: transition.entering,
    leaving: transition.leaving
  };
}

let snapshot = createSnapshot(0);

export function getDreamTimelineSnapshot() {
  return snapshot;
}

export function subscribeDreamTimeline(subscriber: DreamTimelineSubscriber) {
  subscribers.add(subscriber);
  return () => subscribers.delete(subscriber);
}

export function setDreamTimelineProgress(progress: number) {
  const nextProgress = Math.min(1, Math.max(0, progress));
  if (Math.abs(nextProgress - dreamTimelineProgress.current) < 0.0005) return;

  dreamTimelineProgress.current = nextProgress;
  snapshot = createSnapshot(nextProgress);
  subscribers.forEach((subscriber) => subscriber());
}

export function createDreamTimeline(root: HTMLElement) {
  let frame = 0;
  let queued = false;

  const measure = () => {
    queued = false;
    const max = Math.max(1, root.offsetHeight - window.innerHeight);
    setDreamTimelineProgress(window.scrollY / max);
  };

  const queueMeasure = () => {
    if (queued) return;
    queued = true;
    frame = window.requestAnimationFrame(measure);
  };

  measure();
  window.addEventListener('scroll', queueMeasure, { passive: true });
  window.addEventListener('resize', queueMeasure);

  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener('scroll', queueMeasure);
    window.removeEventListener('resize', queueMeasure);
  };
}
