"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const NAV_SECTIONS = [
  {
    label: "Getting started",
    items: [
      { label: "Installation", active: false },
      { label: "Quick start", active: true },
      { label: "Core concepts", active: false },
      { label: "Why OKLCH", active: false },
    ],
  },
  {
    label: "Theme engine",
    items: [
      { label: "Tokens", active: false },
      { label: "Presets", active: false },
      { label: "Dark mode inversion", active: false },
      { label: "Custom semantics", active: false },
    ],
  },
  {
    label: "Templates",
    items: [
      { label: "Dashboard", active: false },
      { label: "Music streaming", active: false },
      { label: "Portfolio", active: false },
      { label: "Documentation", active: false },
    ],
  },
  {
    label: "Export",
    items: [
      { label: "CSS variables", active: false },
      { label: "Tailwind v4", active: false },
      { label: "JSON tokens", active: false },
      { label: "Figma plugin", active: false },
    ],
  },
  {
    label: "Reference",
    items: [
      { label: "API", active: false },
      { label: "Contrast calculator", active: false },
      { label: "Glossary", active: false },
    ],
  },
];

const TOC = [
  { id: "install", label: "Install" },
  { id: "configure", label: "Configure" },
  { id: "use", label: "Use it" },
  { id: "templates-ref", label: "Templates included" },
  { id: "next-steps", label: "Next steps" },
];

const TABLE_ROWS = [
  {
    name: "Dashboard",
    href: "#",
    stress: "Data viz, KPI cards, chart palettes",
    best: "SaaS, internal tools",
  },
  {
    name: "Music streaming",
    href: "#",
    stress: "Dark mode, album-art adjacency, player chrome",
    best: "Media, entertainment",
  },
  {
    name: "Portfolio",
    href: "/template/genai-ai-agency-template",
    stress: "Editorial type, large-scale color blocks",
    best: "Studios, agencies",
  },
  {
    name: "Documentation",
    href: "/template/docs",
    stress: "Readability, code block syntax, callouts",
    best: "Developer tools, APIs",
  },
];

const NEXT_CARDS = [
  {
    title: "Core concepts →",
    desc: "Tokens, semantics, and the difference between palette and theme.",
  },
  {
    title: "Custom semantics →",
    desc: "Add domain-specific tokens without losing inheritance.",
  },
  {
    title: "Figma plugin →",
    desc: "Round-trip changes between code and Figma in two clicks.",
  },
];

function Kw({ c }: { c: string }) {
  return <span style={{ color: "var(--primary)" }}>{c}</span>;
}
function Str({ c }: { c: string }) {
  return (
    <span style={{ color: "var(--secondary-foreground)", opacity: 0.75 }}>
      {c}
    </span>
  );
}
function Prop({ c }: { c: string }) {
  return (
    <span style={{ color: "var(--accent)", filter: "brightness(0.65)" }}>
      {c}
    </span>
  );
}
function Val({ c }: { c: string }) {
  return (
    <span
      style={{
        color: "color-mix(in oklch, var(--primary), var(--foreground) 25%)",
      }}
    >
      {c}
    </span>
  );
}
function Sel({ c }: { c: string }) {
  return <span style={{ color: "var(--primary)", opacity: 0.8 }}>{c}</span>;
}
function Cmt({ c }: { c: string }) {
  return <span className="text-muted-foreground">{c}</span>;
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="rounded border border-border px-1.5 py-0.5 font-mono text-[12.5px] text-primary"
      style={{ background: "var(--muted)" }}
    >
      {children}
    </code>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre
      className="mb-6 max-w-[64ch] overflow-x-auto rounded-xl border border-border p-[18px_20px] font-mono text-[12.5px] leading-[1.7]"
      style={{ background: "var(--muted)" }}
    >
      <code className="font-mono">{children}</code>
    </pre>
  );
}

function Callout({
  type,
  label,
  children,
}: {
  type: "tip" | "warn";
  label: string;
  children: React.ReactNode;
}) {
  const isTip = type === "tip";
  const token = isTip ? "var(--accent)" : "var(--secondary)";
  return (
    <div
      className="mb-6 grid max-w-[64ch] gap-4 rounded-xl p-[18px_20px]"
      style={{
        gridTemplateColumns: "80px 1fr",
        background: `color-mix(in oklch, ${token} 14%, var(--background))`,
        border: `1px solid color-mix(in oklch, ${token} 30%, var(--background))`,
      }}
    >
      <span
        className="pt-0.5 font-mono text-[10.5px] uppercase tracking-widest"
        style={{ color: `color-mix(in oklch, ${token}, black 40%)` }}
      >
        {label}
      </span>
      <p className="m-0 text-[15px] leading-[1.6]">{children}</p>
    </div>
  );
}

