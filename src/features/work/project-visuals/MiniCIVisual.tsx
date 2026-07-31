import styles from './MiniCIVisual.module.css';

const stages = ['Install', 'Test', 'Build', 'Deploy'];

export function MiniCIVisual() {
  return (
    <div className={styles.mini}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <span>Mini CI</span>
          <strong>passing</strong>
        </div>
        <ol>
          {stages.map((stage) => (
            <li key={stage}>
              <span>{stage}</span>
              <i />
            </li>
          ))}
        </ol>
        <pre>{'12:04:31  artifact archived\n12:04:44  checks complete\n12:05:02  release candidate ready'}</pre>
      </div>
    </div>
  );
}
