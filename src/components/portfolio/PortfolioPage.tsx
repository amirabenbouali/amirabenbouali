import { AboutSection } from './AboutSection';
import { FooterSection } from './FooterSection';
import { HeroSection } from './HeroSection';
import { PortfolioInteractions } from './PortfolioInteractions';
import { ProjectsSection } from './ProjectsSection';
import { SkillsMarquee } from './SkillsMarquee';
import { SiteHeader } from './SiteHeader';
import { ToolboxSection } from './ToolboxSection';
import styles from './Portfolio.module.css';

export function PortfolioPage() {
  return (
    <>
      <PortfolioInteractions />
      <div className={styles.frame}>
        <div className={styles.page}>
          <SiteHeader />
          <main>
            <HeroSection />
          </main>
        </div>
        <SkillsMarquee />
        <div className={`${styles.page} ${styles.contentPage}`}>
          <main>
            <ProjectsSection />
            <ToolboxSection />
            <AboutSection />
          </main>
          <FooterSection />
        </div>
      </div>
    </>
  );
}
