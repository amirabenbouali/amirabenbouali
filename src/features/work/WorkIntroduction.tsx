import { motion } from 'framer-motion';
import styles from './WorkIntroduction.module.css';

export function WorkIntroduction() {
  return (
    <section className={styles.workIntro} id="work" aria-labelledby="work-title">
      <p className={styles.eyebrow}>Selected Work</p>
      <motion.div
        className={styles.workGrid}
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 id="work-title">
          Field notes from <em>the studio.</em>
        </h2>
        <p>
          A collection of products and systems designed from first idea to working software, each with its own atmosphere and
          technical story.
        </p>
      </motion.div>
    </section>
  );
}
