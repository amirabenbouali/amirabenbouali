export type PrimaryView = 'home' | 'work' | 'about' | 'playground' | 'contact';
export type ProjectView = 'atria' | 'foundry' | 'kansodb';
export type PortfolioView = PrimaryView | ProjectView;

export const primaryOrder: PrimaryView[] = ['home', 'work', 'about', 'playground', 'contact'];

export const navItems: Array<{ id: PrimaryView; label: string; number: string }> = [
  { id: 'home', label: 'Home', number: '01' },
  { id: 'work', label: 'Work', number: '02' },
  { id: 'about', label: 'About', number: '03' },
  { id: 'playground', label: 'Playground', number: '04' },
  { id: 'contact', label: 'Contact', number: '05' }
];

export const projects = [
  { index: '01', title: 'Atria', kind: 'Productivity app', year: '2026', target: 'atria' as const },
  { index: '02', title: 'Foundry', kind: 'Engineering OS', year: '2026', target: 'foundry' as const },
  { index: '03', title: 'KansoDB', kind: 'SQL query engine', year: '2026', target: 'kansodb' as const },
  { index: '04', title: 'Mini CI/CD', kind: 'DevOps tooling', year: '2026' }
];

const viewPaths: Record<PortfolioView, string> = {
  home: '/',
  work: '/projects',
  about: '/about',
  playground: '/stack',
  contact: '/contact',
  atria: '/projects/atria',
  foundry: '/projects/foundry',
  kansodb: '/projects/kansodb'
};

export function pathForView(view: PortfolioView): string {
  return viewPaths[view];
}

export function isProjectView(view: PortfolioView): view is ProjectView {
  return view === 'atria' || view === 'foundry' || view === 'kansodb';
}

export function primaryForView(view: PortfolioView): PrimaryView {
  return isProjectView(view) ? 'work' : view;
}

export function viewForPathname(pathname: string): PortfolioView {
  if (pathname.startsWith('/projects/atria')) return 'atria';
  if (pathname.startsWith('/projects/foundry')) return 'foundry';
  if (pathname.startsWith('/projects/kansodb')) return 'kansodb';
  if (pathname.startsWith('/projects')) return 'work';
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/stack')) return 'playground';
  if (pathname.startsWith('/contact')) return 'contact';
  return 'home';
}
