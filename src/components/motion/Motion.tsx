import { motion, useReducedMotion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

type MotionPrimitiveProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
};

export function FadeIn({ children, transition, ...props }: MotionPrimitiveProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={transition ?? { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FadeUp({ children, transition, ...props }: MotionPrimitiveProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition ?? { duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealOnScroll({ children, transition, ...props }: MotionPrimitiveProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={transition ?? { duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type ParallaxProps = MotionPrimitiveProps & {
  distance?: number;
};

export function Parallax({ children, distance = 16, style, ...props }: ParallaxProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      style={style}
      animate={reduceMotion ? undefined : { y: [-distance, distance, -distance] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SlowFloat({ children, transition, ...props }: MotionPrimitiveProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
      transition={transition ?? { duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
