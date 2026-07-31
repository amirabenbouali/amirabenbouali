import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { foundryRange, smoothstep } from '../foundry/foundryTransition';
import {
  foundryDomains,
  foundryEdges,
  foundryOwners,
  foundryPostmortem,
  getDomainById,
  getFoundrySignalPosition,
  getFoundrySystemSnapshot,
  getIncidentReadiness
} from '../foundry/foundrySystem';
import type { FoundryEdge, FoundryReadiness } from '../foundry/foundrySystem';
import type { useFoundryState } from '../foundry/useFoundryState';
import type { QualityTier } from '../hooks/useViewportQuality';
import { dreamTimelineProgress } from '../timeline/dreamTimeline';
import type { PointerInfluenceRef } from './PointerInfluence';
import type { MutableRefObject } from 'react';

type FoundryWorldProps = {
  pointer: MutableRefObject<PointerInfluenceRef>;
  quality: QualityTier;
  foundry: ReturnType<typeof useFoundryState>;
  isActive: boolean;
};

const signalColor = new THREE.Color('#c5b782');
const readyColor = new THREE.Color('#8f9781');
const cautionColor = new THREE.Color('#a99c75');
const blockedColor = new THREE.Color('#856357');
const graphite = new THREE.Color('#080a09');
const coolLine = new THREE.Color('#707a78');

function readinessColor(readiness: FoundryReadiness) {
  if (readiness === 'ready') return readyColor;
  if (readiness === 'caution') return cautionColor;
  return blockedColor;
}

function midpoint(from: [number, number, number], to: [number, number, number]): [number, number, number] {
  return [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2];
}

function length(from: [number, number, number], to: [number, number, number]) {
  return Math.hypot(to[0] - from[0], to[1] - from[1], to[2] - from[2]);
}

function angleZ(from: [number, number, number], to: [number, number, number]) {
  return Math.atan2(to[1] - from[1], to[0] - from[0]);
}

function getEdgePoints(edge: FoundryEdge) {
  const from = getDomainById(edge.from)?.position ?? [0, 0, 0];
  const to = getDomainById(edge.to)?.position ?? [0, 0, 0];
  return { from, to };
}

