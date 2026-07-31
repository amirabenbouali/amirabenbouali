import { useFrame } from '@react-three/fiber';
import { useLayoutEffect, useMemo, useRef } from 'react';
import type { MutableRefObject, RefObject } from 'react';
import * as THREE from 'three';
import { AtriaChamber, type AtriaChamberHandle } from './AtriaChamber';
import { AtmosphericLighting } from './AtmosphericLighting';
import { DreamCamera } from './DreamCamera';
import { FloatingSentence, type FloatingSentenceHandle } from './FloatingSentence';
import type { PointerInfluenceRef } from './PointerInfluence';
import { createDreamTimeline } from '../timeline/dreamTimeline';

type DreamSceneProps = {
  rootRef: RefObject<HTMLElement>;
  pointer: MutableRefObject<PointerInfluenceRef>;
};

export function DreamScene({ rootRef, pointer }: DreamSceneProps) {
  const camera = useRef<THREE.PerspectiveCamera>(null);
  const sentence = useRef<FloatingSentenceHandle>(null);
  const atria = useRef<AtriaChamberHandle>(null);
  const floorMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const leftWallMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const rightWallMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const smoothPointer = useRef({ x: 0, y: 0 });
  const cameraTarget = useMemo(() => new THREE.Vector3(0, 0.05, 0), []);
  const paperColor = useMemo(() => new THREE.Color('#ece7dd'), []);
  const chamberColor = useMemo(() => new THREE.Color('#050605'), []);
  const sceneColor = useMemo(() => new THREE.Color('#ece7dd'), []);
  const floorColor = useMemo(() => new THREE.Color('#ded8cc'), []);
  const wallColor = useMemo(() => new THREE.Color('#d0cabc'), []);

  useLayoutEffect(() => {
    if (!rootRef.current) return undefined;

    let cleanupTimeline: (() => void) | undefined;
    const frame = window.requestAnimationFrame(() => {
      if (!rootRef.current) return;

      cleanupTimeline = createDreamTimeline({
        root: rootRef.current,
        refs: {
          camera: camera.current,
          cameraTarget,
          sentence: sentence.current?.group ?? null,
          thoughtLetters: sentence.current?.letters ?? [],
          portal: sentence.current?.portal ?? null,
          portalRing: sentence.current?.portalRing ?? null,
          atriaChamber: atria.current?.group ?? null,
          atriaFacade: atria.current?.facade ?? null
        }
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      cleanupTimeline?.();
    };
  }, [cameraTarget, rootRef]);

  useFrame(({ clock, scene }) => {
    const elapsed = clock.getElapsedTime();
    smoothPointer.current.x += (pointer.current.targetX - smoothPointer.current.x) * 0.032;
    smoothPointer.current.y += (pointer.current.targetY - smoothPointer.current.y) * 0.032;
    const chamberProgress = camera.current ? THREE.MathUtils.clamp((-camera.current.position.z - 2.5) / 9, 0, 1) : 0;

    sceneColor.copy(paperColor).lerp(chamberColor, chamberProgress);
    scene.background = sceneColor;

    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.copy(sceneColor);
      scene.fog.near = 5.5 - chamberProgress * 1.5;
      scene.fog.far = 30 - chamberProgress * 10;
    }

    if (floorMaterial.current) {
      floorMaterial.current.color.copy(floorColor).lerp(chamberColor, chamberProgress);
    }

    if (leftWallMaterial.current) {
      leftWallMaterial.current.color.copy(wallColor).lerp(chamberColor, chamberProgress);
    }

    if (rightWallMaterial.current) {
      rightWallMaterial.current.color.copy(wallColor).lerp(chamberColor, chamberProgress);
    }

    if (sentence.current?.group) {
      sentence.current.group.rotation.x += (smoothPointer.current.y * 0.035 + Math.sin(elapsed * 0.42) * 0.015 - sentence.current.group.rotation.x) * 0.035;
      sentence.current.group.rotation.y += (smoothPointer.current.x * 0.055 + Math.sin(elapsed * 0.22) * 0.012 - sentence.current.group.rotation.y) * 0.035;
    }

    if (sentence.current?.portal) {
      sentence.current.portal.rotation.z += 0.0018;
    }

    if (atria.current?.facade) {
      atria.current.facade.position.x += (smoothPointer.current.x * 0.24 - atria.current.facade.position.x) * 0.018;
      atria.current.facade.position.y += (0.2 + smoothPointer.current.y * 0.08 - atria.current.facade.position.y) * 0.018;
    }
  });

  return (
    <>
      <color attach="background" args={['#ece7dd']} />
      <fog attach="fog" args={['#ece7dd', 6, 30]} />
      <DreamCamera ref={camera} target={cameraTarget} />
      <AtmosphericLighting pointer={pointer} />
      <group position={[0, 0, 0]}>
        <mesh position={[0, -2.2, -4]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[48, 52, 1, 1]} />
          <meshStandardMaterial ref={floorMaterial} color="#ded8cc" roughness={0.96} />
        </mesh>
        <mesh position={[-8, 2.5, -7]} rotation={[0, 0.18, 0]}>
          <boxGeometry args={[0.18, 7, 18]} />
          <meshStandardMaterial ref={leftWallMaterial} color="#d0cabc" roughness={0.9} />
        </mesh>
        <mesh position={[8, 2.2, -8]} rotation={[0, -0.14, 0]}>
          <boxGeometry args={[0.18, 7, 18]} />
          <meshStandardMaterial ref={rightWallMaterial} color="#c9c3b5" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.7, -6]} scale={[1, 0.35, 1]}>
          <sphereGeometry args={[9.4, 48, 18]} />
          <meshBasicMaterial color="#9da789" transparent opacity={0.035} depthWrite={false} />
        </mesh>
        <FloatingSentence ref={sentence} />
        <AtriaChamber ref={atria} />
      </group>
    </>
  );
}
