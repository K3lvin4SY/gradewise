import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { useTheme } from "@/components/theme/theme-provider";

type Theme = {
  name: string;
  value: string;
  colors: string[];
  new?: boolean;
};

const themes: Theme[] = [
  {
    name: "Default",
    value: "default",
    colors: ["#f8fafc", "#64748b", "#0f172a", "#94a3b8"],
  },
  {
    name: "Quarth",
    value: "quarth",
    colors: ["#1e40af", "#3b82f6", "#dbeafe", "#60a5fa"],
  },
  {
    name: "Bold Tech",
    value: "bold-tech",
    colors: ["#7c3aed", "#a855f7", "#f3e8ff", "#c084fc"],
  },
  {
    name: "Neo Brutalism",
    value: "neo-brutalism",
    colors: ["#ff6666", "#3399ff", "#ffff33", "#ffffff"],
  },
  {
    name: "Elegant Luxury",
    value: "elegant-luxury",
    colors: ["#b91c1c", "#b45309", "#92400e", "#44403c"],
  },
];

export function ThemeChooser() {
  const [open, setOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  const handleThemeSelect = (themeValue: string) => {
    setTheme(themeValue as any);
    setOpen(false);
  };

  const selectedThemeData = themes.find((t) => t.value === theme);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-[200px] justify-between"
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {selectedThemeData?.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full border border-border/50"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="truncate">
              {selectedThemeData?.name || "Select theme..."}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[280px] p-0">
        <Command>
          <CommandInput placeholder="Search themes..." />
          <CommandList>
            <CommandEmpty>No theme found.</CommandEmpty>
            <CommandGroup>
              <div className="text-xs text-muted-foreground px-2 py-1.5 font-medium">
                {themes.length} themes
              </div>
              {themes.map((themeItem) => (
                <CommandItem
                  key={themeItem.value}
                  value={themeItem.value}
                  onSelect={handleThemeSelect}
                  className="flex items-center gap-3 px-3 py-2"
                >
                  <div className="flex gap-1">
                    {themeItem.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-3 h-3 rounded-full border border-border/50"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="flex-1">{themeItem.name}</span>
                  {themeItem.new && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                      New
                    </span>
                  )}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      theme === themeItem.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
