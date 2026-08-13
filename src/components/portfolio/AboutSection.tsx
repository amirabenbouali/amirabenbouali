import { aboutCards } from '@/data/portfolio';
import { SectionHeading } from './SectionHeading';
import styles from './Portfolio.module.css';

export function AboutSection() {
  return (
    <section className={styles.section} id="about">
      <SectionHeading label="[ about ]">Engineering with product sense, systems thinking and a bit of visual instinct.</SectionHeading>
      <div className={styles.aboutGrid}>
        {aboutCards.map((card) => (
          <article className={styles.card} data-reveal key={card.label}>
            <h3 className={styles.mono}>{card.label}</h3>
            <p>{card.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
