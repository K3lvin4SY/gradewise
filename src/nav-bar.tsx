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
  setSelectedProgram,
  setSelectedYear,
  selectedProgramOld,
  selectedYearOld,
  setSelectedProgramOld,
  setSelectedYearOld,
}: {
  selectedProgram: string;
  selectedYear: string;
  setSelectedProgram: React.Dispatch<React.SetStateAction<string>>;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
  selectedProgramOld: string;
  selectedYearOld: string;
  setSelectedProgramOld: React.Dispatch<React.SetStateAction<string>>;
  setSelectedYearOld: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <NavigationMenu viewport={true}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/">Welcome</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link
              to="/program-selector"
              onClick={() => {
                setSelectedProgramOld(
                  selectedProgram ? selectedProgram : selectedProgramOld
                );
                setSelectedYearOld(
                  selectedYear ? selectedYear : selectedYearOld
                );
                setSelectedProgram("");
                setSelectedYear("");
              }}
            >
              Select Program
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link
              to={
                selectedProgram === "" &&
                selectedYear === "" &&
                selectedProgramOld == "" &&
                selectedYearOld == ""
                  ? "/program-selector"
                  : "/table-page"
              }
              onClick={() => {
                if (selectedProgram === "" && selectedYear === "") {
                  setSelectedProgram(selectedProgramOld);
                  setSelectedYear(selectedYearOld);
                }
                setSelectedProgramOld("");
                setSelectedYearOld("");
              }}
            >
              Analyze Courses
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
