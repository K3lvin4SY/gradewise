import React from "react";

interface CoursePeriods {
  checkedPeriods: number[];
}

const CoursePeriods: React.FC<CoursePeriods> = ({ checkedPeriods }) => {
  const periods = [1, 2, 3, 4];

  return (
    <div className="flex gap-1">
      {periods.map((period) => {
        const isChecked = checkedPeriods.includes(period - 1);

        return (
          <div
            key={period}
            className={`
              w-6 h-6 border-3 border-dashed rounded-sm mx-0.25
              flex items-center justify-center font-bold
              ${
                isChecked
                  ? "bg-primary text-primary-foreground border-solid border-primary"
                  : "bg-transparent text-primary-foreground border-border"
              }
            `}
          >
            {period}
          </div>
        );
      })}
    </div>
  );
};

export default CoursePeriods;
