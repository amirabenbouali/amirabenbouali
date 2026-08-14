export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
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
    summary: 'A modern, intelligent calendar that helps you plan, focus and reclaim your time.',
    tags: ['React', 'TypeScript', 'Zustand'],
    demo: 'atria'
  },
  {
    id: 'foundry',
    number: '02 / FOUNDRY',
    title: 'Foundry',
    category: 'Engineering operations platform',
    summary: 'An engineering operations workspace for domains, triage, deployment readiness, ownership health and postmortems.',
    tags: ['Next.js', 'Prisma', 'PostgreSQL']
  },
  {
    id: 'kansodb',
    number: '03 / KANSODB',
    title: 'kansoDB',
    category: 'SQL query engine',
    summary: 'A lightweight SQL query engine exploring parsing, execution and database internals from first principles.',
    tags: ['SQL', 'Parser', 'Execution']
  },
  {
    id: 'mini-ci',
    number: '04 / MINI CI',
    title: 'Mini CI',
    category: 'Developer tool',
    summary: 'A compact CI/CD pipeline and CLI built as a hands-on exploration of automation, scripting and developer tooling.',
    tags: ['Ruby', 'Bash', 'CI/CD']
  }
];

export const contactLinks = [
  { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/' },
  { label: 'GitHub ↗', href: 'https://github.com/amirabenbouali' },
  { label: 'Email ↗', href: 'mailto:hello@example.com' },
  { label: 'CV ↗', href: '#top' }
];
