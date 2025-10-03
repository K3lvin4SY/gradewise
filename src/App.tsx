import "./App.css";

import { useState } from "react";

import { ThemeProvider } from "./theme-provider";
import type { CourseGrade } from "./models/CourseGrade";
import TranscriptLoader from "./transcript-loader";

function App() {
  const [courses, setCourses] = useState<CourseGrade[]>([]);

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 max-w-5xl mx-auto px-4 mt-4 mb-6">
        <h1 className="text-3xl font-bold text-center ">Courses</h1>
        <TranscriptLoader setCourseGrades={setCourses} />
      </div>
    </ThemeProvider>
  );
}

export default App;
