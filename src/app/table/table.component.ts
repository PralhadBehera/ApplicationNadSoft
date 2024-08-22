

// import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../api.service';

// @Component({
//   selector: 'app-table',
//   templateUrl: './table.component.html',
//   styleUrls: ['./table.component.css']
// })
// export class TableComponent implements OnInit {
//   students: any[] = []; // Array to hold student data
//   newMember = {
//     name: '',
//     email: '',
//     age: null
//   };

//   display: string = 'none';
//   displayDelete: string = 'none';
//   selectedStudentId: number | null = null; // To store the ID of the student to be deleted

//   constructor(private apiService: ApiService) {}

//   ngOnInit(): void {
//     this.loadStudents(); // Load students when the component initializes
//   }

//   // Method to fetch student data from the API
//   loadStudents(): void {
//     this.apiService.getStudents().subscribe(
//       (data: any[]) => {
//         this.students = data; // Use the data array directly
//       },
//       error => {
//         console.error('Error fetching student data:', error);
//       }
//     );
//   }

//   // Open the add student modal
//   openModal(): void {
//     this.display = "block";
//   }

//   // Close the add student modal
//   onCloseHandled(): void {
//     this.display = "none";
//   }

//   // Open the delete confirmation modal
//   openModalDelete(studentId: number): void {
//     this.selectedStudentId = studentId; // Set the selected student ID
//     this.displayDelete = "block";
//   }

//   // Close the delete confirmation modal
//   onCloseHandledDelete(): void {
//     this.displayDelete = "none";
//     this.selectedStudentId = null; // Reset the selected student ID
//   }

//   // Submit the form to add a new student
//   onSubmit(): void {
//     if (this.newMember.name && this.newMember.email && this.newMember.age) {
//       this.apiService.addStudent(this.newMember).subscribe(response => {
//         console.log('Student added successfully', response);
//         this.loadStudents(); // Refresh the student list after adding
//         this.onCloseHandled(); // Hide the form after submission
//       }, error => {
//         console.error('Error adding student', error);
//       });
//     } else {
//       console.error('Form is invalid');
//     }
//   }

//   // Delete a student by ID
//   deleteStudent(): void {
//     if (this.selectedStudentId !== null) {
//       this.apiService.deleteStudent(this.selectedStudentId).subscribe(
//         () => {
//           this.students = this.students.filter(student => student.id !== this.selectedStudentId);
//           alert('Student deleted successfully');
//           this.onCloseHandledDelete(); // Close the modal after deletion
//         },
//         error => console.error('Error deleting student', error)
//       );
//     }
//   }
// }


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
  
  
  display: string = 'none';
  displayDelete: string = 'none';
  displayUpdate: string = 'none';
  selectedStudentId: number | null = null; // To store the ID of the student to be deleted

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadStudents(); // Load students when the component initializes
  }

  // Method to fetch student data from the API
  loadStudents(): void {
    this.apiService.getStudents().subscribe(
      (data: any[]) => {
        this.students = data; // Use the data array directly
      },
      error => {
        console.error('Error fetching student data:', error);
      }
    );
  }

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
}

