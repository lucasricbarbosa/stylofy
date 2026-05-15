"use client";

import { Slider } from "@/components/ui/slider";
import { useThemingStore } from "../store";
import { useDeferredCommit } from "../hooks/useDeferredCommit";

const MIN_REM = 0;
const MAX_REM = 1.5;

function remToSlider(rem: number): number {
  return Math.round(((rem - MIN_REM) / (MAX_REM - MIN_REM)) * 100);
}

function sliderToRem(v: number): number {
  return MIN_REM + (v / 100) * (MAX_REM - MIN_REM);
}

function parseRem(value: string): number {
  const match = value.match(/([\d.]+)rem/);
  return match ? parseFloat(match[1]) : 0.625;
}

export function RadiusRow() {
  const { state, dispatch } = useThemingStore();
  const committed = state.light.radius.value;

  const [draft, setDraft, flush] = useDeferredCommit(committed, (val) => {
    dispatch({ type: "SET_RADIUS", value: val });
  });

  const rem = parseRem(draft);
  const sliderVal = remToSlider(rem);

  function handleChange([v]: number[]) {
    setDraft(`${sliderToRem(v).toFixed(3)}rem`);
  }

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 min-h-[52px] hover:bg-muted/40 rounded-lg transition-colors"
      onPointerUp={flush}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-medium text-muted-foreground">--radius</span>
          <span className="text-[11px] font-mono text-foreground">{rem.toFixed(3)}rem</span>
        </div>
        <Slider
          min={0}
          max={100}
          step={1}
          value={[sliderVal]}
          onValueChange={handleChange}
          className="w-full"
        />
      </div>
      <div
        className="w-9 h-9 shrink-0 bg-primary/20 border-2 border-primary/40"
        style={{ borderRadius: draft }}
      />
    </div>
  );
}
