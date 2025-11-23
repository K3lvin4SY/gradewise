import * as React from "react";
import { IconCheck, IconSelector } from "@tabler/icons-react";

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
import { ScrollArea } from "../ui/scroll-area";
import type { Language } from "@/types";

type Theme = {
  name: string;
  value: string;
  new?: boolean;
};

const translations = {
  en: {
    selectTheme: "Select theme...",
    searchThemes: "Search themes...",
    noThemeFound: "No theme found.",
    themesCount: "themes",
    new: "New",
    default: "Default",
  },
  sv: {
    selectTheme: "Välj tema...",
    searchThemes: "Sök teman...",
    noThemeFound: "Inget tema hittades.",
    themesCount: "teman",
    new: "Nytt",
    default: "Standard",
  },
};

export function ThemeChooser({ language }: { language: Language }) {
  const [open, setOpen] = React.useState(false);
  const { theme, setTheme, effectiveColorMode } = useTheme();
  const t = translations[language];

  const themes: Theme[] = [
    {
      name: t.default,
      value: "default",
    },
    {
      name: "Quarth",
      value: "quarth",
    },
    {
      name: "Ocean Breeze",
      value: "ocean-breeze",
    },
    {
      name: "Bold Tech",
      value: "bold-tech",
    },
    {
      name: "Neo Brutalism",
      value: "neo-brutalism",
    },
    {
      name: "Elegant Luxury",
      value: "elegant-luxury",
    },
  ];

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
            <div className={`flex gap-1`}>
              <div
                key={0}
                className="w-3 h-3 rounded-full border border-border/50 bg-primary"
              />
              <div
                key={1}
                className="w-3 h-3 rounded-full border border-border/50 bg-accent"
              />
              <div
                key={2}
                className="w-3 h-3 rounded-full border border-border/50 bg-secondary"
              />
              <div
                key={3}
                className="w-3 h-3 rounded-full border border-border/50 bg-border"
              />
            </div>
            <span className="truncate">
              {selectedThemeData?.name || t.selectTheme}
            </span>
          </div>
          <IconSelector className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[280px] p-0">
        <Command>
          <CommandInput placeholder={t.searchThemes} />
          <CommandList>
            <ScrollArea>
              <CommandEmpty>{t.noThemeFound}</CommandEmpty>
              <CommandGroup>
                <div className="text-xs text-muted-foreground px-2 py-1.5 font-medium">
                  {themes.length} {t.themesCount}
                </div>
                {themes.map((themeItem) => (
                  <CommandItem
                    key={themeItem.value}
                    value={themeItem.value}
                    onSelect={handleThemeSelect}
                    className="flex items-center gap-3 px-3 py-2"
                  >
                    <div
                      className={`flex gap-1 ${themeItem.value} ${effectiveColorMode}`}
                    >
                      <div
                        key={0}
                        className="w-3 h-3 rounded-full border border-border/50 bg-primary"
                      />
                      <div
                        key={1}
                        className="w-3 h-3 rounded-full border border-border/50 bg-accent"
                      />
                      <div
                        key={2}
                        className="w-3 h-3 rounded-full border border-border/50 bg-secondary"
                      />
                      <div
                        key={3}
                        className="w-3 h-3 rounded-full border border-border/50 bg-border"
                      />
                    </div>
                    <span className="flex-1">{themeItem.name}</span>
                    {themeItem.new && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                        {t.new}
                      </span>
                    )}
                    <IconCheck
                      className={cn(
                        "ml-auto h-4 w-4",
                        theme === themeItem.value ? "opacity-100" : "opacity-0"
                      )}
                    />
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
