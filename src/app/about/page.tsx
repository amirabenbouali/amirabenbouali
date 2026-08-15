import { AboutSection } from '@/components/portfolio/AboutSection';
import { PortfolioShell } from '@/components/portfolio/PortfolioShell';
import { SectionDivider } from '@/components/portfolio/SectionDivider';

export default function AboutPage() {
  return (
    <PortfolioShell content>
      <main>
        <SectionDivider eyebrow="RECORD PULLED" from="LANDING" to="PERSONNEL FILE" />
        <AboutSection />
      </main>
    </PortfolioShell>
  );
}
