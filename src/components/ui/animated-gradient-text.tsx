"use client";
import { cn } from "@/lib/utils";

interface AnimatedGradientTextProps {
  text: string;
  className?: string;
  animationSpeed?: "slow" | "medium" | "fast";
  colors?: string[];
  gradientWordCount?: number;
  gradientPosition?: "start" | "end" | "custom";
  gradientStartIndex?: number;
  noiseIntensity?: number;
  noiseColor?: string;
}

export function AnimatedGradientText({
  text,
  className,
  animationSpeed = "slow",
  colors = ["#60a5fa", "#a78bfa", "#ec4899", "#f97316", "#60a5fa"],
  gradientWordCount = 1,
  gradientPosition = "end",
  gradientStartIndex = 0,
  noiseIntensity = 0,
  noiseColor = "#ffffff",
}: AnimatedGradientTextProps) {
  const speeds = {
    slow: "8s",
    medium: "5s",
    fast: "3s",
  };

  const words = text.split(" ");

  let startIdx: number;
  if (gradientPosition === "end") {
    startIdx = Math.max(0, words.length - gradientWordCount);
  } else if (gradientPosition === "start") {
    startIdx = 0;
  } else {
    startIdx = Math.max(
      0,
      Math.min(gradientStartIndex, words.length - gradientWordCount),
    );
  }

  const endIdx = startIdx + gradientWordCount;

  const beforeWords = words.slice(0, startIdx);
  const gradientWords = words.slice(startIdx, endIdx);
  const afterWords = words.slice(endIdx);

  const colorStops = colors
    .map((color, i) => {
      const percentage = (i / (colors.length - 1)) * 100;
      return `${color} ${percentage}%`;
    })
    .join(", ");

  const noiseFilterId = `noise-filter-${Math.random().toString(36).substr(2, 9)}`;

  const hasNoise = noiseIntensity > 0;

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: Number.parseInt(result[1], 16) / 255,
          g: Number.parseInt(result[2], 16) / 255,
          b: Number.parseInt(result[3], 16) / 255,
        }
      : { r: 1, g: 1, b: 1 };
  };

  const noiseRgb = hexToRgb(noiseColor);

  return (
    <>
      {hasNoise && (
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <filter id={noiseFilterId} x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.8"
                numOctaves="1"
                result="turbulence"
                seed="2"
              />
              <feColorMatrix
                in="turbulence"
                type="matrix"
                values={`0 0 0 0 ${noiseRgb.r}
                        0 0 0 0 ${noiseRgb.g}
                        0 0 0 0 ${noiseRgb.b}
                        0 0 0 ${noiseIntensity / 100} 0`}
                result="coloredPattern"
              />
              <feComposite
                operator="in"
                in2="SourceGraphic"
                result="maskedPattern"
              />
              <feBlend in="SourceGraphic" in2="maskedPattern" mode="overlay" />
            </filter>
          </defs>
        </svg>
      )}
      <span
        className={cn("inline-block tracking-tight text-foreground", className)}
      >
        {beforeWords.length > 0 && beforeWords.join(" ") + " "}
        <span
          className="gradient-text"
          style={{
            backgroundImage: `linear-gradient(90deg, ${colorStops})`,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: `gradient-shift ${speeds[animationSpeed]} linear infinite`,
            filter: hasNoise ? `url(#${noiseFilterId})` : "none",
          }}
        >
          {gradientWords.join(" ")}
        </span>
        {afterWords.length > 0 && " " + afterWords.join(" ")}
      </span>
      <style jsx global>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </>
  );
}
