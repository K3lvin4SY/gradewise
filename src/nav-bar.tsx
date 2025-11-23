import { Link } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import type { Language } from "./types";

export function NavBar({
  selectedProgram,
  selectedYear,
  language,
}: {
  selectedProgram: string;
  selectedYear: string;
  language: Language;
}) {
  const content = {
    en: {
      welcome: "Welcome",
      selectProgram: "Select Program",
      analyzeCourses: "Analyze Courses",
    },
    sv: {
      welcome: "Välkommen",
      selectProgram: "Välj Program",
      analyzeCourses: "Analysera Kurser",
    },
  };

  const text = content[language];

  return (
    <>
      <NavigationMenu viewport={true}>
        <NavigationMenuList>
          <NavigationMenuItem className="flex gap-2 w-[9em] justify-center">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/">{text.welcome}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex gap-2 w-[9em] justify-center">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/programs">{text.selectProgram}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex gap-2 w-[9em] justify-center">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/table">{text.analyzeCourses}</Link>
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
