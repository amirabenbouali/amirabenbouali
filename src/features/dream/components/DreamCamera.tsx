import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { dreamTimelineProgress, getDreamTimelineSnapshot } from '../timeline/dreamTimeline';
import { atriaRange, getAtriaCameraRig } from '../atria/atriaModel';
import { foundryRange } from '../foundry/foundryTransition';
import { getFoundryCameraRig } from '../foundry/foundrySystem';
import { getOpeningCameraRig } from '../timeline/openingTimeline';
import type { PointerInfluenceRef } from './PointerInfluence';
import type { MutableRefObject } from 'react';

type DreamCameraProps = {
  pointer: MutableRefObject<PointerInfluenceRef>;
  isActive: boolean;
};

function interpolateSceneVector(kind: 'position' | 'target', progress: number) {
  const snapshot = getDreamTimelineSnapshot();
  const from = snapshot.activeScene.camera?.[kind] ?? [0, 0, 7];
  const to = snapshot.next?.camera?.[kind] ?? from;
  const blend = snapshot.leaving;

  return new THREE.Vector3(
    THREE.MathUtils.lerp(from[0], to[0], blend),
    THREE.MathUtils.lerp(from[1], to[1], blend),
    THREE.MathUtils.lerp(from[2], to[2], blend)
  ).add(new THREE.Vector3(Math.sin(progress * Math.PI * 2) * 0.12, Math.sin(progress * Math.PI) * 0.08, 0));
}

export function DreamCamera({ pointer, isActive }: DreamCameraProps) {
  const target = useRef(new THREE.Vector3(0, 0, 0));
  const desiredPosition = useRef(new THREE.Vector3(0, 0.2, 7.6));
  const desiredTarget = useRef(new THREE.Vector3(0, 0.05, 0));
  const smoothPointer = useRef({ x: 0, y: 0 });

  useFrame(({ camera }) => {
    if (!isActive) return;

    smoothPointer.current.x += (pointer.current.targetX - smoothPointer.current.x) * 0.025;
    smoothPointer.current.y += (pointer.current.targetY - smoothPointer.current.y) * 0.025;

    if (dreamTimelineProgress.current >= foundryRange.start && dreamTimelineProgress.current <= foundryRange.end) {
      const rig = getFoundryCameraRig(dreamTimelineProgress.current);
      desiredPosition.current.fromArray(rig.position);
      desiredTarget.current.fromArray(rig.target);
    } else if (dreamTimelineProgress.current >= atriaRange.start && dreamTimelineProgress.current <= atriaRange.end) {
      const rig = getAtriaCameraRig(dreamTimelineProgress.current);
      desiredPosition.current.fromArray(rig.position);
      desiredTarget.current.fromArray(rig.target);
    } else if (dreamTimelineProgress.current <= 0.24) {
      const rig = getOpeningCameraRig(dreamTimelineProgress.current);
      desiredPosition.current.fromArray(rig.position);
      desiredTarget.current.fromArray(rig.target);
    } else {
      desiredPosition.current.copy(interpolateSceneVector('position', dreamTimelineProgress.current));
      desiredTarget.current.copy(interpolateSceneVector('target', dreamTimelineProgress.current));
    }

    desiredPosition.current.x += smoothPointer.current.x * 0.16;
    desiredPosition.current.y += smoothPointer.current.y * 0.08;
    desiredTarget.current.x += smoothPointer.current.x * 0.05;
    desiredTarget.current.y += smoothPointer.current.y * 0.035;

    camera.position.lerp(desiredPosition.current, 0.065);
    target.current.lerp(desiredTarget.current, 0.075);
    camera.lookAt(target.current);
  });

  return null;
}
