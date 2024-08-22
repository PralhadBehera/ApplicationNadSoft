
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api/students'; 
  private apiUrl = 'http://localhost:3000/api/db-connection';   

  constructor(private http: HttpClient) {}

    getDbConnectionStatus(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Method to get all students
  getStudents(): Observable<any[]> {
    return this.http.get<{ message: string, data: any[] }>(this.baseUrl).pipe(
      map(response => response.data) // Extract `data` array from response
    );
  }

  // Method to add a new student
  addStudent(student: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, student);
  }

  // Method to delete a student by ID
  deleteStudent(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<any>(url);
  }

    // Method to update a student
    updateStudent(id: number, student: any): Observable<any> {
      const url = `${this.baseUrl}/${id}`;
      return this.http.put<any>(url, student);
    }


}
