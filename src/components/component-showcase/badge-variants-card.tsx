"use client"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { ShowcaseCard } from "./showcase-card"

export function BadgeVariantsCard() {
  return (
    <ShowcaseCard title="Badge & Controls">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Checkbox id="check-1" />
            <Checkbox id="check-2" defaultChecked />
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    </ShowcaseCard>
  )
}
