import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import {
  atriaModes,
  generateCalendarCells,
  getAtriaPhases,
  resolveTimeOfDay,
  getRecurringCells,
  pointerToTimeValue
} from '../atria/atriaModel';
import type { useAtriaState } from '../atria/useAtriaState';
import type { QualityTier } from '../hooks/useViewportQuality';
import { dreamTimelineProgress } from '../timeline/dreamTimeline';
import { getPortalMemorySignature } from '../timeline/openingTimeline';
import type { PointerInfluenceRef } from './PointerInfluence';
import type { MutableRefObject } from 'react';

type AtriaWorldProps = {
  pointer: MutableRefObject<PointerInfluenceRef>;
  quality: QualityTier;
  atria: ReturnType<typeof useAtriaState>;
  isActive: boolean;
};

const colorMorning = new THREE.Color('#ead8bd');
const colorAfternoon = new THREE.Color('#d8d5ca');
const colorNight = new THREE.Color('#6f7f89');
const eventWarm = new THREE.Color('#c5b782');
const eventCool = new THREE.Color('#9da789');

export function AtriaWorld({ pointer, quality, atria, isActive }: AtriaWorldProps) {
  const group = useRef<THREE.Group>(null);
  const facade = useRef<THREE.Group>(null);
  const haze = useRef<THREE.MeshBasicMaterial>(null);
  const key = useRef<THREE.DirectionalLight>(null);
  const ambient = useRef<THREE.HemisphereLight>(null);
  const cells = useMemo(() => generateCalendarCells(quality), [quality]);
  const recurring = useMemo(() => new Set(getRecurringCells(cells).map((cell) => cell.id)), [cells]);
  const portalMemory = useMemo(() => getPortalMemorySignature(), []);
  const timeColor = useMemo(() => new THREE.Color('#d8d5ca'), []);
  const baseColor = useMemo(() => new THREE.Color('#d8d5ca'), []);

  useFrame(({ clock }) => {
    if (!isActive) return;

    const phases = getAtriaPhases(dreamTimelineProgress.current);
    const mode = atriaModes[atria.mode];
    const timeValue = pointerToTimeValue(pointer.current.x);
    const broadTime = resolveTimeOfDay(pointer.current.x);
    if (broadTime !== atria.timeOfDay) {
      atria.setTimeOfDay(broadTime);
    }
    baseColor
      .copy(timeValue < 0.5 ? colorMorning : colorAfternoon)
      .lerp(timeValue < 0.5 ? colorAfternoon : colorNight, timeValue < 0.5 ? timeValue * 2 : (timeValue - 0.5) * 2);
    timeColor.lerp(baseColor, 0.025);

    if (group.current) {
      group.current.visible = phases.local > 0.01;
      group.current.position.z = -18.5 + phases.arrival * 2.4;
      group.current.position.y = -0.16 + phases.inspect * 0.12;
      group.current.rotation.y = -0.04 + phases.inspect * 0.035;
    }

    if (facade.current) {
      facade.current.position.x = Math.sin(phases.inspect * Math.PI) * -0.72;
      facade.current.position.z = phases.close * 0.92;
      facade.current.scale.setScalar(0.62 + phases.arrival * 0.28);
    }

    if (key.current) {
      key.current.color.copy(timeColor);
      key.current.intensity = (0.4 + phases.arrival * 1.45) * (1 - timeValue * 0.28);
      key.current.position.x = -3.2 + timeValue * 6.4;
    }

    if (ambient.current) {
      ambient.current.intensity = 0.08 + phases.arrival * (0.22 + (1 - timeValue) * 0.08);
      ambient.current.color.copy(timeColor);
    }

    if (haze.current) {
      haze.current.opacity = phases.arrival * mode.haze * (quality === 'low' ? 0.08 : 0.14);
      haze.current.color.copy(timeColor);
    }

    if (facade.current) {
      facade.current.traverse((child) => {
        if (!('material' in child)) return;
        const material = child.material as THREE.MeshStandardMaterial | THREE.MeshBasicMaterial;
        const role = child.userData.materialRole as string | undefined;

        if (role === 'frame' && 'roughness' in material) {
          material.color.set(timeValue > 0.66 ? '#070908' : '#11130f');
        }

        if (role === 'room' && 'roughness' in material) {
          material.color.set(timeValue > 0.66 ? '#050605' : '#090b09');
        }

        if (role === 'event' && 'emissiveIntensity' in material) {
          material.emissiveIntensity = (0.62 + timeValue * 0.68 + Math.sin(clock.elapsedTime * 0.7) * 0.04) * mode.eventBoost;
          material.color.copy(eventWarm).lerp(eventCool, Math.max(0, timeValue - 0.66));
        }

        if (role === 'destination' && 'emissiveIntensity' in material) {
          material.emissiveIntensity = (atria.selectedEvent === 'moved' ? 0.72 : 0.2) * mode.eventBoost;
        }
      });
    }
  });

  return (
    <group ref={group} visible={false}>
      <hemisphereLight ref={ambient} args={['#d8d5ca', '#050605', 0.18]} />
      <directionalLight ref={key} position={[-3, 4.8, 3]} intensity={1.1} />
      <mesh position={[0, -2.82, -0.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[28, 18, 1, 1]} />
        <meshStandardMaterial color="#050605" roughness={0.96} metalness={0.03} />
      </mesh>
      <mesh position={[0, 0.3, -0.9]}>
        <boxGeometry args={[12.2, 7.2, 0.38]} />
        <meshStandardMaterial color="#060706" roughness={0.92} />
      </mesh>
      <mesh position={[0, 0.2, 1.2]}>
        <planeGeometry args={[16, 9]} />
        <meshBasicMaterial ref={haze} color="#d8d5ca" transparent opacity={0} depthWrite={false} />
      </mesh>
      <group ref={facade} position={[0, 0, 0]}>
        <mesh position={[0, 2.92, 0.18]}>
          <boxGeometry args={[10.2, 0.08, 0.26]} />
          <meshStandardMaterial color="#d8d0b8" emissive="#5e5842" emissiveIntensity={0.12} roughness={0.78} />
        </mesh>
        {cells.map((cell) => {
          const x = (cell.column - 3) * 1.34;
          const y = (2 - cell.row) * 0.92;
          const selected = cell.id === (atria.selectedEvent === 'moved' ? '3-4' : '2-2');
          const destination = cell.id === '3-4';
          const recurringCell = recurring.has(cell.id);
          return (
            <group key={cell.id} position={[x, y, cell.depth * -0.2]} userData={{ atriaAnchor: cell.anchor, cellId: cell.id }}>
              <mesh userData={{ materialRole: 'frame' }}>
                <boxGeometry args={[1.14, 0.76, 0.22 + cell.depth]} />
                <meshStandardMaterial color="#11130f" roughness={0.88} metalness={0.02} />
              </mesh>
              <mesh position={[0, 0, 0.14 + cell.depth * 0.08]} userData={{ materialRole: 'room' }}>
                <boxGeometry args={[0.96, 0.58, 0.05]} />
                <meshStandardMaterial color="#090b09" roughness={0.92} metalness={0.02} />
              </mesh>
              {cell.active ? (
                <mesh
                  position={[
                    selected && atria.selectedEvent === 'moved' ? 0.18 : 0,
                    -0.12 + cell.eventDensity * 0.18,
                    0.22 + cell.depth * 0.12
                  ]}
                  userData={{ materialRole: selected || destination ? 'destination' : 'event' }}
                >
                  <boxGeometry args={[0.56 + cell.eventDensity * 0.24, 0.08 + cell.eventDensity * 0.12, 0.09]} />
                  <meshStandardMaterial
                    color={selected || destination ? '#9da789' : '#c5b782'}
                    emissive={selected || destination ? '#657053' : '#8e845e'}
                    emissiveIntensity={selected || destination ? 0.34 : 0.55}
                    roughness={selected || destination ? 0.68 : 0.58}
                  />
                </mesh>
              ) : null}
              {recurringCell ? (
                <mesh position={[0, -0.31, 0.24]} scale={[1 + portalMemory.contourScale * 0.02, 1, 1]}>
                  <torusGeometry args={[0.12, 0.008, 12, 36]} />
                  <meshBasicMaterial color="#c5b782" transparent opacity={0.24} />
                </mesh>
              ) : null}
            </group>
          );
        })}
      </group>
    </group>
  );
}
