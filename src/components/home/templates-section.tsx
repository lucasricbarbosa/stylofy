import Link from "next/link";

const TEMPLATES = [
  {
    name: "Landing",
    slug: "landing",
    href: "/template/genai-ai-agency-template",
    meta: "9 sections",
    thumb: "t-landing",
  },
  {
    name: "Components",
    slug: "components",
    href: "/template/components-showcase",
    meta: "50+ primitives",
    thumb: "t-components",
  },
  {
    name: "Agency",
    slug: "agency",
    href: "/template/genai-ai-agency-template",
    meta: "12 components",
    thumb: "t-agency",
  },
];

export function TemplatesSection() {
  return (
    <section
      className="relative z-[2] mx-auto mt-28 max-w-[1200px] px-10 pb-16 max-md:mt-16 max-md:px-6"
      id="templates"
    >
      {/* Section header */}
      <div className="mb-10 flex flex-col gap-3.5">
        <span className="font-mono text-xs text-muted-foreground">
          02 · Templates
        </span>
        <h2
          className="m-0 font-medium leading-[1.02] tracking-[-0.035em]"
          style={{ fontSize: "clamp(32px, 4.5vw, 54px)" }}
        >
          Pressure-test every palette
          <br />
          on real interfaces.
        </h2>
      </div>

      {/* Template cards */}
      <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
        {TEMPLATES.map((t) => (
          <Link
            key={t.slug}
            href={t.href}
            className="group rounded-[22px] border border-border bg-background p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border/80"
            style={{
              boxShadow: "0 1px 0 var(--border)",
            }}
          >
            {/* Schematic thumbnail */}
            <div
              className={`${t.thumb} mb-3 aspect-[16/11] overflow-hidden rounded-xl`}
            />
            {/* Meta */}
            <div className="flex items-center justify-between px-0.5 pb-1">
              <span className="text-sm font-medium">{t.name}</span>
              <span className="font-mono text-[11px] text-muted-foreground">
                {t.meta}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
