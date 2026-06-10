import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled">
      <div class="container navbar-content">
        <div class="logo">
          <a routerLink="/">Wander<span [class.scrolled]="isScrolled">Vista</span></a>
        </div>
        
        <ul class="nav-links" [class.active]="mobileMenuOpen">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMenu()">Home</a></li>
          <li><a routerLink="/destinations" routerLinkActive="active" (click)="closeMenu()">Destinations</a></li>
          <li><a routerLink="/book" routerLinkActive="active" (click)="closeMenu()">Book a Tour</a></li>
          <li><a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">Contact</a></li>
          
          <ng-container *ngIf="!(authService.currentUser$ | async); else loggedIn">
            <li><a routerLink="/login" class="nav-auth" (click)="closeMenu()">Login</a></li>
            <li><a routerLink="/signup" class="nav-auth" (click)="closeMenu()">Sign Up</a></li>
          </ng-container>
          
          <ng-template #loggedIn>
            <li class="user-info" [class.scrolled]="isScrolled">
              <span>Hi, {{ (authService.currentUser$ | async)?.name }}</span>
              <button (click)="onLogout()" class="btn-logout" [class.scrolled]="isScrolled">Logout</button>
            </li>
          </ng-template>

          <li><a routerLink="/book" class="btn-book" (click)="closeMenu()">Book Now</a></li>
        </ul>
        
        <div class="mobile-toggle" (click)="toggleMenu()">
          <span [class.scrolled]="isScrolled"></span>
          <span [class.scrolled]="isScrolled"></span>
          <span [class.scrolled]="isScrolled"></span>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar { position: fixed; top: 0; left: 0; width: 100%; z-index: 1000; padding: 1.5rem 0; transition: all 0.4s ease; background: transparent; }
    .navbar.scrolled { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); padding: 1rem 0; box-shadow: 0 2px 20px rgba(0,0,0,0.1); }
    .navbar-content { display: flex; justify-content: space-between; align-items: center; }
    
    .logo a { font-family: var(--font-serif); font-size: 1.8rem; font-weight: 800; color: white; transition: color 0.3s; }
    .navbar.scrolled .logo a { color: var(--primary-dark); }
    .logo span { color: var(--primary-accent); }
    .logo span.scrolled { color: var(--primary-accent); }
    
    .nav-links { display: flex; align-items: center; gap: 1.5rem; }
    .nav-links a { font-weight: 500; color: rgba(255,255,255,0.9); font-size: 0.95rem; position: relative; transition: color 0.3s; }
    .navbar.scrolled .nav-links a { color: var(--text-main); }
    
    .nav-links a.active { color: var(--primary-accent); }
    .navbar.scrolled .nav-links a.active { color: var(--primary-accent); }
    
    .btn-book { background: var(--primary-accent); color: var(--primary-dark) !important; padding: 0.7rem 1.2rem; border-radius: var(--radius-sm); font-weight: 700 !important; }
    .navbar.scrolled .btn-book { background: var(--primary-dark); color: white !important; }
    
    .nav-auth { color: var(--primary-accent) !important; font-weight: 700 !important; }
    
    .user-info { display: flex; align-items: center; gap: 1rem; font-weight: 600; color: white; }
    .user-info.scrolled { color: var(--primary-dark); }
    
    .btn-logout { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); padding: 0.4rem 0.8rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer; color: white; }
    .btn-logout.scrolled { border-color: var(--border-color); color: var(--text-main); background: none; }
    
    .mobile-toggle { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
    .mobile-toggle span { width: 25px; height: 3px; background: white; transition: all 0.3s ease; }
    .mobile-toggle span.scrolled { background: var(--primary-dark); }
    @media (max-width: 992px) {
      .mobile-toggle { display: flex; }
      .nav-links { position: absolute; top: 100%; left: 0; width: 100%; background: white; flex-direction: column; padding: 2rem; gap: 1.5rem; transform: translateY(-150%); transition: transform 0.4s ease; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
      .nav-links.active { transform: translateY(0); }
      .user-info { flex-direction: column; }
    }
  `]
})
export class NavbarComponent {
  isScrolled = false;
  mobileMenuOpen = false;

  constructor(public authService: AuthService) {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled = window.scrollY > 50;
      });
    }
  }

  toggleMenu() { this.mobileMenuOpen = !this.mobileMenuOpen; }
  closeMenu() { this.mobileMenuOpen = false; }

  onLogout() {
    this.authService.logout();
    this.closeMenu();
  }
}
