import { Text } from '@react-three/drei';
import { forwardRef } from 'react';
import type * as THREE from 'three';

const columns = 7;
const rows = 5;
const events = new Set(['0-1', '1-3', '2-2', '2-5', '3-0', '3-4', '4-6']);
const eventOffsets = [0.1, -0.12, 0.04, 0.18, -0.05, 0.14, -0.18];

export const CalendarFacade = forwardRef<THREE.Group>(function CalendarFacade(_, ref) {
  const cells = [];

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      const key = `${y}-${x}`;
      const hasEvent = events.has(key);
      const dayNumber = String(y * columns + x + 1).padStart(2, '0');
      const eventHeight = 0.12 + ((x + y) % 3) * 0.08;
      const eventY = -0.18 + eventOffsets[(x + y) % eventOffsets.length];

      cells.push(
        <group key={key} position={[(x - 3) * 1.3, (2 - y) * 0.94, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.14, 0.78, 0.24]} />
            <meshStandardMaterial color={hasEvent ? '#1c2017' : '#0f120e'} roughness={0.84} metalness={0.02} />
          </mesh>
          <mesh position={[0, 0, 0.14]}>
            <boxGeometry args={[1.04, 0.68, 0.018]} />
            <meshStandardMaterial color={hasEvent ? '#20251a' : '#11140f'} transparent opacity={0.78} roughness={0.92} />
          </mesh>
          <Text
            position={[-0.43, 0.25, 0.166]}
            fontSize={0.09}
            anchorX="left"
            anchorY="middle"
            color="#eee8dc"
            letterSpacing={0.14}
            material-transparent
            material-opacity={0.28}
            material-toneMapped={false}
          >
            {dayNumber}
          </Text>
          {hasEvent ? (
            <>
              <mesh position={[0, eventY, 0.178]}>
                <boxGeometry args={[0.76, eventHeight, 0.04]} />
                <meshStandardMaterial color="#c5b782" emissive="#b9ae7a" emissiveIntensity={0.86} roughness={0.42} />
              </mesh>
              <mesh position={[0, eventY, 0.205]}>
                <boxGeometry args={[1.02, eventHeight * 0.82, 0.012]} />
                <meshBasicMaterial color="#d9cf9b" transparent opacity={0.08} />
              </mesh>
            </>
          ) : null}
        </group>
      );
    }
  }

  return (
    <group ref={ref} position={[0, 0.2, 0]}>
      <mesh position={[0, 0, -0.14]}>
        <boxGeometry args={[10.1, 5.95, 0.34]} />
        <meshStandardMaterial color="#080a08" roughness={0.88} metalness={0.03} />
      </mesh>
      {cells}
      <mesh position={[0, 2.78, 0.02]}>
        <boxGeometry args={[10.15, 0.1, 0.24]} />
        <meshStandardMaterial color="#eee8dc" emissive="#756f52" emissiveIntensity={0.14} transparent opacity={0.72} />
      </mesh>
      <mesh position={[0, -2.78, 0.02]}>
        <boxGeometry args={[10.15, 0.08, 0.22]} />
        <meshStandardMaterial color="#eee8dc" emissive="#756f52" emissiveIntensity={0.08} transparent opacity={0.26} />
      </mesh>
    </group>
  );
});
