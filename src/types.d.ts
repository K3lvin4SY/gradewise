type Language = "en" | "sv";

type OutletContext = {
  courses: CourseGrade[];
  setCourses: React.Dispatch<React.SetStateAction<CourseGrade[]>>;
  lthCourses: CourseGrade[];
  setLthCourses: React.Dispatch<React.SetStateAction<CourseGrade[]>>;
  selectedProgram: string;
  setSelectedProgram: React.Dispatch<React.SetStateAction<string>>;
  selectedYear: string;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
  language: Language;
};
export { Language, OutletContext };
