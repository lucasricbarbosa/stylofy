import Link from "next/link";

export function HeaderLogo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5">
      <span
        className="brand-mark h-[22px] w-[22px] rounded-[7px] transition-opacity hover:opacity-80"
        style={{
          boxShadow:
            "inset 0 0 0 1px color-mix(in oklch, var(--foreground) 20%, transparent)",
        }}
      />
      <span className="text-[15px] font-medium tracking-[-0.01em]">
        Stylofy
      </span>
    </Link>
  );
}
