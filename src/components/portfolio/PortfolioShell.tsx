import type { ReactNode } from 'react';
import { PortfolioInteractions } from './PortfolioInteractions';
import { SiteHeader } from './SiteHeader';
import styles from './Portfolio.module.css';

type PortfolioShellProps = {
  afterPage?: ReactNode;
  children: ReactNode;
  content?: boolean;
  homeNav?: boolean;
};

export function PortfolioShell({ afterPage, children, content = false, homeNav = false }: PortfolioShellProps) {
  return (
    <>
      <PortfolioInteractions />
      <div className={`${styles.frame} ${homeNav ? styles.homeFrame : ''}`}>
        <div className={`${styles.page} ${content ? styles.contentPage : ''} ${homeNav ? styles.homePage : ''}`}>
          <SiteHeader homeNav={homeNav} />
          {children}
        </div>
        {afterPage}
      </div>
    </>
  );
}
