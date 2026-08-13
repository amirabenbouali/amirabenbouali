import { tools } from '@/data/portfolio';
import { SectionHeading } from './SectionHeading';
import styles from './Portfolio.module.css';

export function ToolboxSection() {
  return (
    <section className={styles.section} id="toolbox">
      <SectionHeading label="[ toolbox ]">Tools I actually use, without the fake proficiency bars.</SectionHeading>
      <div className={styles.toolbox}>
        <div className={`${styles.toolList} ${styles.mono}`}>
          {tools.map((tool) => (
            <span className={styles.highlight} data-highlight key={tool}>
              {tool}
              <br />
            </span>
          ))}
        </div>
        <div className={styles.toolNote} data-side-card>
          <span className={styles.pinkBall} data-pink-ball />
          <div className={styles.mono}>A SMALL RULE I LIKE</div>
          <p>Make the architecture boring enough to trust, and the interaction interesting enough to remember.</p>
        </div>
      </div>
    </section>
  );
}
