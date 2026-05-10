import { HeaderLogo } from "./header-logo";
import { HeaderNav } from "./header-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="default-container flex h-14 items-center justify-between">
        <HeaderLogo />
        <HeaderNav />
      </div>
    </header>
  );
}
