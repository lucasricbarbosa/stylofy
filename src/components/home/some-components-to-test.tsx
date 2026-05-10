import { Button } from "../ui/button";

export function SomeComponentsToTest() {
  return (
    <section className="default-container py-24 pb-32">
      <div className="text-center mb-12">
        <h2 className="default-title mb-3">Test on real components</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Every element below reflects your current color choices in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Buttons preview */}
        <div className="col-span-1 md:col-span-3 flex flex-wrap gap-3 p-6 rounded-2xl border border-border bg-card">
          <Button>Primary Action</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
        </div>

        {/* Card preview */}
        <div className="col-span-1 md:col-span-2 p-6 rounded-2xl border border-border bg-card flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
              A
            </div>
            <div>
              <p className="font-semibold text-sm">Alex Johnson</p>
              <p className="text-xs text-muted-foreground">Product Designer</p>
            </div>
            <span className="ml-auto px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
              Active
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This card is using your primary, accent, and foreground colors. The avatar uses primary, the badge uses accent.
          </p>
          <div className="flex gap-2 pt-1">
            <Button size="sm">Connect</Button>
            <Button size="sm" variant="outline">Message</Button>
          </div>
        </div>

        {/* Stats preview */}
        <div className="flex flex-col gap-3">
          {[
            { label: "Active users", value: "12,430" },
            { label: "Conversions", value: "4.2%" },
            { label: "Revenue", value: "$84.2k" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex-1 p-4 rounded-xl border border-border bg-card flex flex-col justify-center gap-1"
            >
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-xl font-bold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        {/* Input preview */}
        <div className="col-span-1 md:col-span-3 p-6 rounded-2xl border border-border bg-card flex flex-col gap-4">
          <h3 className="font-semibold">Sign up for early access</h3>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              readOnly
            />
            <Button>Subscribe</Button>
          </div>
          <p className="text-xs text-muted-foreground">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
