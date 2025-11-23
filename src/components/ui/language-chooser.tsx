import { IconLanguage } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import type { Language } from "@/types";

export function LanguageChooser({
  language,
  setLanguage,
}: {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}) {
  const toggleLanguage = () => {
    if (language === "en") {
      setLanguage("sv");
    } else {
      setLanguage("en");
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleLanguage}
      className="relative h-9 w-14 px-2"
    >
      <IconLanguage className="h-[1.2rem] w-[1.2rem]" />
      <span>{language === "en" ? "EN" : "SV"}</span>
    </Button>
  );
}
