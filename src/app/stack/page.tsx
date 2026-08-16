import { PortfolioShell } from '@/components/portfolio/PortfolioShell';
import { ToolboxSection } from '@/components/portfolio/ToolboxSection';

export default function StackPage() {
  return (
    <PortfolioShell content>
      <main>
        <ToolboxSection />
      </main>
    </PortfolioShell>
  );
}
