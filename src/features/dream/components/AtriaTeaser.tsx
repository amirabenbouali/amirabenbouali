import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type * as THREE from 'three';
import { dreamTimelineProgress } from '../timeline/dreamTimeline';
import { getOpeningPhases } from '../timeline/openingTimeline';

export function AtriaTeaser() {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    const phases = getOpeningPhases(dreamTimelineProgress.current);
    if (!group.current) return;

    group.current.visible = phases.darkExit > 0.02;
    group.current.position.z = -26 + phases.darkExit * 2;
    group.current.traverse((child) => {
      if ('material' in child) {
        const material = child.material as THREE.Material & { opacity?: number };
        material.opacity = Math.min(0.5, phases.darkExit * 0.42);
      }
    });
  });

  return (
    <group ref={group} visible={false} position={[0, 0.1, -26]}>
      <mesh position={[0, 0, -0.2]}>
        <boxGeometry args={[5.8, 3.2, 0.08]} />
        <meshBasicMaterial color="#0a0b09" transparent opacity={0} />
      </mesh>
      {Array.from({ length: 7 }, (_, x) =>
        Array.from({ length: 4 }, (_, y) => (
          <mesh key={`${x}-${y}`} position={[(x - 3) * 0.72, (1.5 - y) * 0.55, 0]}>
            <boxGeometry args={[0.56, 0.36, 0.035]} />
            <meshBasicMaterial color={(x + y) % 5 === 0 ? '#c5b782' : '#171812'} transparent opacity={0} />
          </mesh>
        ))
      )}
    </group>
  );
}
