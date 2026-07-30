import { createElement } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Typography.module.css';

type TypographyProps = HTMLAttributes<HTMLElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'small';
  children: ReactNode;
};

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function TextPrimitive({ as = 'p', className, children, ...props }: TypographyProps, variant: string) {
  return createElement(as, { className: cx(styles[variant], className), ...props }, children);
}

export function DisplayXL(props: TypographyProps) {
  return TextPrimitive({ as: 'h1', ...props }, 'displayXL');
}

export function DisplayL(props: TypographyProps) {
  return TextPrimitive({ as: 'h1', ...props }, 'displayL');
}

export function Heading(props: TypographyProps) {
  return TextPrimitive({ as: 'h2', ...props }, 'heading');
}

export function SectionTitle(props: TypographyProps) {
  return TextPrimitive({ as: 'h2', ...props }, 'sectionTitle');
}

export function Eyebrow(props: TypographyProps) {
  return TextPrimitive({ as: 'p', ...props }, 'eyebrow');
}

export function Body(props: TypographyProps) {
  return TextPrimitive(props, 'body');
}

export function Caption(props: TypographyProps) {
  return TextPrimitive({ as: 'p', ...props }, 'caption');
}

export function TechnicalMetadata(props: TypographyProps) {
  return TextPrimitive({ as: 'p', ...props }, 'technicalMetadata');
}
