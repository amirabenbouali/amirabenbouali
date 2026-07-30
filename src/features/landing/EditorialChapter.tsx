import { motion, useReducedMotion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import type { HTMLAttributes, ReactNode } from 'react';
import { Body, DisplayL, TechnicalMetadata } from '../../components/typography/Typography';
import styles from './EditorialChapter.module.css';

type ChapterProps = HTMLMotionProps<'article'> & {
  children: ReactNode;
};

type ChapterTextProps = HTMLAttributes<HTMLElement> & {
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
      initial={reduceMotion ? false : { opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.article>
  );
}

export function ChapterMetadata({ className, children, ...props }: ChapterTextProps) {
  return (
    <TechnicalMetadata className={cx(styles.metadata, className)} {...props}>
      {children}
    </TechnicalMetadata>
  );
}

export function ChapterHeading({ className, children, ...props }: ChapterTextProps) {
  return (
    <DisplayL as="h2" className={cx(styles.heading, className)} {...props}>
      {children}
    </DisplayL>
  );
}

export function ChapterBody({ className, children, ...props }: ChapterTextProps) {
  return (
    <Body className={cx(styles.body, className)} {...props}>
      {children}
    </Body>
  );
}

export function ChapterVisual({ className, children, ...props }: ChapterTextProps) {
  return (
    <div className={cx(styles.visual, className)} {...props}>
      {children}
    </div>
  );
}

export function ChapterNavigation({ className, children, ...props }: ChapterTextProps) {
  return (
    <nav className={cx(styles.navigation, className)} aria-label="Chapter navigation" {...props}>
      {children}
    </nav>
  );
}
