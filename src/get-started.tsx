import SplitText from "./components/animated/SplitText";
import { Button } from "./components/ui/button";
import { Link, useOutletContext } from "react-router-dom";
import type { OutletContext } from "./types";

function GetStarted() {
  const { selectedProgram, selectedYear, language } =
    useOutletContext<OutletContext>();

  const content = {
    en: {
      title: "Welcome to GradeWise",
      subtitle: "Calculate your average grade with ease",
      description:
        "This tool is designed specifically for LTH (Faculty of Engineering at Lund University) students to help you calculate and track your weighted average grade based on your course results.",
      getStarted: "Get Started",
    },
    sv: {
      title: "Välkommen till GradeWise",
      subtitle: "Beräkna ditt snittbetyg enkelt",
      description:
        "Detta verktyg är framtaget specifikt för LTH-studenter för att hjälpa dig att beräkna och följa ditt viktade medelbetyg baserat på dina kursresultat.",
      getStarted: "Kom igång",
    },
  };

  const text = content[language];

  return (
    <div className="flex flex-col items-center justify-center mt-[20vh] px-4">
      <SplitText
        key={text.title}
        text={text.title}
        className="text-6xl font-semibold text-center mb-4"
        delay={50}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
      />

      <SplitText
        key={text.subtitle}
        text={text.subtitle}
        className="text-2xl text-center text-muted-foreground mb-8"
        delay={80}
        duration={0.6}
        ease="power3.out"
        splitType="words"
        from={{ opacity: 0, y: 20 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
      />

      <p className="max-w-2xl text-lg text-center text-muted-foreground mb-10 leading-relaxed">
        {text.description}
      </p>

      <Button asChild className="py-6 px-8 text-lg font-bold rounded-lg">
        <Link
          to={
            selectedProgram === "" && selectedYear === ""
              ? "/programs"
              : "/table"
          }
        >
          {text.getStarted}
        </Link>
      </Button>
    </div>
  );
}

export default GetStarted;
