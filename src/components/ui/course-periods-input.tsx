import React from "react";

interface CoursePeriodsInputProps {
  value: number[];
  onChange: (periods: number[]) => void;
}

const periods = [1, 2, 3, 4];

const CoursePeriodsInput: React.FC<CoursePeriodsInputProps> = ({
  value,
  onChange,
}) => {
  const handleToggle = (period: number) => {
    const idx = value.indexOf(period - 1);
    let newPeriods;
    if (idx > -1) {
      // Remove
      newPeriods = value.filter((p) => p !== period - 1);
    } else {
      // Add
      newPeriods = [...value, period - 1].sort();
    }
    onChange(newPeriods);
  };

  return (
    <div className="flex gap-1">
      {periods.map((period) => {
        const isChecked = value.includes(period - 1);
        return (
          <button
            type="button"
            key={period}
            className={`w-6 h-6 border-3 border-dashed rounded-sm mx-0.25 flex items-center hover:cursor-pointer justify-center font-bold transition-colors focus:outline-none ${
              isChecked
                ? "bg-primary text-primary-foreground border-solid border-primary"
                : "bg-transparent text-base-foreground border-border"
            }`}
            aria-pressed={isChecked}
            onClick={() => handleToggle(period)}
          >
            {period}
          </button>
        );
      })}
    </div>
  );
};

export default CoursePeriodsInput;
