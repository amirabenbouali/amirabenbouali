import { AtmosphericGrain, Fog, Moon, MountainSilhouettes, SoftVignette, Stars } from '../../components/ui/Atmosphere';
import { Button } from '../../components/ui/Button';
import { Container, EditorialSection, SectionDivider } from '../../components/layout/Layout';
import { Body, DisplayXL, Eyebrow, TechnicalMetadata } from '../../components/typography/Typography';
import { FadeIn, FadeUp, SlowFloat } from '../../components/motion/Motion';
import { profile } from '../../data/profile';
import styles from './LandingPage.module.css';

export function LandingPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <Stars className={styles.stars} />
        <SlowFloat className={styles.moonWrap}>
          <Moon />
        </SlowFloat>
        <div className={styles.diagram} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <Fog className={styles.fog} />
        <MountainSilhouettes className={styles.mountains} />
        <SoftVignette />
        <Container className={styles.heroContent}>
          <FadeIn transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <Eyebrow>{profile.name}</Eyebrow>
          </FadeIn>
          <FadeUp transition={{ duration: 0.95, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
            <DisplayXL id="hero-title" className={styles.headline}>
              <span>{profile.title}</span>
            </DisplayXL>
          </FadeUp>
          <FadeUp transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}>
            <Body className={styles.support}>
              Building thoughtful software,
              <br />
              developer tools
              <br />
              and products from London.
            </Body>
          </FadeUp>
          <FadeUp transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}>
            <Button href="#work-introduction">Enter the Observatory</Button>
          </FadeUp>
        </Container>
        <div className={styles.heroMeta} aria-hidden="true">
          <TechnicalMetadata>Latitude 51.5072 N</TechnicalMetadata>
          <TechnicalMetadata>After midnight</TechnicalMetadata>
        </div>
      </section>

      <EditorialSection id="work-introduction" className={styles.workPlaceholder} aria-labelledby="work-placeholder-title">
        <Container>
          <SectionDivider />
          <TechnicalMetadata className={styles.placeholderMeta}>Work chapters will begin here.</TechnicalMetadata>
          <h2 id="work-placeholder-title" className="sr-only">
            Work placeholder
          </h2>
        </Container>
      </EditorialSection>
      <AtmosphericGrain />
    </main>
  );
}
