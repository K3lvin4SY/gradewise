type CourseRowData = {
  code: string;
  name: string;
  credits: number;
  grade: string;
  year: number;
  periods: number[];
};

class CourseGrade {
  private readonly name: string;
  private readonly credits: number;
  private readonly grade: string;
  private readonly gradingScale: number;
  private readonly code?: string;
  private readonly year?: number;
  private readonly periods?: number[];
  private readonly entryRequirements?: number;

  constructor(
    name: string,
    credits: number,
    grade: string,
    gradingScale: number,
    code?: string,
    year?: number,
    periods?: number[],
    entryRequirements?: number
  ) {
    this.name = name;
    this.credits = credits;
    this.grade = grade;
    this.gradingScale = gradingScale;
    this.code = code;
    this.year = year;
    this.periods = periods;
    this.entryRequirements = entryRequirements;
  }

  getRow(): CourseRowData {
    return {
      code: this.code ? this.code : "",
      name: this.name,
      credits: this.credits,
      grade: this.grade,
      year: this.year ? this.year : 0,
      periods: this.periods ? this.periods : [],
    };
  }

  shouldBeGraded(): boolean {
    return this.gradingScale == 2;
  }

  getWeightedGrade(): number {
    if (!this.shouldBeGraded())
      throw new Error("Course should not have a weighted grade");

    const gradeValue = parseFloat(this.grade);
    if (isNaN(gradeValue)) return 0;

    return gradeValue * this.credits;
  }

  getCredits(): number {
    return this.shouldBeGraded() ? this.credits : 0;
  }

  getEntryRequirements(): number {
    return this.entryRequirements ? this.entryRequirements : 0;
  }
}

export { CourseGrade };
