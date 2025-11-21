class CourseGrade {
  private readonly name: string;
  private readonly credits: number;
  private readonly grade: string;
  private readonly gradingScale: number;
  private readonly code?: string;
  private readonly year?: number;
  private readonly periods?: number[];
  private readonly entryRequirements?: number;
  private readonly website?: string;

  constructor(
    name: string,
    credits: number,
    grade: string,
    gradingScale: number,
    code?: string,
    year?: number,
    periods?: number[],
    entryRequirements?: number,
    website?: string
  ) {
    this.name = name;
    this.credits = credits;
    this.grade = grade;
    this.gradingScale = gradingScale;
    this.code = code;
    this.year = year;
    this.periods = periods;
    this.entryRequirements = entryRequirements;
    this.website = website;
  }

  getCode(): string {
    return this.code ? this.code : "";
  }

  getGrade(): string {
    return this.grade;
  }
  getYear(): number {
    return this.year ? this.year : 0;
  }

  getPeriods(): number[] {
    return this.periods ? this.periods : [];
  }

  getName(): string {
    return this.name;
  }

  shouldBeGraded(): boolean {
    return !isNaN(Number(this.grade)) && Number(this.grade) !== 0;
  }

  getWeightedGrade(): number {
    if (!this.shouldBeGraded())
      throw new Error("Course should not have a weighted grade");

    const gradeValue = parseFloat(this.grade);
    if (isNaN(gradeValue)) return 0;

    return gradeValue * this.credits;
  }

  getCredits(): number {
    return this.credits ? this.credits : 0;
  }

  getEntryRequirements(): number {
    return this.entryRequirements ? this.entryRequirements : 0;
  }

  getGradingScale(): number {
    return this.gradingScale;
  }

  getWebsite(): string | undefined {
    return this.website;
  }

  static parse(courseGradeData: string): CourseGrade[] {
    try {
      const data = JSON.parse(courseGradeData);
      return data.map((item: any) => {
        return new CourseGrade(
          item.name,
          item.credits,
          item.grade,
          item.gradingScale,
          item.code,
          item.year,
          item.periods,
          item.entryRequirements,
          item.website
        );
      });
    } catch (error) {
      console.error("Failed to parse course grade data:", error);
      return [];
    }
  }
}

export { CourseGrade };
