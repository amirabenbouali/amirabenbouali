import styles from './Atmosphere.module.css';

type AtmosphereProps = {
  className?: string;
};

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function AtmosphericGrain({ className }: AtmosphereProps) {
  return <div className={cx('grain', className)} aria-hidden="true" />;
}

export function Stars({ className }: AtmosphereProps) {
  return <div className={cx(styles.stars, className)} aria-hidden="true" />;
}

export function Fog({ className }: AtmosphereProps) {
  return <div className={cx(styles.fog, className)} aria-hidden="true" />;
}

export function MountainSilhouettes({ className }: AtmosphereProps) {
  return (
    <div className={cx(styles.mountains, className)} aria-hidden="true">
      <span className={styles.mountainsBack} />
      <span className={styles.mountainsMid} />
      <span className={styles.mountainsFront} />
    </div>
  );
}

export function SoftVignette({ className }: AtmosphereProps) {
  return <div className={cx('vignette', className)} aria-hidden="true" />;
}

export function Moon({ className }: AtmosphereProps) {
  return (
    <svg className={cx(styles.moon, className)} viewBox="0 0 420 420" aria-hidden="true">
      <defs>
        <radialGradient id="observatory-moon-shadow" cx="75%" cy="44%" r="74%">
          <stop offset="0%" stopColor="#34342e" />
          <stop offset="36%" stopColor="#20211c" />
          <stop offset="68%" stopColor="#0d0e0c" />
          <stop offset="100%" stopColor="#050606" />
        </radialGradient>
        <mask id="observatory-moon-mask">
          <rect width="420" height="420" fill="black" />
          <circle cx="210" cy="210" r="188" fill="white" />
        </mask>
      </defs>
      <circle className={styles.moonGlow} cx="210" cy="210" r="204" />
      <circle cx="210" cy="210" r="188" fill="url(#observatory-moon-shadow)" />
      <g className={styles.craters} mask="url(#observatory-moon-mask)">
        <circle cx="292" cy="108" r="21" />
        <circle cx="333" cy="176" r="11" />
        <circle cx="258" cy="245" r="32" />
        <circle cx="332" cy="310" r="17" />
        <circle cx="211" cy="153" r="10" />
        <circle cx="290" cy="360" r="8" />
        <path d="M310 38 C350 98 365 169 354 238 C346 290 326 338 293 381" />
      </g>
      <path
        className={styles.litEdge}
        d="M321 34 C386 92 415 178 397 258 C384 319 344 371 288 396 C339 331 364 259 359 188 C356 127 342 78 321 34Z"
      />
    </svg>
  );
}
