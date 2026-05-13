import Link from "next/link";

export function HeaderLogo() {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <span className="font-bold text-base tracking-tight">Stylofy</span>
      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
        Colors
      </span>
    </Link>
  );
}
