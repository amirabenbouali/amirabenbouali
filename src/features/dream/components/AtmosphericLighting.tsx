import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';
import type { PointerInfluenceRef } from './PointerInfluence';
import { dreamTimelineProgress } from '../timeline/dreamTimeline';
import { getOpeningPhases } from '../timeline/openingTimeline';

type AtmosphericLightingProps = {
  pointer: MutableRefObject<PointerInfluenceRef>;
};

const morning = new THREE.Color('#f0dac4');
const daylight = new THREE.Color('#f3efe3');
const evening = new THREE.Color('#6f7e88');

export function AtmosphericLighting({ pointer }: AtmosphericLightingProps) {
  const keyLight = useRef<THREE.DirectionalLight>(null);
  const ambientLight = useRef<THREE.AmbientLight>(null);
  const color = useRef(new THREE.Color('#f3efe3'));
  const smoothPointer = useRef({ x: 0, y: 0 });

  useFrame(() => {
    const phases = getOpeningPhases(dreamTimelineProgress.current);
    smoothPointer.current.x += (pointer.current.targetX - smoothPointer.current.x) * 0.035;
    smoothPointer.current.y += (pointer.current.targetY - smoothPointer.current.y) * 0.035;

    const horizontal = (smoothPointer.current.x + 1) / 2;
    const base = horizontal < 0.5 ? morning.clone().lerp(daylight, horizontal * 2) : daylight.clone().lerp(evening, (horizontal - 0.5) * 2);
    color.current.lerp(base, 0.025);

    if (keyLight.current) {
      keyLight.current.color.copy(color.current);
      keyLight.current.intensity += ((2.25 - horizontal * 0.9) * (1 - phases.darkExit * 0.72) - keyLight.current.intensity) * 0.025;
      keyLight.current.position.x += (smoothPointer.current.x * 3.6 - keyLight.current.position.x) * 0.025;
      keyLight.current.position.y += (4.8 - horizontal * 1.4 - keyLight.current.position.y) * 0.02;
    }

    if (ambientLight.current) {
      ambientLight.current.intensity += ((0.58 - horizontal * 0.22) * (1 - phases.darkExit * 0.78) - ambientLight.current.intensity) * 0.025;
      ambientLight.current.color.copy(color.current);
    }
  });

  return (
    <>
      <ambientLight ref={ambientLight} intensity={0.62} color="#f3efe3" />
      <directionalLight ref={keyLight} position={[1.8, 4.8, 3.2]} intensity={2.1} color="#f3efe3" />
      <pointLight position={[-4.4, 1.6, -18]} intensity={1.35} color="#c5b782" distance={18} />
      <pointLight position={[5.2, 2.2, -19]} intensity={0.42} color="#7f91a0" distance={20} />
    </>
  );
}