function Section({ id, title }: { id: string; title: string }) {
  return (
    <h2
      id={id}
      className="mb-3.5 mt-14 text-[26px] font-medium tracking-[-0.02em]"
      style={{ scrollMarginTop: "140px" }}
    >
      <span className="mr-2.5 font-mono text-base text-muted-foreground">
        #
      </span>
      {title}
    </h2>
  );
}

export default function DocsTemplatePage() {
  const [activeSection, setActiveSection] = useState("install");

  useEffect(() => {
    const headings = TOC.map(({ id }) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top,
          );
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-130px 0px -65% 0px" },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Docs top bar */}
      <header
        className="sticky z-40 border-b border-border"
        style={{
          top: "61px",
          background: "color-mix(in oklch, var(--background) 86%, transparent)",
          backdropFilter: "blur(14px) saturate(140%)",
          WebkitBackdropFilter: "blur(14px) saturate(140%)",
        }}
      >
        <div
          className="mx-auto items-center gap-6 px-8 py-3.5 hidden md:grid"
          style={{
            maxWidth: "1320px",
            gridTemplateColumns: "240px 1fr auto",
          }}
        >
          {/* Brand */}
          <div className="flex flex-col gap-1 text-sm font-medium">
            <span>Lib Documentation Example</span>
            <span className="text-xs text-muted-foreground">(not real)</span>
          </div>

          {/* Search */}
          <div
            className="flex max-w-[480px] items-center gap-2.5 rounded-[9px] border border-border px-3 py-1.5 text-[13px] text-muted-foreground"
            style={{ background: "var(--muted)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="flex-1">Search tokens, components, API…</span>
            <span className="flex items-center gap-0.5">
              <kbd
                className="rounded border border-border bg-background px-1 py-0.5 font-mono text-[10px] text-muted-foreground"
                style={{ fontFamily: "inherit" }}
              >
                ⌘
              </kbd>
              <kbd
                className="rounded border border-border bg-background px-1 py-0.5 font-mono text-[10px] text-muted-foreground"
                style={{ fontFamily: "inherit" }}
              >
                K
              </kbd>
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-4 text-[13.5px]">
            <a href="#" className="font-medium text-foreground">
              Docs
            </a>
            {["API", "Templates", "Changelog"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {l}
              </a>
            ))}
            <span className="flex items-center gap-1 rounded-[7px] border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground">
              v4.2
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </nav>
        </div>

        {/* Mobile top bar */}
        <div className="flex items-center justify-between px-6 py-3 md:hidden">
          <div className="flex items-center gap-2 text-sm font-medium">
            <div
              className="h-4 w-4 rounded-[3px]"
              style={{
                background:
                  "conic-gradient(from 200deg at 50% 50%, var(--primary), var(--accent), var(--secondary), var(--primary))",
              }}
            />
            <span>
              Stylofy{" "}
              <span className="font-mono text-muted-foreground font-normal">
                / docs
              </span>
            </span>
          </div>
          <span className="flex items-center gap-1 rounded-[7px] border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground">
            v4.2
          </span>
        </div>
      </header>

      {/* Three-column shell */}
      <div
        className="mx-auto px-4 py-8 pb-40 md:px-6 xl:px-8"
        style={{ maxWidth: "1320px" }}
      >
        <div
          className="xl:grid xl:gap-14"
          style={{ gridTemplateColumns: "240px minmax(0, 1fr) 220px" }}
        >
          {/* Left nav */}
          <aside
            className="hidden flex-col gap-6 overflow-y-auto pr-2 text-[13.5px] xl:flex"
            style={{
              position: "sticky",
              top: "120px",
              height: "calc(100vh - 140px)",
              scrollbarWidth: "thin",
              alignSelf: "start",
            }}
          >
            {NAV_SECTIONS.map((section) => (
              <div key={section.label} className="flex flex-col gap-1">
                <span className="mb-1 block px-3 font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground/60">
                  {section.label}
                </span>
                <ul className="flex flex-col gap-px list-none p-0">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href="#"
                        className={cn(
                          "block rounded-[7px] px-3 py-[7px] transition-all duration-150",
                          item.active
                            ? "font-medium text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                        style={
                          item.active
                            ? {
                                background:
                                  "color-mix(in oklch, var(--primary) 12%, var(--background))",
                              }
                            : undefined
                        }
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>

          {/* Main article */}
          <main className="min-w-0">
            <span className="font-mono text-[11px] text-muted-foreground">
              Getting started · 02 of 04
            </span>

            <h1
              className="mb-4 mt-3.5 font-medium leading-[1.05] tracking-[-0.035em]"
              style={{ fontSize: "clamp(36px, 4.5vw, 52px)" }}
            >
              Quick start{" "}
              <span className="text-2xl text-muted-foreground">(not real)</span>
            </h1>

            <p className="mb-4 max-w-[62ch] text-[18px] leading-[1.55] text-muted-foreground">
              Get a living color system into your codebase in about{" "}
              <em className="not-italic font-medium text-primary">
                four minutes
              </em>
              . By the end of this page, every surface in your app will recolor
              from a single source of truth — no rebuilds, no token sync.
            </p>

            {/* Meta */}
            <div className="mb-10 flex flex-wrap items-center gap-2.5 border-y border-border py-3.5 font-mono text-[12px] text-muted-foreground">
              <span>Last updated · May 12, 2026</span>
              <span>·</span>
              <span>Reading time · 4 min</span>
              <span>·</span>
              <a href="#" className="transition-colors hover:text-foreground">
                Edit on GitHub
              </a>
            </div>

            {/* Install */}
            <Section id="install" title="Install" />
            <p className="mb-4 max-w-[64ch] text-[15px] leading-[1.65]">
              Stylofy ships as a single ES module with no runtime dependencies.
              Install via your package manager of choice:
            </p>
            <CodeBlock>
              <Cmt c="# npm, pnpm, or yarn" />
              {"\n"}
              <Kw c="npm" /> install <Str c="stylofy" />
            </CodeBlock>
            <p className="mb-8 max-w-[64ch] text-[15px] leading-[1.65]">
              Stylofy targets <strong>Node ≥ 20</strong> and any browser with
              native <InlineCode>oklch()</InlineCode> support (Safari 16.4+,
              Chrome 111+, Firefox 113+). For older browsers we ship a sRGB
              fallback.
            </p>

            {/* Configure */}
            <Section id="configure" title="Configure" />
            <p className="mb-4 max-w-[64ch] text-[15px] leading-[1.65]">
              Create a <InlineCode>stylofy.config.ts</InlineCode> at the root of
              your project. Five semantic tokens is enough to drive an entire
              interface — add more later as your system grows.
            </p>
            <CodeBlock>
              <Kw c="import" /> {"{ defineConfig } "}
              <Kw c="from" /> <Str c={`"stylofy"`} />
              {";\n\n"}
              <Kw c="export default" />
              {" defineConfig({\n"}
              {"  tokens: {\n"}
              {"    "}
              <Prop c="bg" />
              {"        "}
              <Str c={`"oklch(98.5% 0.006 80)"`} />
              {",\n"}
              {"    "}
              <Prop c="fg" />
              {"        "}
              <Str c={`"oklch(16% 0.012 60)"`} />
              {",\n"}
              {"    "}
              <Prop c="primary" />
              {"   "}
              <Str c={`"oklch(58% 0.16 258)"`} />
              {",\n"}
              {"    "}
              <Prop c="secondary" /> <Str c={`"oklch(72% 0.14 35)"`} />
              {",\n"}
              {"    "}
              <Prop c="accent" />
              {"    "}
              <Str c={`"oklch(78% 0.14 142)"`} />
              {",\n"}
              {"  },\n"}
              {"  derive: { auto: "}
              <span style={{ color: "var(--primary)" }}>true</span>
              {" },\n"}
              {"  export: ["}
              <Str c={`"css"`} />
              {", "}
              <Str c={`"tailwind"`} />
              {"],\n})"}
            </CodeBlock>
            <Callout type="tip" label="Tip">
              Use OKLCH for every token. Stylofy can{" "}
              <em className="not-italic font-medium text-primary">
                interpolate hues
              </em>
              , generate dark variants, and guarantee contrast ratios — none of
              which is possible with hex.
            </Callout>

            {/* Use it */}
            <Section id="use" title="Use it" />
            <p className="mb-4 max-w-[64ch] text-[15px] leading-[1.65]">
              Stylofy writes the active palette to CSS variables on{" "}
              <InlineCode>:root</InlineCode>. Reference them anywhere —
              Tailwind, CSS Modules, styled-components, plain CSS — and surfaces
              recolor instantly when the palette changes:
            </p>
            <CodeBlock>
              <Sel c=".button" />
              {" {\n"}
              {"  background: "}
              <Val c="var(--primary)" />
              {";\n"}
              {"  color:      "}
              <Val c="var(--on-primary)" />
              {";\n"}
              {"  border:     "}
              <Val c="1px solid color-mix(in oklch, var(--primary), black 12%)" />
              {";\n}"}
            </CodeBlock>
            <Callout type="warn" label="Heads up">
              Don&apos;t hardcode hex values inside components. If you do, your
              design system stops being one — it becomes a checklist of
              overrides.
            </Callout>

            {/* Templates included */}
            <Section id="templates-ref" title="Templates included" />
            <p className="mb-4 max-w-[64ch] text-[15px] leading-[1.65]">
              Stylofy ships four reference templates so you can pressure-test
              palettes against real interfaces before committing them to
              production:
            </p>
            <div className="mb-6 max-w-[64ch] overflow-x-auto">
              <table className="w-full border-collapse text-[14px]">
                <thead>
                  <tr>
                    {["Template", "Stress-tests", "Best for"].map((h) => (
                      <th
                        key={h}
                        className="border-b border-border px-3.5 py-3 text-left text-[12px] font-medium uppercase tracking-[0.06em] text-muted-foreground"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map((row) => (
                    <tr
                      key={row.name}
                      className="border-b border-border transition-colors hover:bg-muted/40"
                    >
                      <td className="px-3.5 py-3">
                        <a
                          href={row.href}
                          className="text-primary hover:underline underline-offset-[3px]"
                        >
                          {row.name}
                        </a>
                      </td>
                      <td className="px-3.5 py-3 text-muted-foreground">
                        {row.stress}
                      </td>
                      <td className="px-3.5 py-3 text-muted-foreground">
                        {row.best}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Next steps */}
            <Section id="next-steps" title="Next steps" />
            <ul className="mb-8 grid max-w-[64ch] list-none gap-3 p-0 sm:grid-cols-2">
              {NEXT_CARDS.map((card) => (
                <li key={card.title}>
                  <a
                    href="#"
                    className="flex flex-col gap-1.5 rounded-[10px] border border-border bg-background p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-muted"
                  >
                    <span className="text-[14.5px] font-medium text-foreground">
                      {card.title}
                    </span>
                    <span className="text-[13px] leading-[1.5] text-muted-foreground">
                      {card.desc}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Prev/Next footer */}
            <div className="mt-16 flex max-w-[64ch] justify-between border-t border-border pt-6">
              <a
                href="#"
                className="flex min-w-[140px] flex-col gap-1 rounded-[10px] border border-border p-[14px_18px] transition-all duration-200 hover:border-primary hover:bg-muted"
              >
                <span className="font-mono text-[11px] text-muted-foreground">
                  ← prev
                </span>
                <span className="font-medium text-foreground">
                  Installation
                </span>
              </a>
              <a
                href="#"
                className="flex min-w-[140px] flex-col items-end gap-1 rounded-[10px] border border-border p-[14px_18px] text-right transition-all duration-200 hover:border-primary hover:bg-muted"
              >
                <span className="font-mono text-[11px] text-muted-foreground">
                  next →
                </span>
                <span className="font-medium text-foreground">
                  Core concepts
                </span>
              </a>
            </div>
          </main>

          {/* Right TOC */}
          <aside
            className="hidden flex-col gap-5 overflow-y-auto pl-2 text-[13px] xl:flex"
            style={{
              position: "sticky",
              top: "120px",
              height: "calc(100vh - 140px)",
              alignSelf: "start",
            }}
          >
            <span className="block font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground/60">
              On this page
            </span>
            <ul className="flex flex-col gap-0.5 list-none p-0">
              {TOC.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      "block border-l-2 px-3 py-[5px] transition-all duration-150",
                      activeSection === item.id
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-1 flex flex-col gap-3">
              <span className="block font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground/60">
                Was this helpful?
              </span>
              <div className="flex gap-1.5 pl-3">
                {["Yes", "No"].map((label) => (
                  <button
                    key={label}
                    className="cursor-pointer rounded-[7px] border border-border bg-transparent px-3 py-[5px] text-[12px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
