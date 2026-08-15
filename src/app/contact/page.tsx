import { FooterSection } from '@/components/portfolio/FooterSection';
import { PortfolioShell } from '@/components/portfolio/PortfolioShell';
import { SectionDivider } from '@/components/portfolio/SectionDivider';

export default function ContactPage() {
  return (
    <PortfolioShell content>
      <SectionDivider eyebrow="FINAL SIGNAL" from="LANDING" to="CONTACT" />
      <FooterSection />
    </PortfolioShell>
  );
}
