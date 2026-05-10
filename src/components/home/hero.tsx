import { HeroSvg } from "../hero-svg";
import { Button } from "../ui/button";

export function Hero() {
  return (
    <section className="default-container py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <HeroText />
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl" />
          <HeroSvg className="relative w-full max-w-md drop-shadow-xl" />
        </div>
      </div>
    </section>
  );
}

function HeroText() {
  return (
    <div className="flex flex-col gap-6">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium w-fit">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        Live color preview
      </div>
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
        Visualize Your
        <br />
        <span className="text-primary">Colors & Fonts</span>
        <br />
        on a Real Site
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
        Choose colors and typography for your next project and see them applied
        to real UI components — instantly, without writing a single line of code.
      </p>
      <div className="flex items-center gap-3">
        <Button className="h-11 px-6 font-semibold">
          How does it work?
        </Button>
        <Button
          variant="outline"
          className="h-11 px-6 font-semibold"
        >
          Use the toolbar ↓
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Press{" "}
        <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px]">T</kbd>
        {" "}
        <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px]">B</kbd>
        {" "}
        <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px]">P</kbd>
        {" "}
        <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px]">S</kbd>
        {" "}
        <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px]">A</kbd>
        {" "}to open each color picker.
      </p>
    </div>
  );
}
