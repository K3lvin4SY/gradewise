import { useOutletContext } from "react-router-dom";
import { Button } from "./components/ui/button";
import { CourseGrade } from "./models/CourseGrade";
import { IconFileUpload, IconHelp, IconLoader2 } from "@tabler/icons-react";
import { useRef, useState } from "react";
import type { OutletContext } from "./types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./components/ui/tooltip";

interface PropType {
  setCourseGrades: React.Dispatch<React.SetStateAction<CourseGrade[]>>;
}

/**
 * A React component that provides a file upload interface for transcript files.
 *
 * @param setCourseGrades - Callback function that receives an array of CourseGrade objects
 *                         when a transcript is successfully loaded and parsed
 *
 * @returns A JSX element containing a hidden file input and an upload button.
 *          The button triggers the file selection dialog and displays loading state
 *          during transcript processing.
 *
 */
function TranscriptLoader({ setCourseGrades }: PropType) {
  const { language } = useOutletContext<OutletContext>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selction, upload to API and parse the response
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const importedCourseGrades = await loadTranscript(file);
      console.log("Transcript loaded successfully:", importedCourseGrades);
      setCourseGrades((courseGrades) => {
        return [
          ...courseGrades.map((cg) => {
            const icg = importedCourseGrades.find(
              (icg) => icg.getCode() === cg.getCode()
            );
            if (icg) {
              return new CourseGrade(
                cg.getName("en"),
                cg.getCredits(),
                icg.getGrade(),
                cg.getGradingScale(),
                cg.getCode(),
                cg.getYear(),
                cg.getPeriods(),
                cg.getEntryRequirements(),
                cg.getWebsite(),
                cg.getName("sv")
              );
            }
            return cg;
          }),
          ...importedCourseGrades.filter(
            (icg) => !courseGrades.find((cg) => cg.getCode() === icg.getCode())
          ),
        ];
      });
    } catch (error) {
      console.error("Failed to load transcript:", error);
      alert(
        `Failed to load transcript: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
      // Reset file input (same file can be selected again)
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="gap-2 flex flex-row items-center">
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.pdf"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <IconLoader2 className="animate-spin" />
        ) : (
          <IconFileUpload />
        )}
        {isLoading
          ? language === "en"
            ? "Loading..."
            : "Laddar..."
          : language === "en"
          ? "Upload National Ladok Transcript"
          : "Ladda upp nationellt Ladok intyg"}
      </Button>
      <Tooltip>
        <TooltipTrigger>
          <IconHelp />
        </TooltipTrigger>
        <TooltipContent>
          {language === "en"
            ? "Upload your national Ladok transcript in .pdf format to automatically fill in your completed courses."
            : "Ladda upp ditt nationella Ladok intyg i .pdf format för att automatiskt fylla i dina genomförda kurser."}
          <br />
          {language === "en"
            ? "You can create the transcript in Ladok by following this link:"
            : "Du kan skapa intyget i Ladok genom att följa denna länk:"}
          <br />
          <a
            href="https://www.student.ladok.se/student/app/studentwebb/intyg/skapa-intyg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            https://www.student.ladok.se/student/app/studentwebb/intyg/skapa-intyg
          </a>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export default TranscriptLoader;

/**
 * Loads and parses a transcript file by uploading it to a remote API endpoint.
 *
 * @param file - The transcript file to be uploaded and parsed
 * @returns A Promise that resolves to an array of CourseGrade objects representing the parsed transcript data
 * @throws {Error} When the API request fails or when transcript parsing encounters an error
 *
 */
async function loadTranscript(file: File): Promise<CourseGrade[]> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      "https://gradewise.donkare.se/api/parse-transcript",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const parsedResponse = await response.json();
    const data = parsedResponse.data as Array<{
      code: string;
      name: string;
      credits: number;
      grade: string;
      gradingScale: number;
    }>;

    return data.map(
      (course) =>
        new CourseGrade(
          course.name,
          course.credits,
          course.grade,
          course.gradingScale,
          course.code,
          undefined,
          undefined,
          undefined,
          undefined,
          course.name
        )
    );
  } catch (error) {
    throw new Error(
      `Failed to parse transcript: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
