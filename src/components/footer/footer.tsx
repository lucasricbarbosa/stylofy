import Link from "next/link";

const LINKS = [
  { label: "Templates", href: "#templates" },
  { label: "Components", href: "/template/components-showcase" },
  { label: "Export", href: "/" },
];

export function Footer() {
  return (
    <footer className="relative z-[2] border-t border-border pb-36">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-10 py-8 max-md:flex-col max-md:gap-4 max-md:px-6">
        <div className="inline-flex items-center gap-2.5 text-muted-foreground">
          <span
            className="brand-mark h-4 w-4 rounded-[5px]"
            style={{
              boxShadow:
                "inset 0 0 0 1px color-mix(in oklch, var(--foreground) 15%, transparent)",
            }}
          />
          <span className="font-mono text-[12px]">
            stylofy · made for color obsessives
          </span>
        </div>

        <div className="flex gap-6">
          {LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="font-mono text-[12px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
