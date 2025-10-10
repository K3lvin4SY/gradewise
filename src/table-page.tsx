import { useState } from "react";
import { CourseGrade } from "./models/CourseGrade";
import ProgramSelector from "./program-selector";
import TranscriptLoader from "./transcript-loader";
import { Card, CardContent } from "./components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { ScrollArea } from "./components/ui/scroll-area";
import CoursePeriods from "./components/ui/course-periods";

function TablePage() {
  const [courses, setCourses] = useState<CourseGrade[]>([]);

  const [row, setRow] = useState({
    code: "",
    course: "",
    credits: "",
    grade: "",
    year: "",
    periods: "",
  });

  return (
    <Card className="w-full">
      <CardContent>
        <Table className="w-full overflow-y-auto ">
          <ScrollArea className="h-[80vh]">
            {tableHead}
            <TableBody>
              {courses.map((course) => (
                <TableRow
                  key={course.getRow().code}
                  className="hover:bg-muted/50"
                >
                  <TableCell className="text-left">
                    {course.getRow().code}
                  </TableCell>

                  <TableCell className="text-left">
                    <div className="truncate">
                      {course.getRow().name.length > 50
                        ? `${course.getRow().name.slice(0, 50)}...`
                        : course.getRow().name}
                    </div>
                  </TableCell>

                  <TableCell className="text-left">
                    {course.getRow().credits}
                  </TableCell>
                  <TableCell className="text-left">
                    {course.getRow().grade}
                  </TableCell>
                  <TableCell className="text-left">
                    {course.getRow().year}
                  </TableCell>
                  <TableCell className="text-left">
                    <CoursePeriods checkedPeriods={course.getRow().periods} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter className="sticky bottom-0 z-10 bg-card">
              <TableRow className="hover:bg-muted/0">
                <TableCell>
                  <Input placeholder={"CourseCode"} />
                </TableCell>

                <TableCell>
                  <Input
                    name="course"
                    placeholder="Course"
                    onChange={(e) => setRow({ ...row, course: e.target.value })}
                  />
                </TableCell>

                <TableCell>
                  <Input
                    placeholder={"Credits"}
                    onChange={(e) =>
                      setRow({ ...row, credits: e.target.value })
                    }
                  />
                </TableCell>

                <TableCell className="flex">
                  <Input
                    placeholder={"Grade"}
                    onChange={(e) => setRow({ ...row, grade: e.target.value })}
                  />
                </TableCell>

                <TableCell>
                  <Input
                    placeholder={"Year"}
                    onChange={(e) => setRow({ ...row, year: e.target.value })}
                  />
                </TableCell>

                <TableCell>
                  <Input
                    placeholder={"Periods"}
                    className="w-2/5"
                    onChange={(e) =>
                      setRow({ ...row, periods: e.target.value })
                    }
                  />
                  <Button
                    className="ml-2 w-3/5 text-chart-5 hover:text-chart-5/50 text-center "
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setCourses((prev) => [
                        ...prev,
                        new CourseGrade(
                          row.course,
                          Number(row.credits),
                          row.grade,
                          1,
                          row.code,
                          Number(row.year),
                          row.periods
                            ? row.periods
                                .split(",")
                                .map((p) => Number(p.trim()))
                            : [],
                          0
                        ),
                      ])
                    }
                  >
                    Add Course
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </ScrollArea>
        </Table>

        <div className="mt-4 flex gap-4">
          <ProgramSelector setCourseGrades={setCourses} />
          <TranscriptLoader setCourseGrades={setCourses} />
          <span>
            Average Grade:{" "}
            {(
              courses
                .map((course) => course.getWeightedGrade())
                .reduce((a, b) => a + b, 0) /
              courses
                .map((course) => course.getCredits())
                .reduce((a, b) => a + b, 0)
            ) // finish this later
              .toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

const tableHead = (
  <TableHeader className="sticky top-0 z-10 bg-card">
    <TableRow>
      <TableHead className="font-semibold">CourseCode</TableHead>
      <TableHead className="font-semibold">Course</TableHead>
      <TableHead className="font-semibold">Credits</TableHead>
      <TableHead className="font-semibold">Grade</TableHead>
      <TableHead className="font-semibold">Year</TableHead>
      <TableHead className="font-semibold">Periods</TableHead>
    </TableRow>
  </TableHeader>
);

export default TablePage;
