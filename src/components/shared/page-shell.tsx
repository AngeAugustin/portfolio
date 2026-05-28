import { PageHero } from "@/components/shared/page-hero";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

interface PageShellProps {
  label: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function PageShell({ label, title, subtitle, children }: PageShellProps) {
  return (
    <>
      <PageHero label={label} title={title} subtitle={subtitle} />
      <div className="editorial-container section-padding pt-0">
        <ScrollReveal>{children}</ScrollReveal>
      </div>
    </>
  );
}
