"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShowcaseCard } from "./showcase-card"

export function EnvVariablesCard() {
  return (
    <ShowcaseCard title="Environment Variables">
      <div className="space-y-3">
        <div className="text-sm text-muted-foreground">
          Production - 8 variables
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 text-sm">
            <code className="text-xs font-mono text-muted-foreground">DATABASE_URL</code>
            <Input type="password" value="••••••••" className="h-7 w-24 text-xs" readOnly />
          </div>
          <div className="flex items-center justify-between gap-2 text-sm">
            <code className="text-xs font-mono text-muted-foreground">NEXT_PUBLIC_API</code>
            <code className="text-xs text-muted-foreground">https://api.example.com</code>
          </div>
          <div className="flex items-center justify-between gap-2 text-sm">
            <code className="text-xs font-mono text-muted-foreground">STRIPE_SECRET</code>
            <Input type="password" value="••••••••" className="h-7 w-24 text-xs" readOnly />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm">Edit</Button>
          <Button size="sm">Deploy</Button>
        </div>
      </div>
    </ShowcaseCard>
  )
}
