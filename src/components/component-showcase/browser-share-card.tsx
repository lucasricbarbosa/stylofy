"use client"

import { Progress } from "@/components/ui/progress"
import { ShowcaseCard } from "./showcase-card"

export function BrowserShareCard() {
  const browsers = [
    { name: "Chrome", share: 45, color: "bg-foreground" },
    { name: "Edge", share: 15, color: "bg-muted-foreground" },
    { name: "Firefox", share: 31, color: "bg-muted-foreground/60" },
    { name: "Safari", share: 9, color: "bg-muted-foreground/40" },
  ]

  return (
    <ShowcaseCard title="Browser Share">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">January - June 2026</span>
          <span className="text-sm font-medium">Firefox</span>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative flex h-32 w-32 items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-muted"
              />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="88"
                strokeDashoffset="22"
                className="text-foreground"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold">935</span>
              <span className="text-xs text-muted-foreground">Visitors</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 text-xs">
          {browsers.map((browser) => (
            <div key={browser.name} className="flex items-center gap-1">
              <div className={`h-2 w-2 rounded-full ${browser.color}`} />
              {browser.name}
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <span>Firefox</span>
            <span className="font-medium">31%</span>
          </div>
          <Progress value={31} className="h-1.5" />
        </div>
      </div>
    </ShowcaseCard>
  )
}
