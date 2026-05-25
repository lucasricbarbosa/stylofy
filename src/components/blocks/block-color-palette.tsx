export function BlockColorPalette() {
  return (
    <div className="w-full p-2 bg-background">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Color Palette</h2>
          <p className="text-muted-foreground">
            Theme CSS variable swatches — colors update automatically when you
            change the theme.
          </p>
        </div>

        {/* Primary Theme Colors */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Primary Theme Colors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch
              name="Background"
              token="bg-background"
              hex="#ffffff"
              needsBorder
            />
            <ColorSwatch
              name="Foreground"
              token="bg-foreground"
              hex="#0a0a0a"
            />
            <ColorSwatch name="Primary" token="bg-primary" hex="#171717" />
            <ColorSwatch
              name="Primary Foreground"
              token="bg-primary-foreground"
              hex="#fafafa"
              needsBorder
            />
          </div>
        </section>

        {/* Secondary & Accent Colors */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Secondary &amp; Accent Colors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch
              name="Secondary"
              token="bg-secondary"
              hex="#f5f5f5"
              needsBorder
            />
            <ColorSwatch
              name="Secondary Foreground"
              token="bg-secondary-foreground"
              hex="#171717"
            />
            <ColorSwatch
              name="Accent"
              token="bg-accent"
              hex="#f5f5f5"
              needsBorder
            />
            <ColorSwatch
              name="Accent Foreground"
              token="bg-accent-foreground"
              hex="#171717"
            />
          </div>
        </section>

        {/* UI Component Colors */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            UI Component Colors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch
              name="Card"
              token="bg-card"
              hex="#ffffff"
              needsBorder
            />
            <ColorSwatch
              name="Card Foreground"
              token="bg-card-foreground"
              hex="#0a0a0a"
            />
            <ColorSwatch
              name="Popover"
              token="bg-popover"
              hex="#ffffff"
              needsBorder
            />
            <ColorSwatch
              name="Popover Foreground"
              token="bg-popover-foreground"
              hex="#0a0a0a"
            />
            <ColorSwatch
              name="Muted"
              token="bg-muted"
              hex="#f5f5f5"
              needsBorder
            />
            <ColorSwatch
              name="Muted Foreground"
              token="bg-muted-foreground"
              hex="#737373"
            />
          </div>
        </section>

        {/* Utility & Form Colors */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Utility &amp; Form Colors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch
              name="Border"
              token="bg-border"
              hex="#e5e5e5"
              needsBorder
            />
            <ColorSwatch
              name="Input"
              token="bg-input"
              hex="#e5e5e5"
              needsBorder
            />
            <ColorSwatch name="Ring" token="bg-ring" hex="#a3a3a3" />
          </div>
        </section>

        {/* Status & Feedback Colors */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Status &amp; Feedback Colors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch
              name="Destructive"
              token="bg-destructive"
              hex="#ef4444"
            />
            <ColorSwatch
              name="Destructive Foreground"
              token="bg-destructive-foreground"
              hex="#ef4444"
            />
          </div>
        </section>

        {/* Chart & Visualization Colors */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Chart &amp; Visualization Colors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <ColorSwatch name="Chart 1" token="bg-chart-1" hex="#e76e50" />
            <ColorSwatch name="Chart 2" token="bg-chart-2" hex="#2a9d90" />
            <ColorSwatch name="Chart 3" token="bg-chart-3" hex="#274754" />
            <ColorSwatch name="Chart 4" token="bg-chart-4" hex="#e8c468" />
            <ColorSwatch name="Chart 5" token="bg-chart-5" hex="#f4a462" />
          </div>
        </section>

        {/* Sidebar Colors */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Sidebar Colors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch
              name="Sidebar"
              token="bg-sidebar"
              hex="#fafafa"
              needsBorder
            />
            <ColorSwatch
              name="Sidebar Foreground"
              token="bg-sidebar-foreground"
              hex="#0a0a0a"
            />
            <ColorSwatch
              name="Sidebar Primary"
              token="bg-sidebar-primary"
              hex="#171717"
            />
            <ColorSwatch
              name="Sidebar Primary FG"
              token="bg-sidebar-primary-foreground"
              hex="#fafafa"
              needsBorder
            />
            <ColorSwatch
              name="Sidebar Accent"
              token="bg-sidebar-accent"
              hex="#f5f5f5"
              needsBorder
            />
            <ColorSwatch
              name="Sidebar Accent FG"
              token="bg-sidebar-accent-foreground"
              hex="#171717"
            />
            <ColorSwatch
              name="Sidebar Border"
              token="bg-sidebar-border"
              hex="#e5e5e5"
              needsBorder
            />
            <ColorSwatch
              name="Sidebar Ring"
              token="bg-sidebar-ring"
              hex="#a3a3a3"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function ColorSwatch({
  name,
  token,
  hex,
  needsBorder = false,
}: {
  name: string;
  token: string;
  hex: string;
  needsBorder?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={`h-14 w-14 rounded-lg flex-shrink-0 ${token} ${
          needsBorder ? "border border-border" : ""
        }`}
      />
      <div className="min-w-0">
        <p className="font-medium text-foreground truncate">{name}</p>
        <p className="text-xs font-mono text-muted-foreground">{hex}</p>
      </div>
    </div>
  );
}
