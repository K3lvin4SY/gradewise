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
import {
  IconRowInsertBottom,
  IconTrash,
  IconEraser,
} from "@tabler/icons-react";
import AverageGrade from "./average-grade";
import { useOutletContext } from "react-router-dom";

type OutletContext = {
  courses: CourseGrade[];
  setCourses: React.Dispatch<React.SetStateAction<CourseGrade[]>>;
};

function TablePage() {
  const { courses, setCourses } = useOutletContext<OutletContext>();

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
        <div className="w-full overflow-hidden">
          <Table className="w-full table-fixed">{tableHead}</Table>

          <ScrollArea className="h-[calc(100vh-300px)] w-full overflow-x-hidden">
            <Table className="w-full table-fixed">
              <TableBody>
                {courses.map((course) => (
                  <TableRow
                    key={course.getCode()}
                    className="hover:bg-muted/50"
                  >
                    <TableCell className="text-center w-24">
                      {course.getCode()}
                    </TableCell>

                    <TableCell className="text-left">
                      <div className="truncate">{course.getName()}</div>
                    </TableCell>

                    <TableCell className="text-center w-22">
                      {course.getCredits()}
                    </TableCell>
                    <TableCell className="text-center w-20">
                      <Input
                        placeholder={
                          course.getGrade() ? course.getGrade() : "Grade"
                        }
                        onChange={(e) =>
                          setRow({
                            ...row,
                            grade: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell className="text-center w-18">
                      {course.getYear()}
                    </TableCell>
                    <TableCell className="text-center w-34">
                      <CoursePeriods checkedPeriods={course.getPeriods()} />
                    </TableCell>
                    <TableCell className="text-left w-16">
                      <Button
                        variant="destructive"
                        className="aspect-square w-[40px] h-[40px]"
                        onClick={() => handleDelete(course)}
                      >
                        <IconTrash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>

          <Table className="w-full table-fixed">
            <TableFooter className="bg-card border-t">
              <TableRow className="hover:bg-muted/0">
                <TableCell className="w-24">
                  <Input
                    value={row.code}
                    onChange={(e) => setRow({ ...row, code: e.target.value })}
                    placeholder="CourseCode"
                  />
                </TableCell>

                <TableCell>
                  <Input
                    name="course"
                    value={row.course}
                    placeholder="Course"
                    onChange={(e) => setRow({ ...row, course: e.target.value })}
                  />
                </TableCell>

                <TableCell className="w-22">
                  <Input
                    value={row.credits}
                    placeholder="Credits"
                    onChange={(e) =>
                      setRow({ ...row, credits: e.target.value })
                    }
                  />
                </TableCell>

                <TableCell className="w-20">
                  <Input
                    value={row.grade}
                    placeholder="Grade"
                    onChange={(e) => setRow({ ...row, grade: e.target.value })}
                  />
                </TableCell>

                <TableCell className="w-18">
                  <Input
                    value={row.year}
                    placeholder="Year"
                    onChange={(e) => setRow({ ...row, year: e.target.value })}
                  />
                </TableCell>

                <TableCell className="w-34">
                  <Input
                    value={row.periods}
                    placeholder="Periods"
                    onChange={(e) =>
                      setRow({ ...row, periods: e.target.value })
                    }
                  />
                </TableCell>
                <TableCell className="w-16">
                  <Button
                    className="aspect-square bg-chart-5 w-[40px] h-[40px]"
                    onClick={handleSubmit}
                  >
                    <IconRowInsertBottom />
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        <div className="mt-4 flex gap-4">
          <ProgramSelector setCourseGrades={setCourses} />
          <TranscriptLoader setCourseGrades={setCourses} />
          <Button variant="destructive" onClick={() => setCourses([])}>
            Clear <IconEraser />
          </Button>
          <AverageGrade courses={courses} />
        </div>
      </CardContent>
    </Card>
  );
}

const tableHead = (
  <TableHeader className="bg-card border-b">
    <TableRow className="hover:bg-muted/0 text-base">
      <TableHead className="font-semibold w-24">CourseCode</TableHead>
      <TableHead className="font-semibold">Course</TableHead>
      <TableHead className="font-semibold w-22 text-center">Credits</TableHead>
      <TableHead className="font-semibold w-20 text-center">Grade</TableHead>
      <TableHead className="font-semibold w-18 text-center">Year</TableHead>
      <TableHead className="font-semibold w-34 text-center">Periods</TableHead>
      <TableHead className="font-semibold w-16"></TableHead>
    </TableRow>
  </TableHeader>
);

export default TablePage;
