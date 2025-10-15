import { Link } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function NavBar({
  selectedProgram,
  selectedYear,
}: {
  selectedProgram: string;
  selectedYear: string;
}) {
  return (
    <>
      <NavigationMenu viewport={true}>
        <NavigationMenuList>
          <NavigationMenuItem className="flex gap-2 w-[9em] justify-center">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/">Welcome</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex gap-2 w-[9em] justify-center">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/program-selector">Select Program</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex gap-2 w-[9em] justify-center">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link
                to={
                  selectedProgram === "" && selectedYear === ""
                    ? "/program-selector"
                    : "/table-page"
                }
              >
                Analyze Courses
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <p className="hidden">
        sp:{selectedProgram}
        sy:{selectedYear}
      </p>
    </>
  );
}
