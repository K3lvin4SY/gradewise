import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./components/ui/button";
import { IconSearch } from "@tabler/icons-react";
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
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { CourseGrade } from "./models/CourseGrade";

type Option = { value: string; label: string };

interface PropType {
  setCourseGrades: (grades: CourseGrade[]) => void;
}
function ProgramSelector({ setCourseGrades }: PropType) {
  const [programOptions, setProgramOptions] = useState<Option[]>([]);
  const [yearOptions, setYearOptions] = useState<Option[]>([]);

  const [program, setProgram] = useState<string | undefined>(undefined);
  const [year, setYear] = useState<string | undefined>(undefined);

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();

    fetch(
      `https://api.lth.lu.se/lot/courses?programmeCode=${program}&academicYearId=${year}`
    )
      .then((response) => response.json())
      .then((data) => {
        const grades = parseProgramData(data);
        console.log("Set course grades from program:", grades);
        setCourseGrades(grades);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
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
            "", // No Grade
            "" // No Date
          )
      );
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={fetchOptions}>
          <IconSearch />
          Search program
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSearch}>
          <DialogHeader>
            <DialogTitle>Search program</DialogTitle>
            <DialogDescription>
              Search for a program to add to your list.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Program</Label>
              <Combobox
                key="program"
                options={programOptions}
                type="program"
                value={program}
                onChange={setProgram}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Academic Year</Label>
              <Combobox
                key="year"
                options={yearOptions}
                type="year"
                value={year}
                onChange={setYear}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Search</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ProgramSelector;

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
          className="w-[200px] justify-between"
        >
          {currentValue
            ? options.find((option) => option.value === currentValue)?.label
            : `Select ${type}...`}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${type}...`} />
          <CommandList>
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
                  <CheckIcon
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
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
