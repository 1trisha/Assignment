import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Model/Employee';
import { AppStringLoader } from './configLoader.service';

@Injectable()
export class EmployeeService {
  private baseUrl = '';

  constructor(
    private httpClient: HttpClient,
    appConfigService: AppStringLoader
  ) {
    this.baseUrl = appConfigService.loadedConfig.baseUrl;
  }

  public GetEmployees(): Observable<Array<Employee>> {
    return this.httpClient.get<Array<Employee>>(`${this.baseUrl}/employees`);
  }
  // public AddEmployees(emp: Employee): Observable<Employee> {
  //   return this.httpClient.post<Employee>(this.baseUrl, emp);
  // }
  public AddEmployees(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(
      `${this.baseUrl}/employees`,
      employee
    );
  }
  public DeleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/employees/${id}`);
  }

  public EditEmployee(employee: Employee): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/employees`, employee);
  }
}
