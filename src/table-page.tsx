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

function TablePage() {
  const [courses, setCourses] = useState<CourseGrade[]>([]);

  const [row, setRow] = useState({
    course: "",
    scope: "",
    grade: "",
    date: "",
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
                  key={course.getRow()[0]}
                  className="hover:bg-muted/50"
                >
                  <TableCell>{course.getRow()[0]}</TableCell>

                  <TableCell className="text-center"></TableCell>

                  <TableCell className="text-center">
                    {course.getRow()[1]}
                  </TableCell>
                  <TableCell className="text-center">
                    {course.getRow()[3]}
                  </TableCell>
                  <TableCell className="text-left">
                    {course.getRow()[2]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter className="relative sticky bottom-0 z-10 bg-card">
              <TableRow className="hover:bg-muted/0">
                <TableCell>
                  <Input
                    name="course"
                    placeholder="Course"
                    onChange={(e) => setRow({ ...row, course: e.target.value })}
                  />
                </TableCell>

                <TableCell>
                  <Input placeholder={"CourseCode"} />
                </TableCell>

                <TableCell>
                  <Input
                    placeholder={"Scope"}
                    onChange={(e) => setRow({ ...row, scope: e.target.value })}
                  />
                </TableCell>

                <TableCell>
                  <Input
                    placeholder={"Date"}
                    onChange={(e) => setRow({ ...row, date: e.target.value })}
                  />
                </TableCell>

                <TableCell className="flex">
                  <Input
                    className="w-2/5"
                    placeholder={"Grade"}
                    onChange={(e) => setRow({ ...row, grade: e.target.value })}
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
                          Number(row.scope),
                          row.grade,
                          row.date
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
        </div>
      </CardContent>
    </Card>
  );
}

const tableHead = (
  <TableHeader className="sticky top-0 z-10 bg-card">
    <TableRow>
      <TableHead className="font-semibold">Course</TableHead>
      <TableHead className="font-semibold text-center">CourseCode</TableHead>
      <TableHead className="font-semibold text-center">Scope</TableHead>
      <TableHead className="font-semibold text-center">Date</TableHead>
      <TableHead className="font-semibold text-left">Grade</TableHead>
    </TableRow>
  </TableHeader>
);

export default TablePage;
