import LZString from "lz-string";

import { SHADCN_DARK_DEFAULTS, SHADCN_LIGHT_DEFAULTS } from "@/features/theming/lib/defaults";
import type { ModeTheme, ShadcnToken, SimpleTokens, TokenSource } from "@/features/theming/types";
import { SHADCN_TOKENS } from "@/features/theming/types";

// ── V3 binary format ──────────────────────────────────────────────────────────
// Bytes packed big-endian → base64url (A-Za-z0-9-_, no padding, no lz-string).
//
// Header (variable):
//   byte 0: version (3)
//   byte 1: flags — bit7=radius, bit6=font-sans, bit5=font-mono differ from defaults
//   bytes [+2]: radius uint16 (if bit7 set)
//   bytes [+1]: fontSansIdx byte (if bit6 set)
//   bytes [+1]: fontMonoIdx byte (if bit5 set)
//
// Simple tokens (always 20 bytes): 5 × uint32, each = L(10)+C(9)+H(12)+0(1)
//
// Per mode (light, then dark):
//   4 bytes: uint32 presence mask — bit i = OKLCH_TOKENS[i] differs from SHADCN default
//   N × 4 bytes: packed token values — uint32 per present token = L(10)+C(9)+H(12)+source(1)
//
// OKLCH_TOKENS: SHADCN_TOKENS minus {radius, font-sans, font-mono} = 31 tokens, stable order.
// Alpha dropped — alpha-having defaults (dark border/input) stay default unless overridden,
// in which case the alpha is discarded (rare; visually negligible).
// ─────────────────────────────────────────────────────────────────────────────

export const SCHEMA_VERSION = 3;
export const MAX_SAFE_URL_LENGTH = 400;

export type ShareableState = {
  simple: SimpleTokens;
  light: ModeTheme;
  dark: ModeTheme;
};

// ── Constants ─────────────────────────────────────────────────────────────────

const OKLCH_TOKENS = (SHADCN_TOKENS as readonly ShadcnToken[]).filter(
  (t) => t !== "radius" && t !== "font-sans" && t !== "font-mono",
); // 31 tokens, i=0..30 — presence mask bit i covers OKLCH_TOKENS[i]

const SIMPLE_KEYS: (keyof SimpleTokens)[] = [
  "foreground",
  "background",
  "primary",
  "secondary",
  "accent",
];

const KNOWN_FONTS = [
  "var(--font-user, var(--font-inter))",
  "var(--font-user, var(--font-geist))",
  "var(--font-user, var(--font-geist-mono))",
  "var(--font-user, var(--font-fira-code))",
];

const DEFAULT_RADIUS_INT = 625; // 0.625rem × 1000
const DEFAULT_RADIUS_STR = "0.625rem";

// ── Base64url codec ───────────────────────────────────────────────────────────

const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const B64_INV: Record<string, number> = {};
for (let i = 0; i < B64.length; i++) B64_INV[B64[i]] = i;

function toBase64url(bytes: number[]): string {
  let out = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i], b1 = bytes[i + 1] ?? 0, b2 = bytes[i + 2] ?? 0;
    out += B64[b0 >> 2];
    out += B64[((b0 & 3) << 4) | (b1 >> 4)];
    if (i + 1 < bytes.length) out += B64[((b1 & 15) << 2) | (b2 >> 6)];
    if (i + 2 < bytes.length) out += B64[b2 & 63];
  }
  return out;
}

function fromBase64url(s: string): number[] {
  const out: number[] = [];
  for (let i = 0; i < s.length; i += 4) {
    const v0 = B64_INV[s[i]] ?? 0;
    const v1 = B64_INV[s[i + 1]] ?? 0;
    const v2 = B64_INV[s[i + 2]] ?? 0;
    const v3 = B64_INV[s[i + 3]] ?? 0;
    out.push((v0 << 2) | (v1 >> 4));
    if (s[i + 2]) out.push(((v1 & 15) << 4) | (v2 >> 2));
    if (s[i + 3]) out.push(((v2 & 3) << 6) | v3);
  }
  return out;
}

// ── uint32 I/O ────────────────────────────────────────────────────────────────

function pushU32(buf: number[], value: number): void {
  buf.push(((value / 0x1000000) | 0) & 0xff);
  buf.push((value >>> 16) & 0xff);
  buf.push((value >>> 8) & 0xff);
  buf.push(value & 0xff);
}

