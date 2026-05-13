"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ShowcaseCard } from "./showcase-card"
import { Label } from "@/components/ui/label"

export function PayoutPreferencesCard() {
  return (
    <ShowcaseCard title="Payout Preferences">
      <div className="space-y-4">
        <div>
          <div className="font-medium">Receiving Method</div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Account Holder Name</label>
          <Input defaultValue="Synthetic Horizons Music LLC" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Receiving Method</label>
          <RadioGroup defaultValue="bank" className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2 border rounded-md p-3">
              <RadioGroupItem value="bank" id="bank" />
              <Label htmlFor="bank" className="flex flex-col cursor-pointer">
                <span className="font-medium">Bank Transfer</span>
                <span className="text-xs text-muted-foreground">SWIFT / IBAN</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-3">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal" className="flex flex-col cursor-pointer">
                <span className="font-medium">PayPal</span>
                <span className="text-xs text-muted-foreground">Instant Payout</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">IBAN / Account Number</label>
          <Input defaultValue="DE89 3704 0044 ...." />
        </div>

        <Button className="w-full">Save Payout Settings</Button>
      </div>
    </ShowcaseCard>
  )
}
