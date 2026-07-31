import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type * as THREE from 'three';
import { dreamTimelineProgress } from '../timeline/dreamTimeline';
import { getOpeningPhases } from '../timeline/openingTimeline';

export function LetterPassage() {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    const phases = getOpeningPhases(dreamTimelineProgress.current);
    if (!group.current) return;

    group.current.visible = phases.cameraPassage > 0.02;
    group.current.position.z = -3.2 - phases.cameraPassage * 4.8;
    group.current.scale.setScalar(0.8 + phases.cameraPassage * 1.8);
  });

  return (
    <group ref={group} visible={false}>
      {[0, 1, 2, 3].map((index) => (
        <mesh key={index} position={[0, 0, -index * 0.72]} scale={[1 + index * 0.28, 1 + index * 0.28, 1]}>
          <torusGeometry args={[0.72, 0.035, 28, 120]} />
          <meshStandardMaterial color={index > 1 ? '#20211d' : '#7d7769'} roughness={0.92} transparent opacity={0.18 - index * 0.025} />
        </mesh>
      ))}
    </group>
  );
}
