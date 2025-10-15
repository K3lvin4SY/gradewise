import { useState } from "react";

import { ThemeProvider } from "./components/theme/theme-provider";
import { ThemeToggle } from "./components/theme/theme-toggle";
import { ThemeChooser } from "./components/theme/theme-chooser";
import { CourseGrade } from "./models/CourseGrade";
import { Link, Outlet } from "react-router-dom";
import { NavBar } from "./nav-bar";
import { parseLthProgramData } from "./program-selector";

function Layout() {
  const [lthCourses, setLthCourses] = useState<CourseGrade[]>([]);
  const [courses, setCoursesState] = useState<CourseGrade[]>(() => {
    const courseGradeData = window.sessionStorage.getItem("courses");
    if (!courseGradeData) return [];
    try {
      return CourseGrade.parse(courseGradeData);
    } catch (error) {
      console.warn(
        "Failed to parse course grade data from localStorage:",
        error
      );
      return [];
    }
  });
  const [selectedProgram, setSelectedProgramState] = useState<string>(
    window.sessionStorage.getItem("selectedProgram") || ""
  );
  const [selectedYear, setSelectedYearState] = useState<string>(
    window.sessionStorage.getItem("selectedYear") || ""
  );

  if (
    selectedProgram !== "" &&
    selectedYear !== "" &&
    lthCourses.length === 0
  ) {
    fetch(
      `https://api.lth.lu.se/lot/courses?programmeCode=${selectedProgram}&academicYearId=${selectedYear}`
    )
      .then((response) => response.json())
      .then((data) => {
        const lthGrades = parseLthProgramData(data);
        setLthCourses(lthGrades);
      })
      .catch((error) => {
        console.error("Error fetching lthCourses:", error);
      });
  }

  const setSelectedProgram: React.Dispatch<React.SetStateAction<string>> = (
    programOrUpdater
  ) => {
    const newProgram =
      typeof programOrUpdater === "function"
        ? programOrUpdater(selectedProgram)
        : programOrUpdater;

    window.sessionStorage.setItem("selectedProgram", newProgram);
    setSelectedProgramState(newProgram);
  };

  const setSelectedYear: React.Dispatch<React.SetStateAction<string>> = (
    yearOrUpdater
  ) => {
    const newYear =
      typeof yearOrUpdater === "function"
        ? yearOrUpdater(selectedYear)
        : yearOrUpdater;

    window.sessionStorage.setItem("selectedYear", newYear);
    setSelectedYearState(newYear);
  };

  const setCourses: React.Dispatch<React.SetStateAction<CourseGrade[]>> = (
    coursesOrUpdater
  ) => {
    const newCourses =
      typeof coursesOrUpdater === "function"
        ? coursesOrUpdater(courses)
        : coursesOrUpdater;

    window.sessionStorage.setItem("courses", JSON.stringify(newCourses));
    setCoursesState(coursesOrUpdater);
  };

  return (
    <ThemeProvider>
      <nav className="w-[80vw] mx-auto">
        <div className="my-4 flex items-center justify-between">
          <Link to="/">
            <h1 className="text-3xl font-bold text-center ">GradeWise</h1>
          </Link>
          <NavBar
            selectedProgram={selectedProgram}
            selectedYear={selectedYear}
          />{" "}
          {/* remove later? */}
          <div className="mr-4 flex gap-2">
            <ThemeChooser />
            <ThemeToggle />
          </div>
        </div>
      </nav>
      <div className="mx-[2em]">
        <Outlet
          context={{
            courses,
            setCourses,
            lthCourses,
            setLthCourses,
            selectedYear,
            setSelectedYear,
            selectedProgram,
            setSelectedProgram,
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export default Layout;
