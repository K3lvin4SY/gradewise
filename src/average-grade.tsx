import { useOutletContext } from "react-router-dom";
import type { CourseGrade } from "./models/CourseGrade";
import type { OutletContext } from "./types";

function AverageGrade({ courses }: { courses: CourseGrade[] }) {
  const { language } = useOutletContext<OutletContext>();
  const totalWeightedGrades = courses
    .filter((course) => course.shouldBeGraded())
    .map((course) => course.getWeightedGrade())
    .reduce((a, b) => a + b, 0);

  const totalCredits = courses
    .filter((course) => course.shouldBeGraded())
    .map((course) => Number(course.getCredits()))
    .reduce((a, b) => a + b, 0);

  const average = totalCredits > 0 ? totalWeightedGrades / totalCredits : 0;

  return (
    <span className="justify-self-end">
      {language === "en" ? "Average Grade" : "Genomsnittligt betyg"}:{" "}
      {average.toFixed(2)}
    </span>
  );
}

export default AverageGrade;
