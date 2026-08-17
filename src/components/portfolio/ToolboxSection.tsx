'use client';

import { useState } from 'react';
import styles from './Portfolio.module.css';

type StackZone = {
  key: 'interface' | 'application' | 'data' | 'system';
  label: string;
  title: string;
  items: string[];
  meta: string;
  variant: 'paper' | 'dark' | 'archive' | 'folder';
  detail?: 'strip' | 'pin';
};

const stackZones: StackZone[] = [
  {
    key: 'interface',
    label: '01 / INTERFACE',
    title: 'Things people actually touch.',
    items: ['React', 'Next.js', 'TypeScript', 'CSS', 'Motion'],
    meta: 'interaction / structure / responsiveness',
    variant: 'paper',
    detail: 'strip'
  },
  {
    key: 'application',
    label: '02 / APPLICATION',
    title: 'Logic behind the interface.',
    items: ['Node.js', 'REST APIs', 'State', 'Auth', 'Validation'],
    meta: 'flows / rules / behaviour',
    variant: 'dark'
  },
  {
    key: 'data',
    label: '03 / DATA',
    title: 'Structure, query, understand.',
    items: ['PostgreSQL', 'SQL', 'Python', 'Analytics', 'Prisma'],
    meta: 'models / queries / insight',
    variant: 'archive'
  },
  {
    key: 'system',
    label: '04 / SYSTEM',
    title: 'Make it reliable. Then ship it.',
    items: ['Testing', 'Git', 'CI/CD', 'System Design', 'Bash'],
    meta: 'delivery / resilience / scale',
    variant: 'folder',
    detail: 'pin'
  }
];

const activePath: Record<StackZone['key'], string[]> = {
  interface: ['React'],
  application: ['React', 'Node.js'],
  data: ['React', 'Node.js', 'PostgreSQL'],
  system: ['React', 'Node.js', 'PostgreSQL', 'CI/CD']
};

const variantClass: Record<StackZone['variant'], string> = {
  paper: styles.stackMapPaper,
  dark: styles.stackMapDark,
  archive: styles.stackMapArchive,
  folder: styles.stackMapFolder
};

function StackDiagram({ zone }: { zone: StackZone['key'] }) {
  if (zone === 'interface') {
    return (
      <div className={styles.stackMapDiagram} aria-hidden="true">
        <div className={styles.stackInterfaceGrid}>
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  if (zone === 'application') {
    return (
      <div className={`${styles.stackMapDiagram} ${styles.stackLogicDiagram} ${styles.mono}`} aria-hidden="true">
        request
        <br />
        ↓
        <br />
        validate()
        <br />
        ↓
        <br />
        service
        <br />
        ↓
        <br />
        response
      </div>
    );
  }

  if (zone === 'data') {
    return (
      <div className={`${styles.stackMapDiagram} ${styles.stackSchemaDiagram} ${styles.mono}`} aria-hidden="true">
        users
        <br />
        │
        <br />
        ├── projects
        <br />
        │&nbsp;&nbsp;&nbsp;└── events
        <br />
        └── sessions
      </div>
    );
  }

  return (
    <div className={`${styles.stackMapDiagram} ${styles.stackPipelineDiagram} ${styles.mono}`} aria-hidden="true">
      <span>COMMIT</span>
      <i>→</i>
      <span>TEST</span>
      <i>→</i>
      <span>BUILD</span>
      <i>→</i>
      <span>DEPLOY</span>
    </div>
  );
}

export function ToolboxSection() {
  const [activeZone, setActiveZone] = useState<StackZone['key'] | null>(null);
  const highlightedItems = activeZone ? activePath[activeZone] : [];

  return (
    <section className={styles.stackMapSection} id="toolbox" data-stack-active={activeZone ?? 'none'}>
      <div className={styles.stackMapInner}>
        <div className={styles.stackMapTopline}>
          <div className={`${styles.stackMapEyebrow} ${styles.mono}`}>[ engineering stack ]</div>

          <div className={styles.stackMapTitleWrap}>
            <h2>
              Not a logo wall.
              <br />
              <em>A map of how I build.</em>
            </h2>
            <p className={`${styles.stackMapSub} ${styles.mono}`}>
              tools change. the way I think about systems doesn&apos;t.
            </p>
          </div>
        </div>

        <div className={styles.stackMapStage}>
          <div className={styles.stackMapConnections} aria-hidden="true">
            <svg viewBox="0 0 1200 700" preserveAspectRatio="none">
              <path className={styles.stackMapPath} d="M250 175 C420 180 500 180 650 180" />
              <path className={styles.stackMapPath} d="M650 180 C740 250 740 360 650 505" />
              <path className={styles.stackMapPath} d="M250 505 C430 505 500 505 650 505" />
              <circle className={styles.stackMapNode} cx="250" cy="175" r="4" />
              <circle className={styles.stackMapNode} cx="650" cy="180" r="4" />
              <circle className={styles.stackMapNode} cx="250" cy="505" r="4" />
              <circle className={styles.stackMapNode} cx="650" cy="505" r="4" />
            </svg>
          </div>

          <div className={`${styles.stackMapAnnotation} ${styles.mono}`} aria-hidden="true">
            ← where things become interesting
          </div>

          <div className={styles.stackMapGrid}>
          {stackZones.map((zone) => (
            <article
              className={`${styles.stackMapCard} ${variantClass[zone.variant]} ${
                activeZone && activeZone !== zone.key ? styles.stackMapDim : ''
              }`}
              data-card={zone.key}
              data-reveal
              key={zone.label}
              onBlur={() => setActiveZone(null)}
              onFocus={() => setActiveZone(zone.key)}
              onMouseEnter={() => setActiveZone(zone.key)}
              onMouseLeave={() => setActiveZone(null)}
              tabIndex={0}
            >
              {zone.detail === 'pin' ? <div className={styles.stackMapPin} /> : null}
              {zone.detail === 'strip' ? <div className={styles.stackMapPaperStrip} /> : null}
              {zone.key === 'interface' ? <div className={styles.stackMapCross} aria-hidden="true" /> : null}

              <div>
                <div className={`${styles.stackMapIndex} ${styles.mono}`}>{zone.label}</div>
                <h3>{zone.title}</h3>
              </div>

              <StackDiagram zone={zone.key} />

              <div className={`${styles.stackMapChips} ${styles.mono}`}>
                {zone.items.map((item) => (
                  <span
                    className={`${styles.stackMapChip} ${
                      highlightedItems.includes(item) ? styles.stackMapChipActive : ''
                    }`}
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className={`${styles.stackMapMeta} ${styles.mono}`}>{zone.meta}</div>
            </article>
          ))}
          </div>
        </div>

        <div className={`${styles.stackMapFooter} ${styles.mono}`}>
          <span>STACK / 2026</span>
          <span>INTERFACE → APPLICATION → DATA → SYSTEM → SHIP</span>
        </div>
      </div>
    </section>
  );
}
