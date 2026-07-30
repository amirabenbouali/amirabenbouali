import { profile } from '../../data/profile';
import styles from './AboutPage.module.css';

export function AboutPage() {
  return (
    <main className={styles.page}>
      <p className={styles.kicker}>{profile.location} / Engineering background</p>
      <h1>{profile.title}</h1>
      <p>{profile.philosophy}</p>
    </main>
  );
}
