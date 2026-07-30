import { ArrowDownRight } from 'lucide-react';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'ghost' | 'text';

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  showIcon?: boolean;
};

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function Button({ children, className, variant = 'primary', showIcon = true, ...props }: ButtonProps) {
  return (
    <a className={cx(styles.button, styles[variant], className)} {...props}>
      <span>{children}</span>
      {showIcon ? <ArrowDownRight aria-hidden="true" size={17} strokeWidth={1.5} /> : null}
    </a>
  );
}
