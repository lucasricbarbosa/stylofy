"use client";

import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React, { useEffect, useId, useRef, useState } from "react";

const FX_VIOLET = "oklch(68% 0.16 285)";

// ─── reduced-motion hook ───────────────────────────────────────────────────
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

// ─── diagonal stagger index ────────────────────────────────────────────────
// grid: 6 cols, cards occupy 2 cols each → positions 0,2,4 on row 0 and 0,2,4 on row 1
// diagonal index = col + row
const CARD_DIAGONAL: number[] = [
  0, // OklchCard    col=0 row=0
  1, // PresetsCard  col=2 row=0 → diag 1
  2, // PreviewCard  col=4 row=0 → diag 2
  1, // SplitCard    col=0 row=1 → diag 1 (wide)
  2, // TypographyCard col=2 row=1
  3, // IOCard       col=4 row=1
];

// ─── FCard base with cursor spotlight + tilt ──────────────────────────────
function FCard({
  children,
  wide = false,
  cardIndex = 0,
}: {
  children: React.ReactNode;
  wide?: boolean;
  cardIndex?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduced = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const spotlightBg = useMotionTemplate`radial-gradient(180px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.04), transparent 80%)`;

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    // tilt: max 4deg
    rotateX.set((-(y - rect.height / 2) / rect.height) * 4);
    rotateY.set(((x - rect.width / 2) / rect.width) * 4);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    mouseX.set(-999);
    mouseY.set(-999);
  }

  const delay = CARD_DIAGONAL[cardIndex] * 0.08;

  return (
    <m.article
      ref={ref}
      className="col-span-2 flex flex-col overflow-hidden relative group"
      style={{
        background: "var(--background)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        padding: "24px",
        minHeight: wide ? "360px" : "320px",
        perspective: "1000px",
        transformStyle: "preserve-3d",
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
      }}
      initial={reduced ? false : { opacity: 0, y: 24, scale: 0.96, filter: "blur(8px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, y: 24, scale: 0.96, filter: "blur(8px)" }
      }
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 24,
        delay,
        filter: { duration: 0.4, delay },
      }}
      whileHover={reduced ? {} : { y: -4, boxShadow: "0 16px 40px -12px rgba(0,0,0,0.18)" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* cursor spotlight */}
      <m.div
        className="pointer-events-none absolute inset-0 rounded-[14px] z-10"
        style={{ background: spotlightBg }}
      />
      {children}
    </m.article>
  );
}

// inner content cascade helper
function CardContent({
  children,
  delay = 0,
  inView,
}: {
  children: React.ReactNode;
  delay?: number;
  inView: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <m.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ type: "spring", stiffness: 220, damping: 26, delay }}
    >
      {children}
    </m.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Card 1 — Real-time OKLCH editor
