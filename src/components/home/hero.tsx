import Link from "next/link";

export function Hero() {
  return (
    <section
      className="relative z-[2] mx-auto max-w-[1200px] px-10 pt-24 pb-16 max-md:px-6 max-md:pt-16 max-md:pb-10"
      id="playground"
    >
      {/* Version badge */}
      <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-background px-3 py-1.5 text-muted-foreground">
        <span className="animate-dot-pulse block h-[7px] w-[7px] rounded-full bg-accent" />
        <span className="font-mono text-[11px]">v1.0 · real-time tokens</span>
      </div>

      {/* Title */}
      <h1
        className="mb-7 max-w-[14ch] font-medium leading-[0.94] tracking-[-0.045em]"
        style={{ fontSize: "clamp(52px, 9vw, 120px)" }}
      >
        Color systems,
        <br />
        <em className="hero-gradient-em">alive.</em>
      </h1>

      {/* Subtitle */}
      <p className="mb-9 max-w-[52ch] text-[17px] leading-[1.55] text-muted-foreground max-md:text-base">
        Stylofy is a live palette playground. Tweak tokens at the bottom of this
        page — every surface, button, and shadow recolors in real time. Ship the
        CSS when it feels right.
      </p>

      {/* CTAs */}
      <div className="flex items-center gap-2.5">
        <Link
          href="#features"
          className="inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-[22px] py-[13px] text-[14.5px] font-medium text-background transition-transform hover:-translate-y-px max-md:px-4 max-md:py-3 max-md:text-sm"
        >
          Explore features <span aria-hidden>→</span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full px-[18px] py-[13px] text-[14.5px] font-medium text-foreground transition-colors hover:bg-muted max-md:px-4 max-md:py-3 max-md:text-sm"
        >
          See the code
        </Link>
      </div>

      {/* Floating swatches — hidden on mobile */}
      <div className="absolute right-10 top-24 hidden flex-col gap-3 lg:flex">
        {(
          [
            ["background", "var(--muted)"],
            ["foreground", "var(--foreground)"],
            ["primary", "var(--primary)"],
            ["secondary", "var(--secondary)"],
            ["accent", "var(--accent)"],
          ] as const
        ).map(([label, color]) => (
          <span
            key={label}
            title={label}
            className="block h-11 w-11 rounded-[14px] transition-transform duration-300 hover:-translate-x-1 hover:scale-105"
            style={{
              background: color,
              boxShadow:
                "inset 0 0 0 1px color-mix(in oklch, var(--foreground) 12%, transparent), 0 8px 24px -10px color-mix(in oklch, var(--foreground) 20%, transparent)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
