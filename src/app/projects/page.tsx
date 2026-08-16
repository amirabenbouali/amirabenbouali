import { PortfolioShell } from '@/components/portfolio/PortfolioShell';
import { ProjectsSection } from '@/components/portfolio/ProjectsSection';

export default function ProjectsPage() {
  return (
    <PortfolioShell content>
      <main>
        <ProjectsSection />
      </main>
    </PortfolioShell>
  );
}
