'use client';

import { useState } from 'react';
import styles from './Portfolio.module.css';

const records = [
  {
    title: 'Software Engineer',
    company: 'INDEPENDENT PROJECTS',
    date: 'CURRENT',
    detail:
      'Designing and building independent software projects across full-stack applications, developer tools, product systems and backend architecture — from initial concept through implementation, testing and deployment.'
  },
  {
    title: 'Moustachir',
    company: 'DATA ANALYST + WEB DEVELOPER / ALGIERS',
    date: 'EXPERIENCE',
    detail:
      'Worked across data analysis and web development, translating information and requirements into practical digital solutions while developing experience across engineering, data and product-focused work.'
  }
];

const skills = [
  ['TypeScript / JavaScript', '90%'],
  ['React / Next.js', '86%'],
  ['Node.js', '78%'],
  ['PostgreSQL', '76%'],
  ['System Design', '72%']
];

export function AboutSection() {
  const [activeRecord, setActiveRecord] = useState(0);

  return (
    <section className={styles.personnelSection} id="about">
      <div className={styles.personnelChapter}>
        <div className={styles.personnelChapterInner}>
          <div>
            <div className={`${styles.personnelLabel} ${styles.mono}`}>03 / PERSONNEL FILE</div>
            <h2>
              About +
              <br />
              <em>experience.</em>
            </h2>
          </div>
          <p className={`${styles.personnelChapterNote} ${styles.mono}`}>
            THE PORTFOLIO STOPS FEELING LIKE A WEBSITE HERE.
            <br />
            IT BECOMES A LITTLE PERSONNEL ARCHIVE — PART ID CARD, PART CV, PART INTERACTIVE TIMELINE.
          </p>
        </div>
      </div>

      <div className={styles.personnelGrid}>
        <div className={styles.personnelIdentity}>
          <div className={styles.personnelCopy}>
            <div className={`${styles.personnelLabel} ${styles.mono}`}>ABOUT ME</div>
            <h3>
              Engineer with a
              <br />
              <em>designer&apos;s eye.</em>
            </h3>
            <p className={styles.mono}>
              I like software that makes complicated things feel simple. My work sits somewhere between product
              engineering, systems thinking and interaction design.
            </p>
          </div>

          <div className={styles.badgeWrap}>
            <div className={styles.badgeClip} aria-hidden="true" />
            <article className={styles.personnelBadge} aria-label="Amira Lina Benbouali personnel record">
              <div className={styles.badgeTop}>
                <strong>PORT//FOLIO</strong>
                <div className={styles.barcode} aria-hidden="true" />
              </div>

              <div className={styles.badgeBody}>
                <div className={styles.badgePhoto} aria-hidden="true" />
                <div className={`${styles.badgeInfo} ${styles.mono}`}>
                  <div>PERSONNEL RECORD / 2026</div>
                  <div className={styles.badgeScript}>
                    Amira Lina
                    <br />
                    Benbouali
                  </div>
                  {[
                    ['ROLE', 'SOFTWARE ENGINEER'],
                    ['BASE', 'LONDON, UK'],
                    ['FOCUS', 'FULL-STACK / SYSTEMS'],
                    ['STATUS', 'OPEN TO WORK']
                  ].map(([label, value]) => (
                    <div className={styles.badgeDataRow} key={label}>
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.badgeSignature}>Amira Lina</div>
              <div className={`${styles.badgeStamp} ${styles.mono}`}>VERIFIED<br />BUILDER<br />2026</div>
            </article>
          </div>

          <div className={`${styles.personnelNote} ${styles.personnelNoteOne} ${styles.mono}`}>
            <strong>WORKING STYLE</strong>
            <br />
            <br />
            curious about the edge cases.
            <br />
            obsessive about the details.
            <br />
            happier when the architecture makes sense.
          </div>

          <div className={`${styles.personnelNote} ${styles.personnelNoteTwo} ${styles.mono}`}>
            <strong>CURRENT INTERESTS</strong>
            <br />
            <br />
            developer tools
            <br />
            product systems
            <br />
            backend architecture
            <br />
            interaction + motion
          </div>
        </div>

        <aside className={styles.personnelExperience}>
          <div className={`${styles.personnelLabel} ${styles.mono}`}>EXPERIENCE / OPEN A RECORD</div>
          <h3>
            Where I&apos;ve
            <br />
            worked.
          </h3>

          <div className={styles.personnelTimeline}>
            {records.map((record, index) => (
              <button
                className={`${styles.personnelRecord} ${index === activeRecord ? styles.personnelRecordActive : ''}`}
                key={record.title}
                onClick={() => setActiveRecord(index)}
                type="button"
              >
                <span className={styles.recordHead}>
                  <span>
                    <strong>{record.title}</strong>
                    <small className={`${styles.recordCompany} ${styles.mono}`}>{record.company}</small>
                  </span>
                  <small className={`${styles.recordDate} ${styles.mono}`}>{record.date}</small>
                </span>
                <span className={`${styles.recordDetail} ${styles.mono}`}>{record.detail}</span>
              </button>
            ))}
          </div>

          <div className={styles.skillsStrip}>
            <div className={`${styles.personnelLabel} ${styles.mono}`}>TOOLBOX</div>
            {skills.map(([skill, value]) => (
              <div className={`${styles.personnelSkill} ${styles.mono}`} key={skill}>
                <span>{skill}</span>
                <span className={styles.personnelMeter}>
                  <i style={{ width: value }} />
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className={`${styles.personnelBottom} ${styles.mono}`}>
        <span>03 / ABOUT + EXPERIENCE</span>
        <span>NEXT — CONTACT / FINAL SIGNAL ↓</span>
      </div>
    </section>
  );
}
