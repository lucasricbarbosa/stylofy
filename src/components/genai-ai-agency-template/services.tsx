import {
  ArrowUpRight,
  Brain,
  ImageIcon,
  Settings,
  Sparkles,
  Video,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Brain,
    title: "LLM & Chatbot Development",
    description:
      "Build intelligent conversational AI powered by large language models for customer support, automation, and engagement.",
    href: "/services/llm-chatbots",
  },
  {
    icon: Sparkles,
    title: "Custom AI Model Training",
    description:
      "Train and fine-tune AI models tailored to your specific business needs and industry requirements.",
    href: "/services/ai-training",
  },
  {
    icon: ImageIcon,
    title: "Generative AI for Images",
    description:
      "Create stunning visuals with AI-powered image generation, editing, and enhancement technologies.",
    href: "/services/ai-images",
  },
  {
    icon: Video,
    title: "AI Video Generation",
    description:
      "Transform ideas into engaging videos using cutting-edge generative AI and video synthesis.",
    href: "/services/ai-video",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-primary" strokeWidth={2} />
              <span className="text-sm font-medium text-foreground/70">
                What we do
              </span>
            </div>

            <h2 className="text-3xl font-serif text-foreground mb-6 md:text-5xl">
              Our Services
            </h2>

            <p className="text-foreground/70 max-w-lg">
              We offer cutting-edge AI services powered by the latest in machine
              learning and generative technology. From intelligent language
              models to video synthesis, our solutions are designed to give your
              business a competitive edge.
            </p>

            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-foreground px-6 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              View All Services
              <ArrowUpRight className="text-primary h-4 w-4" />
            </Link>
          </div>

          {/* Right Content - Services Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="group p-6 border border-border hover:border-foreground/30 transition-colors rounded-none border-t-0 border-l-[0] border-r-0"
              >
                <service.icon
                  className="h-8 w-8 text-primary mb-4"
                  strokeWidth={1}
                />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-foreground/60">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
