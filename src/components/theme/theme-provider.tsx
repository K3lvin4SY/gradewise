import { createContext, useContext, useEffect, useState } from "react";

type ColorMode = "dark" | "light" | "system";
type ThemeName = "default" | "quarth" | "bold-tech";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultColorMode?: ColorMode;
  defaultTheme?: ThemeName;
  storageKey?: string;
  themeStorageKey?: string;
};

type ThemeProviderState = {
  colorMode: ColorMode;
  theme: ThemeName;
  setColorMode: (mode: ColorMode) => void;
  setTheme: (theme: ThemeName) => void;
};

const initialState: ThemeProviderState = {
  colorMode: "system",
  theme: "quarth",
  setColorMode: () => null,
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultColorMode = "system",
  defaultTheme = "quarth",
  storageKey = "vite-ui-color-mode",
  themeStorageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [colorMode, setColorMode] = useState<ColorMode>(
    () => (localStorage.getItem(storageKey) as ColorMode) || defaultColorMode
  );
  const [theme, setTheme] = useState<ThemeName>(
    () => (localStorage.getItem(themeStorageKey) as ThemeName) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove all color modes and themes
    root.classList.remove("light", "dark", "default", "quarth", "bold-tech");

    // Add current theme
    root.classList.add(theme);

    // Handle color mode
    if (colorMode === "system") {
      const systemColorMode = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemColorMode);
      return;
    }

    root.classList.add(colorMode);
  }, [colorMode, theme]);

  const value = {
    colorMode,
    theme,
    setColorMode: (mode: ColorMode) => {
      localStorage.setItem(storageKey, mode);
      setColorMode(mode);
    },
    setTheme: (newTheme: ThemeName) => {
      localStorage.setItem(themeStorageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
