import { templates } from "@/utils/templates";
import Link from "next/link";
import { CustomLink } from "../custom-link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

export function HeaderNav() {
  return (
    <nav className="flex items-center gap-4">
      <CustomLink className="text-sm" label="Docs" url="/" />
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-normal flex cursor-pointer items-baseline px-2.5 py-1 h-fit">
              Templates
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[220px]">
              {templates.map((template) => (
                <DropdownItem
                  key={template.url}
                  name={template.name}
                  url={template.url}
                />
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

interface DropdownItemProps {
  url: string;
  name: string;
}

function DropdownItem({ url, name }: DropdownItemProps) {
  return (
    <NavigationMenuLink asChild>
      <Link href={url} className="block px-3 py-2 rounded hover:bg-accent">
        {name}
      </Link>
    </NavigationMenuLink>
  );
}
