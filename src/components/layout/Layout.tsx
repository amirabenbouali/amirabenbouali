import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Layout.module.css';

type LayoutProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
};

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function Container({ className, children, ...props }: LayoutProps) {
  return (
    <div className={cx(styles.container, className)} {...props}>
      {children}
    </div>
  );
}

export function WideContainer({ className, children, ...props }: LayoutProps) {
  return (
    <div className={cx(styles.wideContainer, className)} {...props}>
      {children}
    </div>
  );
}

export function EditorialSection({ className, children, ...props }: LayoutProps) {
  return (
    <section className={cx(styles.editorialSection, className)} {...props}>
      {children}
    </section>
  );
}

export function Chapter({ className, children, ...props }: LayoutProps) {
  return (
    <article className={cx(styles.chapter, className)} {...props}>
      {children}
    </article>
  );
}

export function StickySection({ className, children, ...props }: LayoutProps) {
  return (
    <section className={cx(styles.stickySection, className)} {...props}>
      {children}
    </section>
  );
}

export function SectionDivider({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx(styles.sectionDivider, className)} aria-hidden="true" {...props} />;
}

type VerticalSpacingProps = HTMLAttributes<HTMLDivElement> & {
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

export function VerticalSpacing({ className, size = 'md', ...props }: VerticalSpacingProps) {
  return <div className={cx(styles.verticalSpacing, styles[size], className)} aria-hidden="true" {...props} />;
}
