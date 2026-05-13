import { HeaderLogo } from "./header-logo";
import { HeaderNav } from "./header-nav";

export function Header() {
  return (
    <header className="sticky bg-background border-b top-0 z-50">
      <div className="default-container flex h-14 items-center justify-between">
        <HeaderLogo />
        <HeaderNav />
      </div>
    </header>
  );
}
