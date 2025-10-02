class CourseGrade {
  private code: string;
  private name: string;
  private points: number;
  private grade: number;

  constructor(code: string, name: string, points: number, grade: number) {
    this.code = code;
    this.name = name;
    this.points = points;
    this.grade = grade;
  }

  getRow(): string[] {
    return [
      this.code,
      this.name,
      this.points.toString(),
      this.grade.toString(),
    ];
  }

  setGrade(newGrade: number): void {
    this.grade = newGrade;
  }

  setPoints(newPoints: number): void {
    this.points = newPoints;
  }
}

export { CourseGrade };
