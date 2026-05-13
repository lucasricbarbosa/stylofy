"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ShowcaseCard } from "./showcase-card";

export function SavingsTargetsCard() {
  return (
    <ShowcaseCard title="Savings Targets">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Active milestones for 2024
          </span>
          <Button variant="outline" size="sm">
            New Goal
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground uppercase">
              Retirement
            </div>
            <div className="text-2xl font-bold">$420,000</div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">65% achieved</span>
              <span>$273,000</span>
            </div>
            <Progress value={65} className="h-1.5" />
          </div>

          <div className="space-y-2 pt-2 border-t">
            <div className="text-xs text-muted-foreground uppercase">
              Real Estate
            </div>
            <div className="text-2xl font-bold">$85,000</div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">32% achieved</span>
              <span>$27,200</span>
            </div>
            <Progress value={32} className="h-1.5 [&>div]:bg-blue-500" />
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center pt-2 border-t">
          You have not met your targets for this year.
        </p>
      </div>
    </ShowcaseCard>
  );
}
