import Link from "next/link";

export function BentoPlayground() {
  return (
    <article className="bento-card col-span-6 md:col-span-2">
      {/* Header */}
      <div className="mb-3.5 flex items-center justify-between text-muted-foreground">
        <span className="font-mono text-xs">02 · Playground</span>
        <span className="font-mono text-xs">⌘ P</span>
      </div>

      <h3 className="mb-1.5 text-[22px] font-medium leading-[1.15] tracking-[-0.02em]">
        50+ components, live.
      </h3>
      <p className="mb-5 max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
        Every primitive styled from your active tokens — buttons, forms, cards,
        and more.
      </p>

      {/* Mini component demos */}
      <div className="flex flex-col gap-3">
        {/* Buttons row */}
        <div className="flex flex-wrap gap-2">
          <button className="rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90">
            Primary
          </button>
          <button className="rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted">
            Outline
          </button>
          <button className="rounded-full px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            Ghost
          </button>
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
            Primary
          </span>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            Muted
          </span>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-foreground">
            Outline
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
            style={{
              background: "var(--accent)",
              color: "var(--accent-foreground)",
            }}
          >
            Accent
          </span>
        </div>

        {/* Mini card */}
        <div className="rounded-xl border border-border bg-muted p-3">
          <div className="mb-2 h-1.5 w-12 rounded-full bg-primary" />
          <div className="mb-1 h-2 w-4/5 rounded bg-border" />
          <div className="h-2 w-2/3 rounded bg-border/60" />
        </div>

        {/* Input */}
        <div className="flex overflow-hidden rounded-lg border border-border bg-background">
          <input
            readOnly
            value="Search tokens…"
            className="flex-1 bg-transparent px-3 py-2 text-xs text-muted-foreground outline-none"
          />
          <span className="border-l border-border bg-muted px-3 py-2 text-[10px] font-mono text-muted-foreground">
            ⌘K
          </span>
        </div>
      </div>

      {/* Link */}
      <Link
        href="/template/components-showcase"
        className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-primary transition-opacity hover:opacity-70"
      >
        View all components →
      </Link>
    </article>
  );
}
