import { JSX, SVGProps } from "react";
import { Layouts } from "../icons/layouts";
import { PuzzlePiece } from "../icons/puzzle-piece";
import { Zap } from "../icons/zap";

interface Feature {
  title: string;
  description: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

const features: Feature[] = [
  {
    title: "Instant Preview",
    description:
      "See your colors applied to real layouts the moment you pick them. No refresh, no guessing.",
    icon: Zap,
  },
  {
    title: "Real-world Layouts",
    description:
      "Test on hero sections, cards, navbars, and forms — exactly the components you'll ship.",
    icon: Layouts,
  },
  {
    title: "Export in Seconds",
    description:
      "Copy your palette as CSS variables, Tailwind config, or JSON. Ready to paste into your project.",
    icon: PuzzlePiece,
  },
];

export function WhyStylofy() {
  return (
    <section className="default-container py-24">
      <div className="text-center mb-12">
        <h2 className="default-title mb-3">Why Stylofy?</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The fastest way to nail your design tokens before writing a single component.
        </p>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((f) => (
          <FeatureCard key={f.title} feature={f} />
        ))}
      </ul>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <li className="group relative flex flex-col gap-4 p-7 rounded-2xl border border-border bg-card transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-default overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
        <feature.icon className="text-primary size-6" />
      </div>
      <div className="relative">
        <h3 className="font-semibold text-base mb-1.5">{feature.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
      </div>
    </li>
  );
}
