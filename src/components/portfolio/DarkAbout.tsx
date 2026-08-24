'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import { pathForView } from './data';
import { useDarkChrome } from './DarkChromeContext';
import shell from './DarkShell.module.css';
import styles from './DarkAbout.module.css';

const moments = [
  { year: '2021', text: 'London became the place where study, work and technology started becoming one direction.' },
  {
    year: '2024',
    text: 'Professional work taught me how much good engineering depends on communication, ownership and delivery.'
  },
  { year: '2026', text: 'Completed a BSc in Computer Science and started focusing fully on software engineering.' },
  {
    year: 'NOW',
    text: 'Building products, systems and developer tools — and looking for the right engineering team to grow with.'
  }
];

const principles = [
  { n: '01', title: 'Build', text: 'I understand ideas fastest when I can turn them into something real.' },
  {
    n: '02',
    title: 'Understand',
    text: 'I like knowing what is happening underneath the abstraction, not only how to use it.'
  },
  { n: '03', title: 'Refine', text: 'Once the system works, the details become part of the engineering too.' },
  { n: '04', title: 'Learn', text: 'Every project should leave me knowing something I did not know before.' }
];

const languages = [
  { name: 'English', note: 'communication' },
  { name: 'French', note: 'communication' },
  { name: 'Arabic', note: 'communication' },
  { name: 'Spanish', note: 'communication' },
  { name: 'Italian', note: 'communication' }
];

type Interest = { n: string; label: string; title: string; deco?: 'route' | 'orbit' | 'steam' | 'gridArt' };

const interests: Interest[] = [
  { n: '01', label: 'movement', title: 'Running', deco: 'route' },
  { n: '02', label: 'curiosity', title: 'Astronomy', deco: 'orbit' },
  { n: '03', label: 'ritual', title: 'Coffee', deco: 'steam' },
  { n: '04', label: 'perspective', title: 'Travel', deco: 'gridArt' },
  { n: '05', label: 'detail', title: 'Design', deco: 'gridArt' }
];

const currentRows = [
  { label: 'Building', text: 'software products and developer tools' },
  { label: 'Learning', text: 'system design and deeper product engineering' },
  { label: 'Looking for', text: 'a software engineering role with real ownership' }
];

type FlowerFrame = { top: number; right: number; size: number; rotate: number; scale: number };

