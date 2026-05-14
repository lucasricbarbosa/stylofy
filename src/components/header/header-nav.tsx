import { templates } from "@/utils/templates";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

const NAV_LINKS = [
  { label: "Playground", href: "/" },
  { label: "Export", href: "/" },
];

export function HeaderNav() {
  return (
    <nav className="hidden items-center gap-1 md:flex">
      {NAV_LINKS.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {label}
        </Link>
      ))}

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="rounded-full px-3 py-1.5 text-sm font-normal text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground h-auto bg-transparent">
              Templates
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[220px] p-1">
                {templates.map((t) => (
                  <li key={t.url}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={t.url}
                        className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {t.name}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
