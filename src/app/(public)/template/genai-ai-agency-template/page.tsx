import About from "@/components/genai-ai-agency-template/about";
import ContactSection from "@/components/genai-ai-agency-template/contact-section";
import Footer from "@/components/genai-ai-agency-template/footer";
import Header from "@/components/genai-ai-agency-template/header";
import Hero from "@/components/genai-ai-agency-template/hero";
import LogoCloud from "@/components/genai-ai-agency-template/logo-cloud";
import SelectedWorks from "@/components/genai-ai-agency-template/selected-works";
import Services from "@/components/genai-ai-agency-template/services";
import Stats from "@/components/genai-ai-agency-template/stats";
import Testimonials from "@/components/genai-ai-agency-template/testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <LogoCloud />
      <SelectedWorks />
      <Services />
      <Testimonials />
      <ContactSection />
      <Stats />
      <Footer />
    </main>
  );
}
