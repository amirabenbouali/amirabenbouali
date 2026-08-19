'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { isProjectView, navItems, pathForView, primaryForView, primaryOrder, viewForPathname } from './data';
import type { PortfolioView } from './data';
import styles from './ScrapbookPortfolio.module.css';

function Sidebar({
  active,
  onNavigate,
  footer = '© 2026 Amira\nAll rights reserved'
}: {
  active: PortfolioView;
  footer?: string;
  onNavigate: (target: PortfolioView) => void;
}) {
  const activePrimary = primaryForView(active);

  return (
    <aside className={styles.scrapSidebar}>
      <div className={styles.scrapMark}>✣</div>
      <nav className={styles.scrapNav} aria-label="Portfolio pages">
        {navItems.map((item) => (
          <button
            className={activePrimary === item.id ? styles.scrapNavActive : undefined}
            data-go={item.id}
            key={item.id}
            onClick={() => onNavigate(item.id)}
            type="button"
          >
            <span className={styles.scrapNavNum}>{item.number}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className={styles.scrapFooterNote}>
        {footer.split('\n').map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    </aside>
  );
}

export function ScrapbookChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isWiping, setIsWiping] = useState(false);

  const activeView = useMemo(() => viewForPathname(pathname), [pathname]);
  const isProject = isProjectView(activeView);

  const counterIndex = useMemo(
    () => Math.max(primaryOrder.indexOf(primaryForView(activeView)), 0) + 1,
    [activeView]
  );

  const navigate = useCallback(
    (target: PortfolioView) => {
      const path = pathForView(target);
      if (path === pathname) return;
      setIsWiping(false);
      window.requestAnimationFrame(() => setIsWiping(true));
      window.setTimeout(() => router.push(path), 345);
      window.setTimeout(() => setIsWiping(false), 760);
    },
    [pathname, router]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) return;
      const target = event.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return;
      const currentIndex = Math.max(primaryOrder.indexOf(primaryForView(activeView)), 0);
      const nextIndex =
        event.key === 'ArrowRight' ? Math.min(primaryOrder.length - 1, currentIndex + 1) : Math.max(0, currentIndex - 1);
      navigate(primaryOrder[nextIndex]);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeView, navigate]);

  const topRight = isProject ? (
    <button className={styles.scrapBackButton} onClick={() => navigate('work')} type="button">
      ← Back to work
    </button>
  ) : (
    <>
      Based in London, UK
      <br />
      Available for work
    </>
  );

  return (
    <main className={styles.scrapStage}>
      <div className={styles.scrapPortfolio}>
        <div className={`${styles.scrapTransitionLayer} ${isWiping ? styles.scrapTransitionGo : ''}`} aria-hidden="true" />
        <section className={`${styles.scrapPage} ${styles.scrapPageActive}`}>
          <Sidebar active={activeView} footer={isProject ? 'Open all projects' : undefined} onNavigate={navigate} />
          <div className={styles.scrapContent}>
            <div className={styles.scrapTopRight}>{topRight}</div>
            {children}
          </div>
        </section>
        <div className={`${styles.scrapPageCounter} ${styles.scrapScribble}`}>
          {String(counterIndex).padStart(2, '0')} / 05
        </div>
      </div>
    </main>
  );
}
