import { PortfolioShell } from '@/components/portfolio/PortfolioShell';
import { ProjectsSection } from '@/components/portfolio/ProjectsSection';
import { SectionDivider } from '@/components/portfolio/SectionDivider';

export default function ProjectsPage() {
  return (
    <PortfolioShell content>
      <main>
        <SectionDivider eyebrow="INDEX OPENS" from="LANDING" to="SELECTED WORK" />
        <ProjectsSection />
      </main>
    </PortfolioShell>
  );
}
