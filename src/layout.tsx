import { useState } from "react";

import { ThemeProvider } from "./components/theme/theme-provider";
import { ThemeToggle } from "./components/theme/theme-toggle";
import { ThemeChooser } from "./components/theme/theme-chooser";
import { CourseGrade } from "./models/CourseGrade";
import { Link, Outlet } from "react-router-dom";

function Layout() {
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

  const setCourses: React.Dispatch<React.SetStateAction<CourseGrade[]>> = (
    courses
  ) => {
    window.sessionStorage.setItem("courses", JSON.stringify(courses));
    setCoursesState(courses);
  };

  return (
    <ThemeProvider>
      <nav className="w-[80vw] mx-auto">
        <div className="my-4 flex items-center justify-between">
          <Link to="/">
            <h1 className="text-3xl font-bold text-center ">GradeWise</h1>
          </Link>
          <div className="mr-4 flex gap-2">
            <ThemeChooser />
            <ThemeToggle />
          </div>
        </div>
      </nav>
      <div className="mx-[2em]">
        <Outlet context={{ courses, setCourses }} />
      </div>
    </ThemeProvider>
  );
}

export default Layout;
