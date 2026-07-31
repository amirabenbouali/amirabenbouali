type AtmosphereProps = {
  className?: string;
};

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function AtmosphericGrain({ className }: AtmosphereProps) {
  return <div className={cx('grain', className)} aria-hidden="true" />;
}
