import styles from './KansoDBVisual.module.css';

const tokens = ['select', 'from', 'notes', 'where', 'calm = true'];

export function KansoDBVisual() {
  return (
    <div className={styles.kanso}>
      <div className={styles.sheet}>
        <p>query notebook</p>
        <div className={styles.tokens}>
          {tokens.map((token) => (
            <span key={token}>{token}</span>
          ))}
        </div>
        <div className={styles.pipeline}>
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}
