"use client"

import { Button } from "@/components/ui/button"
import { ShowcaseCard } from "./showcase-card"

export function CardBalanceCard() {
  return (
    <ShowcaseCard title="Card Balance">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-muted-foreground uppercase">Card Balance</div>
          <div className="text-2xl font-bold">US$12.94</div>
          <div className="text-sm text-muted-foreground">US$11,337.06</div>
          <div className="text-xs text-muted-foreground">Available</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground uppercase">Payment Due</div>
          <div className="text-2xl font-bold">1 Apr</div>
          <Button variant="outline" size="sm" className="mt-2">Pay Early</Button>
        </div>
      </div>
    </ShowcaseCard>
  )
}
