"use client";

import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { createContext, useContext, useState, type ReactNode } from "react";
import { Button } from "./button";
import { ScrollArea } from "./scroll-area";

// Catppuccin Mocha palette
const C = {
  bg: "#1e1e2e",
  text: "#cdd6f4",
  comment: "#6c7086",
  keyword: "#cba6f7", // @rules, JS keywords
  prop: "#89dceb", // --custom-props, JS object keys
  selector: "#89b4fa", // :root, .dark, body
  fn: "#cba6f7", // oklch(), hsl(), calc()
  value: "#fab387", // numbers, hex
  string: "#a6e3a1", // quoted strings
} as const;

// ── Placeholder engine ────────────────────────────────────────────────────────
// Keys are S{i}E — all word chars — so \b\d+\b cannot match the digit inside
// (no word boundary between S and digit, or digit and E).
function makeHighlighter() {
  const spans: string[] = [];

  function span(color: string, content: string): string {
    const i = spans.length;
    spans.push(`<span style="color:${color}">${content}</span>`);
    return `\x00S${i}E\x00`;
  }

  function flush(s: string): string {
    return s.replace(
      /\x00S(\d+)E\x00/g,
      (_, i) => spans[parseInt(i, 10)] ?? "",
    );
  }

  return { span, flush };
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ── CSS highlighter ───────────────────────────────────────────────────────────
function highlightCss(raw: string): string {
  const { span, flush } = makeHighlighter();
  let s = esc(raw);

  // 1. Comments (protect first)
  s = s.replace(/\/\*[\s\S]*?\*\//g, (m) => span(C.comment, m));

  // 2. @-rules
  s = s.replace(/@[\w-]+/g, (m) => span(C.keyword, m));

  // 3. Selectors (only when followed by {)
  s = s.replace(/:root(?=\s*\{)/g, (m) => span(C.selector, m));
  s = s.replace(/\.dark(?=\s*\{)/g, (m) => span(C.selector, m));
  s = s.replace(/\bbody\b(?=\s*\{)/g, (m) => span(C.selector, m));
  s = s.replace(/\*(?=\s*\{)/g, (m) => span(C.selector, m));

  // 4. CSS custom property names (--xxx before colon)
  s = s.replace(/--[\w-]+(?=\s*:)/g, (m) => span(C.prop, m));

  // 5. Function names
  s = s.replace(/\b(oklch|hsl|rgb|color-mix|calc|var)\b(?=\()/g, (m) =>
    span(C.fn, m),
  );

  // 6. Hex values
  s = s.replace(/#[\da-fA-F]{3,8}/g, (m) => span(C.value, m));

  // 7. Numbers in value position: after : , ( or whitespace.
  //    No trailing \b so "40.0%" matches fully.
  //    Context char prevents matching digits inside S{i}E placeholders.
  s = s.replace(
    /([:,(\s])(\d+(?:\.\d+)?(?:rem|px|em|%|deg)?)/g,
    (_, pre, num) => `${pre}${span(C.value, num)}`,
  );

  // 8. Quoted strings
  s = s.replace(/"[^"\n]*"|'[^'\n]*'/g, (m) => span(C.string, m));

  return flush(s);
}

// ── TypeScript/JS highlighter ─────────────────────────────────────────────────
function highlightTs(raw: string): string {
  const { span, flush } = makeHighlighter();
  let s = esc(raw);

  // 1. Comments
  s = s.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, (m) => span(C.comment, m));

  // 2. Strings (protect from keyword matching)
  s = s.replace(/`[^`]*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, (m) =>
    span(C.string, m),
  );

  // 3. Keywords
  s = s.replace(
    /\b(module|exports|require|import|export|type|const|let|var|from|default|extends|return)\b/g,
    (m) => span(C.keyword, m),
  );

  // 4. Object keys (word before colon; \x00 after placeholder breaks the lookahead safely)
  s = s.replace(/\b([\w]+)\b(?=\s*:)/g, (m) => span(C.prop, m));

  return flush(s);
}

// ── Context ───────────────────────────────────────────────────────────────────
const CodeBlockContext = createContext<{ code: string } | null>(null);

// ── Components ────────────────────────────────────────────────────────────────
export function CodeBlock({
  code,
  language,
  children,
  className,
}: {
  code: string;
  language: "css" | "typescript";
  children?: ReactNode;
  className?: string;
}) {
  const highlighted =
    language === "css" ? highlightCss(code) : highlightTs(code);

  return (
    <CodeBlockContext.Provider value={{ code }}>
      <div
        className={cn(
          "relative group rounded-lg overflow-hidden border border-border",
          className,
        )}
        style={{ background: C.bg }}
      >
        {children && (
          <div className="absolute top-3 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            {children}
          </div>
        )}
        <ScrollArea className="h-[400px] max-h-[400px] p-4 rounded-md border">
          <pre
            className="text-[11.5px] font-mono leading-relaxed"
            style={{ color: C.text, background: "transparent", margin: 0 }}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </ScrollArea>
      </div>
    </CodeBlockContext.Provider>
  );
}

export function CodeBlockCopyButton({ className }: { className?: string }) {
  const ctx = useContext(CodeBlockContext);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (!ctx) return;
    navigator.clipboard.writeText(ctx.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <Button
      onClick={handleCopy}
      className={cn(
        "flex items-center cursor-pointer gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all",
        className,
      )}
      style={{
        background: "#313244",
        border: "1px solid #45475a",
        color: copied ? "#a6e3a1" : "#cdd6f4",
      }}
    >
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}
