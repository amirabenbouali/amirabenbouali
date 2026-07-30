import { Outlet } from 'react-router-dom';
import { SiteHeader } from '../components/layout/SiteHeader';

export function App() {
  return (
    <>
      <SiteHeader />
      <Outlet />
    </>
  );
}
