import { foundryRange, getFoundryPhases, smoothstep } from './foundryTransition';

export type FoundryIncidentStage = 'healthy' | 'warning' | 'unstable' | 'fractured' | 'rerouting' | 'recovering' | 'stable';
export type FoundryReadiness = 'blocked' | 'caution' | 'ready';
export type FoundryDomainId = 'core-platform' | 'scheduling' | 'data' | 'delivery' | 'identity';
export type FoundryOwnerId = 'product-systems' | 'platform-reliability' | 'developer-experience';

export type FoundryDomain = {
  id: FoundryDomainId;
  label: string;
  owner: FoundryOwnerId | 'unclear';
  readiness: FoundryReadiness;
  position: [number, number, number];
  scale: [number, number, number];
  sourceCell: string;
  kansoAnchor?: 'query-surface' | 'cursor-origin';
};

export type FoundryOwner = {
  id: FoundryOwnerId;
  label: string;
  position: [number, number, number];
};

export type FoundryEdge = {
  id: string;
  from: FoundryDomainId;
  to: FoundryDomainId;
  kind: 'primary' | 'risk' | 'alternate' | 'monitoring' | 'ownership';
  readiness: FoundryReadiness;
  sourceLine: string;
  kansoAnchor?: 'parser-branch' | 'baseline';
};

export type FoundryPhaseSnapshot = {
  local: number;
  stage: FoundryIncidentStage;
  coherence: number;
  warning: number;
  instability: number;
  fracture: number;
  reroute: number;
  recovery: number;
  reflection: number;
  exitSignal: number;
};

export type FoundryMemorySignature = {
  identity: 'foundry-live-signal';
  visual: {
    color: 'warm inherited event light';
    shape: 'small travelling sphere';
    rhythm: number[];
  };
  endState: {
    stage: FoundryIncidentStage;
    position: [number, number, number];
    readiness: FoundryReadiness;
  };
  nextInheritance: 'kansoDB cursor';
};

export const foundryDomains: FoundryDomain[] = [
  {
    id: 'core-platform',
    label: 'Core Platform',
    owner: 'platform-reliability',
    readiness: 'ready',
    position: [-1.62, 0.42, 0.88],
    scale: [0.82, 0.7, 1.16],
    sourceCell: '2-2'
  },
  {
    id: 'scheduling',
    label: 'Scheduling',
    owner: 'unclear',
    readiness: 'caution',
    position: [-0.26, -0.06, 1.18],
    scale: [0.72, 0.62, 1.04],
    sourceCell: '3-0'
  },
  {
    id: 'data',
    label: 'Data',
    owner: 'platform-reliability',
    readiness: 'blocked',
    position: [0.92, 0.58, 1.4],
    scale: [0.7, 0.74, 1.12],
    sourceCell: '2-5',
    kansoAnchor: 'query-surface'
  },
  {
    id: 'delivery',
    label: 'Delivery',
    owner: 'developer-experience',
    readiness: 'ready',
    position: [1.86, -0.18, 1.62],
    scale: [0.82, 0.58, 1],
    sourceCell: '4-6',
    kansoAnchor: 'cursor-origin'
  },
  {
    id: 'identity',
    label: 'Identity',
    owner: 'product-systems',
    readiness: 'ready',
    position: [0.36, -0.82, 1.32],
    scale: [0.62, 0.5, 0.88],
    sourceCell: '3-4'
  }
];

export const foundryOwners: FoundryOwner[] = [
  { id: 'product-systems', label: 'Product Systems', position: [-0.82, -1.42, 1.18] },
  { id: 'platform-reliability', label: 'Platform Reliability', position: [-1.9, 1.26, 1.1] },
  { id: 'developer-experience', label: 'Developer Experience', position: [2.08, -1.02, 1.72] }
];

export const foundryEdges: FoundryEdge[] = [
  { id: 'core-scheduling', from: 'core-platform', to: 'scheduling', kind: 'primary', readiness: 'ready', sourceLine: 'row-2' },
  { id: 'scheduling-delivery', from: 'scheduling', to: 'delivery', kind: 'primary', readiness: 'caution', sourceLine: 'row-3', kansoAnchor: 'baseline' },
  { id: 'scheduling-data', from: 'scheduling', to: 'data', kind: 'risk', readiness: 'blocked', sourceLine: 'column-4' },
  { id: 'data-delivery', from: 'data', to: 'delivery', kind: 'risk', readiness: 'blocked', sourceLine: 'column-5' },
  { id: 'scheduling-identity', from: 'scheduling', to: 'identity', kind: 'alternate', readiness: 'ready', sourceLine: 'row-4', kansoAnchor: 'parser-branch' },
  { id: 'identity-delivery', from: 'identity', to: 'delivery', kind: 'alternate', readiness: 'ready', sourceLine: 'column-6' },
  { id: 'monitor-data', from: 'core-platform', to: 'data', kind: 'monitoring', readiness: 'caution', sourceLine: 'column-2' }
];

export const foundryPostmortem = {
  incident: 'A dependency lost alignment during deployment.',
  impact: 'The primary route became unavailable.',
  response: 'Monitoring detected the issue and traffic rerouted.',
  change: 'The route now has stronger readiness checks and a retained fallback.'
} as const;

