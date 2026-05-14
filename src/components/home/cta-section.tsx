import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative z-[2] mx-auto mb-28 mt-16 max-w-[1200px] px-10 max-md:mb-16 max-md:px-6">
      <div
        className="relative overflow-hidden rounded-[22px] border border-border px-10 py-20 text-center max-md:px-6 max-md:py-14"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, color-mix(in oklch, var(--primary) 18%, transparent), transparent 60%), var(--background)",
        }}
      >
        {/* Bottom glow */}
        <div
          className="pointer-events-none absolute inset-x-[-10%] bottom-[-50%] h-[60%]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, color-mix(in oklch, var(--accent) 18%, transparent), transparent 60%)",
          }}
        />

        <h2
          className="relative mx-auto mb-3.5 max-w-[18ch] font-medium leading-[1.02] tracking-[-0.035em]"
          style={{ fontSize: "clamp(32px, 4.6vw, 54px)" }}
        >
          Tokens you can <em className="hero-gradient-em">feel</em>.
          <br />
          Code you can ship.
        </h2>

        <p className="relative mx-auto mb-7 text-muted-foreground">
          Free while in beta. Bring your own design system.
        </p>

        <div className="relative flex items-center justify-center gap-2.5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-[22px] py-[13px] text-[14.5px] font-medium text-background transition-transform hover:-translate-y-px"
          >
            Open playground <span aria-hidden>→</span>
          </Link>
          <Link
            href="/template/components-showcase"
            className="inline-flex items-center gap-2 rounded-full px-[18px] py-[13px] text-[14.5px] font-medium text-foreground transition-colors hover:bg-muted"
          >
            View components
          </Link>
        </div>
      </div>
    </section>
  );
}
