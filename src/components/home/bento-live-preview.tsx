export function BentoLivePreview() {
  return (
    <article className="bento-card col-span-6 row-span-2 p-0 md:col-span-4" id="features">
      <div className="flex h-full min-h-[380px] flex-col">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-background px-4 py-3">
          <span className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <i
                key={i}
                className="inline-block h-2 w-2 rounded-full"
                style={{
                  background:
                    "color-mix(in oklch, var(--foreground) 18%, var(--background))",
                }}
              />
            ))}
          </span>
          <span className="ml-3 flex-1 rounded-full bg-muted px-3 py-1.5 font-mono text-[11.5px] text-muted-foreground">
            stylofy.app/preview · dashboard
          </span>
          <div className="flex gap-1">
            {["dashboard", "landing", "auth"].map((tab, i) => (
              <span
                key={tab}
                className={`rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors ${
                  i === 0
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>

        {/* Preview body */}
        <div className="flex flex-1 flex-col gap-5 p-7">
          <span className="font-mono text-[11.5px] text-muted-foreground">
            01 · Live preview
          </span>
          <h3
            className="font-medium leading-[1.04] tracking-[-0.03em]"
            style={{ fontSize: "clamp(26px, 3vw, 40px)" }}
          >
            Your tokens, on real UI —{" "}
            <em className="font-serif italic" style={{ color: "var(--primary)" }}>
              not a swatch chart.
            </em>
          </h3>

          {/* Mini dashboard cards */}
          <div className="mt-auto grid grid-cols-3 gap-3">
            {[
              { label: "MRR", value: "$48,210", width: "72%", token: "primary" },
              { label: "Churn", value: "2.1%", width: "41%", token: "secondary" },
              { label: "Active", value: "12,840", width: "88%", token: "accent" },
            ].map(({ label, value, width, token }) => (
              <div
                key={label}
                className="flex min-h-[110px] flex-col gap-2.5 rounded-xl border border-border bg-background p-3.5"
              >
                <span className="font-mono text-[11px] text-muted-foreground">
                  {label}
                </span>
                <span className="text-[22px] font-medium tracking-[-0.02em]">
                  {value}
                </span>
                <div className="relative mt-auto h-1.5 overflow-hidden rounded-full bg-muted">
                  <i
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ width, background: `var(--${token})` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
