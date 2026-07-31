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
import {
  createFoundryCellMappings,
  createFoundryLineMappings,
  foundryRange,
  getFoundryModeReadiness,
  getFoundryPhases,
  getFoundrySignalPosition,
  getMappingProgress
} from '../foundry/foundryTransition';
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
const signalColor = new THREE.Color('#c5b782');
const foundryNodeColor = new THREE.Color('#1a2018');
const foundryTraceColor = new THREE.Color('#0d100d');

function lerpTransform(object: THREE.Object3D, source: { position: number[]; rotation: number[]; scale: number[] }, target: typeof source, blend: number) {
  object.position.set(
    THREE.MathUtils.lerp(source.position[0], target.position[0], blend),
    THREE.MathUtils.lerp(source.position[1], target.position[1], blend),
    THREE.MathUtils.lerp(source.position[2], target.position[2], blend)
  );
  object.rotation.set(
    THREE.MathUtils.lerp(source.rotation[0], target.rotation[0], blend),
    THREE.MathUtils.lerp(source.rotation[1], target.rotation[1], blend),
    THREE.MathUtils.lerp(source.rotation[2], target.rotation[2], blend)
  );
  object.scale.set(
    THREE.MathUtils.lerp(source.scale[0], target.scale[0], blend),
    THREE.MathUtils.lerp(source.scale[1], target.scale[1], blend),
    THREE.MathUtils.lerp(source.scale[2], target.scale[2], blend)
  );
}

