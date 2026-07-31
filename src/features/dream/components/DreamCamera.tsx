import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { forwardRef, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { dreamTimelineProgress, getDreamTimelineSnapshot } from '../timeline/dreamTimeline';
import { getAtriaCameraRig } from '../atria/atriaModel';
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

export const DreamCamera = forwardRef<THREE.PerspectiveCamera, DreamCameraProps>(function DreamCamera({ pointer, isActive }, ref) {
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const desiredPosition = useMemo(() => new THREE.Vector3(0, 0.2, 7.6), []);
  const desiredTarget = useMemo(() => new THREE.Vector3(0, 0.05, 0), []);
  const smoothPointer = useRef({ x: 0, y: 0 });

  useFrame(({ camera }) => {
    if (!isActive) return;

    smoothPointer.current.x += (pointer.current.targetX - smoothPointer.current.x) * 0.025;
    smoothPointer.current.y += (pointer.current.targetY - smoothPointer.current.y) * 0.025;
    pointer.current.x = smoothPointer.current.x;
    pointer.current.y = smoothPointer.current.y;

    if (dreamTimelineProgress.current >= 0.24 && dreamTimelineProgress.current <= 0.36) {
      const rig = getAtriaCameraRig(dreamTimelineProgress.current);
      desiredPosition.fromArray(rig.position);
      desiredTarget.fromArray(rig.target);
    } else if (dreamTimelineProgress.current <= 0.24) {
      const rig = getOpeningCameraRig(dreamTimelineProgress.current);
      desiredPosition.fromArray(rig.position);
      desiredTarget.fromArray(rig.target);
    } else {
      desiredPosition.copy(interpolateSceneVector('position', dreamTimelineProgress.current));
      desiredTarget.copy(interpolateSceneVector('target', dreamTimelineProgress.current));
    }

    desiredPosition.x += smoothPointer.current.x * 0.16;
    desiredPosition.y += smoothPointer.current.y * 0.08;
    desiredTarget.x += smoothPointer.current.x * 0.05;
    desiredTarget.y += smoothPointer.current.y * 0.035;

    camera.position.lerp(desiredPosition, 0.065);
    target.lerp(desiredTarget, 0.075);
    camera.lookAt(target);
  });

  return <PerspectiveCamera ref={ref} makeDefault position={[0, 0.2, 7.6]} fov={48} near={0.05} far={80} />;
});
