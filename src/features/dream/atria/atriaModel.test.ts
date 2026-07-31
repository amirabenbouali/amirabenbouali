import { describe, expect, it } from 'vitest';
import {
  generateCalendarCells,
  getAtriaMemorySignature,
  getAtriaCameraRig,
  getRecurringCells,
  getSelectedEventState,
  getTimeLabel,
  pointerToTimeValue,
  resolveTimeOfDay
} from './atriaModel';

describe('Atria model', () => {
  it('maps pointer position into broad time states', () => {
    expect(resolveTimeOfDay(-0.8)).toBe('morning');
    expect(resolveTimeOfDay(0)).toBe('afternoon');
    expect(resolveTimeOfDay(0.8)).toBe('night');
    expect(pointerToTimeValue(-1)).toBe(0);
    expect(pointerToTimeValue(1)).toBe(1);
    expect(getTimeLabel('night')).toBe('night · 22:07');
  });

  it('generates calendar cells with transformation anchors', () => {
    const cells = generateCalendarCells('high');
    expect(cells).toHaveLength(35);
    expect(cells.some((cell) => cell.anchor.canDetach && cell.anchor.graphRole === 'node')).toBe(true);
  });

  it('maps recurring event cells', () => {
    expect(getRecurringCells(generateCalendarCells('medium')).length).toBeGreaterThan(1);
  });

  it('toggles selected event interaction state', () => {
    expect(getSelectedEventState('resting')).toBe('moved');
    expect(getSelectedEventState('moved')).toBe('resting');
  });

  it('exposes an Atria memory signature for later scenes', () => {
    expect(getAtriaMemorySignature('planner', 'moved')).toMatchObject({
      source: 'atria-seven-column-light-rhythm',
      selectedCell: '3-4',
      mode: 'planner'
    });
  });

  it('keeps Atria camera travel reversible from progress', () => {
    expect(getAtriaCameraRig(0.34)).toEqual(getAtriaCameraRig(0.34));
    expect(getAtriaCameraRig(0.35).position[2]).toBeLessThan(getAtriaCameraRig(0.25).position[2]);
  });
});
