"use client";

import { ActionBar } from "./action-bar";
import { ColorRow } from "./color-row";
import { RadiusRow } from "./radius-row";
import { TokenSection } from "./token-section";

const BASE_TOKENS = [
  { token: "background", label: "--background" },
  { token: "foreground", label: "--foreground" },
  { token: "card", label: "--card" },
  { token: "card-foreground", label: "--card-foreground" },
  { token: "popover", label: "--popover" },
  { token: "popover-foreground", label: "--popover-foreground" },
] as const;

const BRAND_TOKENS = [
  { token: "primary", label: "--primary" },
  { token: "primary-foreground", label: "--primary-foreground" },
  { token: "secondary", label: "--secondary" },
  { token: "secondary-foreground", label: "--secondary-foreground" },
  { token: "destructive", label: "--destructive" },
] as const;

const OTHER_TOKENS = [
  { token: "muted", label: "--muted" },
  { token: "muted-foreground", label: "--muted-foreground" },
  { token: "accent", label: "--accent" },
  { token: "accent-foreground", label: "--accent-foreground" },
  { token: "border", label: "--border" },
  { token: "input", label: "--input" },
  { token: "ring", label: "--ring" },
] as const;

const CHART_TOKENS = [
  { token: "chart-1", label: "--chart-1" },
  { token: "chart-2", label: "--chart-2" },
  { token: "chart-3", label: "--chart-3" },
  { token: "chart-4", label: "--chart-4" },
  { token: "chart-5", label: "--chart-5" },
] as const;

const SIDEBAR_TOKENS = [
  { token: "sidebar", label: "--sidebar" },
  { token: "sidebar-foreground", label: "--sidebar-foreground" },
  { token: "sidebar-primary", label: "--sidebar-primary" },
  {
    token: "sidebar-primary-foreground",
    label: "--sidebar-primary-foreground",
  },
  { token: "sidebar-accent", label: "--sidebar-accent" },
  { token: "sidebar-accent-foreground", label: "--sidebar-accent-foreground" },
  { token: "sidebar-border", label: "--sidebar-border" },
  { token: "sidebar-ring", label: "--sidebar-ring" },
] as const;

export function EditorPanel() {
  return (
    <aside className="flex flex-col flex-1 overflow-hidden">
      <ActionBar />

      <div className="flex-1 overflow-y-auto">
        <TokenSection title="Base Colors">
          {BASE_TOKENS.map(({ token, label }) => (
            <ColorRow key={token} token={token} label={label} />
          ))}
        </TokenSection>

        <TokenSection title="Brand Colors">
          {BRAND_TOKENS.map(({ token, label }) => (
            <ColorRow key={token} token={token} label={label} />
          ))}
        </TokenSection>

        <TokenSection title="Other Colors">
          {OTHER_TOKENS.map(({ token, label }) => (
            <ColorRow key={token} token={token} label={label} />
          ))}
        </TokenSection>

        <TokenSection title="Chart Colors" defaultOpen={false}>
          {CHART_TOKENS.map(({ token, label }) => (
            <ColorRow key={token} token={token} label={label} />
          ))}
        </TokenSection>

        <TokenSection title="Sidebar Colors" defaultOpen={false}>
          {SIDEBAR_TOKENS.map(({ token, label }) => (
            <ColorRow key={token} token={token} label={label} />
          ))}
        </TokenSection>

        <TokenSection title="Shape" defaultOpen={true}>
          <RadiusRow />
        </TokenSection>
      </div>
    </aside>
  );
}
