"use client"

import { ChevronRightIcon, AlertCircleIcon, LockIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShowcaseCard } from "./showcase-card"

export function AccountAccessCard() {
  return (
    <ShowcaseCard title="Account Access">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Update your credentials or re-authenticate.
        </p>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email Address</label>
          <Input defaultValue="artist@studio.inc" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Current Password</label>
            <Button variant="link" size="sm" className="h-auto p-0 text-xs">FORGOT?</Button>
          </div>
          <Input type="password" defaultValue="••••••••••" />
        </div>

        <Button className="w-full">
          <LockIcon className="h-4 w-4 mr-2" />
          Update Security
        </Button>

        <div className="flex items-center justify-between p-3 rounded-md border border-destructive/20 bg-destructive/5">
          <div className="flex items-center gap-2">
            <AlertCircleIcon className="h-4 w-4 text-destructive" />
            <div>
              <div className="text-sm font-medium text-destructive">Danger Zone</div>
              <div className="text-xs text-muted-foreground">Archive account and remove catalog</div>
            </div>
          </div>
          <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </ShowcaseCard>
  )
}
