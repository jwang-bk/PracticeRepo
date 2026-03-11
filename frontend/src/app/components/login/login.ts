import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;
  activeTab: 'login' | 'register' = 'login';

  // Register fields
  registerUsername = '';
  registerEmail = '';
  registerPassword = '';
  registerRole = 'User';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onLogin(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter username and password.';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed. Please check your credentials.';
        this.isLoading = false;
      }
    });
  }

  onRegister(): void {
    if (!this.registerUsername || !this.registerEmail || !this.registerPassword) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register({
      username: this.registerUsername,
      email: this.registerEmail,
      password: this.registerPassword,
      role: this.registerRole
    }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        const errors = err.error?.errors;
        this.errorMessage = Array.isArray(errors)
          ? errors.join(' ')
          : (err.error?.message || 'Registration failed.');
        this.isLoading = false;
      }
    });
  }
}

