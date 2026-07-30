import { useRef } from 'react';
import { AtmosphericGrain, Fog, Moon, MountainSilhouettes, SoftVignette, Stars } from '../../components/ui/Atmosphere';
import { Button } from '../../components/ui/Button';
import { Container, EditorialSection, SectionDivider } from '../../components/layout/Layout';
import { Body, DisplayXL, Eyebrow, TechnicalMetadata } from '../../components/typography/Typography';
import { FadeIn, FadeUp } from '../../components/motion/Motion';
import { profile } from '../../data/profile';
import { usePointerParallax } from '../../hooks/usePointerParallax';
import styles from './LandingPage.module.css';

export function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const pointerParallax = usePointerParallax(heroRef);

  return (
    <main className={styles.page}>
      <section ref={heroRef} className={styles.hero} aria-labelledby="hero-title" {...pointerParallax}>
        <Stars className={styles.stars} />
        <div className={styles.moonParallax}>
          <div className={styles.moonWrap}>
            <Moon />
          </div>
        </div>
        <div className={styles.diagram} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <Fog className={styles.fog} />
        <MountainSilhouettes className={styles.mountains} />
        <SoftVignette />
        <Container className={styles.heroContent}>
          <FadeIn transition={{ duration: 1.2, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}>
            <Eyebrow>{profile.name}</Eyebrow>
          </FadeIn>
          <FadeUp transition={{ duration: 1.25, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}>
            <DisplayXL id="hero-title" className={styles.headline}>
              <span>{profile.title}</span>
            </DisplayXL>
          </FadeUp>
          <FadeUp transition={{ duration: 1.15, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}>
            <Body className={styles.support}>
              Building thoughtful software,
              <br />
              developer tools
              <br />
              and products from London.
            </Body>
          </FadeUp>
          <FadeUp transition={{ duration: 1, delay: 0.84, ease: [0.22, 1, 0.36, 1] }}>
            <Button href="#work-introduction">Enter the Observatory</Button>
          </FadeUp>
        </Container>
        <a className={styles.scrollIndicator} href="#work-introduction" aria-label="Scroll to work introduction">
          <span />
        </a>
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
