import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { AboutPage } from '../features/about/AboutPage';
import { LandingPage } from '../features/landing/LandingPage';
import { WorkCaseStudyPage } from '../features/work/WorkCaseStudyPage';
import { WritingIndexPage } from '../features/writing/WritingIndexPage';
import { WritingPage } from '../features/writing/WritingPage';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'work/:slug', element: <WorkCaseStudyPage /> },
      { path: 'writing', element: <WritingIndexPage /> },
      { path: 'writing/:slug', element: <WritingPage /> },
      { path: 'about', element: <AboutPage /> }
    ]
  }
];

export const router = createBrowserRouter(routes);
