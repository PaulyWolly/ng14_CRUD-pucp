import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EmployeeInterface } from '../_models/employee.interface';

@Injectable({
 providedIn: 'root'
})
export class DataService {

 // Main api url to call api
 uri = 'http://localhost:5000/employees';

 constructor(private http: HttpClient) { }

 // To Get The List Of Employee
 getEmployees() {
  return this.http.get<EmployeeInterface>(`${this.uri}`);
 }

 // To Get Employee Details For Single Record Using Id
 getEmployeeById(empid: string) {
  return this.http.get(`${this.uri}/editEmployee/${empid}`);
 }

 // To Updated Specific Employee
 updateEmployee(id: string, body: any) {
  return this.http.post(`${this.uri}/updateEmployee/${id}`, body);
 }

 // To Create/Add New Employee
 addEmployee(body: any ) {
  return this.http.post(`${this.uri}/addEmployee`, body);
 }

 // To Delete Any Employee
 deleteEmployee(empid: string) {
  return this.http.get(`${this.uri}/deleteEmployee/${empid}`);
 }

}