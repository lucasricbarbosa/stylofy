import { Timeline, TimelineStep } from "../ui/timeline";

const steps: TimelineStep[] = [
  {
    title: "Pick Your Text & Background",
    content:
      "Start with the two neutral colors that define your palette's contrast. These apply to the page background and all body text.",
  },
  {
    title: "Set Primary & Secondary",
    content:
      "Primary drives your main CTAs, links, and highlighted elements. Secondary fills cards, tags, and supporting UI.",
  },
  {
    title: "Add an Accent",
    content:
      "The accent color appears in badges, icons, hover states, and decorative elements. It gives your palette personality.",
  },
  {
    title: "Export & Ship",
    content:
      "Happy with the result? Click Export and copy your palette as CSS variables, a Tailwind config snippet, or JSON.",
  },
];

export function HowDoesItWork() {
  return (
    <section className="default-container py-24">
      <div className="rounded-2xl bg-card border border-border grid md:grid-cols-[2fr_4fr] gap-8 p-10">
        <div>
          <h2 className="default-title mb-3">How it works</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Five tokens. Infinite combinations. Pick, preview, ship.
          </p>
        </div>
        <Timeline steps={steps} />
      </div>
    </section>
  );
}
