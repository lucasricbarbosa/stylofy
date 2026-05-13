"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ShowcaseCard } from "./showcase-card"

export function CodespacesCard() {
  return (
    <ShowcaseCard title="Development Environment">
      <div className="space-y-4">
        <Tabs defaultValue="codespaces" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="codespaces" className="flex-1">Codespaces</TabsTrigger>
            <TabsTrigger value="local" className="flex-1">Local</TabsTrigger>
          </TabsList>

          <TabsContent value="codespaces" className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Codespaces</div>
                <div className="text-sm text-muted-foreground">Your workspaces in the cloud</div>
              </div>
              <div className="flex gap-1">
                <span className="text-sm text-muted-foreground">+</span>
                <span className="text-sm text-muted-foreground">...</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center py-6 text-center border rounded-md bg-muted/30">
              <div className="h-8 w-8 rounded bg-muted flex items-center justify-center mb-3">
                <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <div className="font-medium text-sm">No codespaces</div>
              <p className="text-xs text-muted-foreground mt-1">
                {"You don't have any codespaces with this repository checked out"}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="local" className="pt-2">
            <p className="text-sm text-muted-foreground">Configure your local development environment.</p>
          </TabsContent>
        </Tabs>
      </div>
    </ShowcaseCard>
  )
}
