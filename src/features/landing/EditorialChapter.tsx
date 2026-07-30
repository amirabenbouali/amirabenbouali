import { motion, useReducedMotion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import type { HTMLAttributes, ReactNode } from 'react';
import styles from './EditorialChapter.module.css';

type ChapterProps = HTMLMotionProps<'article'> & {
  children: ReactNode;
};

type ChapterTextProps = HTMLMotionProps<'p'> & {
  children?: ReactNode;
};

type ChapterHeadingProps = HTMLMotionProps<'h2'> & {
  children?: ReactNode;
};

type ChapterVisualProps = HTMLMotionProps<'div'> & {
  children?: ReactNode;
};

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function Chapter({ className, children, ...props }: ChapterProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={cx(styles.chapter, className)}
      initial={reduceMotion ? false : { opacity: 0.72, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.article>
  );
}

export function ChapterMetadata({ className, children, ...props }: ChapterTextProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.p
      className={cx(styles.metadata, className)}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.72 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.p>
  );
}

export function ChapterHeading({ className, children, ...props }: ChapterHeadingProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.h2
      className={cx(styles.heading, className)}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.64 }}
      transition={{ duration: 0.95, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.h2>
  );
}

export function ChapterBody({ className, children, ...props }: ChapterTextProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.p
      className={cx(styles.body, className)}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.62 }}
      transition={{ duration: 0.86, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.p>
  );
}

export function ChapterVisual({ className, children, ...props }: ChapterVisualProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cx(styles.visual, className)}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.42 }}
      transition={{ duration: 1.08, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ChapterNavigation({ className, children, ...props }: HTMLAttributes<HTMLElement> & { children?: ReactNode }) {
  return (
    <nav className={cx(styles.navigation, className)} aria-label="Chapter navigation" {...props}>
      {children}
    </nav>
  );
}
