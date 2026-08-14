import styles from './Portfolio.module.css';

const facts = [
  ['BASED', 'London, UK'],
  ['FOCUS', 'Full-stack engineering · developer tools · data systems'],
  ['CURRENTLY', 'Building, experimenting, and probably refactoring something.'],
  ['STATUS', 'Open to new opportunities ●']
];

export function AboutSection() {
  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.aboutLeft}>
        <div className={`${styles.workLabel} ${styles.mono}`}>[ about me ]</div>
        <div className={styles.miniFlower} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className={styles.aboutRight}>
        <h2>
          I like the bit where engineering meets <span>personality.</span>
        </h2>
        <p className={styles.aboutCopy}>
          I&apos;m interested in products that are technically thoughtful without <em>feeling technical to use.</em> I care
          about the architecture underneath, the tiny interaction on top, and everything connecting the two.
        </p>
        <div className={`${styles.facts} ${styles.mono}`}>
          {facts.map(([label, value]) => (
            <div className={styles.fact} key={label}>
              <span>{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
