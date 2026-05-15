"use client";

import { cn } from "@/lib/utils";
import { Save } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const HOLD_DURATION = 700;
const SVG_R = 10;
const CIRCUMFERENCE = 2 * Math.PI * SVG_R;

interface HoldToSaveButtonProps {
  onSave: (name: string) => void;
}

export function HoldToSaveButton({ onSave }: HoldToSaveButtonProps) {
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const cancelHold = useCallback(() => {
    setHolding(false);
    setProgress(0);
    startTimeRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const tick = useCallback(() => {
    if (!startTimeRef.current) return;
    const elapsed = Date.now() - startTimeRef.current;
    const p = Math.min(elapsed / HOLD_DURATION, 1);
    setProgress(p);
    if (p < 1) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      setHolding(false);
      setShowNameInput(true);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, []);

  const startHold = useCallback(() => {
    if (showNameInput) return;
    setHolding(true);
    startTimeRef.current = Date.now();
    rafRef.current = requestAnimationFrame(tick);
  }, [showNameInput, tick]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function handleConfirm() {
    const trimmed = name.trim() || "My Theme";
    onSave(trimmed);
    setShowNameInput(false);
    setName("");
    setProgress(0);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1800);
  }

  if (showNameInput) {
    return (
      <form
        className="flex items-center gap-1.5"
        onSubmit={(e) => { e.preventDefault(); handleConfirm(); }}
      >
        <input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Theme name…"
          className="flex-1 rounded-md border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <button
          type="submit"
          className="rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => { setShowNameInput(false); setProgress(0); }}
          className="rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Cancel
        </button>
      </form>
    );
  }

  const strokeOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <button
      onPointerDown={startHold}
      onPointerUp={cancelHold}
      onPointerLeave={cancelHold}
      className={cn(
        "relative flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium",
        "text-muted-foreground transition-all duration-150 select-none",
        "hover:bg-muted hover:text-foreground",
        holding && "scale-[0.97] bg-muted",
        success && "bg-primary/10 text-primary border-primary/40"
      )}
      title="Hold to save theme"
    >
      <span className="relative flex items-center justify-center w-4 h-4">
        {holding || progress > 0 ? (
          <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="12" cy="12" r={SVG_R} fill="none" stroke="currentColor" strokeOpacity={0.2} strokeWidth={3} />
            <circle
              cx="12" cy="12" r={SVG_R}
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.05s linear" }}
            />
          </svg>
        ) : (
          <Save className="size-3.5" />
        )}
      </span>
      <span>{success ? "Saved!" : "Hold to save"}</span>
    </button>
  );
}