function readU32(arr: number[], offset: number): number {
  // Use multiplication for byte 0 to avoid signed 32-bit overflow from << 24
  return (arr[offset] * 0x1000000 + (arr[offset + 1] << 16) + (arr[offset + 2] << 8) + arr[offset + 3]) >>> 0;
}

// ── OKLCH packing — L(10)+C(9)+H(12)+source(1) in 32 bits ────────────────────

function packOklch(L: number, C: number, H: number, source: boolean): number {
  return ((L << 22) | (C << 13) | (H << 1) | (source ? 1 : 0)) >>> 0;
}

function unpackOklch(n: number): { L: number; C: number; H: number; source: boolean } {
  return {
    L: (n >>> 22) & 0x3ff,  // 10 bits
    C: (n >>> 13) & 0x1ff,  // 9 bits
    H: (n >>> 1) & 0xfff,   // 12 bits
    source: (n & 1) !== 0,
  };
}

// ── OKLCH string codec ────────────────────────────────────────────────────────

function parseOklch(s: string): { L: number; C: number; H: number } | null {
  const m = s.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
  if (!m) return null;
  return {
    L: Math.round(parseFloat(m[1]) * 1000),
    C: Math.round(parseFloat(m[2]) * 1000),
    H: Math.round(parseFloat(m[3]) * 10),
  };
}

function oklchFromInts(L: number, C: number, H: number): string {
  return `oklch(${L / 1000} ${C / 1000} ${H / 10})`;
}

// ── Defaults cache ────────────────────────────────────────────────────────────

type OklchInt = { L: number; C: number; H: number };

let _ldCache: Map<ShadcnToken, OklchInt> | null = null;
let _ddCache: Map<ShadcnToken, OklchInt> | null = null;

function getOklchDefaults(mode: "light" | "dark"): Map<ShadcnToken, OklchInt> {
  if (mode === "light" && _ldCache) return _ldCache;
  if (mode === "dark" && _ddCache) return _ddCache;
  const src = mode === "light" ? SHADCN_LIGHT_DEFAULTS : SHADCN_DARK_DEFAULTS;
  const map = new Map<ShadcnToken, OklchInt>();
  for (const t of OKLCH_TOKENS) {
    map.set(t, parseOklch(src[t] ?? "") ?? { L: 0, C: 0, H: 0 });
  }
  if (mode === "light") _ldCache = map;
  else _ddCache = map;
  return map;
}

// ── V3 encode ─────────────────────────────────────────────────────────────────

function encodeV3(state: ShareableState): string {
  const buf: number[] = [];

  // Header
  // flags bits: 7=radiusVal, 6=fontSansVal, 5=fontMonoVal differ from default
  //             4=radiusSrc, 3=fontSansSrc, 2=fontMonoSrc are "override"
  const lightR = state.light["radius"]?.value ?? DEFAULT_RADIUS_STR;
  const lightFS = state.light["font-sans"]?.value ?? KNOWN_FONTS[0];
  const lightFM = state.light["font-mono"]?.value ?? KNOWN_FONTS[0];
  const rInt = Math.round(parseFloat(lightR) * 1000);
  const fsIdx = Math.max(0, KNOWN_FONTS.indexOf(lightFS));
  const fmIdx = Math.max(0, KNOWN_FONTS.indexOf(lightFM));
  let flags = 0;
  if (rInt !== DEFAULT_RADIUS_INT) flags |= 0x80;
  if (fsIdx !== 0) flags |= 0x40;
  if (fmIdx !== 0) flags |= 0x20;
  if (state.light["radius"]?.source === "override") flags |= 0x10;
  if (state.light["font-sans"]?.source === "override") flags |= 0x08;
  if (state.light["font-mono"]?.source === "override") flags |= 0x04;
  buf.push(3, flags);
  if (flags & 0x80) buf.push((rInt >> 8) & 0xff, rInt & 0xff);
  if (flags & 0x40) buf.push(fsIdx);
  if (flags & 0x20) buf.push(fmIdx);

  // Simple tokens (5 × uint32, source bit unused = 0)
  for (const k of SIMPLE_KEYS) {
    const q = parseOklch(state.simple[k]);
    pushU32(buf, packOklch(q?.L ?? 0, q?.C ?? 0, q?.H ?? 0, false));
  }

  // Mode themes (light, then dark)
  function encodeMode(theme: ModeTheme, mode: "light" | "dark"): void {
    const defs = getOklchDefaults(mode);
    let mask = 0;
    const vals: number[] = [];
    for (let i = 0; i < OKLCH_TOKENS.length; i++) {
      const t = OKLCH_TOKENS[i];
      const tv = theme[t];
      const q = tv ? parseOklch(tv.value) : null;
      const def = defs.get(t)!;
      if (q && (q.L !== def.L || q.C !== def.C || q.H !== def.H)) {
        mask |= 1 << i;
        vals.push(packOklch(q.L, q.C, q.H, tv?.source === "override"));
      }
    }
    pushU32(buf, mask >>> 0);
    for (const v of vals) pushU32(buf, v);
  }

  encodeMode(state.light, "light");
  encodeMode(state.dark, "dark");

  return toBase64url(buf);
}

