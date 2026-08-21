'use client';

import styles from './ScrapbookPortfolio.module.css';

export function PlaygroundContent() {
  return (
    <div className={styles.scrapPlayWrap}>
      <div className={styles.scrapMicro}>(playground)</div>
      <h2 className={styles.scrapPlayTitle}>
        Experiments, ideas
        <br />
        and work in progress.
      </h2>
      <div className={styles.scrapPlayGrid}>
        <div className={styles.scrapExpCard}>
          <div className={`${styles.scrapExpThumb} ${styles.scrapCodeThumb}`}>
            const spring = motion({'{'}
            <br />
            &nbsp;&nbsp;stiffness: 120,
            <br />
            &nbsp;&nbsp;damping: 18
            <br />
            {'}'})
            <br />
            <br />
            {'// cinematic transitions'}
            <br />
            {'// motion studies'}
            <br />
            {'// interaction systems'}
          </div>
          <h4>Animation explorations</h4>
          <p>Playing with motion</p>
        </div>
        <div className={styles.scrapExpCard}>
          <div className={styles.scrapExpThumb}>
            <div className={styles.scrapNodes} />
          </div>
          <h4>Visualizing algorithms</h4>
          <p>Turning logic into visuals</p>
        </div>
        <div className={styles.scrapExpCard}>
          <div className={`${styles.scrapExpThumb} ${styles.scrapUiThumb}`}>
            <div />
            <div />
            <div />
            <div />
          </div>
          <h4>UI/UX concepts</h4>
          <p>Designing experiences</p>
        </div>
        <div className={styles.scrapExpCard}>
          <div className={`${styles.scrapExpThumb} ${styles.scrapCodeThumb}`}>
            #!/usr/bin/env ruby
            <br />
            <br />
            pipeline.run
            <br />
            &nbsp;&nbsp;.test
            <br />
            &nbsp;&nbsp;.build
            <br />
            &nbsp;&nbsp;.deploy
            <br />
            <br />
            puts &quot;done ✓&quot;
          </div>
          <h4>Tiny projects</h4>
          <p>Small things, big impact</p>
        </div>
      </div>
    </div>
  );
}

