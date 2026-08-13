import { tools } from '@/data/portfolio';
import { SectionHeading } from './SectionHeading';
import styles from './Portfolio.module.css';

export function ToolboxSection() {
  return (
    <section className={styles.section} id="toolbox">
      <SectionHeading label="[ engineering stack ]">Not a wall of logos. A map of how I build.</SectionHeading>
      <div className={styles.toolboxGrid}>
        <article className={styles.toolboxCard}>
          <h3 className={styles.mono}>[ PRODUCT LAYER ]</h3>
          <div className={`${styles.chips} ${styles.mono}`}>
            <span className={styles.chip}>React</span>
            <span className={styles.chip}>Next.js</span>
            <span className={styles.chip}>TypeScript</span>
            <span className={styles.chip}>Interaction Design</span>
          </div>
          <p>Interfaces that feel obvious after the hard thinking is done.</p>
        </article>
        <article className={`${styles.toolboxCard} ${styles.toolboxCardPink}`}>
          <h3 className={styles.mono}>[ SYSTEM LAYER ]</h3>
          <div className={`${styles.chips} ${styles.mono}`}>
            <span className={styles.chip}>Node.js</span>
            <span className={styles.chip}>PostgreSQL</span>
            <span className={styles.chip}>SQL</span>
            <span className={styles.chip}>System Design</span>
            <span className={styles.chip}>Testing</span>
            <span className={styles.chip}>CI/CD</span>
          </div>
          <p>The parts underneath that make the product reliable.</p>
        </article>
      </div>
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
