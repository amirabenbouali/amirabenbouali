import { AboutSection } from '@/components/portfolio/AboutSection';
import { PortfolioShell } from '@/components/portfolio/PortfolioShell';

export default function AboutPage() {
  return (
    <PortfolioShell content>
      <main>
        <AboutSection />
      </main>
    </PortfolioShell>
  );
}