export function getFoundrySystemSnapshot(globalProgress: number): FoundryPhaseSnapshot {
  const phases = getFoundryPhases(globalProgress);
  const local = phases.local;
  const warning = smoothstep((local - 0.24) / 0.13);
  const instability = smoothstep((local - 0.36) / 0.13);
  const fracture = smoothstep((local - 0.48) / 0.13);
  const reroute = smoothstep((local - 0.58) / 0.16);
  const recovery = smoothstep((local - 0.72) / 0.14);
  const reflection = smoothstep((local - 0.84) / 0.1);
  const exitSignal = smoothstep((local - 0.9) / 0.08);

  return {
    local,
    stage: getFoundryIncidentStage(local),
    coherence: phases.reveal,
    warning,
    instability,
    fracture,
    reroute,
    recovery,
    reflection,
    exitSignal
  };
}

export function getFoundryIncidentStage(local: number): FoundryIncidentStage {
  if (local < 0.24) return 'healthy';
  if (local < 0.36) return 'warning';
  if (local < 0.48) return 'unstable';
  if (local < 0.58) return 'fractured';
  if (local < 0.72) return 'rerouting';
  if (local < 0.84) return 'recovering';
  return 'stable';
}

export function getDomainById(id: FoundryDomainId) {
  return foundryDomains.find((domain) => domain.id === id);
}

export function getOwnerById(id: FoundryOwnerId) {
  return foundryOwners.find((owner) => owner.id === id);
}

export function getIncidentReadiness(domain: FoundryDomain, snapshot: FoundryPhaseSnapshot, ownershipAligned: boolean): FoundryReadiness {
  if (domain.id === 'scheduling' && !ownershipAligned && snapshot.local < 0.72) return 'caution';
  if (domain.id === 'data' && snapshot.fracture > 0.35 && snapshot.recovery < 0.5) return 'blocked';
  if (domain.id === 'delivery' && snapshot.reroute > 0.2) return 'ready';
  if (domain.id === 'data' && snapshot.recovery > 0.7) return 'caution';
  return ownershipAligned && domain.id === 'scheduling' ? 'ready' : domain.readiness;
}

export function getRouteForStage(stage: FoundryIncidentStage): FoundryDomainId[] {
  if (stage === 'rerouting' || stage === 'recovering') return ['core-platform', 'scheduling', 'identity', 'delivery'];
  return ['core-platform', 'scheduling', 'data', 'delivery'];
}

export function interpolatePath(points: Array<[number, number, number]>, progress: number): [number, number, number] {
  if (points.length === 0) return [0, 0, 0];
  if (points.length === 1) return points[0];
  const clamped = Math.min(1, Math.max(0, progress));
  const scaled = clamped * (points.length - 1);
  const index = Math.min(points.length - 2, Math.floor(scaled));
  const local = scaled - index;
  const from = points[index];
  const to = points[index + 1];
  return [from[0] + (to[0] - from[0]) * local, from[1] + (to[1] - from[1]) * local, from[2] + (to[2] - from[2]) * local];
}

export function getFoundrySignalPath(snapshot: FoundryPhaseSnapshot): FoundryDomainId[] {
  return getRouteForStage(snapshot.stage);
}

export function getFoundrySignalPosition(snapshot: FoundryPhaseSnapshot): [number, number, number] {
  const route = getFoundrySignalPath(snapshot);
  const points = route
    .map((id) => getDomainById(id)?.position)
    .filter((position): position is [number, number, number] => Boolean(position));
  const slowed = snapshot.stage === 'warning' || snapshot.stage === 'unstable' ? snapshot.local * 0.62 : snapshot.local;
  const pathProgress = snapshot.stage === 'rerouting' ? 0.35 + snapshot.reroute * 0.48 : snapshot.stage === 'recovering' ? 0.74 + snapshot.recovery * 0.2 : slowed;
  const position = interpolatePath(points, Math.min(1, pathProgress));
  return snapshot.exitSignal > 0.2
    ? [
        position[0] + snapshot.exitSignal * 0.72,
        position[1] - snapshot.exitSignal * 0.1,
        position[2] + snapshot.exitSignal * 0.9
      ]
    : position;
}

export function getFoundryMemorySignature(globalProgress = foundryRange.end): FoundryMemorySignature {
  const snapshot = getFoundrySystemSnapshot(globalProgress);
  return {
    identity: 'foundry-live-signal',
    visual: {
      color: 'warm inherited event light',
      shape: 'small travelling sphere',
      rhythm: [0.18, 0.44, 0.72, 0.58, 0.92]
    },
    endState: {
      stage: snapshot.stage,
      position: getFoundrySignalPosition(snapshot),
      readiness: 'ready'
    },
    nextInheritance: 'kansoDB cursor'
  };
}

export function getFoundryCameraRig(globalProgress: number) {
  const snapshot = getFoundrySystemSnapshot(globalProgress);
  const hold = snapshot.fracture * (1 - snapshot.reroute);
  const pathBias = snapshot.reroute * 0.82 + snapshot.recovery * 0.24 + snapshot.exitSignal * 0.38;

  return {
    position: [
      -0.35 + pathBias * 1.18 - hold * 0.18,
      0.58 + snapshot.warning * 0.08 - snapshot.recovery * 0.12,
      -8.3 - snapshot.coherence * 0.7 - snapshot.exitSignal * 0.85
    ] as [number, number, number],
    target: [
      -0.18 + pathBias * 0.72,
      0.02 - snapshot.fracture * 0.08,
      -14.7 - snapshot.exitSignal * 1.2
    ] as [number, number, number]
  };
}
