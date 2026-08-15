import { PortfolioShell } from '@/components/portfolio/PortfolioShell';
import { SectionDivider } from '@/components/portfolio/SectionDivider';
import { ToolboxSection } from '@/components/portfolio/ToolboxSection';

export default function StackPage() {
  return (
    <PortfolioShell content>
      <main>
        <SectionDivider eyebrow="TOOLS SURFACE" from="LANDING" to="STACK MAP" />
        <ToolboxSection />
      </main>
    </PortfolioShell>
  );
}