export function FoundryWorld({ pointer, quality, foundry, isActive }: FoundryWorldProps) {
  const group = useRef<THREE.Group>(null);
  const nodes = useRef(new Map<string, THREE.Group>());
  const nodeMaterials = useRef(new Map<string, THREE.MeshStandardMaterial>());
  const edges = useRef(new Map<string, THREE.Group>());
  const edgeMaterials = useRef(new Map<string, THREE.MeshBasicMaterial>());
  const monitors = useRef(new Map<string, THREE.Mesh>());
  const signal = useRef<THREE.Mesh>(null);
  const issue = useRef<THREE.Mesh>(null);
  const reflection = useRef<THREE.Mesh>(null);
  const haze = useRef<THREE.MeshBasicMaterial>(null);
  const domains = useMemo(() => (quality === 'low' ? foundryDomains.filter((domain) => domain.id !== 'identity') : foundryDomains), [quality]);
  const visibleEdges = useMemo(
    () => foundryEdges.filter((edge) => quality !== 'low' || edge.kind === 'primary' || edge.kind === 'alternate'),
    [quality]
  );

  useFrame(({ clock }) => {
    if (!isActive) return;
    const progress = dreamTimelineProgress.current;
    const snapshot = getFoundrySystemSnapshot(progress);
    const visible = progress >= foundryRange.start + 0.025 && progress <= foundryRange.end + 0.035;
    const pointerDrift = pointer.current.x * 0.04;

    if (group.current) {
      group.current.visible = visible;
      group.current.position.set(0.02 + pointerDrift, -0.05, -16.2 - snapshot.exitSignal * 0.5);
      group.current.rotation.y = 0.03 + pointer.current.x * 0.012;
    }

    if (haze.current) {
      haze.current.opacity = snapshot.coherence * 0.08 + snapshot.warning * 0.025;
    }

    domains.forEach((domain) => {
      const node = nodes.current.get(domain.id);
      const material = nodeMaterials.current.get(domain.id);
      if (!node || !material) return;
      const readiness = getIncidentReadiness(domain, snapshot, foundry.ownershipAligned);
      const inspected = foundry.inspectedDomain === domain.id;
      const risk = domain.id === 'data';
      const unstable = risk ? snapshot.instability * (1 - snapshot.recovery) : 0;
      const fracture = risk ? snapshot.fracture * (1 - snapshot.recovery) : 0;
      const alignment = domain.owner === 'unclear' && !foundry.ownershipAligned ? 0.075 : 0;

      node.position.set(
        domain.position[0] + Math.sin(clock.elapsedTime * 0.42 + domain.position[0]) * alignment + fracture * 0.16,
        domain.position[1] - fracture * 0.14,
        domain.position[2] + unstable * 0.22
      );
      node.rotation.set(fracture * 0.04, unstable * -0.1, Math.sin(clock.elapsedTime * 0.3) * alignment);
      node.scale.set(
        domain.scale[0] * (inspected ? 1.08 : 1),
        domain.scale[1] * (inspected ? 1.04 : 1),
        domain.scale[2] * (1 + snapshot.coherence * 0.05)
      );

      material.color.copy(graphite).lerp(readinessColor(readiness), 0.16 + (inspected ? 0.05 : 0));
      material.emissive.copy(readinessColor(readiness));
      material.emissiveIntensity = (0.04 + snapshot.coherence * 0.06 + (inspected ? 0.04 : 0)) * (1 - fracture * 0.35);
    });

    visibleEdges.forEach((edge) => {
      const edgeGroup = edges.current.get(edge.id);
      const material = edgeMaterials.current.get(edge.id);
      const monitor = monitors.current.get(edge.id);
      if (!edgeGroup || !material) return;

      const riskEdge = edge.kind === 'risk';
      const alternate = edge.kind === 'alternate';
      const primary = edge.kind === 'primary';
      const activeAlternate = alternate && snapshot.reroute > 0.08;
      const fractured = riskEdge ? snapshot.fracture * (1 - snapshot.recovery) : 0;
      const tension = (riskEdge || edge.id === 'scheduling-delivery') ? snapshot.instability * (1 - snapshot.recovery) : 0;
      const repaired = edge.id === 'scheduling-delivery' && snapshot.recovery > 0.4;
      const basePosition = edgeGroup.userData.basePosition as [number, number, number];
      const baseRotation = edgeGroup.userData.baseRotation as number;

      edgeGroup.visible = quality !== 'low' || primary || alternate;
      edgeGroup.position.set(
        basePosition[0],
        basePosition[1] + Math.sin(clock.elapsedTime * 0.4 + basePosition[0]) * tension * 0.08,
        basePosition[2] + fractured * 0.08
      );
      edgeGroup.scale.x = Math.max(0.08, edgeGroup.userData.baseLength * (1 - fractured * 0.46));
      edgeGroup.rotation.z = baseRotation + tension * 0.08;

      material.color.copy(coolLine).lerp(signalColor, activeAlternate ? 0.38 : repaired ? 0.22 : 0.08 + snapshot.warning * 0.08);
      material.opacity =
        0.12 +
        snapshot.coherence * 0.24 +
        (activeAlternate ? snapshot.reroute * 0.36 : 0) -
        (riskEdge ? fractured * 0.28 : 0);

      if (monitor) {
        monitor.visible = edge.kind === 'monitoring' || activeAlternate || riskEdge;
        const monitorMaterial = monitor.material as THREE.MeshBasicMaterial;
        monitorMaterial.opacity =
          (edge.kind === 'monitoring' ? 0.18 : 0.06) + snapshot.warning * 0.22 + (activeAlternate ? 0.24 : 0) + snapshot.recovery * 0.08;
        monitor.position.x = Math.sin(clock.elapsedTime * (0.3 + snapshot.warning * 0.4)) * edgeGroup.userData.baseLength * 0.28;
      }
    });

    if (signal.current) {
      const position = getFoundrySignalPosition(snapshot);
      const inheritedSignal = smoothstep((snapshot.local - 0.54) / 0.14);
      signal.current.position.set(position[0], position[1], position[2]);
      signal.current.scale.setScalar(0.08 + snapshot.reroute * 0.04 + snapshot.exitSignal * 0.03);
      const material = signal.current.material as THREE.MeshBasicMaterial;
      material.opacity = visible ? inheritedSignal * (0.58 + snapshot.recovery * 0.2) : 0;
    }

    if (issue.current) {
      issue.current.visible = snapshot.warning > 0.05 && snapshot.recovery < 0.95;
      issue.current.position.set(0.92 + snapshot.fracture * 0.18, 0.05 - snapshot.fracture * 0.22, 1.66);
      issue.current.rotation.z = Math.PI / 4 + snapshot.instability * 0.28;
      const material = issue.current.material as THREE.MeshBasicMaterial;
      material.opacity = snapshot.warning * (1 - snapshot.recovery) * 0.62;
    }

    if (reflection.current) {
      reflection.current.visible = snapshot.reflection > 0.02;
      reflection.current.position.set(1.14, -1.2, 1.94);
      reflection.current.scale.setScalar(0.18 + snapshot.reflection * 0.42);
      const material = reflection.current.material as THREE.MeshBasicMaterial;
      material.opacity = snapshot.reflection * 0.32;
    }
  });

  return (
    <group ref={group} visible={false}>
      <mesh position={[0, 0, 2.6]}>
        <planeGeometry args={[7, 4.4]} />
        <meshBasicMaterial ref={haze} color="#5f6866" transparent opacity={0} depthWrite={false} />
      </mesh>
      {visibleEdges.map((edge) => {
        const { from, to } = getEdgePoints(edge);
        const center = midpoint(from, to);
        const edgeLength = length(from, to);
        return (
          <group
            key={edge.id}
            ref={(node) => {
              if (node) edges.current.set(edge.id, node);
              else edges.current.delete(edge.id);
            }}
            position={center}
            rotation={[0, 0, angleZ(from, to)]}
            scale={[edgeLength, 1, 1]}
          userData={{
              basePosition: center,
              baseRotation: angleZ(from, to),
              baseLength: edgeLength,
              foundryEdge: edge.id,
              sourceLine: edge.sourceLine,
              kansoAnchor: edge.kansoAnchor
            }}
          >
            <mesh>
              <boxGeometry args={[1, 0.018, 0.018]} />
              <meshBasicMaterial
                ref={(material) => {
                  if (material) edgeMaterials.current.set(edge.id, material);
                  else edgeMaterials.current.delete(edge.id);
                }}
                color="#707a78"
                transparent
                opacity={0.22}
              />
            </mesh>
            <mesh
              ref={(node) => {
                if (node) monitors.current.set(edge.id, node);
                else monitors.current.delete(edge.id);
              }}
              position={[0, 0.035, 0.02]}
            >
              <boxGeometry args={[0.22, 0.018, 0.018]} />
              <meshBasicMaterial color="#c5b782" transparent opacity={0} depthWrite={false} />
            </mesh>
          </group>
        );
      })}
      {domains.map((domain) => (
        <group
          key={domain.id}
          ref={(node) => {
            if (node) nodes.current.set(domain.id, node);
            else nodes.current.delete(domain.id);
          }}
          position={domain.position}
          scale={domain.scale}
          userData={{
            foundryDomain: domain.id,
            sourceCell: domain.sourceCell,
            kansoAnchor: domain.kansoAnchor
          }}
        >
          <mesh>
            <boxGeometry args={[1, 0.54, 0.42]} />
            <meshStandardMaterial
              ref={(material) => {
                if (material) nodeMaterials.current.set(domain.id, material);
                else nodeMaterials.current.delete(domain.id);
              }}
              color="#080a09"
              emissive="#8f9781"
              emissiveIntensity={0.06}
              roughness={0.86}
              metalness={0.12}
            />
          </mesh>
          <mesh position={[0, 0.34, 0.08]}>
            <boxGeometry args={[0.82, 0.035, 0.08]} />
            <meshBasicMaterial color="#c5b782" transparent opacity={domain.readiness === 'ready' ? 0.28 : 0.16} />
          </mesh>
          <mesh position={[0, -0.34, -0.08]}>
            <boxGeometry args={[0.58, 0.026, 0.06]} />
            <meshBasicMaterial color="#707a78" transparent opacity={0.18} />
          </mesh>
        </group>
      ))}
      {foundryOwners.map((owner) => (
        <mesh key={owner.id} position={owner.position} userData={{ foundryOwner: owner.id }}>
          <octahedronGeometry args={[0.12, 0]} />
          <meshBasicMaterial color="#8f9781" transparent opacity={foundry.ownershipAligned || owner.id !== 'product-systems' ? 0.42 : 0.2} />
        </mesh>
      ))}
      <mesh ref={signal} position={[-1.62, 0.42, 0.88]}>
        <sphereGeometry args={[1, 18, 18]} />
        <meshBasicMaterial color="#c5b782" transparent opacity={0.58} depthWrite={false} depthTest={false} />
      </mesh>
      <mesh ref={issue} visible={false}>
        <boxGeometry args={[0.12, 0.12, 0.018]} />
        <meshBasicMaterial color="#856357" transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh ref={reflection} visible={false} userData={{ foundryMemory: foundryPostmortem.change, kansoAnchor: 'live-signal-memory' }}>
        <torusGeometry args={[1, 0.014, 8, 44]} />
        <meshBasicMaterial color="#c5b782" transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}
