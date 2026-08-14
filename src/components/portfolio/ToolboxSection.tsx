import styles from './Portfolio.module.css';

type StackZone = {
  label: string;
  title: string;
  items: string[];
  meta: string;
  variant: 'paper' | 'dark' | 'archive' | 'folder';
  detail?: 'strip' | 'pin';
};

const stackZones: StackZone[] = [
  {
    label: '01 / INTERFACE',
    title: 'Things people actually touch.',
    items: ['React', 'Next.js', 'TypeScript', 'CSS', 'Motion'],
    meta: 'interaction / structure / responsiveness',
    variant: 'paper',
    detail: 'strip'
  },
  {
    label: '02 / APPLICATION',
    title: 'Logic behind the interface.',
    items: ['Node.js', 'REST APIs', 'State', 'Auth', 'Validation'],
    meta: 'flows / rules / behaviour',
    variant: 'dark'
  },
  {
    label: '03 / DATA',
    title: 'Structure, query, understand.',
    items: ['PostgreSQL', 'SQL', 'Python', 'Analytics', 'Prisma'],
    meta: 'models / queries / insight',
    variant: 'archive'
  },
  {
    label: '04 / SYSTEM',
    title: 'Make it reliable. Then ship it.',
    items: ['Testing', 'Git', 'CI/CD', 'System Design', 'Bash'],
    meta: 'delivery / resilience / scale',
    variant: 'folder',
    detail: 'pin'
  }
];

const variantClass: Record<StackZone['variant'], string> = {
  paper: styles.stackMapPaper,
  dark: styles.stackMapDark,
  archive: styles.stackMapArchive,
  folder: styles.stackMapFolder
};

export function ToolboxSection() {
  return (
    <section className={styles.stackMapSection} id="toolbox">
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
              Instead of listing technologies as badges, this section groups them by the part
              they play in the product — interface, application logic, data and system
              reliability.
            </p>
          </div>
        </div>

        <div className={styles.stackMapGrid}>
          {stackZones.map((zone) => (
            <article
              className={`${styles.stackMapCard} ${variantClass[zone.variant]}`}
              data-card={zone.variant}
              data-reveal
              key={zone.label}
            >
              {zone.detail === 'pin' ? <div className={styles.stackMapPin} /> : null}
              {zone.detail === 'strip' ? <div className={styles.stackMapPaperStrip} /> : null}

              <div>
                <div className={`${styles.stackMapIndex} ${styles.mono}`}>{zone.label}</div>
                <h3>{zone.title}</h3>
              </div>

              <div className={`${styles.stackMapChips} ${styles.mono}`}>
                {zone.items.map((item) => (
                  <span className={styles.stackMapChip} key={item}>
                    {item}
                  </span>
                ))}
              </div>

              <div className={`${styles.stackMapMeta} ${styles.mono}`}>{zone.meta}</div>
            </article>
          ))}
        </div>

        <div className={`${styles.stackMapFooter} ${styles.mono}`}>
          <span>STACK / 2026</span>
          <span>TOOLS CHANGE. THE WAY I THINK ABOUT SYSTEMS MATTERS MORE.</span>
        </div>
      </div>
    </section>
  );
}
