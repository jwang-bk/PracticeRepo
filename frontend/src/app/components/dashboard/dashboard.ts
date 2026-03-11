import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth';

interface DashboardSummary {
  message: string;
  username: string;
  roles: string[];
  serverTime: string;
}

interface AdminData {
  message: string;
  secret: string;
  users: { id: number; name: string; role: string }[];
}

interface UserData {
  message: string;
  items: { id: number; title: string; completed: boolean }[];
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  summary: DashboardSummary | null = null;
  adminData: AdminData | null = null;
  userData: UserData | null = null;
  adminError = '';
  isLoadingAdmin = false;

  private readonly apiUrl = 'http://localhost:5000/api/dashboard';

  constructor(
    public authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadSummary();
    this.loadUserData();
    if (this.authService.isAdmin()) {
      this.loadAdminData();
    }
  }

  loadSummary(): void {
    this.http.get<DashboardSummary>(`${this.apiUrl}/summary`).subscribe({
      next: data => this.summary = data,
      error: () => {}
    });
  }

  loadUserData(): void {
    this.http.get<UserData>(`${this.apiUrl}/user-data`).subscribe({
      next: data => this.userData = data,
      error: () => {}
    });
  }

  loadAdminData(): void {
    this.isLoadingAdmin = true;
    this.adminError = '';
    this.http.get<AdminData>(`${this.apiUrl}/admin-data`).subscribe({
      next: data => {
        this.adminData = data;
        this.isLoadingAdmin = false;
      },
      error: (err) => {
        this.adminError = err.status === 403
          ? 'Access denied: Admin role required.'
          : 'Failed to load admin data.';
        this.isLoadingAdmin = false;
      }
    });
  }
}

