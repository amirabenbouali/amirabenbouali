import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type * as THREE from 'three';
import type { QualityTier } from '../hooks/useViewportQuality';

type AmbientWorldProps = {
  quality: QualityTier;
  isActive: boolean;
};

export function AmbientWorld({ quality, isActive }: AmbientWorldProps) {
  const drift = useRef<THREE.Group>(null);
  const lineCount = quality === 'high' ? 11 : quality === 'medium' ? 7 : 4;

  useFrame(({ clock }) => {
    if (!isActive || !drift.current) return;
    drift.current.position.y = Math.sin(clock.elapsedTime * 0.16) * 0.04;
  });

  return (
    <group ref={drift}>
      <mesh position={[0, -1.34, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 54, 1, 1]} />
        <meshBasicMaterial color="#e7e1d6" />
      </mesh>
      {Array.from({ length: lineCount }, (_, index) => {
        const z = -index * 4.2;
        const opacity = 0.16 - index * 0.008;
        return (
          <group key={z} position={[0, -0.16, z]}>
            <mesh position={[-2.8, 0, 0]}>
              <boxGeometry args={[0.008, 1.6, 0.008]} />
              <meshBasicMaterial color="#171812" transparent opacity={opacity} />
            </mesh>
            <mesh position={[2.8, 0, 0]}>
              <boxGeometry args={[0.008, 1.6, 0.008]} />
              <meshBasicMaterial color="#171812" transparent opacity={opacity} />
            </mesh>
            <mesh position={[0, 0.78, 0]}>
              <boxGeometry args={[5.6, 0.008, 0.008]} />
              <meshBasicMaterial color="#171812" transparent opacity={opacity * 0.8} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
