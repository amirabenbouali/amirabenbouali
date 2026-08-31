export type PrimaryView = 'home' | 'work' | 'about' | 'contact';
export type ProjectView = 'atria' | 'metronome';
export type PortfolioView = PrimaryView | ProjectView;

// U+FE0E forces text presentation — without it, iOS renders ↗ as a full-color emoji.
export const ARROW_NE = '↗︎';

export const projects = [
  {
    index: '01',
    title: 'Atria',
    kind: 'Productivity app',
    year: '2026',
    target: 'atria' as const,
    stack: ['React · TypeScript', 'Zustand · Motion']
  },
  {
    index: '02',
    title: 'Metronome',
    kind: 'City pulse dashboard',
    year: '2026',
    target: 'metronome' as const,
    stack: ['FastAPI · PostGIS', 'React · TypeScript']
  }
];

const viewPaths: Record<PortfolioView, string> = {
  home: '/',
  work: '/projects',
  about: '/about',
  contact: '/contact',
  atria: '/projects/atria',
  metronome: '/projects/metronome'
};

export function pathForView(view: PortfolioView): string {
  return viewPaths[view];
}

export function isProjectView(view: PortfolioView): view is ProjectView {
  return view === 'atria' || view === 'metronome';
}

export function primaryForView(view: PortfolioView): PrimaryView {
  return isProjectView(view) ? 'work' : view;
}

export function viewForPathname(pathname: string): PortfolioView {
  if (pathname.startsWith('/projects/atria')) return 'atria';
  if (pathname.startsWith('/projects/metronome')) return 'metronome';
  if (pathname.startsWith('/projects')) return 'work';
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/contact')) return 'contact';
  return 'home';
}
