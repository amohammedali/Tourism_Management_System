import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <section class="auth-section">
      <div class="container">
        <div class="auth-card">
          <div class="auth-header">
            <h2>Join Us</h2>
            <p>Create your WanderVista account</p>
          </div>
          
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" formControlName="name" placeholder="Enter your name">
            </div>
            
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" formControlName="email" placeholder="Enter your email">
            </div>
            
            <div class="form-group">
              <label>Password</label>
              <input type="password" formControlName="password" placeholder="Create a password">
            </div>
            
            <div class="error-msg" *ngIf="error">{{error}}</div>
            
            <button type="submit" class="btn btn-primary btn-block" [disabled]="registerForm.invalid || loading">
              {{loading ? 'Creating account...' : 'Register'}}
            </button>
          </form>
          
          <div class="auth-footer">
            <p>Already have an account? <a routerLink="/login">Login here</a></p>
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
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.error = '';
      this.authService.register(this.registerForm.value).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => {
          this.error = err?.message || err?.error?.message || 'Registration failed';
          this.loading = false;
        }
      });
    }
  }
}
