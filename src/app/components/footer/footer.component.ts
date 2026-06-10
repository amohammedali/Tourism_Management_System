import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="container footer-grid">
        <div class="footer-info">
          <div class="logo">
            <a routerLink="/">Wander<span>Vista</span></a>
          </div>
          <p>Discover the world with WanderVista. We offer handpicked destinations and unforgettable experiences tailored just for you.</p>
          <div class="social-links">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        
        <div class="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a routerLink="/">Home</a></li>
            <li><a routerLink="/destinations">Destinations</a></li>
            <li><a routerLink="/book">Book a Tour</a></li>
            <li><a routerLink="/contact">Contact Us</a></li>
          </ul>
        </div>
        
        <div class="footer-links">
          <h3>Support</h3>
          <ul>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Travel Insurance</a></li>
          </ul>
        </div>
        
        <div class="footer-newsletter">
          <h3>Newsletter</h3>
          <p>Subscribe to get travel tips and exclusive offers.</p>
          <div class="newsletter-form">
            <input type="email" placeholder="Your Email">
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="container">
          <p>&copy; 2026 WanderVista Tourism. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--primary-dark);
      color: white;
      padding: var(--spacing-lg) 0 0;
      margin-top: var(--spacing-lg);
    }
    
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 2fr;
      gap: 3rem;
      padding-bottom: var(--spacing-lg);
    }
    
    .logo a {
      font-family: var(--font-serif);
      font-size: 2rem;
      color: white;
      margin-bottom: 1.5rem;
      display: inline-block;
    }
    
    .logo span {
      color: var(--primary-accent);
    }
    
    .footer-info p {
      color: #ccc;
      margin-bottom: 2rem;
      max-width: 300px;
    }
    
    .social-links {
      display: flex;
      gap: 1rem;
    }
    
    .social-links a {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      color: white;
      font-size: 1.2rem;
    }
    
    .social-links a:hover {
      background: var(--primary-accent);
      transform: translateY(-3px);
    }
    
    .footer-links h3, .footer-newsletter h3 {
      font-family: var(--font-sans);
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
      color: var(--primary-accent);
    }
    
    .footer-links ul li {
      margin-bottom: 0.8rem;
    }
    
    .footer-links ul li a {
      color: #ccc;
    }
    
    .footer-links ul li a:hover {
      color: white;
      padding-left: 5px;
    }
    
    .footer-newsletter p {
      color: #ccc;
      margin-bottom: 1.5rem;
    }
    
    .newsletter-form {
      display: flex;
      gap: 0.5rem;
    }
    
    .newsletter-form input {
      flex: 1;
      padding: 0.8rem;
      border-radius: var(--radius-sm);
      border: none;
      outline: none;
    }
    
    .newsletter-form button {
      background: var(--primary-accent);
      color: var(--primary-dark);
      padding: 0.8rem 1.2rem;
      border-radius: var(--radius-sm);
      font-weight: 700;
    }
    
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 1.5rem 0;
      text-align: center;
      color: #888;
      font-size: 0.9rem;
    }
    
    @media (max-width: 992px) {
      .footer-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    @media (max-width: 576px) {
      .footer-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }
  `]
})
export class FooterComponent {}
