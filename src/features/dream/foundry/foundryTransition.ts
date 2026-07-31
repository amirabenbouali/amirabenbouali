import { getLocalSceneProgress } from '../dreamScenes.config';
import type { AtriaMode, CalendarCellData } from '../atria/atriaModel';

export type TransformTuple = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
};

export type FoundryTransformRole =
  | 'foundry-domain-node'
  | 'foundry-ownership-node'
  | 'foundry-monitoring-node'
  | 'foundry-readiness-node'
  | 'foundry-dependency-edge'
  | 'foundry-domain-axis'
  | 'foundry-background-trace';

export type FoundryTransformMapping = {
  id: string;
  sourceRole: string;
  targetRole: FoundryTransformRole;
  sourceMaterialRole: string;
  targetMaterialRole: string;
  source: TransformTuple;
  target: TransformTuple;
  delay: number;
  duration: number;
  easing: 'weighted' | 'linear';
  semanticMeaning: string;
  memorySignature?: 'selected-event' | 'recurring-rhythm' | 'seven-column-rhythm' | 'readiness-mode';
  qualityBehavior: 'always' | 'medium-up' | 'high-only';
  reducedMotionBehavior: 'show-source-and-target' | 'summarize';
};

export const foundryRange = {
  start: 0.36,
  end: 0.49
} as const;

export const foundryNodeCells = {
  domain: '2-2',
  movedDomain: '3-4',
  ownership: '2-5',
  monitoring: '3-0',
  readiness: '4-6'
} as const;

export function smoothstep(value: number) {
  const x = Math.min(1, Math.max(0, value));
  return x * x * (3 - 2 * x);
}

export function getFoundryTransitionProgress(globalProgress: number) {
  return getLocalSceneProgress(globalProgress, {
    id: 'foundry',
    index: '03',
    label: 'Foundry',
    title: 'Foundry',
    summary: '',
    start: foundryRange.start,
    end: foundryRange.end
  });
}

export function getFoundryPhases(globalProgress: number) {
  const local = getFoundryTransitionProgress(globalProgress);

  return {
    local,
    stillness: 1 - smoothstep((local - 0.08) / 0.14),
    loss: smoothstep((local - 0.1) / 0.18),
    detach: smoothstep((local - 0.24) / 0.22),
    reorient: smoothstep((local - 0.4) / 0.22),
    signal: smoothstep((local - 0.54) / 0.2),
    reassemble: smoothstep((local - 0.68) / 0.18),
    reveal: smoothstep((local - 0.82) / 0.16)
  };
}

export function getMappingProgress(local: number, mapping: Pick<FoundryTransformMapping, 'delay' | 'duration' | 'easing'>) {
  const raw = (local - mapping.delay) / mapping.duration;
  return mapping.easing === 'weighted' ? smoothstep(raw) : Math.min(1, Math.max(0, raw));
}

export function getCellSourceTransform(cell: CalendarCellData): TransformTuple {
  return {
    position: [(cell.column - 3) * 1.34, (2 - cell.row) * 0.92, cell.depth * -0.2],
    rotation: [0, 0, 0],
    scale: [1, 1, 1]
  };
}

export function getFoundryTargetForCell(cell: CalendarCellData, selectedCellId: string): TransformTuple {
  const selected = cell.id === selectedCellId;
  const rolePosition = getNodePosition(cell.id, selectedCellId);
  const secondaryDepth = cell.active ? 1.65 : 2.45;
  const recede = cell.active ? 0.74 : 0.34;

  return {
    position: rolePosition ?? [(cell.column - 3) * 0.78, (2 - cell.row) * 0.36 - 0.1, secondaryDepth + cell.row * 0.06],
    rotation: [0, selected ? -0.1 : 0.04 * (cell.column - 3), selected ? -0.02 : 0],
    scale: rolePosition ? [0.78, 0.78, 1.16] : [recede, recede * 0.72, 0.46]
  };
}

