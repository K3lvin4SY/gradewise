import { useMemo, useState } from "react";
import type { CourseGrade } from "./models/CourseGrade";
import SplitText from "./components/animated/SplitText";
import { Button } from "./components/ui/button";
import { Link } from "react-router-dom";

function GetStarted() {
    const [courses, setCourses] = useState<CourseGrade[]>([]);

    const welcomeMessages = [
        "Welcome, academic achiever!",
        "Welcome, knowledge seeker!",
        "Welcome, future scholar!",
        "Welcome, grade chaser!",
        "Welcome, academic weapon!",
      ];
    
      const subMessages = [
        "Ready to analyze your academic performance?",
        "Ready to track your grade progress?",
        "Ready to dive into your academic data?",
        "Ready to unlock your grade insights?",
        "Ready to monitor your academic journey?",
        "Ready to decode your study performance?",
        "Ready to explore your grade patterns?",
        "Ready to master your academic metrics?",
      ];
    
      const randomWelcome = useMemo(
        () => welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)],
        []
      );
    
      const randomSubMessage = useMemo(
        () => subMessages[Math.floor(Math.random() * subMessages.length)],
        []
      );


    return (
        <div className="flex flex-col items-center justify-center mt-[27vh]">
        <SplitText
          text={randomWelcome}
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
        <br />
        <SplitText
          text={randomSubMessage}
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

        <Button asChild className="py-4 px-8 text-lg font-bold rounded-lg">
          <Link to="/table-page">Get Started</Link>
        </Button>
      </div>
  );
}

export default GetStarted;