import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <section class="auth-section">
      <div class="container">
        <div class="auth-card">
          <div class="auth-header">
            <h2>Welcome Back</h2>
            <p>Log in to your WanderVista account</p>
          </div>
          
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" formControlName="email" placeholder="Enter your email">
            </div>
            
            <div class="form-group">
              <label>Password</label>
              <input type="password" formControlName="password" placeholder="Enter your password">
            </div>
            
            <div class="error-msg" *ngIf="error">{{error}}</div>
            
            <button type="submit" class="btn btn-primary btn-block" [disabled]="loginForm.invalid || loading">
              {{loading ? 'Logging in...' : 'Login'}}
            </button>
          </form>
          
          <div class="auth-footer">
            <p>Don't have an account? <a routerLink="/register">Register here</a></p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .auth-section { padding: 150px 0 80px; background: #f8f6f0; min-height: 100vh; display: flex; align-items: center; }
    .auth-card { background: white; max-width: 450px; margin: 0 auto; padding: 3rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); }
    .auth-header { text-align: center; margin-bottom: 2.5rem; }
    .auth-header h2 { font-size: 2.2rem; margin-bottom: 0.5rem; }
    .auth-header p { color: var(--text-light); }
    .form-group { margin-bottom: 1.5rem; }
    label { display: block; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem; }
    input { width: 100%; padding: 0.8rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm); outline: none; }
    input:focus { border-color: var(--primary-accent); }
    .btn-block { width: 100%; padding: 1rem; font-size: 1.1rem; margin-top: 1rem; }
    .auth-footer { text-align: center; margin-top: 2rem; color: var(--text-light); }
    .auth-footer a { color: var(--primary-accent); font-weight: 700; }
    .error-msg { color: #d32f2f; background: #ffebee; padding: 0.8rem; border-radius: var(--radius-sm); margin-bottom: 1rem; font-size: 0.9rem; text-align: center; }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';
      this.authService.login(this.loginForm.value).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => {
          this.error = err?.message || err?.error?.message || 'Invalid credentials';
          this.loading = false;
        }
      });
    }
  }
}
