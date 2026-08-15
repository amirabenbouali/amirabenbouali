import { HeroSection } from './HeroSection';
import { PortfolioShell } from './PortfolioShell';
import { SkillsMarquee } from './SkillsMarquee';

export function PortfolioPage() {
  return (
    <PortfolioShell afterPage={<SkillsMarquee />}>
      <main>
        <HeroSection />
      </main>
    </PortfolioShell>
  );
}
