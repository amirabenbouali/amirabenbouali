import { Html } from '@react-three/drei';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import * as THREE from 'three';
import styles from '../DreamExperience.module.css';

export type LetterPortalHandle = {
  group: THREE.Group | null;
  ring: THREE.Mesh | null;
};

type LetterPortalProps = {
  position: [number, number, number];
  color: string;
};

export const LetterPortal = forwardRef<LetterPortalHandle, LetterPortalProps>(function LetterPortal({ position, color }, ref) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useImperativeHandle(ref, () => ({ group: group.current, ring: ring.current }));

  return (
    <group ref={group} position={position} scale={[0.56, 0.56, 0.56]}>
      <mesh ref={ring}>
        <torusGeometry args={[0.72, 0.05, 56, 144]} />
        <meshStandardMaterial
          color={color}
          emissive="#4f5440"
          emissiveIntensity={0.08}
          transparent
          opacity={0.16}
          roughness={0.62}
          metalness={0.04}
        />
      </mesh>
      <mesh position={[0, 0, -0.022]} scale={[1.42, 1.42, 1.42]}>
        <torusGeometry args={[0.72, 0.012, 32, 128]} />
        <meshStandardMaterial color="#3d4231" transparent opacity={0.12} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, -0.045]} scale={[1.9, 1.9, 1.9]}>
        <torusGeometry args={[0.72, 0.008, 24, 128]} />
        <meshStandardMaterial color="#11120f" transparent opacity={0.07} roughness={0.9} />
      </mesh>
      <Html
        transform
        center
        position={[0, -0.025, 0.018]}
        distanceFactor={7.1}
        className={styles.spatialLetter}
        style={{ color }}
      >
        o
      </Html>
    </group>
  );
});
