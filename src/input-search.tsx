import * as React from "react";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { CourseGrade } from "./models/CourseGrade";
import { Input } from "./components/ui/input";

interface InputSearchProps {
  courses: CourseGrade[];
  value?: string | CourseGrade;
  onValueChange?: (value: string | CourseGrade) => void;
  placeholder?: string;
  setRow: React.Dispatch<
    React.SetStateAction<{
      code: string;
      credits: string;
      grade: string;
      year: string;
      periods: string;
    }>
  >;
}

export function InputSearch({
  courses,
  value,
  onValueChange,
  placeholder = "Search courses...",
  setRow,
}: InputSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const getDisplayValue = () => {
    if (typeof value === "string") {
      return value;
    } else if (value && typeof value === "object") {
      return value.getName();
    }
    return inputValue;
  };

  const getSelectedCourse = () => {
    if (typeof value === "object") {
      return value;
    }
    return courses.find(
      (course) => course.getCode() === value || course.getName() === value
    );
  };

  // Handles input changes in the course name. If the name is a perfect match of a course, it selects that course. Otherwise its just the string and it will be a manual course name.
  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);

    const matchingCourse = courses.find(
      (course) => course.getName().toLowerCase() === newValue.toLowerCase()
    );

    if (matchingCourse) {
      onValueChange?.(matchingCourse); // Select the matching course
      setRow({
        code: matchingCourse.getCode(),
        credits: matchingCourse.getCredits().toString(),
        grade: "",
        year: matchingCourse.getYear().toString(),
        periods: matchingCourse.getPeriods().join(", "),
      });
    } else {
      onValueChange?.(newValue); // Just set the string value (manual course name)
    }
  };

  // Handles selection when a course is clicked from the popover command list.
  const handleSelectCourse = (courseCode: string) => {
    const selectedCourse = courses.find(
      (course) => course.getCode() === courseCode
    );
    if (selectedCourse) {
      onValueChange?.(selectedCourse);
      setInputValue(selectedCourse.getName());
      setRow({
        code: selectedCourse.getCode(),
        credits: selectedCourse.getCredits().toString(),
        grade: "",
        year: selectedCourse.getYear().toString(),
        periods: selectedCourse.getPeriods().join(", "),
      });
    }
    setOpen(false); // close the popover
  };

  // Open the popover when input is on focus
  const handleInputFocus = () => {
    setOpen(true);
  };

  // Close the popover when input is on blur (unfocused)
  const handleInputBlur = (e: React.FocusEvent) => {
    if (!e.relatedTarget?.closest('[role="listbox"]')) {
      setOpen(false);
    }
  };

  return (
    <Popover open={open}>
      <div className="relative">
        <PopoverTrigger asChild>
          <button className="sr-only" tabIndex={-1} />
        </PopoverTrigger>

        <Input
          ref={inputRef}
          value={getDisplayValue()}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className="pr-8"
        />
      </div>

      <PopoverContent
        className="w-100 p-0"
        side="top"
        align="start"
        sideOffset={4}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Command>
          <CommandList>
            <CommandEmpty>No course found.</CommandEmpty>
            <CommandGroup>
              {courses
                .filter(
                  (course) =>
                    course
                      .getName()
                      .toLowerCase()
                      .includes(
                        typeof value === "string"
                          ? value.toLowerCase()
                          : inputValue.toLowerCase()
                      ) ||
                    course
                      .getCode()
                      .toLowerCase()
                      .includes(
                        typeof value === "string"
                          ? value.toLowerCase()
                          : inputValue.toLowerCase()
                      )
                )
                .map((course) => {
                  const selectedCourse = getSelectedCourse();
                  const isSelected =
                    selectedCourse?.getCode() === course.getCode();

                  return (
                    <CommandItem
                      key={course.getCode()}
                      value={course.getCode()}
                      onSelect={() => handleSelectCourse(course.getCode())}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col">
                        <span>{course.getName()}</span>
                        <span className="text-xs text-muted-foreground">
                          {course.getCode()}
                        </span>
                      </div>
                    </CommandItem>
                  );
                })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
