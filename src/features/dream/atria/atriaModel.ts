import { getLocalSceneProgress } from '../dreamScenes.config';

export type AtriaMode = 'calm' | 'balanced' | 'planner';
export type TimeOfDay = 'morning' | 'afternoon' | 'night';
export type AtriaEventState = 'resting' | 'moved';

export type CalendarCellData = {
  id: string;
  row: number;
  column: number;
  depth: number;
  active: boolean;
  eventDensity: number;
  eventType?: 'focus' | 'reflection' | 'planning' | 'recurring';
  anchor: {
    canDetach: boolean;
    graphRole: 'node' | 'edge' | 'support';
    order: number;
  };
};

export const atriaRange = {
  start: 0.24,
  arrivalEnd: 0.285,
  inspectEnd: 0.325,
  end: 0.36
} as const;

export const atriaModes: Record<AtriaMode, { haze: number; eventBoost: number; frameBoost: number; movement: number }> = {
  calm: { haze: 0.72, eventBoost: 0.78, frameBoost: 0.78, movement: 0.55 },
  balanced: { haze: 0.48, eventBoost: 1, frameBoost: 1, movement: 0.8 },
  planner: { haze: 0.32, eventBoost: 1.18, frameBoost: 1.25, movement: 1 }
};

const eventMap = new Map<string, CalendarCellData['eventType']>([
  ['0-1', 'reflection'],
  ['1-3', 'focus'],
  ['2-2', 'planning'],
  ['2-5', 'focus'],
  ['3-0', 'recurring'],
  ['3-4', 'planning'],
  ['4-6', 'recurring']
]);

export function resolveTimeOfDay(pointerX: number): TimeOfDay {
  if (pointerX < -0.34) return 'morning';
  if (pointerX > 0.34) return 'night';
  return 'afternoon';
}

export function pointerToTimeValue(pointerX: number) {
  return Math.min(1, Math.max(0, (pointerX + 1) / 2));
}

export function getTimeLabel(time: TimeOfDay) {
  if (time === 'morning') return 'morning · 06:42';
  if (time === 'night') return 'night · 22:07';
  return 'afternoon · 14:18';
}

export function getAtriaProgress(globalProgress: number) {
  return getLocalSceneProgress(globalProgress, {
    id: 'atria',
    index: '02',
    label: 'Atria',
    title: 'Atria',
    summary: '',
    start: atriaRange.start,
    end: atriaRange.end
  });
}

export function getAtriaPhases(globalProgress: number) {
  const local = getAtriaProgress(globalProgress);
  const arrival = Math.min(1, local / 0.34);
  const inspect = Math.min(1, Math.max(0, (local - 0.24) / 0.42));
  const close = Math.min(1, Math.max(0, (local - 0.56) / 0.28));

  return {
    local,
    arrival: arrival * arrival * (3 - 2 * arrival),
    inspect: inspect * inspect * (3 - 2 * inspect),
    close: close * close * (3 - 2 * close)
  };
}

export function getAtriaCameraRig(globalProgress: number) {
  const phases = getAtriaPhases(globalProgress);
  const lateralDrift = Math.sin(phases.inspect * Math.PI) * -1.15;
  const closePush = phases.close;

  return {
    position: [
      0.08 + lateralDrift + closePush * 0.72,
      0.42 + phases.arrival * 0.1 - closePush * 0.04,
      -4.2 - phases.arrival * 1.7 - closePush * 1.2
    ] as [number, number, number],
    target: [
      -0.06 + lateralDrift * 0.22 + closePush * 0.26,
      0.08,
      -15.2 - closePush * 1.8
    ] as [number, number, number]
  };
}

export function generateCalendarCells(quality: 'low' | 'medium' | 'high' = 'high'): CalendarCellData[] {
  const rows = quality === 'low' ? 4 : 5;
  const columns = 7;
  const cells: CalendarCellData[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const key = `${row}-${column}`;
      const eventType = eventMap.get(key);
      cells.push({
        id: key,
        row,
        column,
        depth: 0.34 + ((row * 3 + column * 5) % 5) * 0.075,
        active: Boolean(eventType),
        eventDensity: eventType ? 0.42 + ((row + column) % 4) * 0.14 : 0,
        eventType,
        anchor: {
          canDetach: row === 0 || column === 0 || Boolean(eventType),
          graphRole: eventType ? 'node' : column % 2 === 0 ? 'edge' : 'support',
          order: row * columns + column
        }
      });
    }
  }

  return cells;
}

export function getRecurringCells(cells: CalendarCellData[]) {
  return cells.filter((cell) => cell.eventType === 'recurring' || (cell.column === 0 && cell.row >= 2));
}

export function getSelectedEventState(current: AtriaEventState): AtriaEventState {
  return current === 'moved' ? 'resting' : 'moved';
}

export function getAtriaMemorySignature(mode: AtriaMode, selectedEvent: AtriaEventState) {
  return {
    source: 'atria-seven-column-light-rhythm',
    rhythm: [0.32, 0.68, 0.24, 0.82, 0.44, 0.72, 0.38],
    selectedCell: selectedEvent === 'moved' ? '3-4' : '2-2',
    mode
  };
}
