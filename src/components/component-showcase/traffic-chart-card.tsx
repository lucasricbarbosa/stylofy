"use client"

import { Button } from "@/components/ui/button"
import { ShowcaseCard } from "./showcase-card"

export function TrafficChartCard() {
  const data = [
    { month: "Jan", desktop: 65, mobile: 45 },
    { month: "Feb", desktop: 55, mobile: 40 },
    { month: "Mar", desktop: 80, mobile: 60 },
    { month: "Apr", desktop: 70, mobile: 55 },
    { month: "May", desktop: 90, mobile: 70 },
    { month: "Jun", desktop: 75, mobile: 50 },
  ]

  const maxValue = 100

  return (
    <ShowcaseCard title="Traffic channels">
      <div className="space-y-4">
        <p className="text-xs text-muted-foreground">
          Monthly desktop and mobile traffic for the last six months - compare volume and mix across...
        </p>

        <div className="flex items-end justify-between gap-2 h-28">
          {data.map((item) => (
            <div key={item.month} className="flex flex-col items-center gap-1 flex-1">
              <div className="flex gap-0.5 items-end h-20 w-full justify-center">
                <div
                  className="w-3 bg-foreground rounded-t"
                  style={{ height: `${(item.desktop / maxValue) * 100}%` }}
                />
                <div
                  className="w-3 bg-muted-foreground/40 rounded-t"
                  style={{ height: `${(item.mobile / maxValue) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground">{item.month}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-foreground" />
            Desktop
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-muted-foreground/40" />
            Mobile
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t">
          <div>
            <div className="text-xs text-muted-foreground">DESKTOP</div>
            <div className="font-semibold">1,224</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">MOBILE</div>
            <div className="font-semibold">860</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">MIX DELTA</div>
            <div className="font-semibold text-emerald-600">+42%</div>
          </div>
        </div>

        <Button className="w-full">View report</Button>
      </div>
    </ShowcaseCard>
  )
}
