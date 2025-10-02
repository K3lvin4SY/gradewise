class CourseGrade {
  private name: string;
  private scope: number;
  private grade: string;
  private date: string;

  constructor(name: string, scope: number, grade: string, date: string) {
    this.name = name;
    this.scope = scope;
    this.grade = grade;
    this.date = date;
  }

  getRow(): string[] {
    return [this.name, this.scope.toString(), this.grade, this.date];
  }

  setGrade(newGrade: string): void {
    this.grade = newGrade;
  }

  setScope(newScope: number): void {
    this.scope = newScope;
  }
}

export { CourseGrade };