export function getNodePosition(cellId: string, selectedCellId: string = foundryNodeCells.domain): [number, number, number] | null {
  if (cellId === selectedCellId) return [-1.45, 0.34, 0.92];
  if (cellId === foundryNodeCells.ownership) return [0.88, 0.68, 1.36];
  if (cellId === foundryNodeCells.monitoring) return [-0.2, -0.62, 1.18];
  if (cellId === foundryNodeCells.readiness) return [1.76, -0.18, 1.62];
  return null;
}

function getCellTargetRole(cell: CalendarCellData, selectedCellId: string): FoundryTransformRole {
  if (cell.id === selectedCellId) return 'foundry-domain-node';
  if (cell.id === foundryNodeCells.ownership) return 'foundry-ownership-node';
  if (cell.id === foundryNodeCells.monitoring) return 'foundry-monitoring-node';
  if (cell.id === foundryNodeCells.readiness) return 'foundry-readiness-node';
  if (cell.active) return 'foundry-dependency-edge';
  return 'foundry-background-trace';
}

function getMemorySignature(cell: CalendarCellData, selectedCellId: string): FoundryTransformMapping['memorySignature'] {
  if (cell.id === selectedCellId) return 'selected-event';
  if (cell.eventType === 'recurring') return 'recurring-rhythm';
  if (cell.eventType === 'planning') return 'readiness-mode';
  return undefined;
}

export function createFoundryCellMappings(cells: CalendarCellData[], selectedCellId: string = foundryNodeCells.domain): FoundryTransformMapping[] {
  return cells.map((cell) => {
    const targetRole = getCellTargetRole(cell, selectedCellId);
    return {
      id: `cell-${cell.id}`,
      sourceRole: cell.active ? 'atria-event-room' : 'atria-calendar-room',
      targetRole,
      sourceMaterialRole: cell.active ? 'event-light' : 'calendar-frame',
      targetMaterialRole: targetRole.includes('node') ? 'system-node' : 'system-trace',
      source: getCellSourceTransform(cell),
      target: getFoundryTargetForCell(cell, selectedCellId),
      delay: cell.active ? 0.22 + cell.row * 0.025 : 0.3 + cell.row * 0.018 + cell.column * 0.006,
      duration: cell.active ? 0.46 : 0.34,
      easing: 'weighted',
      semanticMeaning:
        targetRole === 'foundry-domain-node'
          ? 'Atria selected event becomes the first Foundry domain node.'
          : targetRole === 'foundry-monitoring-node'
            ? 'Atria recurring event cadence becomes a monitoring node.'
            : targetRole === 'foundry-readiness-node'
              ? 'Atria planning cadence becomes deployment readiness.'
              : 'Atria calendar room becomes a supporting system trace.',
      memorySignature: getMemorySignature(cell, selectedCellId),
      qualityBehavior: cell.active ? 'always' : cell.row > 3 ? 'medium-up' : 'always',
      reducedMotionBehavior: cell.active ? 'show-source-and-target' : 'summarize'
    };
  });
}