// ── V3 decode ─────────────────────────────────────────────────────────────────

function decodeV3(bytes: number[]): ShareableState | null {
  if (bytes.length < 2 + 20 + 8) return null; // version+flags+simple+two masks minimum

  let pos = 1; // version already confirmed
  const flags = bytes[pos++];

  let radius = DEFAULT_RADIUS_STR;
  let fontSans = KNOWN_FONTS[0];
  let fontMono = KNOWN_FONTS[0];

  if (flags & 0x80) {
    if (pos + 2 > bytes.length) return null;
    radius = `${((bytes[pos] << 8) | bytes[pos + 1]) / 1000}rem`;
    pos += 2;
  }
  if (flags & 0x40) {
    if (pos >= bytes.length) return null;
    fontSans = KNOWN_FONTS[bytes[pos++]] ?? KNOWN_FONTS[0];
  }
  if (flags & 0x20) {
    if (pos >= bytes.length) return null;
    fontMono = KNOWN_FONTS[bytes[pos++]] ?? KNOWN_FONTS[0];
  }

  // Simple tokens
  if (pos + 20 > bytes.length) return null;
  const simple: Partial<SimpleTokens> = {};
  for (const k of SIMPLE_KEYS) {
    const { L, C, H } = unpackOklch(readU32(bytes, pos));
    simple[k] = oklchFromInts(L, C, H);
    pos += 4;
  }

  // Mode themes
  function decodeMode(mode: "light" | "dark"): ModeTheme | null {
    if (pos + 4 > bytes.length) return null;
    const mask = readU32(bytes, pos);
    pos += 4;
    const defs = getOklchDefaults(mode);
    const defaults = mode === "light" ? SHADCN_LIGHT_DEFAULTS : SHADCN_DARK_DEFAULTS;
    const theme = {} as ModeTheme;

    for (let i = 0; i < OKLCH_TOKENS.length; i++) {
      const t = OKLCH_TOKENS[i];
      if (mask & (1 << i)) {
        if (pos + 4 > bytes.length) return null;
        const { L, C, H, source } = unpackOklch(readU32(bytes, pos));
        pos += 4;
        theme[t] = { value: oklchFromInts(L, C, H), source: source ? "override" : "derived" };
      } else {
        const def = defs.get(t)!;
        // Restore original default string (preserves alpha on default dark border/input)
        theme[t] = { value: defaults[t] ?? oklchFromInts(def.L, def.C, def.H), source: "derived" };
      }
    }

    // Special tokens are global (same value applied to both modes)
    // Source: explicit override if value changed (bits 7/6/5) OR source bit set (bits 4/3/2)
    const radiusSrc: TokenSource = (flags & 0x90) ? "override" : "derived";
    const fsSrc: TokenSource = (flags & 0x48) ? "override" : "derived";
    const fmSrc: TokenSource = (flags & 0x24) ? "override" : "derived";
    theme["radius"] = { value: radius, source: radiusSrc };
    theme["font-sans"] = { value: fontSans, source: fsSrc };
    theme["font-mono"] = { value: fontMono, source: fmSrc };

    return theme;
  }

  const light = decodeMode("light");
  const dark = decodeMode("dark");
  if (!light || !dark) return null;

  return { simple: simple as SimpleTokens, light, dark };
}

// ── V2 decode (back-compat for lz-string URLs already in the wild) ────────────

