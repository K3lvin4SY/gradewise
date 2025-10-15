import type { CourseGrade } from "./models/CourseGrade";

function AverageGrade({ courses }: { courses: CourseGrade[] }) {
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
      Average Grade: {average.toFixed(2)}
    </span>
  );
}

export default AverageGrade;
