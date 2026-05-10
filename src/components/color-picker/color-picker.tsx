"use client";

import { cn } from "@/lib/utils";
import { Check, Copy, Pipette } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface ColorPickerProps {
  initialColor: string;
  onColorChange?: (color: string) => void;
  contrastWith?: string;
}

function hsvToHex(h: number, s: number, v: number): string {
  const hn = h / 360;
  const i = Math.floor(hn * 6);
  const f = hn * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  let r: number, g: number, b: number;
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    default: r = v; g = p; b = q;
  }
  return `#${Math.round(r * 255).toString(16).padStart(2, "0")}${Math.round(g * 255).toString(16).padStart(2, "0")}${Math.round(b * 255).toString(16).padStart(2, "0")}`;
}

function hexToHsv(hex: string): { h: number; s: number; v: number } {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let hue = 0;
  if (d !== 0) {
    if (max === r) hue = ((g - b) / d) % 6;
    else if (max === g) hue = (b - r) / d + 2;
    else hue = (r - g) / d + 4;
    hue = Math.round(hue * 60);
    if (hue < 0) hue += 360;
  }
  return { h: hue, s: max === 0 ? 0 : d / max, v: max };
}

function getContrastRatio(hex1: string, hex2: string): number {
  const lum = (c: string) => {
    const cc = c.replace("#", "");
    return [
      parseInt(cc.slice(0, 2), 16),
      parseInt(cc.slice(2, 4), 16),
      parseInt(cc.slice(4, 6), 16),
    ]
      .map((v) => {
        const s = v / 255;
        return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      })
      .reduce((acc, v, i) => acc + v * [0.2126, 0.7152, 0.0722][i], 0);
  };
  const l1 = lum(hex1), l2 = lum(hex2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function parseInitial(color: string) {
  if (/^#[0-9A-Fa-f]{6}$/.test(color)) return hexToHsv(color);
  return { h: 0, s: 0, v: 1 };
}

export default function ColorPicker({ initialColor, onColorChange, contrastWith }: ColorPickerProps) {
  // Derive initial HSV from the prop so the picker opens in the right position.
  const init = parseInitial(initialColor);

  const [hex, setHex] = useState(initialColor);
  const [hue, setHue] = useState(init.h);
  const [position, setPosition] = useState({ x: init.s, y: 1 - init.v });
  const [dragging, setDragging] = useState<"gradient" | "hue" | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);
  const [hasEyeDropper, setHasEyeDropper] = useState(false);

  const gradientRef = useRef<HTMLDivElement>(null);
  const hueSliderRef = useRef<HTMLDivElement>(null);
  const onColorChangeRef = useRef(onColorChange);
  // Refs always hold the latest values so callbacks never go stale.
  const hueRef = useRef(init.h);
  const positionRef = useRef({ x: init.s, y: 1 - init.v });
  // Track the last color we emitted so we can ignore round-trip prop updates.
  const lastEmittedRef = useRef<string | null>(null);

  onColorChangeRef.current = onColorChange;
  hueRef.current = hue;
  positionRef.current = position;

  useEffect(() => {
    setHasEyeDropper("EyeDropper" in window);
  }, []);

  // Sync visual controls when initialColor changes externally (e.g. switching tokens,
  // applying a preset). Skip if this color came from our own emitColor to avoid loops.
  useEffect(() => {
    if (initialColor === lastEmittedRef.current) return;
    if (!/^#[0-9A-Fa-f]{6}$/.test(initialColor)) return;
    const { h, s, v } = hexToHsv(initialColor);
    setHex(initialColor);
    // Only move the hue slider when the color has meaningful saturation.
    // Achromatic colors (near-black, near-white, grays) have hue=0 by
    // convention from the HSV formula, but the user's LAST real hue is more
    // useful as a starting point — so we preserve it.
    if (s > 0.01) {
      setHue(h);
      hueRef.current = h;
    }
    setPosition({ x: s, y: 1 - v });
    positionRef.current = { x: s, y: 1 - v };
  }, [initialColor]);

  const emitColor = useCallback((color: string) => {
    lastEmittedRef.current = color;
    setHex(color);
    onColorChangeRef.current?.(color);
  }, []);

  const updateFromGradient = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!gradientRef.current) return;
    const rect = gradientRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setPosition({ x, y });
    positionRef.current = { x, y };
    emitColor(hsvToHex(hueRef.current, x, 1 - y));
  }, [emitColor]);

  const updateFromHue = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!hueSliderRef.current) return;
    const rect = hueSliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newHue = Math.round(x * 360);
    setHue(newHue);
    hueRef.current = newHue;
    const { x: px, y: py } = positionRef.current;
    emitColor(hsvToHex(newHue, px, 1 - py));
  }, [emitColor]);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      if (dragging === "gradient") updateFromGradient(e);
      else updateFromHue(e);
    };
    const onUp = () => setDragging(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging, updateFromGradient, updateFromHue]);

  const handleHexInput = (value: string) => {
    setHex(value);
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      const { h, s, v } = hexToHsv(value);
      if (s > 0.01) {
        setHue(h);
        hueRef.current = h;
      }
      setPosition({ x: s, y: 1 - v });
      positionRef.current = { x: s, y: 1 - v };
      lastEmittedRef.current = value;
      onColorChangeRef.current?.(value);
    }
  };

  const handleEyedropper = async () => {
    if (!("EyeDropper" in window)) return;
    try {
      // @ts-expect-error — EyeDropper not in TypeScript DOM lib yet
      const result = await new window.EyeDropper().open();
      const picked = result.sRGBHex as string;
      const { h, s, v } = hexToHsv(picked);
      if (s > 0.01) {
        setHue(h);
        hueRef.current = h;
      }
      setPosition({ x: s, y: 1 - v });
      positionRef.current = { x: s, y: 1 - v };
      emitColor(picked);
    } catch {
      // User cancelled eyedropper
    }
  };

  const hueColor = `hsl(${hue}, 100%, 50%)`;
  const contrastRatio =
    contrastWith &&
    /^#[0-9A-Fa-f]{6}$/.test(hex) &&
    /^#[0-9A-Fa-f]{6}$/.test(contrastWith)
      ? getContrastRatio(hex, contrastWith)
      : null;

  return (
    <div className="flex flex-col w-52 rounded-xl overflow-hidden border border-border bg-card shadow-lg">
      {/* HSV gradient square */}
      <div
        ref={gradientRef}
        className="relative w-full h-40 cursor-crosshair select-none"
        style={{
          background: `linear-gradient(to right, #fff, ${hueColor}), linear-gradient(to bottom, rgba(0,0,0,0), #000)`,
          backgroundBlendMode: "multiply",
        }}
        onMouseDown={(e) => {
          setDragging("gradient");
          updateFromGradient(e);
        }}
      >
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-white shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${position.x * 100}%`,
            top: `${position.y * 100}%`,
            backgroundColor: hex,
          }}
        />
      </div>

      <div className="px-3 pt-3 pb-1">
        {/* Hue slider */}
        <div
          ref={hueSliderRef}
          className="relative h-3 w-full rounded-full cursor-pointer select-none"
          style={{
            background:
              "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
          }}
          onMouseDown={(e) => {
            setDragging("hue");
            updateFromHue(e);
          }}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md pointer-events-none"
            style={{ left: `${(hue / 360) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-3 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-md border border-border flex-shrink-0 shadow-sm"
            style={{ backgroundColor: hex }}
          />
          <input
            type="text"
            value={hex}
            onChange={(e) => handleHexInput(e.target.value)}
            className="flex-1 px-2 py-1.5 text-xs font-mono border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            aria-label="Hex color value"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(hex);
              setCodeCopied(true);
              setTimeout(() => setCodeCopied(false), 1500);
            }}
            className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Copy hex color"
          >
            {codeCopied ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
          {hasEyeDropper && (
            <button
              onClick={handleEyedropper}
              className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Pick color from screen"
            >
              <Pipette className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {contrastRatio !== null && (
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-muted-foreground">
              Contrast {contrastRatio.toFixed(2)}:1
            </span>
            <span
              className={cn(
                "px-1.5 py-0.5 rounded text-[10px] font-semibold",
                contrastRatio >= 7
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : contrastRatio >= 4.5
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
              )}
            >
              {contrastRatio >= 7 ? "AAA" : contrastRatio >= 4.5 ? "AA" : "Fail"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