export function AtriaWorld({ pointer, quality, atria, isActive }: AtriaWorldProps) {
  const group = useRef<THREE.Group>(null);
  const facade = useRef<THREE.Group>(null);
  const cellRefs = useRef(new Map<string, THREE.Group>());
  const lineRefs = useRef(new Map<string, THREE.Group>());
  const signal = useRef<THREE.Mesh>(null);
  const issue = useRef<THREE.Mesh>(null);
  const haze = useRef<THREE.MeshBasicMaterial>(null);
  const key = useRef<THREE.DirectionalLight>(null);
  const ambient = useRef<THREE.HemisphereLight>(null);
  const cells = useMemo(() => generateCalendarCells(quality), [quality]);
  const recurring = useMemo(() => new Set(getRecurringCells(cells).map((cell) => cell.id)), [cells]);
  const selectedCellId = atria.memory.selectedCell;
  const cellMappings = useMemo(() => createFoundryCellMappings(cells, selectedCellId), [cells, selectedCellId]);
  const lineMappings = useMemo(() => createFoundryLineMappings(quality === 'low' ? 4 : 5), [quality]);
  const portalMemory = useMemo(() => getPortalMemorySignature(), []);
  const timeColor = useMemo(() => new THREE.Color('#d8d5ca'), []);
  const baseColor = useMemo(() => new THREE.Color('#d8d5ca'), []);

  useFrame(({ clock }) => {
    if (!isActive) return;

    const progress = dreamTimelineProgress.current;
    const phases = getAtriaPhases(progress);
    const foundry = getFoundryPhases(progress);
    const inFoundryTransition = progress >= foundryRange.start && progress <= foundryRange.end;
    const mode = atriaModes[atria.mode];
    const readiness = getFoundryModeReadiness(atria.mode);
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
      group.current.visible = progress >= 0.24 && progress <= foundryRange.end + 0.02;
      group.current.position.z = -18.5 + phases.arrival * 2.4 - foundry.reassemble * 0.62;
      group.current.position.y = -0.16 + phases.inspect * 0.12 + foundry.reveal * 0.05;
      group.current.rotation.y = -0.04 + phases.inspect * 0.035 + foundry.reorient * 0.08;
    }

    if (facade.current) {
      facade.current.position.x = Math.sin(phases.inspect * Math.PI) * -0.72;
      facade.current.position.z = phases.close * 0.92 + foundry.detach * 0.16;
      facade.current.scale.setScalar(0.62 + phases.arrival * 0.28 - foundry.reveal * 0.04);
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
      haze.current.opacity = (phases.arrival * mode.haze + foundry.reveal * 0.46) * (quality === 'low' ? 0.08 : 0.14);
      haze.current.color.copy(timeColor);
    }

    cellMappings.forEach((mapping) => {
      const object = cellRefs.current.get(mapping.id);
      if (!object) return;
      const blend = inFoundryTransition || progress > foundryRange.end ? getMappingProgress(foundry.local, mapping) : 0;
      lerpTransform(object, mapping.source, mapping.target, blend);

      const order = Number(object.userData.order ?? 0);
      const tension = foundry.loss * (1 - foundry.reassemble * 0.82);
      object.position.x += Math.sin(order * 1.7) * tension * 0.035;
      object.position.y += Math.cos(order * 1.3) * tension * 0.028;
      object.rotation.z += Math.sin(order) * tension * 0.012;
    });

    lineMappings.forEach((mapping) => {
      const object = lineRefs.current.get(mapping.id);
      if (!object) return;
      const blend = inFoundryTransition || progress > foundryRange.end ? getMappingProgress(foundry.local, mapping) : 0;
      lerpTransform(object, mapping.source, mapping.target, blend);
      object.visible = quality !== 'low' || mapping.id.startsWith('column') || Number(mapping.id.split('-')[1]) % 2 === 0;
    });

    if (signal.current) {
      const signalPosition = getFoundrySignalPosition(foundry.local, selectedCellId);
      signal.current.position.set(signalPosition[0], signalPosition[1], signalPosition[2]);
      const visibility = foundry.signal * (1 - foundry.stillness);
      signal.current.visible = progress >= foundryRange.start + 0.04;
      signal.current.scale.setScalar(0.07 + visibility * 0.16 * readiness.intensity);
      const material = signal.current.material as THREE.MeshBasicMaterial;
      material.opacity = visibility * (0.5 + readiness.intensity * 0.48);
    }

    if (issue.current) {
      issue.current.visible = progress > foundryRange.start + 0.08;
      issue.current.position.y = -0.98 + Math.sin(clock.elapsedTime * 0.35) * 0.025;
      const material = issue.current.material as THREE.MeshBasicMaterial;
      material.opacity = foundry.reveal * 0.28;
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
          material.emissiveIntensity =
            (0.62 + timeValue * 0.68 + Math.sin(clock.elapsedTime * 0.7) * 0.04 + foundry.signal * 0.28) * mode.eventBoost;
          material.color.copy(eventWarm).lerp(eventCool, Math.max(0, timeValue - 0.66));
        }

        if (role === 'destination' && 'emissiveIntensity' in material) {
          material.emissiveIntensity = (atria.selectedEvent === 'moved' ? 0.72 : 0.2 + foundry.signal * 0.42) * mode.eventBoost;
        }

        if (role === 'frame' && 'roughness' in material) {
          material.color.lerp(foundryTraceColor, foundry.reassemble * 0.38);
        }

        if ((role === 'event' || role === 'destination') && 'roughness' in material) {
          material.color.lerp(foundryNodeColor, foundry.reveal * 0.18);
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
        {lineMappings.map((mapping) => (
          <group
            key={mapping.id}
            ref={(node) => {
              if (node) lineRefs.current.set(mapping.id, node);
              else lineRefs.current.delete(mapping.id);
            }}
            position={mapping.source.position}
            rotation={mapping.source.rotation}
            scale={mapping.source.scale}
            userData={{ foundryMapping: mapping.id, sourceRole: mapping.sourceRole, targetRole: mapping.targetRole }}
          >
            <mesh userData={{ materialRole: 'frame' }}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#13150f" emissive="#5e5842" emissiveIntensity={0.03} roughness={0.82} />
            </mesh>
          </group>
        ))}
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
          const cellId = `cell-${cell.id}`;
          return (
            <group
              key={cell.id}
              ref={(node) => {
                if (node) cellRefs.current.set(cellId, node);
                else cellRefs.current.delete(cellId);
              }}
              position={[x, y, cell.depth * -0.2]}
              userData={{ atriaAnchor: cell.anchor, cellId: cell.id, order: cell.anchor.order }}
            >
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
        <mesh ref={signal} visible={false} position={[0, 0, 1.2]}>
          <sphereGeometry args={[1, 18, 18]} />
          <meshBasicMaterial color={signalColor} transparent opacity={0} depthWrite={false} depthTest={false} />
        </mesh>
        <mesh ref={issue} visible={false} position={[1.2, -0.98, 1.86]}>
          <boxGeometry args={[0.62, 0.018, 0.018]} />
          <meshBasicMaterial color="#c5b782" transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}
