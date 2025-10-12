"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

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
import type { CourseGrade } from "./models/CourseGrade";
import { Input } from "./components/ui/input";

export function InputSearch({ courses }: { courses: CourseGrade[] }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Input
          name="course"
          value={
            value
              ? courses.find((course) => course.getCode() === value)?.getName()
              : "Select course..."
          }
          placeholder="Course"
          onChange={(e) => setValue(e.target.value)}
          className="w-[200px] justify-between"
        />
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search courses..." />
          <CommandList>
            <CommandEmpty>No course found.</CommandEmpty>
            <CommandGroup>
              {courses.map((course) => (
                <CommandItem
                  key={course.getCode()}
                  value={course.getCode()}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === course.getCode() ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {course.getName()}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
