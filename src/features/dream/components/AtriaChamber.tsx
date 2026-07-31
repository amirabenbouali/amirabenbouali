import { Text } from '@react-three/drei';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import type * as THREE from 'three';
import { CalendarFacade } from './CalendarFacade';

export type AtriaChamberHandle = {
  group: THREE.Group | null;
  facade: THREE.Group | null;
};

export const AtriaChamber = forwardRef<AtriaChamberHandle>(function AtriaChamber(_, ref) {
  const group = useRef<THREE.Group>(null);
  const facade = useRef<THREE.Group>(null);

  useImperativeHandle(ref, () => ({ group: group.current, facade: facade.current }));

  return (
    <group ref={group} position={[0, -0.2, -30]} scale={[0.9, 0.9, 0.9]}>
      <mesh position={[0, -3.25, 1.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[42, 34, 1, 1]} />
        <meshStandardMaterial color="#080908" roughness={0.92} metalness={0.04} />
      </mesh>
      <mesh position={[0, 1.2, -1.4]}>
        <boxGeometry args={[15.4, 10.2, 0.48]} />
        <meshBasicMaterial color="#050605" />
      </mesh>
      <mesh position={[-8.2, 0.4, 1.8]} rotation={[0, 0.18, 0]}>
        <boxGeometry args={[0.22, 8.8, 19]} />
        <meshStandardMaterial color="#070907" roughness={0.94} />
      </mesh>
      <mesh position={[8.2, 0.4, 1.8]} rotation={[0, -0.18, 0]}>
        <boxGeometry args={[0.22, 8.8, 19]} />
        <meshStandardMaterial color="#070907" roughness={0.94} />
      </mesh>
      <mesh position={[0, 1.1, 0.7]}>
        <sphereGeometry args={[5.7, 36, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial color="#eee8dc" transparent opacity={0.028} depthWrite={false} />
      </mesh>
      <CalendarFacade ref={facade} />
      <Text
        position={[-4.85, 3.5, 0.54]}
        fontSize={0.18}
        anchorX="left"
        anchorY="middle"
        color="#eee8dc"
        letterSpacing={0.18}
        material-transparent
        material-opacity={0.48}
        material-toneMapped={false}
      >
        001 · ATRIA
      </Text>
      <Text
        position={[-4.85, 3.04, 0.54]}
        fontSize={0.34}
        maxWidth={2.9}
        anchorX="left"
        anchorY="top"
        color="#eee8dc"
        letterSpacing={-0.045}
        material-transparent
        material-opacity={0.82}
        material-toneMapped={false}
      >
        Time becomes architecture.
      </Text>
      <Text
        position={[-4.85, -3.12, 0.54]}
        fontSize={0.14}
        maxWidth={3.8}
        anchorX="left"
        anchorY="middle"
        color="#9da789"
        material-transparent
        material-opacity={0.64}
        material-toneMapped={false}
      >
        Days become rooms. Events become light. The cursor changes the hour of the dream.
      </Text>
    </group>
  );
});
