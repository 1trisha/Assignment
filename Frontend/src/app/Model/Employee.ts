export class Employee {
  public id: string;
  public name: string;
  public dateOfJoining: string;
  public experience: number;
  public skills: Array<string>;

  constructor() {
    this.id = '';
    this.name = '';
    this.dateOfJoining = '';
    this.experience = 0;
    this.skills = [];
  }
}
