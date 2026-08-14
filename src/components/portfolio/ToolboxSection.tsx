import styles from './Portfolio.module.css';

const stackZones = [
  {
    label: '01 / INTERFACE',
    title: 'Things people actually touch.',
    items: ['React', 'Next.js', 'TypeScript', 'CSS']
  },
  {
    label: '02 / APPLICATION',
    title: 'Logic behind the interface.',
    items: ['Node.js', 'REST APIs', 'State', 'Auth']
  },
  {
    label: '03 / DATA',
    title: 'Structure, query, understand.',
    items: ['PostgreSQL', 'SQL', 'Python', 'Analytics']
  },
  {
    label: '04 / SYSTEM',
    title: 'Make it reliable. Then ship it.',
    items: ['Testing', 'Git', 'CI/CD', 'System Design']
  }
];

export function ToolboxSection() {
  return (
    <section className={styles.stackSection} id="toolbox">
      <div className={`${styles.stackTitle} ${styles.mono}`}>[ engineering stack ]</div>
      <div className={styles.stackMain}>
        <h2>
          Not a logo wall.
          <br />A map of how I build.
        </h2>
        <div className={styles.stackBoard}>
          {stackZones.map((zone) => (
            <article className={styles.stackZone} data-reveal key={zone.label}>
              <div className={`${styles.zoneLabel} ${styles.mono}`}>{zone.label}</div>
              <div className={styles.zoneOrbit} />
              <div className={styles.zoneBig}>{zone.title}</div>
              <div className={`${styles.zoneItems} ${styles.mono}`}>
                {zone.items.map((item) => (
                  <span className={styles.zoneItem} key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
