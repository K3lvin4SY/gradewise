import SplitText from "./components/animated/SplitText";
import { Button } from "./components/ui/button";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center mt-[27vh]">
      <SplitText
        text={"404"}
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
        text={"Page Not Found"}
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
      <br />
      <Button asChild className="py-4 px-8 text-lg font-bold rounded-lg ">
        <Link to="/">Go to start</Link>
      </Button>
    </div>
  );
}

export default NotFound;
