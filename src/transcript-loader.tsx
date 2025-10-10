import { Loader2Icon } from "lucide-react";
import { Button } from "./components/ui/button";
import { CourseGrade } from "./models/CourseGrade";
import { IconFileUpload } from "@tabler/icons-react";
import { useRef, useState } from "react";

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
                cg.getName(),
                cg.getCredits(),
                icg.getGrade(),
                cg.getGradingScale(),
                cg.getCode(),
                cg.getYear(),
                cg.getPeriods(),
                cg.getEntryRequirements()
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
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.pdf"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Button onClick={handleButtonClick} disabled={isLoading}>
        {isLoading ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <IconFileUpload />
        )}
        {isLoading ? "Loading..." : "Upload Transcript"}
      </Button>
    </>
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
      "https://4000.dev.donkare.se/api/parse-transcript",
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
          course.code
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