// ═══════════════════════════════════════════════════════════════════
function OklchCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isVisible = useInView(ref, { once: false, margin: "0px" });
  const reduced = useReducedMotion();

  // Hue angle motion value — drives both the dot orbit and H display
  const angle = useMotionValue(258);
  const hDisplay = useTransform(angle, (a) => Math.round(a));

  // Wheel rotation (ambient + hover speed)
  const [hovered, setHovered] = useState(false);

  const LEGEND = [
    { label: "--primary", color: "var(--primary)" },
    { label: "--secondary", color: "var(--secondary)" },
    { label: "--accent", color: "var(--accent)" },
  ];

  useEffect(() => {
    if (reduced || !isVisible) return;
    // Continuously increment angle
    let raf: number;
    let last: number | null = null;
    const degsPerMs = hovered ? 360 / 12000 : 360 / 40000;
    function tick(now: number) {
      if (last !== null) {
        angle.set((angle.get() + (now - last) * degsPerMs) % 360);
      }
      last = now;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hovered, isVisible, reduced, angle]);

  // dot position on the wheel (orbit at radius 68px from center of 150px wheel)
  const dotX = useTransform(angle, (a) => {
    const rad = ((a - 90) * Math.PI) / 180;
    return 75 + 68 * Math.cos(rad) - 7; // 7 = half dot size
  });
  const dotY = useTransform(angle, (a) => {
    const rad = ((a - 90) * Math.PI) / 180;
    return 75 + 68 * Math.sin(rad) - 7;
  });

  const cardDelay = CARD_DIAGONAL[0] * 0.08;

  return (
    <FCard cardIndex={0}>
      <div
        ref={ref}
        className="flex-1 flex flex-col items-center justify-start pt-2 mb-[22px]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <CardContent delay={cardDelay + 0.1} inView={inView}>
          {/* color wheel */}
          <div
            className="relative w-[150px] h-[150px] rounded-full flex-shrink-0"
            style={{
              background:
                "conic-gradient(from 0deg, oklch(70% 0.16 0), oklch(70% 0.16 60), oklch(70% 0.16 120), oklch(70% 0.16 180), oklch(70% 0.16 240), oklch(70% 0.16 300), oklch(70% 0.16 360))",
              boxShadow:
                "inset 0 0 0 1px color-mix(in oklch, var(--foreground) 8%, transparent), 0 12px 32px -16px color-mix(in oklch, var(--foreground) 28%, transparent)",
            }}
          >
            {/* center hub */}
            <div
              className="absolute inset-[22px] rounded-full flex flex-col items-center justify-center gap-[2px]"
              style={{
                background: "var(--background)",
                boxShadow:
                  "inset 0 0 0 1px color-mix(in oklch, var(--foreground) 6%, transparent)",
              }}
            >
              <span className="font-mono text-[10px] text-muted-foreground">L 68</span>
              <span className="font-mono text-[10px] text-muted-foreground">C .14</span>
              <span className="font-mono text-[10px] text-muted-foreground">
                H <m.span>{hDisplay}</m.span>°
              </span>
            </div>

            {/* orbiting dot — positioned absolutely */}
            <m.div
              className="absolute w-[14px] h-[14px] rounded-full"
              style={{
                top: 0,
                left: 0,
                x: dotX,
                y: dotY,
                background: "var(--foreground)",
                border: "3px solid var(--background)",
                boxShadow:
                  "0 2px 6px color-mix(in oklch, var(--foreground) 28%, transparent)",
              }}
            />
          </div>
        </CardContent>

        {/* legend dots */}
        <CardContent delay={cardDelay + 0.16} inView={inView}>
          <div className="flex gap-[14px] mt-4 flex-wrap justify-center">
            {LEGEND.map(({ label, color }, i) => (
              <span
                key={label}
                className="inline-flex items-center gap-[6px] text-[11px] text-muted-foreground"
              >
                <m.i
                  className="not-italic block w-[9px] h-[9px] rounded-full flex-shrink-0"
                  style={{
                    background: color,
                    boxShadow:
                      "inset 0 0 0 1px color-mix(in oklch, var(--foreground) 14%, transparent)",
                  }}
                  animate={
                    reduced
                      ? {}
                      : {
                          scale: [1, 1.3, 1],
                        }
                  }
                  transition={{
                    duration: 1.8,
                    delay: i * 0.4,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: "easeInOut",
                  }}
                />
                <span className="font-mono">{label}</span>
              </span>
            ))}
          </div>
        </CardContent>
      </div>

      <CardContent delay={cardDelay + 0.22} inView={inView}>
        <div className="mt-auto">
          <h3 className="m-0 mb-[6px] text-[17px] font-medium tracking-[-0.015em] text-foreground">
            Real-time OKLCH editor
          </h3>
          <p className="m-0 text-[13.5px] leading-[1.55] text-muted-foreground max-w-[42ch]">
            Edit every token in OKLCH and watch real components recolor at 60fps. No
            round-tripping to hex, no perceptual surprises.
          </p>
        </div>
      </CardContent>
    </FCard>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Card 2 — Curated theme presets
// ═══════════════════════════════════════════════════════════════════
const PRESETS = [
  { name: "Neo Brutalism", colors: ["#111", "#f5f5f5", "#ff5a36", "#ffd23f"] },
  { name: "Marshmallow", colors: ["#f9e6ec", "#ffd1dc", "#c98aaf", "#5a3a4d"] },
  { name: "Forest Ink", colors: ["#0d1f17", "#244b3a", "#7fae8a", "#e6f0e8"], active: true },
  { name: "Newsprint", colors: ["#f4f0e6", "#1a1a1a", "#9a8c75", "#c8202b"] },
];

function PresetsCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduced = useReducedMotion();
  const layoutId = useId();
  const [activeIdx, setActiveIdx] = useState(2); // Forest Ink
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const cardDelay = CARD_DIAGONAL[1] * 0.08;

  return (
    <FCard cardIndex={1}>
      <div ref={ref} className="flex-1 mb-[22px]">
        <ul className="list-none p-0 m-0 flex flex-col gap-2">
          {PRESETS.map((preset, pi) => {
            const isActive = activeIdx === pi;
            return (
              <m.li
                key={preset.name}
                className="grid items-center gap-3 px-3 py-[10px] rounded-[10px] cursor-pointer relative"
                style={{ gridTemplateColumns: "auto 1fr auto" }}
                initial={reduced ? false : { opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 26,
                  delay: cardDelay + pi * 0.08,
                }}
                whileHover={reduced ? {} : { y: -2 }}
                onHoverStart={() => setHoveredRow(pi)}
                onHoverEnd={() => setHoveredRow(null)}
                onClick={() => setActiveIdx(pi)}
              >
                {/* layout-animated selection highlight */}
                {isActive && (
                  <m.span
                    layoutId={`${layoutId}-preset-bg`}
                    className="absolute inset-0 rounded-[10px] pointer-events-none"
                    style={{
                      border: `1px solid color-mix(in oklch, ${FX_VIOLET} 60%, transparent)`,
                      background: `color-mix(in oklch, ${FX_VIOLET} 8%, transparent)`,
                    }}
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  />
                )}
                {!isActive && (
                  <span
                    className="absolute inset-0 rounded-[10px] pointer-events-none"
                    style={{
                      border: "1px solid var(--border)",
                      background:
                        "color-mix(in oklch, var(--foreground) 2%, transparent)",
                    }}
                  />
                )}

                {/* color swatches */}
                <span
                  className="inline-flex p-[3px] rounded-[6px] relative z-10"
                  style={{
                    background:
                      "color-mix(in oklch, var(--foreground) 4%, transparent)",
                  }}
                >
                  {preset.colors.map((c, i) => (
                    <m.i
                      key={i}
                      className="not-italic inline-block w-3 h-3 rounded-[4px]"
                      style={{
                        background: c,
                        marginRight: i < preset.colors.length - 1 ? "-3px" : 0,
                        boxShadow: "0 0 0 1.5px var(--background)",
                      }}
                      animate={
                        hoveredRow === pi && !reduced
                          ? { scale: [1, 1.15, 1] }
                          : { scale: 1 }
                      }
                      transition={{
                        duration: 0.4,
                        delay: i * 0.05,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </span>

                <span className="text-[13px] text-foreground tracking-[-0.005em] relative z-10">
                  {preset.name}
                </span>
                <span
                  className="font-mono text-[10.5px] text-muted-foreground relative z-10"
                  style={{ opacity: 0.6 }}
                >
                  04
                </span>
              </m.li>
            );
          })}
        </ul>
      </div>

      <CardContent delay={cardDelay + 0.36} inView={inView}>
        <div className="mt-auto">
          <h3 className="m-0 mb-[6px] text-[17px] font-medium tracking-[-0.015em] text-foreground">
            Curated theme presets
          </h3>
          <p className="m-0 text-[13.5px] leading-[1.55] text-muted-foreground max-w-[42ch]">
            Start from a thoughtful baseline — minimalist, bold, editorial. Tweak from
            there or use as-is.
          </p>
        </div>
      </CardContent>
    </FCard>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Card 3 — Live component preview
// ═══════════════════════════════════════════════════════════════════
function PreviewCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isVisible = useInView(ref, { once: false, margin: "0px" });
  const reduced = useReducedMotion();
  const cardDelay = CARD_DIAGONAL[2] * 0.08;

  // magnetic button
  const btnRef = useRef<HTMLDivElement>(null);
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const [btnHovered, setBtnHovered] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);

  function onCardMouseMove(e: React.MouseEvent) {
    if (!btnRef.current || reduced) return;
    const btnRect = btnRef.current.getBoundingClientRect();
    const cx = btnRect.left + btnRect.width / 2;
    const cy = btnRect.top + btnRect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 60) {
      btnX.set((dx / dist) * Math.min(dist, 6));
      btnY.set((dy / dist) * Math.min(dist, 6));
    } else {
      btnX.set(0);
      btnY.set(0);
    }
  }

  const BARS = [
    { label: "MRR", color: "var(--primary)", width: "64%" },
    { label: "Active", color: "var(--accent)", width: "88%" },
  ];

  return (
    <FCard cardIndex={2}>
      <div
        ref={ref}
        className="flex-1 mb-[22px]"
        onMouseMove={onCardMouseMove}
        onMouseEnter={() => setCardHovered(true)}
        onMouseLeave={() => {
          setCardHovered(false);
          btnX.set(0);
          btnY.set(0);
        }}
      >
        <CardContent delay={cardDelay + 0.1} inView={inView}>
          <div
            className="flex flex-col rounded-[10px] overflow-hidden border border-border"
            style={{
              background:
                "color-mix(in oklch, var(--background), var(--foreground) 3%)",
              minHeight: "180px",
            }}
          >
            {/* titlebar */}
            <div
              className="flex items-center gap-2 px-3 py-2 border-b border-border"
              style={{
                background:
                  "color-mix(in oklch, var(--foreground) 3%, transparent)",
              }}
            >
              <span className="inline-flex gap-1">
                {[0, 1, 2].map((i) => (
                  <m.i
                    key={i}
                    className="not-italic block w-[7px] h-[7px] rounded-full"
                    style={{
                      background:
                        "color-mix(in oklch, var(--foreground) 14%, transparent)",
                    }}
                    animate={
                      cardHovered && !reduced
                        ? { scale: [1, 1.3, 1] }
                        : { scale: 1 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: i * 0.12,
                      ease: "easeInOut",
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
                {BARS.map(({ label, color, width }, bi) => (
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
                      <m.i
                        className="not-italic absolute left-0 top-0 bottom-0 rounded-[4px] block"
                        style={{ background: color }}
                        initial={{ width: "0%" }}
                        animate={inView ? { width } : { width: "0%" }}
                        transition={{
                          type: "spring",
                          stiffness: 60,
                          damping: 18,
                          delay: cardDelay + 0.18 + bi * 0.14,
                        }}
                      />
                      {/* shimmer */}
                      {!reduced && isVisible && (
                        <m.span
                          className="absolute inset-0 rounded-[4px]"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
                            backgroundSize: "200% 100%",
                          }}
                          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: bi * 0.5,
                          }}
                        />
                      )}
                    </span>
                  </div>
                ))}

                {/* magnetic button */}
                <m.div
                  ref={btnRef}
                  className="self-start mt-[2px] px-3 py-[6px] rounded-full text-[11px] font-medium cursor-pointer select-none"
                  style={{
                    background: "var(--foreground)",
                    color: "var(--background)",
                    x: btnX,
                    y: btnY,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  onHoverStart={() => setBtnHovered(true)}
                  onHoverEnd={() => setBtnHovered(false)}
                >
                  Get started{" "}
                  <m.span
                    className="inline-block"
                    animate={btnHovered && !reduced ? { x: 4 } : { x: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    →
                  </m.span>
                </m.div>
              </div>
            </div>
          </div>
        </CardContent>
      </div>

      <CardContent delay={cardDelay + 0.26} inView={inView}>
        <div className="mt-auto">
          <h3 className="m-0 mb-[6px] text-[17px] font-medium tracking-[-0.015em] text-foreground">
            Live component preview
          </h3>
          <p className="m-0 text-[13.5px] leading-[1.55] text-muted-foreground max-w-[42ch]">
            Buttons, cards, inputs and sidebars react to your tokens the moment you
            change them.
          </p>
        </div>
      </CardContent>
    </FCard>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Card 4 — Light & dark side by side
// ═══════════════════════════════════════════════════════════════════
function SplitCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isVisible = useInView(ref, { once: false, margin: "0px" });
  const reduced = useReducedMotion();
  const cardDelay = CARD_DIAGONAL[3] * 0.08;
  const [cardHovered, setCardHovered] = useState(false);

  return (
    <FCard cardIndex={3} wide>
      <div
        ref={ref}
        className="flex-1 flex items-center justify-center mb-[22px]"
        onMouseEnter={() => setCardHovered(true)}
        onMouseLeave={() => setCardHovered(false)}
      >
        <CardContent delay={cardDelay + 0.1} inView={inView}>
          <div
            className="grid rounded-[12px] overflow-hidden border border-border w-full relative"
            style={{
              gridTemplateColumns: "1fr 1px 1fr",
              minHeight: "200px",
            }}
          >
            {/* Light side */}
            <div
              className="flex flex-col gap-[10px] p-[18px]"
              style={{ background: "#f5f5f4", color: "#18181b" }}
            >
              <span
                className="inline-flex w-7 h-7 items-center justify-center rounded-[8px] self-start"
                style={{ background: "rgba(0,0,0,0.05)" }}
              >
                <m.svg
                  viewBox="0 0 24 24"
                  width={18}
                  height={18}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduced ? false : { rotate: -180, opacity: 0 }}
                  animate={inView ? { rotate: 0, opacity: 1 } : { rotate: -180, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 180, damping: 22, delay: cardDelay + 0.2 }}
                >
                  <circle cx={12} cy={12} r={4} />
                  <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
                </m.svg>
              </span>
              <div className="flex flex-col gap-2 mt-auto">
                <span className="font-serif italic text-[34px] leading-none">Aa</span>
                <m.span
                  className="self-start px-[11px] py-[5px] rounded-full text-[11px] font-medium"
                  style={{ background: "#18181b", color: "#f5f5f4" }}
                  animate={
                    isVisible && !reduced
                      ? { scale: [1, 1.02, 1] }
                      : { scale: 1 }
                  }
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Continue
                </m.span>
                <span className="h-[5px] rounded-[3px] w-[90%]" style={{ background: "currentColor", opacity: 0.12 }} />
                <span className="h-[5px] rounded-[3px] w-[60%]" style={{ background: "currentColor", opacity: 0.12 }} />
              </div>
            </div>

            {/* Divider — draws on entrance, glow on hover */}
            <div className="relative" style={{ background: "var(--border)" }}>
              <m.div
                className="absolute inset-0"
                style={{ transformOrigin: "top", background: "var(--border)" }}
                initial={reduced ? false : { scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.6, delay: cardDelay + 0.15, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* sweep glow */}
              <AnimatePresence>
                {cardHovered && !reduced && (
                  <m.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(180deg, transparent 0%, color-mix(in oklch, ${FX_VIOLET} 60%, transparent) 50%, transparent 100%)`,
                      backgroundSize: "100% 60%",
                    }}
                    initial={{ backgroundPosition: "0% -60%" }}
                    animate={{ backgroundPosition: "0% 160%" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                )}
              </AnimatePresence>
              <div
                className="absolute top-1/2 left-1/2 w-[22px] h-[22px] rounded-full border border-border"
                style={{
                  transform: "translate(-50%, -50%)",
                  background: "linear-gradient(90deg, #f5f5f4 0 50%, #0f0f10 50% 100%)",
                }}
              />
            </div>

            {/* Dark side */}
            <div
              className="flex flex-col gap-[10px] p-[18px]"
              style={{ background: "#0f0f10", color: "#f4f4f5" }}
            >
              <span
                className="inline-flex w-7 h-7 items-center justify-center rounded-[8px] self-start"
                style={{ background: "color-mix(in oklch, var(--foreground) 6%, transparent)" }}
              >
                <m.svg
                  viewBox="0 0 24 24"
                  width={18}
                  height={18}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduced ? false : { rotate: 180, opacity: 0 }}
                  animate={inView ? { rotate: 0, opacity: 1 } : { rotate: 180, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 180, damping: 22, delay: cardDelay + 0.2 }}
                >
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
                </m.svg>
              </span>
              <div className="flex flex-col gap-2 mt-auto">
                <span className="font-serif italic text-[34px] leading-none">Aa</span>
                <m.span
                  className="self-start px-[11px] py-[5px] rounded-full text-[11px] font-medium"
                  style={{ background: "#f4f4f5", color: "#0f0f10" }}
                  animate={
                    isVisible && !reduced
                      ? { scale: [1, 1.02, 1] }
                      : { scale: 1 }
                  }
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0, // synchronized with light side
                  }}
                >
                  Continue
                </m.span>
                <span className="h-[5px] rounded-[3px] w-[90%]" style={{ background: "currentColor", opacity: 0.12 }} />
                <span className="h-[5px] rounded-[3px] w-[60%]" style={{ background: "currentColor", opacity: 0.12 }} />
              </div>
            </div>
          </div>
        </CardContent>
      </div>

      <CardContent delay={cardDelay + 0.26} inView={inView}>
        <div className="mt-auto">
          <h3 className="m-0 mb-[6px] text-[17px] font-medium tracking-[-0.015em] text-foreground">
            Light &amp; dark, side by side
          </h3>
          <p className="m-0 text-[13.5px] leading-[1.55] text-muted-foreground max-w-[42ch]">
            Edit both modes at once and confirm your system works in either — no
            surprise contrast failures after the fact.
          </p>
        </div>
      </CardContent>
    </FCard>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Card 5 — Typography & radius control
// ═══════════════════════════════════════════════════════════════════
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
    isH1: true,
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
  { label: "sharp", radius: "2px", br: 4 },
  { label: "soft", radius: "8px", br: 12 },
  { label: "round", radius: "14px", br: 24 },
  { label: "pill", radius: "999px", br: 999 },
];

function TypingText({ text, inView, delay = 0 }: { text: string; inView: boolean; delay?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{text}</>;
  return (
    <>
      {text.split("").map((ch, i) => (
        <m.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 22,
            delay: delay + i * 0.04,
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {ch}
        </m.span>
      ))}
    </>
  );
}

function TypographyCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduced = useReducedMotion();
  const layoutId = useId();
  const cardDelay = CARD_DIAGONAL[4] * 0.08;
  const [activeRadius, setActiveRadius] = useState(1); // "soft"

  return (
    <FCard cardIndex={4} wide>
      <div ref={ref} className="flex-1 mb-[22px] flex flex-col">
        <div className="flex flex-col gap-3 pb-4 border-b border-border">
          {TYPE_ROWS.map(({ label, sample, style, isH1 }, ri) => (
            <m.div
              key={label}
              className="grid gap-3 items-baseline"
              style={{ gridTemplateColumns: "72px 1fr" }}
              initial={reduced ? false : { opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 26,
                delay: cardDelay + ri * 0.06,
              }}
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
              <span style={style}>
                {isH1 ? (
                  <TypingText text={sample} inView={inView} delay={cardDelay + 0.1} />
                ) : (
                  sample
                )}
              </span>
            </m.div>
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
          {RADII.map(({ label, radius, br }, ri) => {
            const isActive = activeRadius === ri;
            return (
              <m.span
                key={label}
                className="inline-flex items-center gap-[6px] px-[10px] py-[5px] rounded-full text-[11px] cursor-pointer relative select-none"
                style={{ border: "1px solid transparent" }}
                onClick={() => setActiveRadius(ri)}
                initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 22,
                  delay: cardDelay + 0.22 + ri * 0.04,
                }}
              >
                {/* layout-animated selection pill */}
                {isActive && (
                  <m.span
                    layoutId={`${layoutId}-radius-bg`}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      borderRadius: "999px",
                      border: `1px solid color-mix(in oklch, ${FX_VIOLET} 60%, transparent)`,
                      background: `color-mix(in oklch, ${FX_VIOLET} 8%, transparent)`,
                    }}
                    animate={{ borderRadius: `${br}px` }}
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  />
                )}
                {!isActive && (
                  <span
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      border: "1px solid var(--border)",
                      background:
                        "color-mix(in oklch, var(--foreground) 3%, transparent)",
                    }}
                  />
                )}
                <span
                  className="inline-block w-3 h-3 relative z-10"
                  style={{
                    borderRadius: radius,
                    background: isActive ? FX_VIOLET : "var(--muted-foreground)",
                  }}
                />
                <span
                  className="relative z-10"
                  style={{
                    color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                  }}
                >
                  {label}
                </span>
              </m.span>
            );
          })}
        </div>
      </div>

      <CardContent delay={cardDelay + 0.36} inView={inView}>
        <div className="mt-auto">
          <h3 className="m-0 mb-[6px] text-[17px] font-medium tracking-[-0.015em] text-foreground">
            Typography &amp; radius control
          </h3>
          <p className="m-0 text-[13.5px] leading-[1.55] text-muted-foreground max-w-[42ch]">
            Dial in fonts, weights and corner radii to give your system its own voice —
            not someone else&apos;s.
          </p>
        </div>
      </CardContent>
    </FCard>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Card 6 — Import & export themes
// ═══════════════════════════════════════════════════════════════════
const IO_CHIPS_LEFT = [
  {
    label: "Project",
    icon: (
      <svg viewBox="0 0 16 16" width={11} height={11} fill="none" stroke="currentColor" strokeWidth={1.4}>
        <rect x={2} y={2} width={12} height={12} rx={2} />
        <path d="M5 6h6M5 9h4" />
      </svg>
    ),
  },
  {
    label: "Import",
    icon: (
      <svg viewBox="0 0 16 16" width={11} height={11} fill="none" stroke="currentColor" strokeWidth={1.4}>
        <path d="M8 2v8M5 7l3 3 3-3M3 13h10" />
      </svg>
    ),
  },
];
const IO_CHIPS_RIGHT = [
  {
    label: "Export",
    icon: (
      <svg viewBox="0 0 16 16" width={11} height={11} fill="none" stroke="currentColor" strokeWidth={1.4}>
        <path d="M8 14V6M5 9l3-3 3 3M3 3h10" />
      </svg>
    ),
  },
  {
    label: "Code",
    icon: (
      <svg viewBox="0 0 16 16" width={11} height={11} fill="none" stroke="currentColor" strokeWidth={1.4}>
        <path d="M5 4l-3 4 3 4M11 4l3 4-3 4" />
      </svg>
    ),
  },
];

// Particle that travels along a line vector when chip is hovered
function LineParticle({
  x1, y1, x2, y2, trigger,
}: {
  x1: number; y1: number; x2: number; y2: number; trigger: boolean;
}) {
  const reduced = useReducedMotion();
  if (reduced || !trigger) return null;
  return (
    <m.div
      className="absolute w-[6px] h-[6px] rounded-full pointer-events-none"
      style={{
        background: FX_VIOLET,
        boxShadow: `0 0 8px 2px color-mix(in oklch, ${FX_VIOLET} 60%, transparent)`,
        top: y1 - 3,
        left: x1 - 3,
      }}
      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      animate={{
        x: [0, x2 - x1],
        y: [0, y2 - y1],
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

function IOCard() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isVisible = useInView(ref, { once: false, margin: "0px" });
  const reduced = useReducedMotion();
  const cardDelay = CARD_DIAGONAL[5] * 0.08;

  const [hoveredChip, setHoveredChip] = useState<string | null>(null);
  const [particleTick, setParticleTick] = useState(0);
  const badgeRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Map<string, HTMLSpanElement>>(new Map());

  // Compute particle vectors relative to container
  const [vectors, setVectors] = useState<Record<string, { x1: number; y1: number; x2: number; y2: number }>>({});
  useEffect(() => {
    if (!containerRef.current || !badgeRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const bRect = badgeRef.current.getBoundingClientRect();
    const bx = bRect.left - cRect.left + bRect.width / 2;
    const by = bRect.top - cRect.top + bRect.height / 2;
    const newVectors: typeof vectors = {};
    chipRefs.current.forEach((el, label) => {
      const r = el.getBoundingClientRect();
      const cx = r.left - cRect.left + r.width / 2;
      const cy = r.top - cRect.top + r.height / 2;
      newVectors[label] = { x1: cx, y1: cy, x2: bx, y2: by };
    });
    setVectors(newVectors);
  }, [inView]);

  // Retrigger particle on each new hover
  useEffect(() => {
    if (hoveredChip) setParticleTick((t) => t + 1);
  }, [hoveredChip]);

  return (
    <FCard cardIndex={5} wide>
      <div ref={ref} className="flex-1 mb-[22px]">
        <CardContent delay={cardDelay + 0.1} inView={inView}>
          <div
            ref={containerRef}
            className="grid items-center gap-1 h-full relative"
            style={{ gridTemplateColumns: "auto 1fr auto 1fr auto", minHeight: "180px" }}
          >
            {/* Left chips */}
            <div className="flex flex-col gap-[6px]">
              {IO_CHIPS_LEFT.map((c) => (
                <span
                  key={c.label}
                  ref={(el) => { if (el) chipRefs.current.set(c.label, el); }}
                  className="inline-flex items-center gap-[6px] px-[9px] py-[6px] border border-border rounded-[7px] text-[10.5px] text-foreground whitespace-nowrap leading-none cursor-pointer"
                  style={{ background: "color-mix(in oklch, var(--foreground) 3%, transparent)" }}
                  onMouseEnter={() => setHoveredChip(c.label)}
                  onMouseLeave={() => setHoveredChip(null)}
                >
                  <span className="text-muted-foreground">{c.icon}</span>
                  {c.label}
                </span>
              ))}
            </div>

            {/* Left SVG connector lines */}
            <div className="h-full text-muted-foreground" style={{ minHeight: "80px" }}>
              <svg viewBox="0 0 80 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                <m.path
                  d="M0 22 L 80 50"
                  stroke="currentColor"
                  strokeWidth={1}
                  fill="none"
                  opacity={0.5}
                  initial={reduced ? false : { pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 0.8, delay: cardDelay + 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
                <m.path
                  d="M0 78 L 80 50"
                  stroke="currentColor"
                  strokeWidth={1}
                  fill="none"
                  opacity={0.5}
                  initial={reduced ? false : { pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 0.8, delay: cardDelay + 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>
            </div>

            {/* Center badge */}
            <m.div
              ref={badgeRef}
              className="w-[54px] h-[54px] rounded-full flex flex-col items-center justify-center gap-[3px]"
              style={{
                background: `color-mix(in oklch, ${FX_VIOLET} 18%, transparent)`,
                border: `1px solid color-mix(in oklch, ${FX_VIOLET} 50%, transparent)`,
              }}
              initial={reduced ? false : { scale: 0 }}
              animate={
                inView
                  ? {
                      scale: 1,
                      boxShadow: isVisible
                        ? [
                            `0 0 0 6px color-mix(in oklch, ${FX_VIOLET} 6%, transparent), 0 8px 24px -8px color-mix(in oklch, ${FX_VIOLET} 40%, transparent)`,
                            `0 0 0 10px color-mix(in oklch, ${FX_VIOLET} 3%, transparent), 0 8px 28px -6px color-mix(in oklch, ${FX_VIOLET} 50%, transparent)`,
                            `0 0 0 6px color-mix(in oklch, ${FX_VIOLET} 6%, transparent), 0 8px 24px -8px color-mix(in oklch, ${FX_VIOLET} 40%, transparent)`,
                          ]
                        : `0 0 0 6px color-mix(in oklch, ${FX_VIOLET} 6%, transparent), 0 8px 24px -8px color-mix(in oklch, ${FX_VIOLET} 40%, transparent)`,
                    }
                  : { scale: 0 }
              }
              transition={{
                scale: { type: "spring", stiffness: 300, damping: 18, delay: cardDelay + 0.95 },
                boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
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
            </m.div>

            {/* Right SVG connector lines */}
            <div className="h-full text-muted-foreground" style={{ minHeight: "80px" }}>
              <svg viewBox="0 0 80 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                <m.path
                  d="M0 50 L 80 22"
                  stroke="currentColor"
                  strokeWidth={1}
                  fill="none"
                  opacity={0.5}
                  initial={reduced ? false : { pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 0.8, delay: cardDelay + 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
                <m.path
                  d="M0 50 L 80 78"
                  stroke="currentColor"
                  strokeWidth={1}
                  fill="none"
                  opacity={0.5}
                  initial={reduced ? false : { pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 0.8, delay: cardDelay + 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>
            </div>

            {/* Right chips */}
            <div className="flex flex-col gap-[6px]">
              {IO_CHIPS_RIGHT.map((c) => (
                <span
                  key={c.label}
                  ref={(el) => { if (el) chipRefs.current.set(c.label, el); }}
                  className="inline-flex items-center gap-[6px] px-[9px] py-[6px] border border-border rounded-[7px] text-[10.5px] text-foreground whitespace-nowrap leading-none cursor-pointer"
                  style={{ background: "color-mix(in oklch, var(--foreground) 3%, transparent)" }}
                  onMouseEnter={() => setHoveredChip(c.label)}
                  onMouseLeave={() => setHoveredChip(null)}
                >
                  <span className="text-muted-foreground">{c.icon}</span>
                  {c.label}
                </span>
              ))}
            </div>

            {/* Particles */}
            {hoveredChip && vectors[hoveredChip] && (
              <LineParticle
                key={`${hoveredChip}-${particleTick}`}
                {...vectors[hoveredChip]}
                trigger={true}
              />
            )}
          </div>
        </CardContent>
      </div>

      <CardContent delay={cardDelay + 0.36} inView={inView}>
        <div className="mt-auto">
          <h3 className="m-0 mb-[6px] text-[17px] font-medium tracking-[-0.015em] text-foreground">
            Import &amp; export themes
          </h3>
          <p className="m-0 text-[13.5px] leading-[1.55] text-muted-foreground max-w-[42ch]">
            Bring in an existing token set or export yours as ready-to-paste CSS,
            Tailwind or JSON — move themes between projects effortlessly.
          </p>
        </div>
      </CardContent>
    </FCard>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Section shell
// ═══════════════════════════════════════════════════════════════════
export function FeaturesSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section
        id="features"
        className="relative z-[2] my-32 py-32"
        style={
          {
            background: "var(--muted)",
            "--fx-violet": FX_VIOLET,
          } as React.CSSProperties
        }
      >
        <div className="absolute left-0 right-0 top-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklch, var(--foreground) 22%, var(--background)), transparent)" }}
        />
        <div className="absolute left-0 right-0 bottom-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklch, var(--foreground) 22%, var(--background)), transparent)" }}
        />

        <div className="mx-auto max-w-[1200px] px-10 max-md:px-6">
          <div className="mx-auto max-w-[1200px] relative">
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
                  style={{ fontStyle: "italic", fontWeight: 400, padding: "0 0.06em" }}
                >
                  effortlessly
                </em>
                <br />
              </h2>

              <p
                className="text-[16px] leading-[1.6] text-muted-foreground m-0 max-w-[60ch]"
                style={{ textWrap: "pretty" } as React.CSSProperties}
              >
                Stylofy is a free playground for design tokens — edit in OKLCH, preview on
                real components, and ship the CSS when it feels right.
              </p>
            </div>

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
    </LazyMotion>
  );
}
