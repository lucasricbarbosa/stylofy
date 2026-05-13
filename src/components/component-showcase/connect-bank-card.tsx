"use client"

import { CreditCardIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShowcaseCard } from "./showcase-card"

export function ConnectBankCard() {
  return (
    <ShowcaseCard title="Connect Bank">
      <div className="flex flex-col items-center justify-center py-4 text-center">
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-4">
          <CreditCardIcon className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="font-medium">Connect Bank</div>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          Link your payout method to receive monthly royalty distributions automatically.
        </p>

        <Button variant="outline">Connect Account</Button>
      </div>
    </ShowcaseCard>
  )
}
