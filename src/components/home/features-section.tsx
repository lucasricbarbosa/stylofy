import React from "react";

const FX_VIOLET = "oklch(68% 0.16 285)";

function FCard({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <article
      className="col-span-2 flex flex-col overflow-hidden relative transition-all duration-[350ms] hover:-translate-y-[2px] group"
      style={{
        background: "var(--background)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        padding: "24px",
        minHeight: wide ? "360px" : "320px",
      }}
    >
      {children}
    </article>
  );
}

function OklchCard() {
  return (
    <FCard>
      <div className="flex-1 flex flex-col items-center justify-start pt-2 mb-[22px]">
        <div
          className="relative w-[150px] h-[150px] rounded-full flex-shrink-0"
          style={{
            background:
              "conic-gradient(from 0deg, oklch(70% 0.16 0), oklch(70% 0.16 60), oklch(70% 0.16 120), oklch(70% 0.16 180), oklch(70% 0.16 240), oklch(70% 0.16 300), oklch(70% 0.16 360))",
            boxShadow:
              "inset 0 0 0 1px color-mix(in oklch, var(--foreground) 8%, transparent), 0 12px 32px -16px color-mix(in oklch, var(--foreground) 28%, transparent)",
          }}
        >
          <div
            className="absolute inset-[22px] rounded-full flex flex-col items-center justify-center gap-[2px]"
            style={{
              background: "var(--background)",
              boxShadow:
                "inset 0 0 0 1px color-mix(in oklch, var(--foreground) 6%, transparent)",
            }}
          >
            <span className="font-mono text-[10px] text-muted-foreground">
              L 68
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              C .14
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              H 258°
            </span>
          </div>
          <div
            className="absolute w-[14px] h-[14px] rounded-full"
            style={{
              top: "-4px",
              left: "50%",
              background: "var(--foreground)",
              border: "3px solid var(--background)",
              boxShadow:
                "0 2px 6px color-mix(in oklch, var(--foreground) 28%, transparent)",
              transform:
                "translate(-50%, 0) rotate(258deg) translateY(-72px) rotate(-258deg)",
              transformOrigin: "50% 79px",
            }}
          />
        </div>

        <div className="flex gap-[14px] mt-4 flex-wrap justify-center">
          {(
            [
              { label: "--primary", color: "var(--primary)" },
              { label: "--secondary", color: "var(--secondary)" },
              { label: "--accent", color: "var(--accent)" },
            ] as const
          ).map(({ label, color }) => (
            <span
              key={label}
              className="inline-flex items-center gap-[6px] text-[11px] text-muted-foreground"
            >
              <i
                className="not-italic block w-[9px] h-[9px] rounded-full flex-shrink-0"
                style={{
                  background: color,
                  boxShadow:
                    "inset 0 0 0 1px color-mix(in oklch, var(--foreground) 14%, transparent)",
                }}
              />
              <span className="font-mono">{label}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <h3 className="m-0 mb-[6px] text-[17px] font-medium tracking-[-0.015em] text-foreground">
          Real-time OKLCH editor
        </h3>
        <p className="m-0 text-[13.5px] leading-[1.55] text-muted-foreground max-w-[42ch]">
          Edit every token in OKLCH and watch real components recolor at 60fps.
          No round-tripping to hex, no perceptual surprises.
        </p>
      </div>
    </FCard>
  );
}

const PRESETS = [
  { name: "Neo Brutalism", colors: ["#111", "#f5f5f5", "#ff5a36", "#ffd23f"] },
  { name: "Marshmallow", colors: ["#f9e6ec", "#ffd1dc", "#c98aaf", "#5a3a4d"] },
  {
    name: "Forest Ink",
    colors: ["#0d1f17", "#244b3a", "#7fae8a", "#e6f0e8"],
    active: true,
  },
  { name: "Newsprint", colors: ["#f4f0e6", "#1a1a1a", "#9a8c75", "#c8202b"] },
];

function PresetsCard() {
  return (
    <FCard>
      <div className="flex-1 mb-[22px]">
        <ul className="list-none p-0 m-0 flex flex-col gap-2">
          {PRESETS.map((preset) => (
            <li
              key={preset.name}
              className="grid items-center gap-3 px-3 py-[10px] rounded-[10px] transition-all duration-[250ms]"
              style={{
                gridTemplateColumns: "auto 1fr auto",
                border: `1px solid ${preset.active ? `color-mix(in oklch, ${FX_VIOLET} 60%, transparent)` : "var(--border)"}`,
                background: preset.active
                  ? `color-mix(in oklch, ${FX_VIOLET} 8%, transparent)`
                  : "color-mix(in oklch, var(--foreground) 2%, transparent)",
              }}
            >
              <span
                className="inline-flex p-[3px] rounded-[6px]"
                style={{
                  background:
                    "color-mix(in oklch, var(--foreground) 4%, transparent)",
                }}
              >
                {preset.colors.map((c, i) => (
                  <i
                    key={i}
                    className="not-italic inline-block w-3 h-3 rounded-[4px]"
                    style={{
                      background: c,
                      marginRight: i < preset.colors.length - 1 ? "-3px" : 0,
                      boxShadow: "0 0 0 1.5px var(--background)",
                    }}
                  />
                ))}
              </span>
              <span className="text-[13px] text-foreground tracking-[-0.005em]">
                {preset.name}
              </span>
              <span
                className="font-mono text-[10.5px] text-muted-foreground"
                style={{ opacity: 0.6 }}
              >
                04
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <h3 className="m-0 mb-[6px] text-[17px] font-medium tracking-[-0.015em] text-foreground">
          Curated theme presets
        </h3>
        <p className="m-0 text-[13.5px] leading-[1.55] text-muted-foreground max-w-[42ch]">
          Start from a thoughtful baseline — minimalist, bold, editorial. Tweak
          from there or use as-is.
        </p>
      </div>
    </FCard>
  );
}

function PreviewCard() {
  return (
    <FCard>
      <div className="flex-1 mb-[22px]">
        <div
          className="flex flex-col rounded-[10px] overflow-hidden border border-border h-full"
          style={{
            background:
              "color-mix(in oklch, var(--background), var(--foreground) 3%)",
            minHeight: "180px",
          }}
        >
          <div
            className="flex items-center gap-2 px-3 py-2 border-b border-border"
            style={{
              background:
                "color-mix(in oklch, var(--foreground) 3%, transparent)",
            }}
          >
            <span className="inline-flex gap-1">
              {[0, 1, 2].map((i) => (
                <i
                  key={i}
                  className="not-italic block w-[7px] h-[7px] rounded-full"
                  style={{
                    background:
                      "color-mix(in oklch, var(--foreground) 14%, transparent)",
                  }}
                />
              ))}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground ml-auto">
              /dashboard
            </span>
          </div>

          <div
            className="flex-1 grid gap-[10px] p-3"
            style={{ gridTemplateColumns: "56px 1fr" }}
          >
            <div className="flex flex-col gap-[6px] pr-[10px] border-r border-border">
              {[true, false, false, false].map((active, i) => (
                <span
                  key={i}
                  className="h-2 rounded-[3px]"
                  style={{
                    background: active
                      ? "var(--primary)"
                      : "color-mix(in oklch, var(--foreground) 6%, transparent)",
                    opacity: active ? 0.85 : 1,
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col gap-[10px]">
              {[
                { label: "MRR", color: "var(--primary)", width: "64%" },
                { label: "Active", color: "var(--accent)", width: "88%" },
              ].map(({ label, color, width }) => (
                <div key={label} className="flex flex-col gap-[5px]">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.04em]"
                    style={{
                      color:
                        "color-mix(in oklch, var(--foreground), var(--background) 70%)",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    className="h-2 rounded-[4px] relative overflow-hidden"
                    style={{
                      background:
                        "color-mix(in oklch, var(--foreground) 6%, transparent)",
                    }}
                  >
                    <i
                      className="not-italic absolute left-0 top-0 bottom-0 rounded-[4px] block"
                      style={{ width, background: color }}
                    />
                  </span>
                </div>
              ))}
              <div
                className="self-start mt-[2px] px-3 py-[6px] rounded-full text-[11px] font-medium"
                style={{
                  background: "var(--foreground)",
                  color: "var(--background)",
                }}
              >
                Get started →
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <h3 className="m-0 mb-[6px] text-[17px] font-medium tracking-[-0.015em] text-foreground">
          Live component preview
        </h3>
        <p className="m-0 text-[13.5px] leading-[1.55] text-muted-foreground max-w-[42ch]">
          Buttons, cards, inputs and sidebars react to your tokens the moment
          you change them.
        </p>
      </div>
    </FCard>
  );
}

function SplitCard() {
  return (
    <FCard wide>
      <div className="flex-1 flex items-center justify-center mb-[22px]">
        <div
          className="grid rounded-[12px] overflow-hidden border border-border w-full"
          style={{
            gridTemplateColumns: "1fr 1px 1fr",
            minHeight: "200px",
          }}
        >
          <div
            className="flex flex-col gap-[10px] p-[18px]"
            style={{ background: "#f5f5f4", color: "#18181b" }}
          >
            <span
              className="inline-flex w-7 h-7 items-center justify-center rounded-[8px] self-start"
              style={{ background: "rgba(0,0,0,0.05)" }}
            >
              <svg
                viewBox="0 0 24 24"
                width={18}
                height={18}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx={12} cy={12} r={4} />
                <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
              </svg>
            </span>
            <div className="flex flex-col gap-2 mt-auto">
              <span className="font-serif italic text-[34px] leading-none">
                Aa
              </span>
              <span
                className="self-start px-[11px] py-[5px] rounded-full text-[11px] font-medium"
                style={{ background: "#18181b", color: "#f5f5f4" }}
              >
                Continue
              </span>
              <span
                className="h-[5px] rounded-[3px] w-[90%]"
                style={{ background: "currentColor", opacity: 0.12 }}
              />
              <span
                className="h-[5px] rounded-[3px] w-[60%]"
                style={{ background: "currentColor", opacity: 0.12 }}
              />
            </div>
          </div>

          <div className="relative" style={{ background: "var(--border)" }}>
            <div
              className="absolute top-1/2 left-1/2 w-[22px] h-[22px] rounded-full border border-border"
              style={{
                transform: "translate(-50%, -50%)",
                background:
                  "linear-gradient(90deg, #f5f5f4 0 50%, #0f0f10 50% 100%)",
              }}
            />
          </div>

          <div
            className="flex flex-col gap-[10px] p-[18px]"
            style={{ background: "#0f0f10", color: "#f4f4f5" }}
          >
            <span
              className="inline-flex w-7 h-7 items-center justify-center rounded-[8px] self-start"
              style={{
                background:
                  "color-mix(in oklch, var(--foreground) 6%, transparent)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width={18}
                height={18}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
              </svg>
            </span>
            <div className="flex flex-col gap-2 mt-auto">
              <span className="font-serif italic text-[34px] leading-none">
                Aa
              </span>
              <span
                className="self-start px-[11px] py-[5px] rounded-full text-[11px] font-medium"
                style={{ background: "#f4f4f5", color: "#0f0f10" }}
              >
                Continue
              </span>
              <span
                className="h-[5px] rounded-[3px] w-[90%]"
                style={{ background: "currentColor", opacity: 0.12 }}
              />
              <span
                className="h-[5px] rounded-[3px] w-[60%]"
                style={{ background: "currentColor", opacity: 0.12 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <h3 className="m-0 mb-[6px] text-[17px] font-medium tracking-[-0.015em] text-foreground">
          Light &amp; dark, side by side
        </h3>
        <p className="m-0 text-[13.5px] leading-[1.55] text-muted-foreground max-w-[42ch]">
          Edit both modes at once and confirm your system works in either — no
          surprise contrast failures after the fact.
        </p>
      </div>
    </FCard>
  );
}

const TYPE_ROWS = [
  {
    label: "H1 · 48 / 600",
    sample: "Stylofy",
    style: {
      fontSize: "38px",
      fontWeight: 600,
      letterSpacing: "-0.035em",
      lineHeight: 1,
    } as React.CSSProperties,
  },
  {
    label: "H2 · 28 / 500",
    sample: "Color systems, alive",
    style: {
      fontSize: "22px",
      fontWeight: 500,
      letterSpacing: "-0.02em",
      lineHeight: 1.05,
    } as React.CSSProperties,
  },
  {
    label: "P · 15 / 400",
    sample: "The grain that makes a brand feel like a brand.",
    style: {
      fontSize: "13.5px",
      lineHeight: 1.5,
      color: "var(--muted-foreground)",
    } as React.CSSProperties,
  },
];

const RADII = [
  { label: "sharp", radius: "2px", active: false },
  { label: "soft", radius: "8px", active: true },
  { label: "round", radius: "14px", active: false },
  { label: "pill", radius: "999px", active: false },
];

function TypographyCard() {
  return (
    <FCard wide>
      <div className="flex-1 mb-[22px] flex flex-col">
        <div className="flex flex-col gap-3 pb-4 border-b border-border">
          {TYPE_ROWS.map(({ label, sample, style }) => (
            <div
              key={label}
              className="grid gap-3 items-baseline"
              style={{ gridTemplateColumns: "72px 1fr" }}
            >
              <span
                className="font-mono text-[10px] tracking-[0.02em]"
                style={{
                  color:
                    "color-mix(in oklch, var(--foreground), var(--background) 70%)",
                }}
              >
                {label}
              </span>
              <span style={style}>{sample}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap mt-4">
          <span
            className="font-mono text-[10px] mr-1"
            style={{
              color:
                "color-mix(in oklch, var(--foreground), var(--background) 70%)",
            }}
          >
            radius
          </span>
          {RADII.map(({ label, radius, active }) => (
            <span
              key={label}
              className="inline-flex items-center gap-[6px] px-[10px] py-[5px] rounded-full text-[11px] cursor-default transition-all duration-[250ms]"
              style={{
                border: `1px solid ${active ? `color-mix(in oklch, ${FX_VIOLET} 60%, transparent)` : "var(--border)"}`,
                background: active
                  ? `color-mix(in oklch, ${FX_VIOLET} 8%, transparent)`
                  : "color-mix(in oklch, var(--foreground) 3%, transparent)",
                color: active ? "var(--foreground)" : "var(--muted-foreground)",
              }}
            >
              <span
                className="inline-block w-3 h-3"
                style={{
                  borderRadius: radius,
                  background: active ? FX_VIOLET : "var(--muted-foreground)",
                }}
              />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <h3 className="m-0 mb-[6px] text-[17px] font-medium tracking-[-0.015em] text-foreground">
          Typography &amp; radius control
        </h3>
        <p className="m-0 text-[13.5px] leading-[1.55] text-muted-foreground max-w-[42ch]">
          Dial in fonts, weights and corner radii to give your system its own
          voice — not someone else&apos;s.
        </p>
      </div>
    </FCard>
  );
}

const IO_CHIPS_LEFT = [
  {
    label: "Project",
    icon: (
      <svg
        viewBox="0 0 16 16"
        width={11}
        height={11}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
      >
        <rect x={2} y={2} width={12} height={12} rx={2} />
        <path d="M5 6h6M5 9h4" />
      </svg>
    ),
  },
  {
    label: "Import",
    icon: (
      <svg
        viewBox="0 0 16 16"
        width={11}
        height={11}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
      >
        <path d="M8 2v8M5 7l3 3 3-3M3 13h10" />
      </svg>
    ),
  },
];

const IO_CHIPS_RIGHT = [
  {
    label: "Export",
    icon: (
      <svg
        viewBox="0 0 16 16"
        width={11}
        height={11}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
      >
        <path d="M8 14V6M5 9l3-3 3 3M3 3h10" />
      </svg>
    ),
  },
  {
    label: "Code",
    icon: (
      <svg
        viewBox="0 0 16 16"
        width={11}
        height={11}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
      >
        <path d="M5 4l-3 4 3 4M11 4l3 4-3 4" />
      </svg>
    ),
  },
];

function IOChip({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-[6px] px-[9px] py-[6px] border border-border rounded-[7px] text-[10.5px] text-foreground whitespace-nowrap leading-none"
      style={{
        background: "color-mix(in oklch, var(--foreground) 3%, transparent)",
      }}
    >
      <span className="text-muted-foreground">{icon}</span>
      {label}
    </span>
  );
}

function IOCard() {
  return (
    <FCard wide>
      <div className="flex-1 mb-[22px]">
        <div
          className="grid items-center gap-1 h-full"
          style={{
            gridTemplateColumns: "auto 1fr auto 1fr auto",
            minHeight: "180px",
          }}
        >
          <div className="flex flex-col gap-[6px]">
            {IO_CHIPS_LEFT.map((c) => (
              <IOChip key={c.label} {...c} />
            ))}
          </div>

          <div
            className="h-full text-muted-foreground"
            style={{ minHeight: "80px" }}
          >
            <svg
              viewBox="0 0 80 100"
              preserveAspectRatio="none"
              style={{ width: "100%", height: "100%" }}
            >
              <path
                d="M0 22 L 80 50"
                stroke="currentColor"
                strokeWidth={1}
                fill="none"
                opacity={0.5}
              />
              <path
                d="M0 78 L 80 50"
                stroke="currentColor"
                strokeWidth={1}
                fill="none"
                opacity={0.5}
              />
            </svg>
          </div>

          <div
            className="w-[54px] h-[54px] rounded-full flex flex-col items-center justify-center gap-[3px]"
            style={{
              background: `color-mix(in oklch, ${FX_VIOLET} 18%, transparent)`,
              border: `1px solid color-mix(in oklch, ${FX_VIOLET} 50%, transparent)`,
              boxShadow: `0 0 0 6px color-mix(in oklch, ${FX_VIOLET} 6%, transparent), 0 8px 24px -8px color-mix(in oklch, ${FX_VIOLET} 40%, transparent)`,
            }}
          >
            <span
              className="w-4 h-4 rounded-[5px]"
              style={{
                background:
                  "conic-gradient(from 200deg at 50% 50%, var(--primary), var(--accent), var(--secondary), var(--primary))",
                boxShadow:
                  "inset 0 0 0 1px color-mix(in oklch, var(--foreground) 22%, transparent)",
              }}
            />
            <span className="font-mono text-[8.5px] text-foreground tracking-[0.04em]">
              Stylofy
            </span>
          </div>

          <div
            className="h-full text-muted-foreground"
            style={{ minHeight: "80px" }}
          >
            <svg
              viewBox="0 0 80 100"
              preserveAspectRatio="none"
              style={{ width: "100%", height: "100%" }}
            >
              <path
                d="M0 50 L 80 22"
                stroke="currentColor"
                strokeWidth={1}
                fill="none"
                opacity={0.5}
              />
              <path
                d="M0 50 L 80 78"
                stroke="currentColor"
                strokeWidth={1}
                fill="none"
                opacity={0.5}
              />
            </svg>
          </div>

          <div className="flex flex-col gap-[6px]">
            {IO_CHIPS_RIGHT.map((c) => (
              <IOChip key={c.label} {...c} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <h3 className="m-0 mb-[6px] text-[17px] font-medium tracking-[-0.015em] text-foreground">
          Import &amp; export themes
        </h3>
        <p className="m-0 text-[13.5px] leading-[1.55] text-muted-foreground max-w-[42ch]">
          Bring in an existing token set or export yours as ready-to-paste CSS,
          Tailwind or JSON — move themes between projects effortlessly.
        </p>
      </div>
    </FCard>
  );
}

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative  z-[2] my-32 py-32"
      style={
        {
          background: "var(--muted)",
          "--fx-violet": FX_VIOLET,
        } as React.CSSProperties
      }
    >
      {/* Top hairline */}
      <div className="mx-auto max-w-[1200px] px-10 max-md:px-6">
        <div
          className="absolute left-0 right-0 top-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklch, var(--foreground) 22%, var(--background)), transparent)",
          }}
        />
        {/* Bottom hairline */}
        <div
          className="absolute left-0 right-0 bottom-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklch, var(--foreground) 22%, var(--background)), transparent)",
          }}
        />

        <div className="mx-auto max-w-[1200px] relative">
          {/* Header */}
          <div className="text-center flex flex-col items-center gap-[22px] mb-16">
            <h2
              className="font-medium m-0 text-center text-foreground"
              style={
                {
                  fontSize: "clamp(34px, 4.6vw, 58px)",
                  letterSpacing: "-0.035em",
                  lineHeight: 1.04,
                  maxWidth: "22ch",
                  textWrap: "balance",
                } as React.CSSProperties
              }
            >
              Build your color system{" "}
              <em
                className="relative not-italic font-serif h-fit hero-gradient-em"
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  padding: "0 0.06em",
                }}
              >
                effortlessly
              </em>
              <br />
            </h2>

            <p
              className="text-[16px] leading-[1.6] text-muted-foreground m-0 max-w-[60ch]"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              Stylofy is a free, open-source playground for design tokens — edit
              in OKLCH, preview on real components, and ship the CSS when it
              feels right.
            </p>
          </div>

          {/* Feature bento grid */}
          <div className="grid gap-3 md:grid-cols-4 lg:grid-cols-6">
            <OklchCard />
            <PresetsCard />
            <PreviewCard />
            <SplitCard />
            <TypographyCard />
            <IOCard />
          </div>
        </div>
      </div>
    </section>
  );
}
