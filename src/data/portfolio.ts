export type Project = {
  id: string;
  number: string;
  title: string;
  summary: string;
  tech: string[];
  detail: string;
  flow: string[];
  demo?: 'atria';
};

export const navItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'Toolbox', href: '#toolbox' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

export const projects: Project[] = [
  {
    id: 'atria',
    number: '01 / ATRIA',
    title: 'Atria',
    summary: 'Intelligent planning platform with smart scheduling, task management and interactive planning workflows.',
    tech: ['React', 'TypeScript', 'Zustand'],
    detail: 'A planning environment that brings calendar events, tasks and weekly reflection into one calmer workspace.',
    flow: ['Intent', 'Schedule', 'Focus', 'Review'],
    demo: 'atria'
  },
  {
    id: 'foundry',
    number: '02 / FOUNDRY',
    title: 'Foundry',
    summary: 'Engineering operations workspace for issue triage, workflows, postmortems and CI.',
    tech: ['Next.js', 'PostgreSQL', 'Prisma'],
    detail: 'A product-shaped system for understanding how operational work moves from signal to ownership.',
    flow: ['Signal', 'Triage', 'Ownership', 'Resolution']
  },
  {
    id: 'kansodb',
    number: '03 / KANSODB',
    title: 'kansoDB',
    summary: 'A lightweight SQL query engine built to explore query processing and database internals.',
    tech: ['SQL', 'Parsing', 'Execution'],
    detail: 'A small query engine built from scratch to understand how language becomes executable structure.',
    flow: ['Query', 'Tokens', 'AST', 'Result']
  },
  {
    id: 'mini-ci',
    number: '04 / MINI CI',
    title: 'Mini CI',
    summary: 'Developer tooling with CLI pipelines, build orchestration and status monitoring.',
    tech: ['Ruby', 'Bash', 'CI/CD'],
    detail: 'A miniature CI pipeline for studying how commits move through checks, artifacts and release status.',
    flow: ['Commit', 'Build', 'Check', 'Release']
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
    label: '[ experience ]',
    copy: 'Data Analyst & Web Developer, plus independent software engineering work across full-stack products.'
  },
  {
    label: '[ education ]',
    copy: 'BSc (Hons) Computer Science, City, St George’s, University of London.'
  }
];

export const contactLinks = [
  { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/' },
  { label: 'GitHub ↗', href: 'https://github.com/amirabenbouali' },
  { label: 'Email ↗', href: 'mailto:hello@example.com' },
  { label: 'CV ↗', href: '#top' }
];
