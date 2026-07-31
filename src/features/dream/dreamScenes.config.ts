export type DreamSceneId =
  | 'thought'
  | 'portal'
  | 'atria'
  | 'atria-fold'
  | 'foundry'
  | 'foundry-signal'
  | 'kanso-query'
  | 'kanso-parser'
  | 'mini-ci'
  | 'memory'
  | 'identity'
  | 'contact';

export type DreamSceneConfig = {
  id: DreamSceneId;
  index: string;
  label: string;
  title: string;
  summary: string;
  start: number;
  end: number;
};

export const dreamScenes: DreamSceneConfig[] = [
  {
    id: 'thought',
    index: '00',
    label: 'the unfinished thought',
    title: 'everything begins as an unfinished thought',
    summary: 'The opening sentence exists as physical typography in a pale environment. The word thought destabilizes but remains itself.',
    start: 0,
    end: 0.1
  },
  {
    id: 'portal',
    index: '01',
    label: 'letter becomes passage',
    title: 'the letter o becomes a circular passage',
    summary: 'The geometry of the letter becomes the threshold. The camera travels through it without hiding the transformation.',
    start: 0.1,
    end: 0.18
  },
  {
    id: 'atria',
    index: '02',
    label: 'Atria chamber',
    title: 'Atria: time becomes architecture',
    summary: 'A monumental calendar facade appears as rooms, windows and illuminated events inside a dark chamber.',
    start: 0.18,
    end: 0.3
  },
  {
    id: 'atria-fold',
    index: '03',
    label: 'calendar folds',
    title: 'Atria folds into Foundry',
    summary: 'Calendar cells lose rigidity, bend into grid material, and prepare to reconnect as system structure.',
    start: 0.3,
    end: 0.38
  },
  {
    id: 'foundry',
    index: '04',
    label: 'Foundry system',
    title: 'Foundry: the grid becomes a living system',
    summary: 'Domains, ownership, monitoring, issues and deployment readiness become architectural nodes and lines.',
    start: 0.38,
    end: 0.5
  },
  {
    id: 'foundry-signal',
    index: '05',
    label: 'signal reroutes',
    title: 'The Foundry signal fractures and restores coherence',
    summary: 'A travelling signal becomes unstable, reroutes through the system, then returns the structure to coherence.',
    start: 0.5,
    end: 0.6
  },
  {
    id: 'kanso-query',
    index: '06',
    label: 'kansoDB query',
    title: 'kansoDB: a signal becomes language',
    summary: "The Foundry signal becomes a blinking cursor and types SELECT ideas FROM memory WHERE status = 'unfinished';",
    start: 0.6,
    end: 0.7
  },
  {
    id: 'kanso-parser',
    index: '07',
    label: 'parser tree',
    title: 'The query becomes physical structure',
    summary: 'Tokens become objects, parser branches grow from them, and query results emerge as structured slabs.',
    start: 0.7,
    end: 0.78
  },
  {
    id: 'mini-ci',
    index: '08',
    label: 'Mini CI production line',
    title: 'Mini CI: branches straighten into a production line',
    summary: 'Source, build, test, artifact and release become a surreal pipeline machine.',
    start: 0.78,
    end: 0.86
  },
  {
    id: 'memory',
    index: '09',
    label: 'memory of Amira',
    title: 'The system becomes a memory of Amira',
    summary: 'London, Computer Science, software, running, architecture, notes and unfinished ideas connect through relationships.',
    start: 0.86,
    end: 0.93
  },
  {
    id: 'identity',
    index: '10',
    label: 'name assembly',
    title: 'Objects assemble Amira Benbouali',
    summary: 'Fragments from earlier scenes return and align into the name rather than becoming decorative particles.',
    start: 0.93,
    end: 0.98
  },
  {
    id: 'contact',
    index: '11',
    label: 'contact signal',
    title: 'shall we build something real?',
    summary: 'The completed name collapses into a cursor, then becomes the contact input caret.',
    start: 0.98,
    end: 1
  }
];

export const dreamScrollLength = 1180;

export function getSceneByProgress(progress: number) {
  return dreamScenes.find((scene) => progress >= scene.start && progress <= scene.end) ?? dreamScenes[dreamScenes.length - 1];
}
