import styles from './Portfolio.module.css';

type FlowerProps = {
  size?: 'large' | 'small';
};

export function Flower({ size = 'large' }: FlowerProps) {
  if (size === 'small') {
    return <div className={styles.flowerSmall} aria-hidden="true" />;
  }

  return (
    <div className={styles.flower} data-flower aria-hidden="true">
      <div className={`${styles.petal} ${styles.p1}`} />
      <div className={`${styles.petal} ${styles.p2}`} />
      <div className={`${styles.petal} ${styles.p3}`} />
      <div className={`${styles.petal} ${styles.p4}`} />
      <div className={`${styles.petal} ${styles.p5}`} />
      <div className={styles.center} />
    </div>
  );
}
