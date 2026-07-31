export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  statement: string;
  role: string;
  stack: string[];
  status: string;
  year: string;
  links: ProjectLink[];
  visualTheme: {
    atmosphere: string;
    accent: string;
  };
  challenge: string;
  response: string;
  technicalHighlights: string[];
  lessons: string[];
};

export const projects: Project[] = [
  {
    slug: 'atria',
    index: '01',
    title: 'Atria',
    category: 'Calm Planning Environment',
    summary: 'A planning environment for events, tasks, weekly reflection and flexible work modes, designed to reduce noise without losing capability.',
    statement: 'Planning should create clarity, not anxiety.',
    role: 'Product engineering, interaction design, technical direction',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    status: 'Prototype',
    year: '2026',
    links: [],
    visualTheme: { atmosphere: 'lunar archive', accent: 'olive signal' },
    challenge: 'Product rituals often scatter across tools and lose their narrative thread.',
    response: 'Design a single quiet surface for planning, evidence, decisions, and follow-through.',
    technicalHighlights: [
      'Typed workflow primitives for reusable product ceremonies',
      'Timeline model that separates decision records from conversational notes',
      'Accessible review states for asynchronous collaboration'
    ],
    lessons: [
      'Information architecture is emotional architecture when a team is under pressure.',
      'A slower interface can still be a faster product when it reduces rereading.'
    ]
  },
  {
    slug: 'foundry',
    index: '02',
    title: 'Foundry',
    category: 'Engineering Operating System',
    summary: 'Ownership, triage, deployment readiness and operational health made clear enough to act on.',
    statement: 'Good engineering needs visible systems.',
    role: 'Full-stack engineering, systems design',
    stack: ['React', 'TypeScript', 'Fastify', 'SQLite'],
    status: 'Exploration',
    year: '2025',
    links: [],
    visualTheme: { atmosphere: 'blackened steel', accent: 'lunar yellow' },
    challenge: 'Small teams need internal tools quickly, but speed often erodes maintainability.',
    response: 'Create repeatable scaffolds for data workflows, audit trails, and role-aware surfaces.',
    technicalHighlights: [
      'Schema-driven form rendering with typed validation boundaries',
      'Composable audit events for high-trust operational changes',
      'Lightweight deployment profile for small teams'
    ],
    lessons: [
      'A good internal tool should make the next maintenance engineer feel expected.',
      'The interface should expose the business rhythm, not the database anxiety.'
    ]
  },
  {
    slug: 'kansodb',
    index: '03',
    title: 'kansoDB',
    category: 'Archive and Parser System',
    summary: 'A small database experiment where parser diagrams, documents and SQL constraints become legible architecture.',
    statement: 'Data systems should reveal the shape of their thinking.',
    role: 'Systems prototyping, API design',
    stack: ['TypeScript', 'Node.js', 'WASM', 'Vitest'],
    status: 'Research',
    year: '2025',
    links: [],
    visualTheme: { atmosphere: 'field notebook', accent: 'warm grey' },
    challenge: 'Local-first products need persistence that is understandable at human scale.',
    response: 'Prototype a constrained storage API with explicit conflict and migration stories.',
    technicalHighlights: [
      'Append-only log experiments for recoverable local writes',
      'Migration fixtures that document failure modes',
      'Small query layer tuned for predictable debugging'
    ],
    lessons: [
      'Constraints become design material when they are visible early.',
      'Debuggability is a product feature for engineers and users alike.'
    ]
  },
  {
    slug: 'mini-ci',
    index: '04',
    title: 'Mini CI',
    category: 'Production Control Room',
    summary: 'A compact continuous integration monitor where build stages, logs, artifacts and indicators stay readable under pressure.',
    statement: 'Build feedback should feel like control, not alarm.',
    role: 'Frontend engineering, developer experience',
    stack: ['React', 'TypeScript', 'Vite', 'GitHub Actions'],
    status: 'Built',
    year: '2024',
    links: [],
    visualTheme: { atmosphere: 'night operations', accent: 'muted olive' },
    challenge: 'Existing CI surfaces can overwhelm small teams with noise and ceremony.',
    response: 'Focus the interface on build intent, failure context, and the next useful action.',
    technicalHighlights: [
      'Polling model with graceful stale-state communication',
      'Keyboard-first build navigation',
      'Failure summaries grouped by owner-facing cause'
    ],
    lessons: [
      'Status tools should lower adrenaline, not raise it.',
      'Good error grouping is a kindness.'
    ]
  }
];

export function getProjectBySlug(slug: string | undefined) {
  return projects.find((project) => project.slug === slug);
}
