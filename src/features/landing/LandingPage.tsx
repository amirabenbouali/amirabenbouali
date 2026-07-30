import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { AtmosphericGrain, Fog, Moon, MountainSilhouettes, SoftVignette, Stars } from '../../components/ui/Atmosphere';
import { Button } from '../../components/ui/Button';
import { Container } from '../../components/layout/Layout';
import { Body, DisplayXL, Eyebrow, Heading, TechnicalMetadata } from '../../components/typography/Typography';
import { FadeIn, FadeUp } from '../../components/motion/Motion';
import { projects } from '../../data/projects';
import { profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { usePointerParallax } from '../../hooks/usePointerParallax';
import { AtriaPreview } from './AtriaPreview';
import { Chapter, ChapterBody, ChapterHeading, ChapterMetadata, ChapterVisual } from './EditorialChapter';
import styles from './LandingPage.module.css';

export function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerParallax = usePointerParallax(heroRef);
  const chapterIds = projects.map((project) => `chapter-${project.slug}`);
  const activeChapter = useActiveSection(chapterIds);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.54, 1], [1, 0.62, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -92]);
  const heroFogOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [0.36, 0.68, 0.78]);
  const heroStarsOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [0.52, 0.22, 0]);
  const heroMoonOpacity = useTransform(scrollYProgress, [0, 0.42, 1], [0.92, 0.42, 0]);

  return (
    <main className={styles.page}>
      <section ref={heroRef} className={styles.hero} aria-labelledby="hero-title" {...pointerParallax}>
        <motion.div className={styles.heroAtmosphere} style={reduceMotion ? undefined : { opacity: heroOpacity }} aria-hidden="true" />
        <motion.div style={reduceMotion ? undefined : { opacity: heroStarsOpacity }}>
          <Stars className={styles.stars} />
        </motion.div>
        <motion.div className={styles.moonParallax} style={reduceMotion ? undefined : { opacity: heroMoonOpacity }}>
          <div className={styles.moonWrap}>
            <Moon />
          </div>
        </motion.div>
        <div className={styles.diagram} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <motion.div style={reduceMotion ? undefined : { opacity: heroFogOpacity }}>
          <Fog className={styles.fog} />
        </motion.div>
        <MountainSilhouettes className={styles.mountains} />
        <SoftVignette />
        <motion.div style={reduceMotion ? undefined : { y: heroTextY }}>
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
        </motion.div>
        <a className={styles.scrollIndicator} href="#work-introduction" aria-label="Scroll to work introduction">
          <span />
        </a>
        <div className={styles.heroMeta} aria-hidden="true">
          <TechnicalMetadata>Latitude 51.5072 N</TechnicalMetadata>
          <TechnicalMetadata>After midnight</TechnicalMetadata>
        </div>
      </section>

      <section id="work-introduction" className={styles.introduction} aria-labelledby="work-introduction-title">
        <Container>
          <motion.div
            className={styles.introInner}
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.38 }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow>Selected Work</Eyebrow>
            <Heading id="work-introduction-title" className={styles.introHeading}>
              I enjoy building software that balances engineering, clarity and thoughtful interaction.
            </Heading>
            <Body className={styles.introCopy}>Every project begins with a problem, not a technology.</Body>
          </motion.div>
        </Container>
      </section>

      <aside className={`${styles.projectIndex} ${activeChapter ? styles.projectIndexVisible : ''}`} aria-label="Project index">
        {projects.map((project) => {
          const id = `chapter-${project.slug}`;
          return (
            <a key={project.slug} href={`#${id}`} className={activeChapter === id ? styles.projectIndexActive : undefined}>
              <span>{project.index.padStart(3, '0')}</span>
              <span>{project.title}</span>
            </a>
          );
        })}
      </aside>

      <section className={styles.chapters} aria-label="Selected work chapters">
        {projects.map((project) => (
          <Chapter key={project.slug} id={`chapter-${project.slug}`}>
            <div>
              <ChapterMetadata>
                {project.index.padStart(3, '0')} / {project.category} / {project.year}
              </ChapterMetadata>
              <ChapterHeading>{project.title}</ChapterHeading>
              <ChapterBody>{project.summary}</ChapterBody>
            </div>
            {project.slug === 'atria' ? (
              <ChapterVisual>
                <AtriaPreview />
              </ChapterVisual>
            ) : (
              <ChapterVisual role="img" aria-label={`${project.title} visual placeholder`} />
            )}
          </Chapter>
        ))}
      </section>
      <AtmosphericGrain />
    </main>
  );
}
