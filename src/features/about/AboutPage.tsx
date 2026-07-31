import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Container } from '../../components/layout/Layout';
import { AtmosphericGrain } from '../../components/ui/Atmosphere';
import { buildProcess, explorations, journeyMoments, outsideSoftware, profile } from '../../data/profile';
import styles from './AboutPage.module.css';

const fadeIn = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.32 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
};

export function AboutPage() {
  return (
    <main className={styles.page}>
      <Container>
        <section className={styles.hero} aria-labelledby="about-title">
          <motion.div className={styles.heroCopy} {...fadeIn}>
            <p className={styles.kicker}>About / {profile.location}</p>
            <h1 id="about-title">I build software as a way of making thought usable.</h1>
            <p>
              I am Amira, a software engineer in London building products, developer tools and interfaces shaped by curiosity,
              restraint and care.
            </p>
          </motion.div>
          <motion.figure
            className={styles.portrait}
            aria-label="Reserved portrait frame"
            initial={{ opacity: 0, y: 38 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div />
            <figcaption>Portrait study reserved</figcaption>
          </motion.figure>
        </section>

        <EssaySection eyebrow="How I Think" title="The best engineering removes weight from other people.">
          <p>
            I am drawn to software that makes a complicated thing feel possible without pretending it is simple. That usually
            means building less, naming things carefully, and resisting the urge to solve uncertainty with more interface.
          </p>
          <p>
            I think of engineering as communication. Code explains a model to a machine, but it also explains a decision to
            the next person who has to change it. Interfaces do the same thing for users. They can either transfer complexity
            or absorb it with care.
          </p>
        </EssaySection>

        <section className={styles.processSection} aria-labelledby="build-title">
          <motion.div {...fadeIn}>
            <p className={styles.kicker}>How I Build</p>
            <h2 id="build-title">A product becomes clearer each time it survives another kind of question.</h2>
          </motion.div>
          <div className={styles.processList}>
            {buildProcess.map((item, index) => (
              <motion.article
                className={styles.processStep}
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.step}</h3>
                <p>{item.note}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className={styles.exploringSection} aria-labelledby="exploring-title">
          <motion.div className={styles.sectionHeader} {...fadeIn}>
            <p className={styles.kicker}>What I&apos;m Exploring</p>
            <h2 id="exploring-title">Questions I keep returning to.</h2>
          </motion.div>
          <div className={styles.explorationList}>
            {explorations.map((item) => (
              <article key={item.topic}>
                <h3>{item.topic}</h3>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <EssaySection eyebrow="Outside of Software" title="I pay attention to places that know how to guide a body through space.">
          {outsideSoftware.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </EssaySection>

        <section className={styles.journeySection} aria-labelledby="journey-title">
          <motion.div className={styles.sectionHeader} {...fadeIn}>
            <p className={styles.kicker}>Journey</p>
            <h2 id="journey-title">Not a timeline. A set of moments that changed the work.</h2>
          </motion.div>
          <div className={styles.journeyList}>
            {journeyMoments.map((moment) => (
              <article key={moment.label}>
                <span>{moment.label}</span>
                <h3>{moment.title}</h3>
                <p>{moment.note}</p>
              </article>
            ))}
          </div>
        </section>

        <EssaySection eyebrow="What&apos;s Next" title="I want to keep building products that feel quieter than the problem they hold.">
          <p>
            I am interested in the space between product judgment and engineering depth: tools that are durable enough to be
            trusted, calm enough to be used often, and clear enough to make people feel more capable.
          </p>
        </EssaySection>
      </Container>
      <AtmosphericGrain />
    </main>
  );
}

function EssaySection({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <motion.section className={styles.essaySection} {...fadeIn}>
      <div>
        <p className={styles.kicker}>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div className={styles.essayBody}>{children}</div>
    </motion.section>
  );
}
