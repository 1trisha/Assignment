import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { SkyAutocompleteSearchFunctionFilter } from '@skyux/lookup';
import { SkyModalInstance } from '@skyux/modals';
import { Employee } from '../../Model/Employee';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent {
  group: FormGroup;
  // hardcoded skills binded with the lookup component
  public skills: any[] = [
    { name: 'Angular' },
    { name: 'C#' },
    { name: 'Dotnet' },
    { name: 'java' },
    { name: 'Mongo' },
    { name: 'node' }
  ];

  constructor(
    public instance: SkyModalInstance,
    //spread operator to copy value instead of reference
    { ...emp }: Employee,
    public mode: String
  ) {
    this.group = new FormGroup({
      name: new FormControl(emp.name, [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      skills: new FormControl(
        emp.skills?.map((skill) => {
          return { name: skill };
        })
      ),

      doj: new FormControl(emp.dateOfJoining, [
        Validators.required,
        forbiddenDateValidator()
      ]),
      experience: new FormControl(emp.experience, [
        Validators.required,
        negativeExpValidator()
      ])
    });
  }
  // ["palash","angular"]=>[{name:"Palash"}]
  public getSearchFilters(): SkyAutocompleteSearchFunctionFilter[] {
    return [
      (searchText: string, item: any): boolean => {
        const found = this.skills.find((option) => option === item.name);
        return !found;
      }
    ];
  }
  getDate(control: FormControl) {
    let currentdate: Date = new Date();
    if (control.value < currentdate) {
      return;
    }
  }
  get name() {
    return this.group.get('name');
  }

  get doj() {
    return this.group.get('doj');
  }

  get experience() {
    return this.group.get('experience');
  }
}

/** A hero's name can't match the given regular expression */
export function forbiddenDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let currentdate: Date = new Date();
    if (control.value > currentdate) {
      return {
        forbiddenDate: { value: control.value },
        message: 'Date should not exceed current date'
      };
    } else return null;
  };
}
export function negativeExpValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value < 0) {
      return {
        forbiddenExp: { value: control.value },
        message: 'Experience cannot be a negative value'
      };
    } else return null;
  };
}
