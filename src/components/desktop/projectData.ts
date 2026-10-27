export type DesktopProject = {
  slug: 'atria' | 'metronome' | 'foundry' | 'kansodb' | 'mini-ci';
  index: string;
  title: string;
  descriptor: string;
  summary: string;
  year: string;
  role: string;
  stack: string;
  focus: string;
  status: string;
  github: string;
  challenge: string;
  response: string;
  features: string[];
  technicalNotes: string[];
  accent: 'coral' | 'charcoal' | 'violet' | 'green' | 'amber';
  kind: 'calendar' | 'city' | 'operations' | 'query' | 'pipeline';
};

export const desktopProjects: DesktopProject[] = [
  {
    slug: 'atria',
    index: '01',
    title: 'Atria',
    descriptor: 'Calendar, without the friction.',
    summary: 'A modern calendar and task-management system focused on clarity, flexible scheduling and fast interaction.',
    year: '2026',
    role: 'Product design + frontend engineering',
    stack: 'React · TypeScript · Zustand · Framer Motion',
    focus: 'Scheduling · interaction · state',
    status: 'Live version coming soon',
    github: 'https://github.com/amirabenbouali/atria',
    challenge: 'Planning becomes harder when tasks and calendar events live in separate systems and routine actions require too much interface work.',
    response: 'Atria brings both kinds of work into one timeline, with direct manipulation and keyboard-driven editing designed to keep planning fast and calm.',
    features: [
      'Drag-and-drop scheduling across day, week and month views',
      'Tasks and calendar events in one unified timeline',
      'Fast, keyboard-driven event creation and editing',
      'Persistent local state powered by Zustand',
      'Physics-based transitions via Framer Motion'
    ],
    technicalNotes: [
      'Shared planning state is kept local and persistent.',
      'Calendar interactions remain predictable across multiple views.',
      'Motion communicates changes without slowing down routine actions.'
    ],
    accent: 'coral',
    kind: 'calendar'
  },
  {
    slug: 'metronome',
    index: '02',
    title: 'Metronome',
    descriptor: 'The city, scored in real time.',
    summary: 'A live pulse dashboard for London that combines traffic, transit, weather and event data into one borough-by-borough view.',
    year: '2026',
    role: 'Full-stack engineering + data integration',
    stack: 'FastAPI · PostGIS · React · TypeScript',
    focus: 'Real-time data · geospatial · live APIs',
    status: 'Live version coming soon',
    github: 'https://github.com/amirabenbouali/metronome',
    challenge: 'London produces many live signals, but they are difficult to compare when traffic, transit, weather and events are presented independently.',
    response: 'Metronome turns those signals into a composite pulse for each borough while keeping the source bands visible enough to understand the score.',
    features: [
      'Composite 0–100 pulse score for 33 London boroughs',
      'Traffic, transit, weather and event data in one model',
      'Borough boundaries mapped with PostGIS geospatial data',
      'Five signal bands ranging from Calm to Intense',
      'Automatic refresh every 30 seconds'
    ],
    technicalNotes: [
      'FastAPI coordinates the data integration layer.',
      'PostGIS supports borough geometry and spatial queries.',
      'The React interface keeps the combined score and source signals readable together.'
    ],
    accent: 'charcoal',
    kind: 'city'
  },
  {
    slug: 'foundry',
    index: '03',
    title: 'Foundry',
    descriptor: 'Engineering work, made visible.',
    summary: 'An engineering workspace for domains, issues, triage and postmortems, bringing work that usually lives in separate tools into one system.',
    year: '2026',
    role: 'Product design + full-stack engineering',
    stack: 'Next.js · TypeScript · PostgreSQL · Prisma',
    focus: 'Operations · ownership · incident learning',
    status: 'In development',
    github: 'https://github.com/amirabenbouali/foundry',
    challenge: 'Operational context becomes difficult to follow when service ownership, active issues, triage decisions and postmortems all live in different places.',
    response: 'Foundry connects those responsibilities in one workspace so a team can move from ownership to triage and learning without losing the history of the work.',
    features: [
      'Domain and service ownership records',
      'A shared issue and triage queue',
      'Operational context carried into postmortems',
      'Clear status and ownership throughout the workflow'
    ],
    technicalNotes: [
      'Next.js and TypeScript structure the product interface and application flows.',
      'Prisma models the relationships between domains, issues and operational records.',
      'PostgreSQL keeps ownership and incident history connected.'
    ],
    accent: 'violet',
    kind: 'operations'
  },
  {
    slug: 'kansodb',
    index: '04',
    title: 'KansoDB',
    descriptor: 'From text, to execution.',
    summary: 'A small SQL query engine built to make the path from an incoming query to a returned result understandable.',
    year: '2026',
    role: 'Systems exploration + engineering',
    stack: 'TypeScript · Query parsing · AST · Execution',
    focus: 'Parsing · databases · execution',
    status: 'Repository available',
    github: 'https://github.com/amirabenbouali/kansodb',
    challenge: 'A SQL statement looks simple at the surface, while the tokenisation, structure and execution behind it are usually hidden from view.',
    response: 'KansoDB makes each stage explicit, following a query through parsing and an abstract syntax tree before producing a result.',
    features: [
      'SQL-style query tokenisation',
      'Structured parsing into an abstract syntax tree',
      'A readable query execution path',
      'Result output for inspecting the complete flow'
    ],
    technicalNotes: [
      'The parser separates language structure from execution behaviour.',
      'AST nodes preserve the meaning of each query clause.',
      'The project keeps the engine deliberately small enough to inspect end to end.'
    ],
    accent: 'green',
    kind: 'query'
  },
  {
    slug: 'mini-ci',
    index: '05',
    title: 'Mini CI/CD',
    descriptor: 'Pipelines, watched from the inside.',
    summary: 'A lightweight CI/CD system built to explore what automation is doing while a change moves through a pipeline.',
    year: '2026',
    role: 'Developer tooling + systems exploration',
    stack: 'Ruby · Bash · Automation · CI/CD',
    focus: 'Pipelines · automation · feedback',
    status: 'Repository available',
    github: 'https://github.com/amirabenbouali/miniCI',
    challenge: 'Continuous integration can feel opaque when configuration hides the sequence between receiving a change and producing a release-ready result.',
    response: 'Mini CI/CD reduces the process to a visible pipeline, making each automated stage and its feedback easier to inspect.',
    features: [
      'A compact staged pipeline model',
      'Visible progress from source to release',
      'Automation implemented with Ruby and Bash',
      'Clear status feedback for each pipeline stage'
    ],
    technicalNotes: [
      'Pipeline stages remain intentionally small and inspectable.',
      'Ruby coordinates the workflow while Bash runs system-level steps.',
      'The interface treats pipeline feedback as part of the developer experience.'
    ],
    accent: 'amber',
    kind: 'pipeline'
  }
];

export function getDesktopProject(slug: DesktopProject['slug']) {
  return desktopProjects.find((project) => project.slug === slug)!;
}