// One frame per section (01 hero → 06 currently). The flower glides continuously
// between these based on scroll progress, rather than snapping between fixed states.
const flowerFrames: FlowerFrame[] = [
  { top: 50, right: 3.5, size: 110, rotate: 0, scale: 1 },
  { top: 50, right: 3.5, size: 110, rotate: 0, scale: 1 },
  { top: 26, right: 5, size: 110, rotate: 20, scale: 1.15 },
  { top: 72, right: 7, size: 92, rotate: 0, scale: 1 },
  { top: 24, right: 8, size: 126, rotate: 0, scale: 1 },
  { top: 50, right: 50, size: 180, rotate: 0, scale: 1 }
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function mixHex(hexA: string, hexB: string, t: number) {
  const a = parseInt(hexA.slice(1), 16);
  const b = parseInt(hexB.slice(1), 16);
  const r = Math.round(lerp((a >> 16) & 255, (b >> 16) & 255, t));
  const g = Math.round(lerp((a >> 8) & 255, (b >> 8) & 255, t));
  const bl = Math.round(lerp(a & 255, b & 255, t));
  return `rgb(${r}, ${g}, ${bl})`;
}

function mixRgba(a: [number, number, number, number], b: [number, number, number, number], t: number) {
  const [ar, ag, ab, aa] = a;
  const [br, bg, bb, ba] = b;
  return `rgba(${lerp(ar, br, t)}, ${lerp(ag, bg, t)}, ${lerp(ab, bb, t)}, ${lerp(aa, ba, t)})`;
}

function Petals({ progress }: { progress: number }) {
  // Final leg of the scroll (into the "currently" section) blends the petals
  // from small pink to large black, landing exactly at the end.
  const segment = clamp01(progress) * (flowerFrames.length - 1);
  const index = Math.min(flowerFrames.length - 2, Math.floor(segment));
  const blend = index === flowerFrames.length - 2 ? segment - index : 0;
  const revealFraction = clamp01(progress) * 6;

  const width = lerp(28, 44, blend);
  const height = lerp(47, 74, blend);
  const background = blend > 0 ? mixHex('#efc4d4', '#111111', blend) : '#efc4d4';

  return (
    <>
      {Array.from({ length: 6 }).map((_, petalIndex) => {
        const revealed = clamp01(revealFraction - petalIndex);
        const opacity = Math.max(lerp(0.22, 1, revealed), blend);
        return (
          <i
            key={petalIndex}
            style={{
              width,
              height,
              background,
              opacity,
              transform: `translate(-50%, -100%) rotate(${petalIndex * 60}deg)`
            }}
          />
        );
      })}
    </>
  );
}

export function DarkAbout() {
  const { setIsBig, wipeTo } = useDarkChrome();
  const [scrollProgress, setScrollProgress] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const goHome = () => wipeTo(pathForView('home'));
  const goContact = () => wipeTo(pathForView('contact'));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reveals = [...root.querySelectorAll('[data-reveal]')];
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealVisible);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    reveals.forEach((el) => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? clamp01(window.scrollY / max) : 0);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const segment = scrollProgress * (flowerFrames.length - 1);
  const frameIndex = Math.min(flowerFrames.length - 2, Math.floor(segment));
  const t = segment - frameIndex;
  const from = flowerFrames[frameIndex];
  const to = flowerFrames[frameIndex + 1];
  const landingBlend = frameIndex === flowerFrames.length - 2 ? t : 0;

  const orbitStyle = {
    top: `${lerp(from.top, to.top, t)}%`,
    right: `${lerp(from.right, to.right, t)}%`,
    width: lerp(from.size, to.size, t),
    height: lerp(from.size, to.size, t),
    transform: `translate(${landingBlend * 50}%, -50%)`,
    '--ring-border': mixRgba([255, 255, 255, 0.12], [0, 0, 0, 0.18], landingBlend),
    '--dot-opacity': 1 - landingBlend
  } as CSSProperties;

  const flowerStyle = {
    transform: `rotate(${lerp(from.rotate, to.rotate, t)}deg) scale(${lerp(from.scale, to.scale, t)})`
  };

  const handlePrincipleMove = (event: MouseEvent<HTMLDivElement>) => {
    const row = event.currentTarget;
    const word = row.querySelector<HTMLElement>(`.${styles.principleWord}`);
    if (!word) return;
    const rect = row.getBoundingClientRect();
    const dx = ((event.clientX - (rect.left + rect.width / 2)) / rect.width) * 18;
    word.style.transform = `translateX(${16 + dx}px)`;
  };

  const handlePrincipleLeave = (event: MouseEvent<HTMLDivElement>) => {
    const word = event.currentTarget.querySelector<HTMLElement>(`.${styles.principleWord}`);
    if (word) word.style.transform = '';
    setIsBig(false);
  };

  return (
    <div className={styles.page} ref={rootRef}>
      <div className={styles.grain} aria-hidden="true" />

      <header className={styles.top}>
        <div className={shell.brand}>
          AMIRA
          <br />
          BENBOUALI
        </div>
        <div className={`${shell.role} ${styles.role}`}>
          about / personal
          <br />
          software engineer
        </div>
        <button
          className={styles.back}
          onClick={goHome}
          onMouseEnter={() => setIsBig(true)}
          onMouseLeave={() => setIsBig(false)}
          type="button"
        >
          ← home
        </button>
      </header>

      <div className={styles.flowerOrbit} style={orbitStyle} aria-hidden="true">
        <div className={styles.flower} style={flowerStyle}>
          <Petals progress={scrollProgress} />
        </div>
      </div>

      <section className={`${styles.section} ${styles.intro}`}>
        <div className={styles.heroWord}>
          <div className={styles.eyebrow}>01 / about</div>
          <h1 className={styles.heroTitle}>
            ABOUT
            <span>AMIRA</span>
          </h1>
        </div>

        <div data-reveal className={`${styles.introCopy} ${styles.reveal}`}>
          <p className={styles.serif}>Engineer. Builder. Always curious.</p>
          <p className={styles.mono}>
            Software engineer based in London. I enjoy taking an idea from the first sketch to a working product —
            thinking about the system underneath and the details people actually interact with.
          </p>
          <div className={styles.introMeta}>
            <span>BSc Computer Science</span>
            <span>London, UK</span>
            <span>Full-stack · Product · Tooling</span>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.story}`}>
        <div data-reveal className={`${styles.storyLeft} ${styles.reveal}`}>
          <div className={styles.eyebrow}>02 / story</div>
          <h2 className={styles.bigHeading}>
            MY
            <br />
            STORY
          </h2>
        </div>

        <div data-reveal className={`${styles.timeline} ${styles.reveal}`}>
          {moments.map((moment) => (
            <div
              className={styles.moment}
              key={moment.year}
              onMouseEnter={() => setIsBig(true)}
              onMouseLeave={() => setIsBig(false)}
            >
              <div className={styles.year}>{moment.year}</div>
              <p>{moment.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.thinking}`}>
        <div data-reveal className={`${styles.thinkingHead} ${styles.reveal}`}>
          <div>
            <div className={styles.eyebrow}>03 / mindset</div>
            <h2 className={styles.bigHeading}>
              HOW I
              <br />
              THINK
            </h2>
          </div>
          <p className={styles.mono}>The principles behind how I approach software, rather than a list of percentages.</p>
        </div>

        <div data-reveal className={`${styles.principles} ${styles.reveal}`}>
          {principles.map((principle) => (
            <div
              className={styles.principle}
              key={principle.n}
              onMouseEnter={() => setIsBig(true)}
              onMouseLeave={handlePrincipleLeave}
              onMouseMove={handlePrincipleMove}
            >
              <div className={styles.n}>{principle.n}</div>
              <b className={styles.principleWord}>{principle.title}</b>
              <span>{principle.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.languages}`}>
        <div data-reveal className={styles.reveal}>
          <div className={styles.eyebrow}>04 / languages</div>
          <h2 className={styles.bigHeading}>
            HOW I
            <br />
            CONNECT
          </h2>
          <p className={styles.langNote}>language is another kind of interface.</p>
        </div>

        <div data-reveal className={`${styles.langList} ${styles.reveal}`}>
          {languages.map((language) => (
            <div
              className={styles.lang}
              data-note={language.note}
              key={language.name}
              onMouseEnter={() => setIsBig(true)}
              onMouseLeave={() => setIsBig(false)}
            >
              {language.name}
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.outside}`}>
        <div data-reveal className={styles.reveal}>
          <div className={styles.eyebrow}>05 / outside code</div>
          <h2 className={styles.bigHeading}>
            BEYOND
            <br />
            THE SCREEN
          </h2>
        </div>

        <div data-reveal className={`${styles.outsideGrid} ${styles.reveal}`}>
          {interests.map((interest) => (
            <div
              className={styles.interest}
              key={interest.title}
              onMouseEnter={() => setIsBig(true)}
              onMouseLeave={() => setIsBig(false)}
            >
              <span className={styles.micro}>
                {interest.n} / {interest.label}
              </span>
              {interest.deco === 'route' ? <div className={styles.route} /> : null}
              {interest.deco === 'orbit' ? <div className={styles.orbit} /> : null}
              {interest.deco === 'steam' ? <div className={styles.steam} /> : null}
              {interest.deco === 'gridArt' ? <div className={styles.gridArt} /> : null}
              <b>{interest.title}</b>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.currently}`}>
        <div data-reveal className={styles.reveal}>
          <div className={styles.eyebrow}>06 / now</div>
          <h2 className={styles.bigHeading}>CURRENTLY</h2>

          <div className={styles.currentList}>
            {currentRows.map((row) => (
              <div className={styles.currentRow} key={row.label}>
                <b>{row.label}</b>
                <span>{row.text}</span>
              </div>
            ))}
          </div>

          <button
            className={styles.contactCta}
            onClick={goContact}
            onMouseEnter={() => setIsBig(true)}
            onMouseLeave={() => setIsBig(false)}
            type="button"
          >
            contact me <span>→</span>
          </button>
        </div>

        <div data-reveal className={`${styles.endMark} ${styles.reveal}`}>
          <div className={styles.albEnd}>ALB</div>
          <div className={styles.albCaption}>amira lina benbouali</div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>© 2026 AMIRA BENBOUALI</span>
        <span>about / 01—06</span>
      </footer>
    </div>
  );
}
