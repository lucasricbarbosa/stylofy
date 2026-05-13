"use client"

import { Badge } from "@/components/ui/badge"
import { ShowcaseCard } from "./showcase-card"

export function ClaimableBalanceCard() {
  return (
    <ShowcaseCard title="Claimable Balance">
      <div className="space-y-4">
        <div>
          <div className="text-3xl font-bold">$0.00</div>
          <Badge variant="secondary" className="mt-1">Pending Setup</Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Net Royalties</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Processing Fee</span>
            <span>-$0.00</span>
          </div>
          <div className="flex justify-between pt-2 border-t font-medium">
            <span>Total Ready to Claim</span>
            <span>$0.00 USD</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground border-t pt-4">
          Once your bank is connected, balances over $10.00 are automatically eligible for monthly distribution on the 15th of each month.
        </p>
      </div>
    </ShowcaseCard>
  )
}
