

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  students: any[] = []; // Array to hold student data
  newMember = {
    name: '',
    email: '',
    age: null
  };
  
  selectedStudent: any = {
    name: '',
    email: '',
    age: null
  };
  
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;
  
  display: string = 'none';
  displayDelete: string = 'none';
  displayUpdate: string = 'none';
  selectedStudentId: number | null = null; // To store the ID of the student to be deleted

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadStudents(); // Load students when the component initializes
  }

  // Method to fetch student data from the API
  // loadStudents(): void {
  //   this.apiService.getStudents(this.currentPage, this.pageSize).subscribe(
  //     (data: any[]) => {
  //       this.students = data; // Use the data array directly
  //     },
  //     error => {
  //       console.error('Error fetching student data:', error);
  //     }
  //   );
  // }

  // Open the add student modal
  openModal(): void {
    this.display = "block";
  }

  // Close the add student modal
  onCloseHandled(): void {
    this.display = "none";
  }

  // Open the delete confirmation modal
  openModalDelete(studentId: number): void {
    this.selectedStudentId = studentId; // Set the selected student ID
    this.displayDelete = "block";
  }

  // Close the delete confirmation modal
  onCloseHandledDelete(): void {
    this.displayDelete = "none";
    this.selectedStudentId = null; // Reset the selected student ID
    console.log(this.selectedStudent)
  }

  // Open the update modal
  openModalUpdate(student: any): void {
    this.selectedStudent = { ...student }; // Copy the student data
    this.displayUpdate = "block"; // Show the update modal
  }
  

  // Close the update modal
  onCloseHandledUpdate(): void {
    this.displayUpdate = "none";
  }

  // Submit the form to add a new student
  onSubmit(): void {
    if (this.newMember.name && this.newMember.email && this.newMember.age) {
      this.apiService.addStudent(this.newMember).subscribe(response => {
        console.log('Student added successfully', response);
        this.loadStudents(); // Refresh the student list after adding
        this.onCloseHandled(); // Hide the form after submission
      }, error => {
        console.error('Error adding student', error);
      });
    } else {
      console.error('Form is invalid');
    }
  }

  // Update student details
  onUpdate(): void {
    if (this.selectedStudent.name && this.selectedStudent.email && this.selectedStudent.age) {
      this.apiService.updateStudent(this.selectedStudent.id, this.selectedStudent).subscribe(response => {
        console.log('Student updated successfully', response);
        this.loadStudents(); // Refresh the student list after updating
        this.onCloseHandledUpdate(); // Hide the update form after submission
      }, error => {
        console.error('Error updating student', error);
      });
    } else {
      console.error('Form is invalid');
    }
  }

  // Delete a student by ID
  deleteStudent(): void {
    if (this.selectedStudentId !== null) {
      this.apiService.deleteStudent(this.selectedStudentId).subscribe(
        () => {
          this.students = this.students.filter(student => student.id !== this.selectedStudentId);
         
          this.onCloseHandledDelete(); // Close the modal after deletion
        },
        error => console.error('Error deleting student', error)
      );
    }
  }


  // onPageSizeChange(event: Event): void {
  //   const target = event.target as HTMLSelectElement;
  //   const newSize = Number(target.value);
    
  //   if (!isNaN(newSize) && newSize > 0) {
  //     this.pageSize = newSize;
  //     this.loadStudents(); // Reload students with the new page size
  //   }
  // }

  loadStudents(): void {
    console.log(`Loading students for page ${this.currentPage} with pageSize ${this.pageSize}`);
    this.apiService.getStudents(this.currentPage, this.pageSize).subscribe(
      (data: any[]) => {
        this.students = data; // Array of students for the current page
        this.updateTotalPages(); // Update total pages based on total count
      },
      error => {
        console.error('Error fetching student data:', error);
      }
    );
  }

  updateTotalPages(): void {
    this.apiService.getTotalStudentCount().subscribe(
      totalCount => {
        if (!isNaN(totalCount) && totalCount > 0) {
          this.totalPages = Math.ceil(totalCount / this.pageSize);
        } else {
          this.totalPages = 1; // Default to 1 if totalCount is invalid
        }
        console.log(`Total pages updated: ${this.totalPages}`);
      },
      error => {
        console.error('Error fetching total student count:', error);
      }
    );
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newSize = Number(target.value);
    
    if (!isNaN(newSize) && newSize > 0) {
      this.pageSize = newSize;
      this.currentPage = 1; // Reset to the first page
      this.loadStudents(); // Reload students with the new page size
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadStudents();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadStudents();
    }
  }

  setPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadStudents();
    }
  }
}

