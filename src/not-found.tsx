import SplitText from "./components/animated/SplitText";
import { Button } from "./components/ui/button";
import { Link, useOutletContext } from "react-router-dom";
import type { OutletContext } from "./types";

function NotFound() {
  const { language } = useOutletContext<OutletContext>();

  const text = {
    en: {
      title: "404",
      message: "Page Not Found",
      goHome: "Go to start",
    },
    sv: {
      title: "404",
      message: "Sidan hittades inte",
      goHome: "Gå till startsidan",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[27vh]">
      <SplitText
        key={text[language].title}
        text={text[language].title}
        className="text-7xl font-semibold text-center"
        delay={80}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
      />
      <div className="h-0" />
      <SplitText
        key={text[language].message}
        text={text[language].message}
        className="text-3xl text-center"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="words"
        from={{ opacity: 0, y: 20 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
      />
      <div className="h-6" />
      <Button asChild className="py-4 px-8 text-lg font-bold rounded-lg ">
        <Link to="/">{text[language].goHome}</Link>
      </Button>
    </div>
  );
}

export default NotFound;
