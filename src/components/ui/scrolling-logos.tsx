"use client";

import { cn } from "@/lib/utils";
import type React from "react";

interface Logo {
  id: string;
  name: string;
  svg?: string;
  image?: string;
  height: string;
}

interface ScrollingLogosProps {
  logos: Logo[];
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  className?: string;
  stopOnHover?: boolean;
}

export function ScrollingLogos({
  logos,
  speed = "normal",
  direction = "left",
  className,
  stopOnHover = false,
}: ScrollingLogosProps) {
  const speedMap = {
    slow: "30s",
    normal: "20s",
    fast: "10s",
  };

  const animationDirection = direction === "left" ? "reverse" : "normal";

  return (
    <div className="relative">
      <div
        className={cn("group flex overflow-hidden", className)}
        style={
          {
            "--duration": speedMap[speed],
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            "animate-scrolling-logos flex shrink-0",
            stopOnHover && "group-hover:[animation-play-state:paused]",
          )}
          style={{
            animationDirection: animationDirection,
            animationDuration: "var(--duration)",
          }}
        >
          {[...Array(3)].map((_, setIndex) => (
            <div key={`set-${setIndex}`} className="flex shrink-0">
              {logos.map((logo) => (
                <div
                  key={`${setIndex}-${logo.id}`}
                  className="mx-8 flex items-center whitespace-nowrap"
                >
                  {logo.svg ? (
                    <div
                      className={cn("fill-current", logo.height)}
                      dangerouslySetInnerHTML={{ __html: logo.svg }}
                    />
                  ) : logo.image ? (
                    <img
                      src={logo.image || "/placeholder.svg"}
                      alt={logo.name}
                      className={logo.height}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
