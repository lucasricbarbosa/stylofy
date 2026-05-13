"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ShowcaseCard } from "./showcase-card";

export function NoTeamMembersCard() {
  return (
    <ShowcaseCard title="Team Members">
      <div className="flex flex-col items-center justify-center py-4 text-center">
        <div className="flex -space-x-2 mb-4">
          <Avatar className="h-10 w-10 border-2 border-background">
            <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
              A
            </AvatarFallback>
          </Avatar>
          <Avatar className="h-10 w-10 border-2 border-background">
            <AvatarFallback className="bg-emerald-100 text-emerald-600 text-sm">
              B
            </AvatarFallback>
          </Avatar>
          <Avatar className="h-10 w-10 border-2 border-background">
            <AvatarFallback className="bg-orange-100 text-orange-600 text-sm">
              C
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="font-medium">No Team Members</div>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          Invite your team to collaborate on this project.
        </p>

        <Button>Invite Members</Button>
      </div>
    </ShowcaseCard>
  );
}
