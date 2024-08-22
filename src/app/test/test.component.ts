// src/app/test/test.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  connectionStatus: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getDbConnectionStatus().subscribe(
      data => {
        this.connectionStatus = `Database connected successfully. Timestamp: ${data.timestamp}`;
      },
      error => {
        this.connectionStatus = `Error: ${error.message}`;
      }
    );
  }
}
