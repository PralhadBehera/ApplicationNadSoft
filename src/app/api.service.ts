import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api/students'; 
  private countUrl = 'http://localhost:3000/api/students/count'; // URL for student count
  private apiUrl = 'http://localhost:3000/api/db-connection';   

  constructor(private http: HttpClient) {}

  // Method to get database connection status
  getDbConnectionStatus(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Method to get students with pagination
  getStudents(page: number, limit: number): Observable<any[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
      
    return this.http.get<{ message: string, data: any[] }>(this.baseUrl, { params }).pipe(
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

  // Method to update a student by ID
  updateStudent(id: number, student: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<any>(url, student);
  }

  // Method to get the total count of students
  getTotalStudentCount(): Observable<number> {
    return this.http.get<{ message: string, totalCount: number }>(this.countUrl).pipe(
      map(response => response.totalCount) // Extract `totalCount` from response
    );
  }
}


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable, map } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {
//   private baseUrl = 'http://localhost:3000/api/students'; 
//   private apiUrl = 'http://localhost:3000/api/db-connection';   

//   constructor(private http: HttpClient) {}

//   // Method to get database connection status
//   getDbConnectionStatus(): Observable<any> {
//     return this.http.get<any>(this.apiUrl);
//   }

//   // Method to get students with pagination
//   getStudents(page: number, limit: number): Observable<any[]> {
//     const params = new HttpParams()
//       .set('page', page.toString())
//       .set('limit', limit.toString());
      
//     return this.http.get<{ message: string, data: any[] }>(this.baseUrl, { params }).pipe(
//       map(response => response.data) // Extract `data` array from response
//     );
//   }

//   // Method to add a new student
//   addStudent(student: any): Observable<any> {
//     return this.http.post<any>(this.baseUrl, student);
//   }

//   // Method to delete a student by ID
//   deleteStudent(id: number): Observable<any> {
//     const url = `${this.baseUrl}/${id}`;
//     return this.http.delete<any>(url);
//   }

//   // Method to update a student by ID
//   updateStudent(id: number, student: any): Observable<any> {
//     const url = `${this.baseUrl}/${id}`;
//     return this.http.put<any>(url, student);
//   }
// }


