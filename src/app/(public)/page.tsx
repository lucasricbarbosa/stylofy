import { BentoGrid } from "@/components/home/bento-grid";
import { CTASection } from "@/components/home/cta-section";
import { Hero } from "@/components/home/hero";
import { TemplatesSection } from "@/components/home/templates-section";

export default function Home() {
  return (
    <>
      <Hero />
      <BentoGrid />
      <TemplatesSection />
      <CTASection />
    </>
  );
}
