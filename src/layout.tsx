import { useMemo, useState } from "react";

import { ThemeProvider } from "./components/theme/theme-provider";
import { ThemeToggle } from "./components/theme/theme-toggle";
import { ThemeChooser } from "./components/theme/theme-chooser";
import type { CourseGrade } from "./models/CourseGrade";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  const [courses, setCourses] = useState<CourseGrade[]>([]);

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
      <Outlet context={{ courses, setCourses }} />
      <div className="flex flex-col items-center justify-center mt-[27vh]">
        <br />
      </div>
    </ThemeProvider>
  );
}

export default Layout;
