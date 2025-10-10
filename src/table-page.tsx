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
import { useState, type FormEvent } from "react";
import { IconRowInsertBottom, IconTrash } from "@tabler/icons-react";

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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setCourses((prev) => [
      ...prev,
      new CourseGrade(
        row.course,
        Number(row.credits),
        row.grade,
        2,
        row.code,
        Number(row.year),
        row.periods ? row.periods.split(",").map((p) => Number(p.trim())) : [],
        0
      ),
    ]);

    setRow({
      code: "",
      course: "",
      credits: "",
      grade: "",
      year: "",
      periods: "",
    });
  }

  function handleDelete(course: CourseGrade) {
    setCourses((courses) =>
      courses.filter((c) => c.getCode() !== course.getCode())
    );
  }

  return (
    <Card className="w-full">
      <CardContent>
        <Table className="w-full overflow-y-auto table-fixed">
          <ScrollArea className="h-[calc(100vh-210px)] pr-2">
            {tableHead}
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.getCode()} className="hover:bg-muted/50">
                  <TableCell className="text-left w-24">
                    {course.getCode()}
                  </TableCell>

                  <TableCell className="text-left">
                    <div className="truncate">
                      {course.getName().length > 50
                        ? `${course.getName().slice(0, 50)}...`
                        : course.getName()}
                    </div>
                  </TableCell>

                  <TableCell className="text-left w-16">
                    {course.getCredits()}
                  </TableCell>
                  <TableCell className="text-left w-24">
                    <Input
                      placeholder={
                        course.getGrade() ? course.getGrade() : "Grade"
                      }
                      onChange={(e) =>
                        setRow({
                          ...row,
                          credits: e.target.value,
                        })
                      }
                    ></Input>
                  </TableCell>
                  <TableCell className="text-left w-16">
                    {course.getYear()}
                  </TableCell>
                  <TableCell className="text-left w-24">
                    <CoursePeriods checkedPeriods={course.getPeriods()} />
                  </TableCell>
                  <TableCell className="text-left w-0">
                    <Button
                      className="aspect-square bg-destructive"
                      onClick={() => handleDelete(course)}
                    >
                      <IconTrash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter className="sticky bottom-0 z-10 bg-card">
              <TableRow className="hover:bg-muted/0">
                <TableCell className="w-24">
                  <Input
                    onChange={(e) => setRow({ ...row, code: e.target.value })}
                    placeholder={"CourseCode"}
                  />
                </TableCell>

                <TableCell className="">
                  <Input
                    name="course"
                    placeholder="Course"
                    onChange={(e) => setRow({ ...row, course: e.target.value })}
                  />
                </TableCell>

                <TableCell className="w-16">
                  <Input
                    placeholder={"Credits"}
                    onChange={(e) =>
                      setRow({ ...row, credits: e.target.value })
                    }
                  />
                </TableCell>

                <TableCell className="w-24">
                  <Input
                    placeholder={"Grade"}
                    onChange={(e) => setRow({ ...row, grade: e.target.value })}
                  />
                </TableCell>

                <TableCell className="w-16">
                  <Input
                    placeholder={"Year"}
                    onChange={(e) => setRow({ ...row, year: e.target.value })}
                  />
                </TableCell>

                <TableCell className="w-24">
                  <Input
                    placeholder={"Periods"}
                    onChange={(e) =>
                      setRow({ ...row, periods: e.target.value })
                    }
                  />
                </TableCell>
                <TableCell className="w-10">
                  <Button
                    className="aspect-square bg-chart-5"
                    onClick={handleSubmit}
                  >
                    <IconRowInsertBottom />
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
            {/*(
              courses
                .map((course) => course.getWeightedGrade())
                .reduce((a, b) => a + b, 0) /
              courses
                .map((course) => course.getCredits())
                .reduce((a, b) => a + b, 0)
            ) // finish this later
              .toFixed(2)*/}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

const tableHead = (
  <TableHeader className="sticky top-0 z-10 bg-card">
    <TableRow className="hover:bg-muted/0 text-base">
      <TableHead className="font-semibold">CourseCode</TableHead>
      <TableHead className="font-semibold">Course</TableHead>
      <TableHead className="font-semibold">Credits</TableHead>
      <TableHead className="font-semibold">Grade</TableHead>
      <TableHead className="font-semibold">Year</TableHead>
      <TableHead className="font-semibold">Periods</TableHead>
      <TableHead className="font-semibold"></TableHead>
    </TableRow>
  </TableHeader>
);

export default TablePage;