function decodeV2(encoded: string): ShareableState | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    const raw = JSON.parse(json) as unknown;
    if (!Array.isArray(raw) || (raw as unknown[])[0] !== 2) return null;

    const nums = raw as number[];
    if (nums.length < 29) return null;
    let pos = 1;

    function q4Str(n: number[]): string {
      const l = n[0] / 1000, c = n[1] / 1000, h = n[2] / 10;
      return n[3] === 100 ? `oklch(${l} ${c} ${h})` : `oklch(${l} ${c} ${h} / ${n[3]}%)`;
    }

    function hasBit(low: number, high: number, i: number): boolean {
      return i < 32 ? (low & (1 << i)) !== 0 : (high & (1 << (i - 32))) !== 0;
    }

    const simple: Partial<SimpleTokens> = {};
    for (const k of SIMPLE_KEYS) {
      simple[k] = q4Str(nums.slice(pos, pos + 4));
      pos += 4;
    }

    function decodeV2Mode(
      pL: number, pH: number, sL: number, sH: number,
      modeDefaults: typeof SHADCN_LIGHT_DEFAULTS,
    ): ModeTheme {
      const theme = {} as ModeTheme;
      for (let i = 0; i < SHADCN_TOKENS.length; i++) {
        const t = SHADCN_TOKENS[i];
        const isSpecial = t === "radius" || t === "font-sans" || t === "font-mono";
        const len = isSpecial ? 1 : 4;
        let chunk: number[];
        if (hasBit(pL, pH, i)) {
          chunk = nums.slice(pos, pos + len);
          pos += len;
        } else {
          if (t === "radius") {
            const m = modeDefaults[t].match(/([\d.]+)rem/);
            chunk = [m ? Math.round(parseFloat(m[1]) * 1000) : 625];
          } else if (t === "font-sans" || t === "font-mono") {
            const fi = KNOWN_FONTS.indexOf(modeDefaults[t]);
            chunk = [fi >= 0 ? fi : 0];
          } else {
            const q = parseOklch(modeDefaults[t]);
            chunk = q ? [q.L, q.C, q.H, 100] : [0, 0, 0, 100];
          }
        }
        const src: TokenSource = hasBit(sL, sH, i) ? "override" : "derived";
        if (t === "radius") {
          theme[t] = { value: `${chunk[0] / 1000}rem`, source: src };
        } else if (t === "font-sans" || t === "font-mono") {
          theme[t] = { value: KNOWN_FONTS[chunk[0]] ?? KNOWN_FONTS[0], source: src };
        } else {
          theme[t] = { value: q4Str(chunk), source: src };
        }
      }
      return theme;
    }

    const lpL = nums[pos++], lpH = nums[pos++], lsL = nums[pos++], lsH = nums[pos++];
    const light = decodeV2Mode(lpL, lpH, lsL, lsH, SHADCN_LIGHT_DEFAULTS);
    if (pos + 4 > nums.length) return null;
    const dpL = nums[pos++], dpH = nums[pos++], dsL = nums[pos++], dsH = nums[pos++];
    const dark = decodeV2Mode(dpL, dpH, dsL, dsH, SHADCN_DARK_DEFAULTS);

    return { simple: simple as SimpleTokens, light, dark };
  } catch (err) {
    console.error("[share-theme] V2 decode failed:", err);
    return null;
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

export function encodeThemeState(state: ShareableState): string {
  return encodeV3(state);
}

export function decodeThemeState(encoded: string): ShareableState | null {
  try {
    // V3: first decoded byte is 3 (binary base64url, no lz-string)
    const bytes = fromBase64url(encoded);
    if (bytes.length > 0 && bytes[0] === 3) {
      return decodeV3(bytes);
    }
    // V2: lz-string JSON array starting with version 2
    return decodeV2(encoded);
  } catch (err) {
    console.error("[share-theme] Decode failed:", err);
    return null;
  }
}

export function buildShareUrl(state: ShareableState): string {
  const encoded = encodeThemeState(state);
  const base =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}`
      : "https://stylofy.app/";
  return `${base}#t=${encoded}`;
}

export function parseThemeFromHash(): string | null {
  if (typeof window === "undefined") return null;
  // New #t=; legacy #theme= accepted for any old URLs
  const m1 = window.location.hash.match(/^#t=(.+)$/);
  if (m1) return m1[1];
  const m2 = window.location.hash.match(/^#theme=(.+)$/);
  return m2 ? m2[1] : null;
}
