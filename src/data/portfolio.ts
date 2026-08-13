export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  tech: string[];
  techLayers: string[];
  role: string;
  focus: string;
  status: string;
  detail: string;
  visualStatement: string;
  flow: string[];
  highlights: string[];
  demo?: 'atria';
};

export const navItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#toolbox' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

export const projects: Project[] = [
  {
    id: 'atria',
    number: '01 / ATRIA',
    title: 'Atria',
    category: 'Calendar & productivity app',
    summary: 'Intelligent planning platform with smart scheduling, task management and interactive planning workflows.',
    tech: ['React', 'TypeScript', 'Zustand'],
    techLayers: ['01 · REACT / UI', '02 · TYPESCRIPT / MODEL', '03 · ZUSTAND / STATE'],
    role: 'Product design · Frontend engineering',
    focus: 'Calendar interaction · local state · planning modes',
    status: 'Personal product',
    detail: 'A planning environment that brings calendar events, tasks and weekly reflection into one calmer workspace.',
    visualStatement: 'From interaction to state to scheduling.',
    flow: ['Intent', 'Schedule', 'Focus', 'Review'],
    highlights: ['Recurring events', 'Task planning', 'Today dashboard', 'Calm interface modes'],
    demo: 'atria'
  },
  {
    id: 'foundry',
    number: '02 / FOUNDRY',
    title: 'Foundry',
    category: 'Engineering operations platform',
    summary: 'Engineering operations workspace for issue triage, workflows, postmortems and CI.',
    tech: ['Next.js', 'PostgreSQL', 'Prisma'],
    techLayers: ['01 · NEXT.JS', '02 · PRISMA', '03 · POSTGRESQL'],
    role: 'Product design · Frontend architecture · Backend systems',
    focus: 'Ownership · incidents · deployment readiness',
    status: 'Case study prototype',
    detail: 'A product-shaped system for understanding how operational work moves from signal to ownership.',
    visualStatement: 'From signal to triage to ownership.',
    flow: ['Signal', 'Triage', 'Ownership', 'Resolution'],
    highlights: ['Service health', 'Incident tracking', 'Operational readiness', 'Triage queue']
  },
  {
    id: 'kansodb',
    number: '03 / KANSODB',
    title: 'kansoDB',
    category: 'SQL query engine',
    summary: 'A lightweight SQL query engine built to explore query processing and database internals.',
    tech: ['SQL', 'Parsing', 'Execution'],
    techLayers: ['01 · SQL / LANGUAGE', '02 · PARSER / AST', '03 · EXECUTION'],
    role: 'Language design · Query execution',
    focus: 'Lexing · parsing · AST design · error handling',
    status: 'Learning project',
    detail: 'A small query engine built from scratch to understand how language becomes executable structure.',
    visualStatement: 'From query text to executable meaning.',
    flow: ['Query', 'Tokens', 'AST', 'Result'],
    highlights: ['Tokenizer', 'Parser', 'In-memory tables', 'Readable errors']
  },
  {
    id: 'mini-ci',
    number: '04 / MINI CI',
    title: 'Mini CI',
    category: 'Developer tool',
    summary: 'Developer tooling with CLI pipelines, build orchestration and status monitoring.',
    tech: ['Ruby', 'Bash', 'CI/CD'],
    techLayers: ['01 · RUBY / RUNNER', '02 · BASH / STEPS', '03 · CI / STATUS'],
    role: 'Tool design · Build orchestration',
    focus: 'Queues · logs · statuses · artifacts',
    status: 'Learning project',
    detail: 'A miniature CI pipeline for studying how commits move through checks, artifacts and release status.',
    visualStatement: 'From commit to checks to release.',
    flow: ['Commit', 'Build', 'Check', 'Release'],
    highlights: ['CLI runner', 'Build steps', 'Streaming logs', 'Release state']
  }
];

export const tools = [
  'TypeScript / React / Next.js',
  'Python / SQL / PostgreSQL',
  'JavaScript',
  'Node.js',
  'Statistical Analysis',
  'Git & CI/CD',
  'System Design',
  'Product Engineering'
];

export const aboutCards = [
  {
    label: '[ who ]',
    copy: 'London-based software engineer and product builder interested in calm interfaces, useful systems and technical clarity.'
  },
  {
    label: '[ how ]',
    copy: 'I like starting with the shape of the problem, sketching the interaction, then building the smallest system that makes the idea real.'
  },
  {
    label: '[ background ]',
    copy: 'BSc Computer Science, data analysis experience, web development work and independent product engineering projects.'
  },
  {
    label: '[ interests ]',
    copy: 'Developer tools, frontend architecture, databases, accessibility, museums, running, architecture and late-night walks.'
  }
];

export const contactLinks = [
  { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/' },
  { label: 'GitHub ↗', href: 'https://github.com/amirabenbouali' },
  { label: 'Email ↗', href: 'mailto:hello@example.com' },
  { label: 'CV ↗', href: '#top' }
];
