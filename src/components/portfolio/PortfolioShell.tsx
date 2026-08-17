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
      <div className={styles.frame}>
        <div className={`${styles.page} ${content ? styles.contentPage : ''}`}>
          <SiteHeader homeNav={homeNav} />
          {children}
        </div>
        {afterPage}
      </div>
    </>
  );
}
