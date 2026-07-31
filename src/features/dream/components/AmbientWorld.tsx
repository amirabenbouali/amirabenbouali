import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type * as THREE from 'three';
import type { QualityTier } from '../hooks/useViewportQuality';
import { dreamTimelineProgress } from '../timeline/dreamTimeline';
import { getOpeningPhases } from '../timeline/openingTimeline';

type AmbientWorldProps = {
  quality: QualityTier;
  isActive: boolean;
};

export function AmbientWorld({ quality, isActive }: AmbientWorldProps) {
  const drift = useRef<THREE.Group>(null);
  const floorMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const dustCount = quality === 'high' ? 18 : quality === 'medium' ? 12 : 7;

  useFrame(({ clock }) => {
    const phases = getOpeningPhases(dreamTimelineProgress.current);

    if (floorMaterial.current) {
      floorMaterial.current.color.set(phases.darkExit > 0.5 ? '#070807' : '#e7e1d6');
      floorMaterial.current.opacity = phases.darkExit;
    }

    if (!isActive || !drift.current) return;
    drift.current.position.y = Math.sin(clock.elapsedTime * 0.16) * 0.04 - phases.cameraPassage * 0.08;
  });

  return (
    <group ref={drift}>
      <mesh position={[0, -1.34, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 54, 1, 1]} />
        <meshBasicMaterial ref={floorMaterial} color="#e7e1d6" transparent opacity={0} />
      </mesh>
      {Array.from({ length: dustCount }, (_, index) => {
        const x = ((index * 37) % 100) / 100;
        const y = ((index * 61) % 100) / 100;
        return (
          <mesh key={index} position={[(x - 0.5) * 7.2, (y - 0.5) * 3.2, -5 - index * 1.4]}>
            <sphereGeometry args={[0.006 + (index % 3) * 0.002, 6, 6]} />
            <meshBasicMaterial color="#171812" transparent opacity={0.08} />
          </mesh>
        );
      })}
    </group>
  );
}
