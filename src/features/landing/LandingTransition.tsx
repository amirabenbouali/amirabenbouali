import { motion } from 'framer-motion';
import styles from './LandingTransition.module.css';

export function LandingTransition() {
  return (
    <section className={styles.transition} aria-label="Portfolio transition">
      <motion.p
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      >
        I care about the spaces between <em>engineering</em>, interaction and clarity.
      </motion.p>
    </section>
  );
}
