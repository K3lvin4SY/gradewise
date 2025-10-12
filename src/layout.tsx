import { useState, useEffect } from "react";

import { ThemeProvider } from "./components/theme/theme-provider";
import { ThemeToggle } from "./components/theme/theme-toggle";
import { ThemeChooser } from "./components/theme/theme-chooser";
import { CourseGrade } from "./models/CourseGrade";
import { Link, Outlet } from "react-router-dom";
import { Button } from "./components/ui/button";
import { NavBar } from "./nav-bar";

async function getLthCourses(): Promise<CourseGrade[]> {
  const response = await fetch("https://api.lth.lu.se/lot/courses");
  if (!response.ok) {
    throw new Error("Failed to fetch LTH courses");
  }
  const courseData: any[] = await response.json();
  return courseData
    .map((course) => {
      const periods = course.timePlans[0]?.studyPeriods.filter(
        (item: null | any) => item !== null
      ).length;
      const startPeriod = course.timePlans[0]?.studyPeriods.findIndex(
        (item: null | any) => item !== null
      );
      return { ...course, periods, startPeriod };
    })
    .map(
      (course: any) =>
        new CourseGrade(
          course.name_en,
          course.credits,
          "",
          course.gradingScale === "TH" ? 2 : 1,
          course.courseCode,
          course.year,
          Array.from(
            { length: course.periods },
            (_, i) => course.startPeriod + i
          ),
          course.entryRequirements
        )
    );
}

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

  useEffect(() => {
    getLthCourses()
      .then(setLthCourses)
      .catch((error) => {
        console.error("Failed to fetch LTH courses:", error);
      });
  }, []);

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
          <NavBar /> {/* remove later? */}
          <div className="mr-4 flex gap-2">
            <ThemeChooser />
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                console.log(courses);
                window.sessionStorage.setItem(
                  "courses",
                  JSON.stringify(courses)
                );
              }}
              className="relative h-9 w-9"
            >
              T<span className="sr-only">Test button</span>
            </Button>
          </div>
        </div>
      </nav>
      <div className="mx-[2em]">
        <Outlet context={{ courses, setCourses, lthCourses }} />
      </div>
    </ThemeProvider>
  );
}

export default Layout;
