import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { RouteFallback } from './RouteFallback';

const LandingPage = lazy(() => import('../features/landing/LandingPage').then((module) => ({ default: module.LandingPage })));
const WorkCaseStudyPage = lazy(() =>
  import('../features/work/WorkCaseStudyPage').then((module) => ({ default: module.WorkCaseStudyPage }))
);
const WritingIndexPage = lazy(() =>
  import('../features/writing/WritingIndexPage').then((module) => ({ default: module.WritingIndexPage }))
);
const WritingPage = lazy(() => import('../features/writing/WritingPage').then((module) => ({ default: module.WritingPage })));
const AboutPage = lazy(() => import('../features/about/AboutPage').then((module) => ({ default: module.AboutPage })));

function deferred(element: JSX.Element) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>;
}

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: deferred(<LandingPage />) },
      { path: 'work/:slug', element: deferred(<WorkCaseStudyPage />) },
      { path: 'writing', element: deferred(<WritingIndexPage />) },
      { path: 'writing/:slug', element: deferred(<WritingPage />) },
      { path: 'about', element: deferred(<AboutPage />) }
    ]
  }
];

export const router = createBrowserRouter(routes);