export function createFoundryLineMappings(rows: number, columns = 7): FoundryTransformMapping[] {
  const rowLines: FoundryTransformMapping[] = Array.from({ length: rows + 1 }, (_, row) => ({
    id: `row-${row}`,
    sourceRole: 'atria-row-line',
    targetRole: 'foundry-dependency-edge' as const,
    sourceMaterialRole: 'calendar-line',
    targetMaterialRole: 'dependency-edge',
    source: {
      position: [0, 2.46 - row * 0.92, 0.22] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      scale: [9.54, 0.018, 0.018] as [number, number, number]
    },
    target: {
      position: [-0.32 + row * 0.28, 0.98 - row * 0.32, 1.18 + row * 0.1] as [number, number, number],
      rotation: [0, 0.02 * (row - 2), -0.18 + row * 0.075] as [number, number, number],
      scale: [5.6 - row * 0.28, 0.018, 0.018] as [number, number, number]
    },
    delay: 0.18 + row * 0.035,
    duration: 0.58,
    easing: 'weighted' as const,
    semanticMeaning: 'Atria horizontal row becomes a Foundry dependency edge.',
    memorySignature: row === 0 ? ('seven-column-rhythm' as const) : undefined,
    qualityBehavior: 'always' as const,
    reducedMotionBehavior: 'show-source-and-target' as const
  }));

  const columnLines: FoundryTransformMapping[] = Array.from({ length: columns + 1 }, (_, column) => ({
    id: `column-${column}`,
    sourceRole: 'atria-column-line',
    targetRole: 'foundry-domain-axis' as const,
    sourceMaterialRole: 'calendar-line',
    targetMaterialRole: 'domain-axis',
    source: {
      position: [-4.69 + column * 1.34, 0.16, 0.24] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      scale: [0.018, rows * 0.92 + 0.54, 0.018] as [number, number, number]
    },
    target: {
      position: [-2.4 + column * 0.72, 0.02 + Math.sin(column) * 0.12, 1.52 + (column % 3) * 0.16] as [
        number,
        number,
        number
      ],
      rotation: [0, 0.1 + column * 0.015, 1.12 - column * 0.1] as [number, number, number],
      scale: [0.018, 2.2 + (column % 2) * 0.7, 0.018] as [number, number, number]
    },
    delay: 0.25 + column * 0.024,
    duration: 0.5,
    easing: 'weighted' as const,
    semanticMeaning: 'Atria weekly division becomes a Foundry ownership or domain axis.',
    memorySignature: column < 7 ? ('seven-column-rhythm' as const) : undefined,
    qualityBehavior: 'always' as const,
    reducedMotionBehavior: 'show-source-and-target' as const
  }));

  return [...rowLines, ...columnLines];
}

export function getFoundryModeReadiness(mode: AtriaMode) {
  if (mode === 'calm') return { label: 'quiet readiness', intensity: 0.62 };
  if (mode === 'planner') return { label: 'active readiness', intensity: 1 };
  return { label: 'balanced readiness', intensity: 0.8 };
}

export function getFoundrySignalPosition(local: number, selectedCellId: string): [number, number, number] {
  const source = getNodePosition(selectedCellId, selectedCellId) ?? [-1.45, 0.34, 0.92];
  const monitor = getNodePosition(foundryNodeCells.monitoring, selectedCellId) ?? [-0.2, -0.62, 1.18];
  const readiness = getNodePosition(foundryNodeCells.readiness, selectedCellId) ?? [1.76, -0.18, 1.62];
  const signal = smoothstep((local - 0.54) / 0.34);
  const firstLeg = Math.min(1, signal / 0.48);
  const secondLeg = Math.max(0, (signal - 0.48) / 0.52);

  if (signal < 0.48) {
    return [
      source[0] + (monitor[0] - source[0]) * firstLeg,
      source[1] + (monitor[1] - source[1]) * firstLeg,
      source[2] + (monitor[2] - source[2]) * firstLeg
    ];
  }

  return [
    monitor[0] + (readiness[0] - monitor[0]) * secondLeg,
    monitor[1] + (readiness[1] - monitor[1]) * secondLeg,
    monitor[2] + (readiness[2] - monitor[2]) * secondLeg
  ];
}

export function getFoundryTransitionCameraRig(globalProgress: number) {
  const phases = getFoundryPhases(globalProgress);
  const settle = smoothstep((phases.local - 0.02) / 0.2);
  const orbit = phases.reorient * 0.86 + phases.reveal * 0.28;

  return {
    position: [
      -0.42 + orbit * 1.1,
      0.42 + settle * 0.2 - phases.reveal * 0.06,
      -7.15 - phases.detach * 1.9 - phases.reveal * 0.8
    ] as [number, number, number],
    target: [
      -0.28 + orbit * 0.66,
      0.02 - phases.reveal * 0.04,
      -14.5 - phases.reassemble * 1.2
    ] as [number, number, number]
  };
}
