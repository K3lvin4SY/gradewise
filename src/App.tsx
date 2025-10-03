import "./App.css";

import { useState } from "react";

import { ThemeProvider } from "./theme-provider";
import { ThemeToggle } from "./theme-toggle";
import type { CourseGrade } from "./models/CourseGrade";

function App() {
  const [courses, setCourses] = useState<CourseGrade[]>([]);

  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 max-w-5xl mx-auto px-4 mt-4 mb-6">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <h1 className="text-3xl font-bold text-center ">Courses</h1>
      </div>
    </ThemeProvider>
  );
}

export default App;
