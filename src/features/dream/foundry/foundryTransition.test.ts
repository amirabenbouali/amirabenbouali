import { describe, expect, it } from 'vitest';
import { generateCalendarCells } from '../atria/atriaModel';
import {
  createFoundryCellMappings,
  createFoundryLineMappings,
  foundryNodeCells,
  getFoundryModeReadiness,
  getFoundryPhases,
  getFoundrySignalPosition,
  getFoundryTransitionCameraRig,
  getMappingProgress
} from './foundryTransition';

describe('foundryTransition', () => {
  it('maps Atria cells into deterministic Foundry roles', () => {
    const cells = generateCalendarCells('high');
    const mappings = createFoundryCellMappings(cells);
    const domain = mappings.find((mapping) => mapping.id === `cell-${foundryNodeCells.domain}`);
    const monitoring = mappings.find((mapping) => mapping.id === `cell-${foundryNodeCells.monitoring}`);

    expect(mappings).toHaveLength(cells.length);
    expect(domain?.targetRole).toBe('foundry-domain-node');
    expect(domain?.memorySignature).toBe('selected-event');
    expect(monitoring?.targetRole).toBe('foundry-monitoring-node');
    expect(monitoring?.memorySignature).toBe('recurring-rhythm');
  });

  it('converts row and column lines into edges and axes', () => {
    const lineMappings = createFoundryLineMappings(5);

    expect(lineMappings.some((mapping) => mapping.id === 'row-0' && mapping.targetRole === 'foundry-dependency-edge')).toBe(true);
    expect(lineMappings.some((mapping) => mapping.id === 'column-3' && mapping.targetRole === 'foundry-domain-axis')).toBe(true);
    expect(lineMappings.filter((mapping) => mapping.memorySignature === 'seven-column-rhythm').length).toBeGreaterThan(4);
  });

  it('keeps transform progress reversible from source to target', () => {
    const mapping = createFoundryCellMappings(generateCalendarCells('medium'))[0];

    expect(getMappingProgress(0, mapping)).toBe(0);
    expect(getMappingProgress(1, mapping)).toBe(1);
    expect(getMappingProgress(mapping.delay + mapping.duration / 2, mapping)).toBeGreaterThan(0);
  });

  it('stages the transition after Atria without jumping the camera', () => {
    const early = getFoundryPhases(0.36);
    const late = getFoundryPhases(0.49);
    const camera = getFoundryTransitionCameraRig(0.44);

    expect(early.stillness).toBeGreaterThan(0.6);
    expect(late.reveal).toBeGreaterThan(0.8);
    expect(camera.position[2]).toBeLessThan(-7);
  });

  it('derives Foundry readiness from Atria mode', () => {
    expect(getFoundryModeReadiness('calm').label).toBe('quiet readiness');
    expect(getFoundryModeReadiness('planner').intensity).toBe(1);
  });

  it('moves the inherited event signal along the system path', () => {
    const start = getFoundrySignalPosition(0.54, foundryNodeCells.domain);
    const end = getFoundrySignalPosition(1, foundryNodeCells.domain);

    expect(start[0]).toBeLessThan(end[0]);
    expect(end[2]).toBeGreaterThan(start[2]);
  });
});
