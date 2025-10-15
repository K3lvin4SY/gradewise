import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CourseGrade } from "./models/CourseGrade";
import { ScrollArea } from "./components/ui/scroll-area";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { IconCheck, IconSelector } from "@tabler/icons-react";

type Option = { value: string; label: string };

type OutletContext = {
  courses: CourseGrade[];
  setCourses: React.Dispatch<React.SetStateAction<CourseGrade[]>>;
  lthCourses: CourseGrade[];
  setLthCourses: React.Dispatch<React.SetStateAction<CourseGrade[]>>;
  selectedProgram: string;
  setSelectedProgram: React.Dispatch<React.SetStateAction<string>>;
  selectedYear: string;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
};

function parseLthProgramData(courseData: any[]): CourseGrade[] {
  return courseData
    .map((course) => {
      const periods = course.timePlans[0]?.studyPeriods.filter(
        (item: null | any) => item !== null
      ).length;
      const startPeriod = course.timePlans[0]?.studyPeriods.findIndex(
        (item: null | any) => item !== null
      );
      return { ...course, periods, startPeriod };
    })
    .map(
      (course: any) =>
        new CourseGrade(
          course.name_en,
          course.credits,
          "",
          course.gradingScale === "TH" ? 2 : 1,
          course.courseCode,
          course.year,
          Array.from(
            { length: course.periods },
            (_, i) => course.startPeriod + i
          ),
          course.entryRequirements
        )
    )
    .filter(
      (course, index, self) =>
        index === self.findIndex((c) => c.getCode() === course.getCode())
    ); // duplicate courses with the same course code. remove the duplicate but keep the fist one.
}

function parseProgramData(data: any[]): CourseGrade[] {
  return data
    .filter((course) => course.choice === "mandatory")
    .map((course) => {
      const periods = course.timePlans[0]?.studyPeriods.filter(
        (item: null | any) => item !== null
      ).length;
      const startPeriod = course.timePlans[0]?.studyPeriods.findIndex(
        (item: null | any) => item !== null
      );
      return { ...course, periods, startPeriod };
    })
    .sort((a, b) => a.periods - b.periods)
    .sort((a, b) => a.startPeriod - b.startPeriod)
    .sort((a, b) => a.year - b.year)
    .map(
      (course: any) =>
        new CourseGrade(
          course.name_en,
          course.credits,
          "",
          course.gradingScale === "TH" ? 2 : 1,
          course.courseCode,
          course.year,
          Array.from(
            { length: course.periods },
            (_, i) => course.startPeriod + i
          ),
          course.entryRequirements,
          course.homePage_en
        )
    );
}

function ProgramSelector() {
  const { setCourses, setLthCourses, setSelectedProgram, setSelectedYear } =
    useOutletContext<OutletContext>();

  const [programOptions, setProgramOptions] = useState<Option[]>([]);
  const [yearOptions, setYearOptions] = useState<Option[]>([]);

  const [program, setProgram] = useState<string | undefined>(undefined);
  const [year, setYear] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  function handleSelect(event: React.FormEvent) {
    event.preventDefault();

    if (!program || !year) {
      alert("Please select both program and start year.");
      return;
    }

    fetch(
      `https://api.lth.lu.se/lot/courses?programmeCode=${program}&academicYearId=${year}`
    )
      .then((response) => response.json())
      .then((data) => {
        const grades = parseProgramData(data);
        const lthGrades = parseLthProgramData(data);
        console.log("Set course grades from program:", grades);
        setCourses(grades);
        setLthCourses(lthGrades);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });

    setSelectedProgram(program || "");
    setSelectedYear(year || "");

    navigate("/table-page");
  }

  function fetchOptions() {
    fetch("https://api.lth.lu.se/lot/courses/programmes?kull=false")
      .then((response) => response.json())
      .then((data) => {
        const programs = data.map((item: any) => ({
          value: item.programmeCode,
          label: item.programmeCode + " - " + item.programme_en,
        }));
        setProgramOptions(programs);
      });

    fetch("https://api.lth.lu.se/lot/courses/academic-years")
      .then((response) => response.json())
      .then((data) => {
        const years = data.map((item: any) => ({
          value: item.academicYearId,
          label: item.academicYearShort,
        }));
        setYearOptions(years);
      });
  }

  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <Card className="w-full max-w-lg mx-auto mt-[30vh]">
      <form onSubmit={handleSelect}>
        <CardContent>
          <div className="grid gap-4">
            <CardHeader>
              <CardTitle>Find program</CardTitle>
              <CardDescription>
                Select a program to get your courses.
              </CardDescription>
            </CardHeader>
            <div className="grid gap-3">
              <Combobox
                key="program"
                options={programOptions}
                type="program"
                value={program}
                onChange={setProgram}
              />
              <Combobox
                key="year"
                options={yearOptions}
                type="start year"
                value={year}
                onChange={setYear}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row justify-end">
          <Button className="" type="submit">
            Select
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default ProgramSelector;
export { parseLthProgramData };

type ComboBoxType = {
  options: Option[];
  type: string;
  value?: string;
  onChange?: (value: string) => void;
};
function Combobox({ options, type, value, onChange }: ComboBoxType) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(value || "");

  const setValue = (val: string) => {
    setInternalValue(val);
    onChange?.(val);
  };

  const currentValue = value || internalValue;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-[200px] max-w-[300px] justify-between"
        >
          <span className="truncate">
            {currentValue
              ? options.find((option) => option.value === currentValue)?.label
              : `Select ${type}...`}
          </span>
          <IconSelector className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${type}...`} />
          <CommandList>
            <ScrollArea>
              <CommandEmpty>No {type} found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue);
                      setOpen(false);
                    }}
                  >
                    <IconCheck
                      className={cn(
                        "mr-2 h-4 w-4",
                        currentValue === option.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
