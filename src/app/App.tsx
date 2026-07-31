import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { SiteHeader } from '../components/layout/SiteHeader';

export function App() {
  const location = useLocation();
  const isDreamOpening = location.pathname === '/';

  return (
    <>
      {!isDreamOpening ? <SiteHeader /> : null}
      <Outlet />
    </>
  );
}
