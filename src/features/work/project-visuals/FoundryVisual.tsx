import styles from './FoundryVisual.module.css';

const nodes = [
  { label: 'Owner', value: 'Design systems', x: 18, y: 27 },
  { label: 'Ready', value: 'Deploy path', x: 62, y: 20 },
  { label: 'Monitor', value: 'Runtime health', x: 70, y: 64 },
  { label: 'Triage', value: 'Support queue', x: 28, y: 70 }
];

export function FoundryVisual() {
  return (
    <div className={styles.foundry}>
      <svg className={styles.blueprint} viewBox="0 0 640 500" aria-hidden="true">
        <path d="M142 136 L420 104 L468 320 L196 356 Z" />
        <path className={styles.signal} d="M142 136 L420 104 L468 320 L196 356 Z" />
        <circle cx="142" cy="136" r="5" />
        <circle cx="420" cy="104" r="5" />
        <circle cx="468" cy="320" r="5" />
        <circle cx="196" cy="356" r="5" />
      </svg>
      {nodes.map((node) => (
        <div className={styles.node} key={node.label} style={{ left: `${node.x}%`, top: `${node.y}%` }}>
          <span>{node.label}</span>
          <strong>{node.value}</strong>
        </div>
      ))}
      <div className={styles.console}>
        <span>system.readiness</span>
        <i />
        <span>94%</span>
      </div>
    </div>
  );
}
