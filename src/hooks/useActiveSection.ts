import { useEffect, useState } from 'react';

export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (ids.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: '-34% 0px -42% 0px',
        threshold: [0.18, 0.34, 0.5, 0.68]
      }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
