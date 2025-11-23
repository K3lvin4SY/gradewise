import { CourseGrade } from "./models/CourseGrade";
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
import { useEffect, useState, type FormEvent } from "react";
import {
  IconRowInsertBottom,
  IconTrash,
  IconEraser,
  IconAlertCircle,
} from "@tabler/icons-react";
import AverageGrade from "./average-grade";
import { useOutletContext, useParams } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./components/ui/tooltip";
import { InputSearch } from "./input-search";
import type { OutletContext } from "./types";
import CoursePeriodsInput from "./components/ui/course-periods-input";

function TablePage() {
  const { courses, setCourses, lthCourses, language } =
    useOutletContext<OutletContext>();
  const { program, year } = useParams<{ program?: string; year?: string }>();
  const [selectedCourseName, setSelectedCourseName] = useState<
    string | CourseGrade
  >("");

  const [row, setRow] = useState({
    code: "",
    credits: "",
    grade: "",
    year: "",
    periods: [] as number[],
  });

  useEffect(() => {}, [program, year]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setCourses((prev) =>
      [
        ...prev,
        selectedCourseName instanceof CourseGrade
          ? new CourseGrade(
              selectedCourseName.getName("en"),
              selectedCourseName.getCredits(),
              row.grade,
              selectedCourseName.getGradingScale(),
              selectedCourseName.getCode(),
              selectedCourseName.getYear(),
              selectedCourseName.getPeriods(),
              selectedCourseName.getEntryRequirements(),
              selectedCourseName.getName("sv")
            )
          : new CourseGrade(
              selectedCourseName,
              Number(row.credits),
              row.grade,
              2,
              row.code,
              Number(row.year),
              row.periods,
              0
            ),
      ]
        .sort((a, b) => a.getPeriods().length - b.getPeriods().length)
        .sort((a, b) => a.getPeriods()[0] - b.getPeriods()[0])
        .sort((a, b) => a.getYear() - b.getYear())
    );

    setRow({
      code: "",
      credits: "",
      grade: "",
      year: "",
      periods: [],
    });
    setSelectedCourseName("");
  }

  function handleDelete(course: CourseGrade) {
    setCourses((courses) =>
      courses.filter((c) => c.getCode() !== course.getCode())
    );
  }

  function handleNewGrade(course: CourseGrade, grade: string) {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.getCode() !== course.getCode()) {
          return c;
        } else {
          return new CourseGrade(
            course.getName("en"),
            course.getCredits(),
            grade,
            course.getGradingScale(),
            course.getCode(),
            course.getYear(),
            course.getPeriods(),
            course.getEntryRequirements(),
            course.getWebsite(),
            course.getName("sv")
          );
        }
      })
    );
  }

  // UI translations
  const uiText = {
    en: {
      warning: "Warning",
      entryReq: "This course has ",
      entryReqCount: " entry requirements.",
      entryReqAdvice:
        "Please make sure you meet these requirements before enrolling.",
      entryReqMore:
        "You can find more information about the requirements in the course's ",
      website: "website",
      courseCode: "CourseCode",
      course: "Course",
      credits: "Credits",
      grade: "Grade",
      year: "Year",
      periods: "Periods",
      clearAll: "Clear all",
      typeOrSelect: "Type or select a course...",
    },
    sv: {
      warning: "Varning",
      entryReq: "Denna kurs har ",
      entryReqCount: " behörighetskrav.",
      entryReqAdvice:
        "Se till att du uppfyller dessa krav innan du registrerar dig.",
      entryReqMore: "Du kan hitta mer information om kraven på kursens ",
      website: "webbsida",
      courseCode: "Kurskod",
      course: "Kurs",
      credits: "Poäng",
      grade: "Betyg",
      year: "År",
      periods: "Perioder",
      clearAll: "Rensa allt",
      typeOrSelect: "Skriv eller välj en kurs...",
    },
  };
  const t = uiText[language] || uiText.en;

  // Table head localized
  const tableHead = (
    <TableHeader className="bg-card border-b">
      <TableRow className="hover:bg-muted/0 text-base">
        <TableHead className="font-semibold w-24">{t.courseCode}</TableHead>
        <TableHead className="font-semibold">{t.course}</TableHead>
        <TableHead className="font-semibold w-22 text-center">
          {t.credits}
        </TableHead>
        <TableHead className="font-semibold w-20 text-center">
          {t.grade}
        </TableHead>
        <TableHead className="font-semibold w-18 text-center">
          {t.year}
        </TableHead>
        <TableHead className="font-semibold w-34 text-center">
          {t.periods}
        </TableHead>
        <TableHead className="font-semibold w-16"></TableHead>
      </TableRow>
    </TableHeader>
  );

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
                      <div className="flex items-center gap-1">
                        {course.getCode()}
                        {course.getEntryRequirements() > 0 &&
                          !["G", "3", "4", "5"].includes(
                            course.getGrade().toUpperCase()
                          ) && (
                            <Tooltip>
                              <TooltipTrigger>
                                <IconAlertCircle className="w-[1.1em] h-[1.1em] text-amber-600 hover:scale-105" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <h1 className="text-lg font-bold text-amber-700">
                                  {t.warning}
                                </h1>
                                <p>
                                  {t.entryReq}
                                  {course.getEntryRequirements()}
                                  {t.entryReqCount}
                                </p>
                                <p>{t.entryReqAdvice}</p>
                                <p>
                                  {t.entryReqMore}
                                  <a
                                    href={course.getWebsite()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:underline-offset-2 text-blue-600"
                                  >
                                    {t.website}
                                  </a>
                                  .
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                      </div>
                    </TableCell>

                    <TableCell className="text-left">
                      <div className="flex items-center gap-1">
                        <div className="truncate">
                          {course.getName(language)}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-center w-22">
                      {course.getCredits()}
                    </TableCell>
                    <TableCell className="text-center w-20">
                      <Input
                        placeholder={
                          course.getGrade() ? course.getGrade() : t.grade
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.currentTarget.blur();
                          }
                        }}
                        onBlur={(e) => {
                          handleNewGrade(course, e.currentTarget.value);
                        }}
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
                    placeholder={t.courseCode}
                  />
                </TableCell>

                <TableCell>
                  <InputSearch
                    courses={lthCourses}
                    value={selectedCourseName}
                    onValueChange={setSelectedCourseName}
                    placeholder={t.typeOrSelect}
                    setRow={setRow}
                  />
                </TableCell>

                <TableCell className="w-22">
                  <Input
                    value={row.credits}
                    placeholder={t.credits}
                    onChange={(e) =>
                      setRow({ ...row, credits: e.target.value })
                    }
                  />
                </TableCell>

                <TableCell className="w-20">
                  <Input
                    value={row.grade}
                    placeholder={t.grade}
                    onChange={(e) => setRow({ ...row, grade: e.target.value })}
                  />
                </TableCell>

                <TableCell className="w-18">
                  <Input
                    value={row.year}
                    placeholder={t.year}
                    onChange={(e) => setRow({ ...row, year: e.target.value })}
                  />
                </TableCell>

                <TableCell className="w-34">
                  <CoursePeriodsInput
                    value={row.periods}
                    onChange={(periods) => setRow({ ...row, periods })}
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
          <TranscriptLoader setCourseGrades={setCourses} />

          <div className="ml-auto flex gap-4 items-center">
            <AverageGrade courses={courses} />

            <Button
              className="flex justify-end"
              variant="destructive"
              onClick={() => setCourses([])}
            >
              {t.clearAll} <IconEraser />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ...existing code...
export default TablePage;
